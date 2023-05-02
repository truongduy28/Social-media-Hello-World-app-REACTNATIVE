/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Colors from '../../constants/Colors';
import {Image} from 'react-native';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import CommentModal from '../Comment/CommentModal';
import AvatarComponent from '../Material/AvatarComponent';
import {useAuthentication} from '../../context/authContext';
import axios from 'axios';
import {SERVER_URL} from '@env';
import LikeLoader from '../../components/Loader/LikeLoader';
import {useNavigation} from '@react-navigation/native';
import {copyToClipboard, formatFromNow} from '../../utils/common';
import VideoPlayer from 'react-native-video-player';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalFeedOption from './ModalFeedOption';
import ModalEditFeed from './ModalEditFeed';
import {showToast} from '../../utils/toastShow';
import ActivityIndicatorLoader from '../../components/Loader/ActivityIndicatorLoader';

const Feed = ({post, allPostState, fn}) => {
  const {allPost, setAllPost} = allPostState;
  const {handleScrollToTop} = fn;
  if (!post) return;
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalOptionVisible, setIsModalOptionVisible] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState(post);
  const [profileOfSharedFeed, setProfileOfSharedFeed] = useState(null);
  const [isLoadingProfileOfSharedFeed, setIsLoadingProfileOfSharedFeed] =
    useState(false);
  const [isLoadingShareFeed, setIsLoadingShareFeed] = useState(false);
  const [isLoadingDeleteFeed, setIsLoadingDeleteFeed] = useState(false);
  const [isLoadingStoreFeed, setIsLoadingStoreFeed] = useState(false);

  const {auth} = useAuthentication();

  const isMe = post.postedBy._id == auth.userId;

  const isShared = post.isShare ? true : false;

  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalEdit = () => {
    setIsModalEditVisible(!isModalEditVisible);
  };
  const toggleModalOption = () => {
    setIsModalOptionVisible(!isModalOptionVisible);
  };
  let likeCount = currentPost?.likes?.length;
  let commentCount = currentPost?.comments?.length;

  useEffect(() => {
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
  // console.log(likeCount);

  const like = async (postId, userId) => {
    try {
      setIsLikeLoading(true);
      const {data} = await axios.put(`${SERVER_URL}/posts/like-post`, {
        postId,
        userId,
      });
      setIsLikeLoading(false);
      // console.log(data);
      setCurrentPost({...post, likes: data.post.likes});
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

      setCurrentPost({...post, likes: data.post.likes});
    } catch (error) {
      console.log(error);
    }
    setIsLikeLoading(false);
  };
  // console.log(likeCount, commentCount);

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

  const handleCopyContent = () => {
    copyToClipboard(
      currentPost.isShare ? currentPost.isShare.content : currentPost.content,
    );
    setIsModalOptionVisible(!isModalOptionVisible);
  };

  const handleSharePost = async () => {
    setIsLoadingShareFeed(true);
    try {
      const {data} = await axios.post(`${SERVER_URL}/posts/share-post`, {
        postId: post._id,
        userId: auth.userId,
      });
      setAllPost({...allPost, posts: [data.post, ...allPost.posts]});
      setIsLoadingShareFeed(false);
    } catch (error) {
      console.log(error);
      setIsLoadingShareFeed(false);
    }
    handleScrollToTop();
    setIsModalOptionVisible(!isModalOptionVisible);
  };

  const handleDeletePost = () => {
    Alert.alert(
      'Comfirm delete post?',
      'Are you sure you want to remove this feed?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            setIsLoadingDeleteFeed(true);
            try {
              const res = await axios.put(
                `${SERVER_URL}/posts/delete/${post._id}`,
              );
              if (res.status == 200) {
                showToast('success', 'Successfully deleted', 'Feed be deleted');
                const reSetNewPosts = allPost.posts.filter(
                  p => p._id !== post._id,
                );
                setAllPost({...allPost, posts: [...reSetNewPosts]});

                setIsLoadingDeleteFeed(false);
              }
            } catch (error) {
              setIsLoadingDeleteFeed(false);
            }
          },
        },
        {
          text: 'No',
        },
      ],
    );
    setIsModalOptionVisible(!isModalOptionVisible);
  };

  const handleArchivePost = async () => {
    if (post.isShare) return;
    setIsLoadingStoreFeed(true);
    try {
      const res = await axios.post(`${SERVER_URL}/posts/archive-post`, {
        postId: post._id,
        userId: auth.userId,
      });

      showToast('success', 'Successfully', res.data.message);
    } catch (error) {
      showToast('error', 'Error', error.response?.data.message);
    }
    setIsLoadingStoreFeed(false);
    setIsModalOptionVisible(false);
  };

  const handleReportFeed = () => {
    navigation.navigate('Report', {type_report: 'post', data_report: post});
    setModalVisible(false);
  };

  const handleFocusMedia = (user, uri, isVideo) => {
    navigation.navigate('FocusMedia', {user, uri, isVideo});
  };
  return (
    post && (
      <View
        style={{
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
              onPress={() => handleViewProfile(currentPost.postedBy._id)}>
              <AvatarComponent uri={currentPost.postedBy.image} />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: Colors.semiDark,
                  fontSize: FontSize.medium,
                  fontFamily: Font['poppins-bold'],
                  fontWeight: 'bold',
                }}>
                {currentPost.postedBy.name}
              </Text>
              <Text>{formatFromNow(post?.createdAt)}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => toggleModalOption()}>
                <IconMaterialCommunityIcons name="dots-horizontal" size={28} />
              </TouchableOpacity>
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
                  <IconMaterialCommunityIcons name="share-outline" size={20} />{' '}
                  {currentPost.content.trim()} of{' '}
                  <Text style={{fontWeight: 700, color: Colors.blueFacebook}}>
                    {profileOfSharedFeed.name}
                  </Text>
                </>
              ) : (
                currentPost.content.trim()
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
                          {currentPost.isShare.content.trim()}
                        </Text>
                        {currentPost.isShare.image.url ? (
                          currentPost.isShare.image.isVideo === false ? (
                            <TouchableWithoutFeedback
                              onPress={() =>
                                handleFocusMedia(
                                  profileOfSharedFeed.name,
                                  currentPost.isShare.image.url,
                                  currentPost.isShare.image.isVideo,
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
                                  source={{uri: currentPost.isShare.image.url}}
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
                                video={{uri: currentPost.isShare.image.url}}
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
            {currentPost.image.url ? (
              currentPost.image.isVideo === false ? (
                <TouchableWithoutFeedback
                  onPress={() =>
                    handleFocusMedia(
                      currentPost.postedBy.name,
                      currentPost.image.url,
                      currentPost.image.isVideo,
                    )
                  }>
                  <View
                    style={{overflow: 'hidden', width: '100%', maxHeight: 250}}>
                    <Image
                      style={{
                        width: '100%',
                        resizeMode: 'contain',
                        height: '100%',
                        objectFit: 'scale-down',
                      }}
                      source={{uri: currentPost.image.url}}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <View
                  style={{overflow: 'hidden', width: '100%', maxHeight: 250}}>
                  <VideoPlayer
                    video={{uri: currentPost.image.url}}
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
              (!currentPost.likes.includes(auth.userId) ? (
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
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
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
            ) : currentPost?.likes?.includes(auth.userId) ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                }}
                onPress={() => unlike(currentPost._id, auth.userId)}>
                <IconIonicons name="heart" size={24} color={Colors.redHeart} />
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
                onPress={() => like(currentPost._id, auth.userId)}>
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
          currentPostState={{currentPost, setCurrentPost}}
          auth={auth}
        />
        <ModalFeedOption
          toggleState={{
            isModalOptionVisible,
            setIsModalOptionVisible,
            toggleModalOption,
            isModalEditVisible,
            setIsModalEditVisible,
            toggleModalEdit,
            isLoadingShareFeed,
            isMe,
            isShared,
            isLoadingStoreFeed,
          }}
          fn={{
            handleCopyContent,
            handleSharePost,
            handleDeletePost,
            handleArchivePost,
            handleReportFeed,
          }}
        />
        <ModalEditFeed
          toggleState={{
            isModalEditVisible,
            setIsModalEditVisible,
            toggleModalEdit,
          }}
          postState={{currentPost, setCurrentPost}}
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Feed;
