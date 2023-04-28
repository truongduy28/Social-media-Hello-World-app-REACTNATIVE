/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import IconIonicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';
import {TouchableOpacity} from 'react-native';
import {selectOneFile, uploadToFirebase} from '../../utils/common';
import {Image} from 'react-native';

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {showToast} from './../../utils/toastShow';
import {SERVER_URL} from '@env';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';

const CreateComment = ({auth, commentState}) => {
  const INIT_COMMENT = {
    textComment: '',
    imageComment: '',
    postedBy: auth.userId,
  };
  const {postId, currentPost, setCurrentPost} = commentState;
  const [mediaFile, setMediaFile] = useState(null);
  const [isLoadingAddComment, setIsLoadingAddComment] = useState(false);
  const [content, setContent] = useState(INIT_COMMENT);

  const handleAddComment = async () => {
    setIsLoadingAddComment(true);
    if (!content?.textComment) {
      showToast('error', 'Oops!!!', 'Please enter a comment content');
      return;
    }
    try {
      if (mediaFile) {
        const imageUrl = await uploadToFirebase(mediaFile);
        content.imageComment = imageUrl;
      }
      const {data} = await axios.put(`${SERVER_URL}/posts/add-comment`, {
        postId,
        comment: content.textComment,
        image: content.imageComment,
        postedBy: content.postedBy,
      });

      setCurrentPost({...currentPost, comments: data.post.comments});
      setIsLoadingAddComment(false);
      setContent(INIT_COMMENT);
      setMediaFile(null);
    } catch (error) {
      showToast('error', 'error', error.msg);
      setIsLoadingAddComment(false);
    }
  };

  return (
    <View>
      <View
        style={{
          borderTopWidth: 0.5,
          borderColor: Colors.darkText,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: 20,
          paddingVertical: 5,
          gap: 10,
        }}>
        <TouchableOpacity
          onPress={() => selectOneFile(setMediaFile)}
          style={{marginBottom: 5}}>
          <IconMaterialCommunityIcons name="camera-outline" size={30} />
        </TouchableOpacity>
        <View style={{flex: 1, gap: 5}}>
          {mediaFile && (
            <View
              style={{
                position: 'relative',
                width: 200,
                height: 100,
                marginLeft: 10,
              }}>
              <Image
                source={{
                  uri: mediaFile.uri,
                }}
                style={{width: '100%', height: '100%', borderRadius: 15}}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  backgroundColor: Colors.gray,
                  width: 35,
                  height: 35,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 5,
                  borderColor: Colors.lightPrimary,
                }}
                onPress={() => setMediaFile(null)}>
                <IconFontAwesome5 name="times" size={18} />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              backgroundColor: Colors.grayBackground,
              borderRadius: 30,
              paddingHorizontal: 5,
            }}>
            <TextInput
              placeholder="Write a public comment..."
              style={{fontSize: 16, paddingHorizontal: 15}}
              onChangeText={text => setContent({...content, textComment: text})}
              value={content.textComment}
              editable={isLoadingAddComment ? false : true}
            />
          </View>
        </View>

        {content.textComment ? (
          isLoadingAddComment ? (
            <ActivityIndicator
              size={'large'}
              color={Colors.semiDark}
              style={{marginBottom: 5}}
            />
          ) : (
            <TouchableOpacity
              onPress={() => handleAddComment()}
              style={{marginBottom: 10}}>
              <IconIonicons name="send" size={30} color={Colors.blueFacebook} />
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </View>
  );
};

export default CreateComment;
