/* eslint-disable react-native/no-inline-styles */
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import React, {useState} from 'react';
import AvatarComponent from '../Material/AvatarComponent';
import moment from 'moment';
import Colors from '../../constants/Colors';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {SERVER_URL} from '@env';
import ModalCommentOption from './ModalCommentOption';
import {TextInput} from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  copyToClipboard,
  selectOneFile,
  uploadToFirebase,
} from '../../utils/common';
import {showToast} from '../../utils/toastShow';
import ActivityIndicatorLoader from '../Loader/ActivityIndicatorLoader';

const Comment = ({currentComment, userId, postId}) => {
  const [comment, setComment] = useState(currentComment);
  const [commentEdit, setCommentEdit] = useState(currentComment);
  const [isLikeCommentLoading, setIsLikeCommentLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoadingSaveComment, setIsLoadingSaveComment] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);
  const [isDeleteCommentLoading, setIsDeleteCommentLoading] = useState(false);

  const isMe = currentComment.postedBy._id === userId ? true : false;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const likeComment = async () => {
    setIsLikeCommentLoading(true);
    try {
      const {data} = await axios.put(`${SERVER_URL}/posts/like-comment`, {
        postId,
        commentId: comment._id,
        userId,
      });
      const currentComment = data?.postUpdated?.comments?.find(
        // eslint-disable-next-line eqeqeq
        c => c._id == comment._id,
      );
      setComment({...comment, likes: currentComment?.likes});
      setIsLikeCommentLoading(false);
    } catch (error) {
      setIsLikeCommentLoading(false);

      console.log(error);
    }
  };

  const unlikeComment = async () => {
    setIsLikeCommentLoading(true);
    try {
      const {data} = await axios.put(`${SERVER_URL}/posts/unlike-comment`, {
        postId,
        commentId: comment._id,
        userId,
      });
      const currentComment = data?.postUpdated?.comments?.find(
        c => c._id == comment._id,
      );
      // console.log(currentComment?.likes);
      setComment({...comment, likes: currentComment?.likes});
      setIsLikeCommentLoading(false);
    } catch (error) {
      setIsLikeCommentLoading(false);
      console.log(error);
    }
  };

  const handleLikeComment = () => {
    if (comment?.likes?.includes(userId)) {
      unlikeComment();
    } else {
      likeComment();
    }
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setCommentEdit(currentComment);
    setMediaFile(null);
  };

  const handleSaveCommentEdit = async () => {
    setIsLoadingSaveComment(true);
    try {
      if (mediaFile) {
        const imageUri = await uploadToFirebase(mediaFile);
        commentEdit.image = imageUri;
      }
      const {data} = await axios.patch(
        `${SERVER_URL}/posts/edit-comment/${postId}`,
        commentEdit,
      );
      const currentComment = data?.postUpdated?.comments?.find(
        c => c._id == comment._id,
      );
      setComment({
        ...comment,
        text: currentComment?.text,
        image: currentComment?.image,
      });
      showToast('success', 'Successfully!!!', 'Updated comment');
      setCommentEdit({
        ...comment,
        text: currentComment?.text,
        image: currentComment?.image,
      });
      setIsLoadingSaveComment(false);
      setIsEdit(false);
    } catch (error) {}
  };

  const handleDeleteComment = async () => {
    setIsDeleteCommentLoading(true);
    try {
      const {data} = await axios.put(`${SERVER_URL}/posts/delete-comment`, {
        postId,
        commentId: comment._id,
        userId,
      });
      const currentComment = data?.postUpdated?.comments?.find(
        // eslint-disable-next-line eqeqeq
        c => c._id == comment._id,
      );
      setComment({...comment, isDelete: currentComment?.isDelete});
      // currentComment.isDelete = false;

      setIsDeleteCommentLoading(false);
    } catch (error) {
      console.log(error);
      setIsDeleteCommentLoading(false);
    }
    setModalVisible(false);
  };

  const handleCopyContent = () => {
    copyToClipboard(comment.text);
    setModalVisible(!isModalVisible);
  };

  return (
    !comment.isDelete && (
      <View
        style={{
          justifyContent: 'flex-start',
          gap: 10,
          flexDirection: 'row',
          marginBottom: 15,
        }}>
        <View style={{width: 50, height: 50, alignSelf: 'flex-start'}}>
          <AvatarComponent uri={comment?.postedBy?.image} />
        </View>
        {isEdit ? (
          <View style={{width: '80%', position: 'relative'}}>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: Colors.darkText,
                paddingHorizontal: 5,
              }}>
              <TextInput
                multiline={true}
                value={commentEdit.text}
                onChangeText={text =>
                  setCommentEdit({...commentEdit, text: text})
                }
                style={{height: 70, textAlignVertical: 'top'}}
              />
            </View>
            {commentEdit.image || mediaFile ? (
              <View
                style={{
                  height: 100,
                  marginTop: 5,
                  width: 'auto',
                  borderRadius: 10,
                }}>
                <Image
                  source={{
                    uri: commentEdit.image ? commentEdit.image : mediaFile.uri,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: 0,
                    backgroundColor: Colors.gray,
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 5,
                    borderColor: Colors.lightPrimary,
                  }}
                  onPress={() => {
                    setCommentEdit({...commentEdit, image: ''});
                    setMediaFile(null);
                    return;
                  }}>
                  <IconFontAwesome5 name="times" size={18} />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  height: 100,
                  marginTop: 5,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: Colors.darkText,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 3,
                }}>
                <View
                  style={{
                    backgroundColor: Colors.gray,
                    width: '100%',
                    flex: 1,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                    }}
                    onPress={() => selectOneFile(setMediaFile)}>
                    <View
                      style={{
                        borderRadius: 100,
                        // borderWidth: 5,
                        // borderColor: Colors.darkText,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: '#dee0e4',
                      }}>
                      <IconMaterialIcons
                        name="add-photo-alternate"
                        size={30}
                        color={Colors.darkText}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 10,
                marginVertical: 5,
              }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  backgroundColor: Colors.gray,
                  borderRadius: 5,
                }}
                onPress={() => handleCancelEdit()}>
                <Text style={{fontWeight: 600, color: Colors.text}}>
                  Cancle
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  backgroundColor: Colors.blueFacebook,
                  borderRadius: 5,
                }}
                onPress={() => handleSaveCommentEdit()}>
                <Text style={{fontWeight: 600, color: Colors.lightPrimary}}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            {isLoadingSaveComment && <ActivityIndicatorLoader />}
          </View>
        ) : (
          <View style={{width: '80%', gap: 5}}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.grayBackground,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                alignSelf: 'flex-start',
              }}
              onLongPress={() => toggleModal()}>
              <Text
                style={{color: Colors.text, fontWeight: '600', fontSize: 15.5}}>
                {comment?.postedBy?.name}
              </Text>
              <Text style={{color: Colors.text, opacity: 0.7, fontSize: 15}}>
                {comment.text}
              </Text>
            </TouchableOpacity>
            {comment.image && (
              <View
                style={{
                  alignSelf: 'flex-start',
                  width: '100%',
                  maxHeight: 200,
                  overflow: 'hidden',
                  borderRadius: 10,
                }}>
                <Image
                  style={{
                    height: 150,
                    width: '100%',
                    resizeMode: 'cover',
                  }}
                  source={{uri: comment.image}}
                />
              </View>
            )}
            <View
              style={{flexDirection: 'row', gap: 20, alignSelf: 'flex-start'}}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                  alignSelf: 'flex-start',
                  flex: 1,
                }}>
                <Text>{moment(comment.created).fromNow()}</Text>
                <TouchableOpacity onPress={() => handleLikeComment()}>
                  {isLikeCommentLoading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                  ) : (
                    <Text
                      style={{
                        color:
                          comment?.likes?.length > 0 &&
                          comment?.likes?.includes(userId)
                            ? Colors.redHeart
                            : Colors.darkText,
                        fontWeight: '600',
                      }}>
                      Like
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              {comment?.likes?.length > 0 && (
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                  {comment?.likes?.length > 1 && (
                    <Text style={{fontSize: 15}}>{comment.likes.length}</Text>
                  )}
                  <LinearGradient
                    style={{
                      backgroundColor: Colors.redHeart,
                      borderRadius: 100,
                      width: 18,
                      height: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 2,
                    }}
                    colors={['#fd6582', '#f73a59', '#e71d3d']}>
                    <IconIonicons
                      name="ios-heart"
                      size={13}
                      color={Colors.lightPrimary}
                      style={{marginLeft: 0.5}}
                    />
                  </LinearGradient>
                </View>
              )}
            </View>
          </View>
        )}

        <ModalCommentOption
          toggleState={{
            isModalVisible,
            setModalVisible,
            toggleModal,
            isEdit,
            setIsEdit,
            isMe,
            isDeleteCommentLoading,
          }}
          fn={{handleCopyContent, handleDeleteComment}}
        />
      </View>
    )
  );
};

export default Comment;
