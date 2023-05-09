/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feed from '../components/Feed/Feed';
import axios from 'axios';
import {SERVER_URL} from '@env';
import Colors from '../constants/Colors';
import AvatarComponent from '../components/Material/AvatarComponent';
import {useNavigation} from '@react-navigation/native';
import {useAuthentication} from '../context/authContext';
import {formatFromNow} from '../utils/common';
import Font from '../constants/Font';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontSize from '../constants/FontSize';
import {VideoPlayer} from 'react-native-video-player';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import ActivityIndicatorLoader from '../components/Loader/ActivityIndicatorLoader';
import CommentModal from '../components/Comment/CommentModal';
import LikeLoader from '../components/Loader/LikeLoader';
import {useLayoutEffect} from 'react';

const FeedScreen = ({route}) => {
  const {id} = route.params;
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {auth} = useAuthentication();
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [profileOfSharedFeed, setProfileOfSharedFeed] = useState(null);
  const [isLoadingDeleteFeed, setIsLoadingDeleteFeed] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoadingProfileOfSharedFeed, setIsLoadingProfileOfSharedFeed] =
    useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      console.log('Starting... GET ALL POSTS');
      try {
        const {data} = await axios.get(`${SERVER_URL}/posts/${id}`);
        console.log('Success... GET ALL POSTS');
        setPost(data.post);
        setIsLoading(false);
      } catch (error) {
        console.log('Error... GET ALL POSTS');
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);
  const handleViewProfile = userId => {
    if (userId == auth.userId) {
      navigation.navigate('Profile-navigation');
      return;
    }
    navigation.navigate('Profile', {
      userId,
      auth,
    });
    return;
  };

  const handleFocusMedia = (user, uri, isVideo) => {
    navigation.navigate('FocusMedia', {user, uri, isVideo});
  };

  let likeCount = post?.likes?.length;
  let commentCount = post?.comments?.length;

  const like = async (postId, userId) => {
    try {
      setIsLikeLoading(true);
      const {data} = await axios.put(`${SERVER_URL}/posts/like-post`, {
        postId,
        userId,
      });
      setIsLikeLoading(false);
      // console.log(data);
      setPost({...post, likes: data.post.likes});
    } catch (error) {
      setIsLikeLoading(false);
      console.log(error);
    }
  };

  const unlike = async (postId, userId) => {
    setIsLikeLoading(true);
    try {
      const {data} = await axios.put(`${SERVER_URL}/posts/unlike-post`, {
        postId,
        userId,
      });

      setPost({...post, likes: data.post.likes});
    } catch (error) {
      console.log(error);
    }
    setIsLikeLoading(false);
  };

  useEffect(() => {
    if (!post) return;

    if (!post.isShare) return;
    const getProfile = async () => {
      try {
        setIsLoadingProfileOfSharedFeed(true);
        const {data} = await axios.get(
          `${SERVER_URL}/users/${post.isShare.postedBy}`,
        );
        setProfileOfSharedFeed(data.user);
        setIsLoadingProfileOfSharedFeed(false);
      } catch (error) {
        console.log(error);
        setIsLoadingProfileOfSharedFeed(false);
      }
    };
    getProfile();
  }, [post]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Feed's ${post ? post.postedBy.name : 'User'}`,
    });
  }, [post, navigation]);

  return post ? (
    post.isDelete ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.lightPrimary,
        }}>
        <Text style={{fontSize: 30, fontWeight: 600, textAlign: 'center'}}>
          Post is deleted or hidded by some reasons
        </Text>
      </View>
    ) : (
      <View>
        <View
          style={{
            marginTop: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,
            elevation: 7,
            backgroundColor: '#fff',
            borderRadius: 10,
            marginHorizontal: 5,
            position: 'relative',
          }}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: Colors.lightPrimary,
              padding: 10,
              minHeight: 20,
            }}>
            <View style={{flexDirection: 'row', gap: 7, alignItems: 'center'}}>
              <TouchableOpacity
                style={{height: 50, width: 50}}
                onPress={() => handleViewProfile(post.postedBy._id)}>
                <AvatarComponent uri={post.postedBy.image} />
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: Colors.semiDark,
                    fontSize: FontSize.medium,
                    fontFamily: Font['poppins-bold'],
                    fontWeight: 'bold',
                  }}>
                  {post.postedBy.name}
                </Text>
                <Text>{formatFromNow(post?.createdAt)}</Text>
              </View>
            </View>
            <View style={{paddingVertical: 10}}>
              <Text
                style={{
                  color: post.isShare ? Colors.semiDark : Colors.text,
                  fontSize: post.isShare ? 16 : 18,
                }}>
                {post.isShare && profileOfSharedFeed ? (
                  <>
                    <IconMaterialCommunityIcons
                      name="share-outline"
                      size={20}
                    />{' '}
                    {post.content.trim()} of{' '}
                    <Text style={{fontWeight: 700, color: Colors.blueFacebook}}>
                      {profileOfSharedFeed.name}
                    </Text>
                  </>
                ) : (
                  post.content.trim()
                )}
              </Text>
              {post.isShare ? (
                post.isShare.isDelete ? (
                  <View
                    style={{
                      hadowColor: Colors.semiDark,
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,

                      elevation: 2,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        padding: 15,
                        // paddingBottom: 5,
                        // overflow: 'hidden',
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: Colors.lightText,
                          fontWeight: 500,
                        }}>
                        Can't display feed
                      </Text>
                      <Text>Post no longer or be deleted </Text>
                    </View>
                  </View>
                ) : (
                  profileOfSharedFeed && (
                    <View
                      style={{
                        shadowColor: Colors.semiDark,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,

                        elevation: 2,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                      }}>
                      <View
                        style={{
                          borderRadius: 10,
                          backgroundColor: '#fff',
                          padding: 15,
                          paddingBottom: 5,
                          // overflow: 'hidden',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 7,
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            style={{height: 50, width: 50}}
                            onPress={() =>
                              handleViewProfile(profileOfSharedFeed._id)
                            }>
                            <AvatarComponent uri={profileOfSharedFeed.image} />
                          </TouchableOpacity>
                          <View style={{flex: 1}}>
                            <Text
                              style={{
                                color: Colors.semiDark,
                                fontSize: FontSize.medium,
                                fontFamily: Font['poppins-bold'],
                                fontWeight: 'bold',
                              }}>
                              {profileOfSharedFeed.name}
                            </Text>
                            <Text>{formatFromNow(post.isShare.createdAt)}</Text>
                          </View>
                        </View>
                        <View style={{paddingVertical: 10}}>
                          <Text
                            style={{
                              color: Colors.text,
                              fontSize: 18,
                            }}>
                            {post.isShare.content.trim()}
                          </Text>
                          {post.isShare.image.url ? (
                            post.isShare.image.isVideo === false ? (
                              <TouchableWithoutFeedback
                                onPress={() =>
                                  handleFocusMedia(
                                    profileOfSharedFeed.name,
                                    post.isShare.image.url,
                                    post.isShare.image.isVideo,
                                  )
                                }>
                                <View
                                  style={{
                                    overflow: 'hidden',
                                    width: '100%',
                                    maxHeight: 250,
                                  }}>
                                  <Image
                                    style={{
                                      width: '100%',
                                      resizeMode: 'contain',
                                      height: '100%',
                                      objectFit: 'scale-down',
                                    }}
                                    source={{
                                      uri: post.isShare.image.url,
                                    }}
                                  />
                                </View>
                              </TouchableWithoutFeedback>
                            ) : (
                              <View
                                style={{
                                  overflow: 'hidden',
                                  width: '100%',
                                  maxHeight: 250,
                                }}>
                                <VideoPlayer
                                  video={{uri: post.isShare.image.url}}
                                  durationVisible={true}
                                />
                              </View>
                            )
                          ) : null}
                        </View>
                      </View>
                    </View>
                  )
                )
              ) : null}
              {post.image.url ? (
                post.image.isVideo === false ? (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      handleFocusMedia(
                        post.postedBy.name,
                        post.image.url,
                        post.image.isVideo,
                      )
                    }>
                    <View
                      style={{
                        overflow: 'hidden',
                        width: '100%',
                        maxHeight: 250,
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          resizeMode: 'contain',
                          height: '100%',
                          objectFit: 'scale-down',
                        }}
                        source={{uri: post.image.url}}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <View
                    style={{overflow: 'hidden', width: '100%', maxHeight: 250}}>
                    <VideoPlayer
                      video={{uri: post.image.url}}
                      durationVisible={true}
                    />
                  </View>
                )
              ) : null}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent:
                  commentCount > 0 && likeCount === 0
                    ? 'flex-end'
                    : 'space-between',
                paddingHorizontal: 10,
                marginBottom: 5,
              }}>
              {likeCount > 0 &&
                (!post.likes.includes(auth.userId) ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <IconIonicons
                      name="ios-heart-outline"
                      size={24}
                      color={Colors.text}
                    />
                    <Text style={{marginBottom: 2}}>
                      {likeCount} like{likeCount > 1 && 's'}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <IconIonicons
                      name="heart"
                      size={24}
                      color={Colors.redHeart}
                    />
                    <Text style={{marginBottom: 2}}>
                      {likeCount > 1
                        ? `You and ${likeCount - 1} other${
                            likeCount > 2 ? 's' : ''
                          }`
                        : `You`}
                    </Text>
                  </View>
                ))}
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Text style={{marginBottom: 2}}>
                  {commentCount > 0 &&
                    `${commentCount} ${
                      commentCount > 1 ? 'comments' : 'comment'
                    }`}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
              {isLikeLoading ? (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // gap: 5,
                  }}>
                  <LikeLoader />
                </TouchableOpacity>
              ) : post?.likes?.includes(auth.userId) ? (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                  }}
                  onPress={() => unlike(post._id, auth.userId)}>
                  <IconIonicons
                    name="heart"
                    size={24}
                    color={Colors.redHeart}
                  />
                  <Text>Like</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                  }}
                  onPress={() => like(post._id, auth.userId)}>
                  <IconIonicons name="heart-outline" size={24} />
                  <Text>Like</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                }}
                onPress={toggleModal}>
                <IconEvilIcons name="comment" size={24} />
                <Text>Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
          {isLoadingDeleteFeed && <ActivityIndicatorLoader />}
          <CommentModal
            toggleState={{isModalVisible, setModalVisible, toggleModal}}
            count={{likeCount, commentCount}}
            currentPostState={{currentPost: post, setCurrentPost: setPost}}
            auth={auth}
          />
        </View>
      </View>
    )
  ) : null;
};

export default FeedScreen;
