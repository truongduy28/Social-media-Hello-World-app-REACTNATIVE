/* eslint-disable curly */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconOcticons from 'react-native-vector-icons/Octicons';

import AvatarComponent from '../Material/AvatarComponent';
import FontSize from '../../constants/FontSize';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {showToast} from '../../utils/toastShow';
import axios from 'axios';
import {SERVER_URL} from '@env';
import CreateFeedLoader from '../Loader/CreateFeedLoader';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native';
import {
  checkMediaType,
  selectOneFile,
  uploadToFirebase,
} from '../../utils/common';
import {useAuthentication} from '../../context/authContext';

const ModalEditFeed = ({toggleState, postState}) => {
  const {auth} = useAuthentication();
  const {isModalEditVisible, setIsModalEditVisible, toggleModalEdit} =
    toggleState;
  const {currentPost, setCurrentPost} = postState;
  const [mediaFile, setMediaFile] = useState(null);
  const [postEdit, setPostEdit] = useState(currentPost);

  //   const {allPost, setAllPost} = state;
  const handleRemoveMediaFile = () => {
    if (mediaFile) {
      setMediaFile(null);
      return;
    }
    setPostEdit({
      ...postEdit,
      image: {
        url: '',
        isVideo: false,
      },
    });
  };

  const handleSaveFeed = async () => {
    if (!postEdit.content) {
      // toggleModal();
      showToast('error', 'Error', 'Feed content not null!');
      return;
    }
    try {
      if (mediaFile) {
        if (checkMediaType(mediaFile.type)) {
          postEdit.image.isVideo = true;
        }
        const imageUrl = await uploadToFirebase(mediaFile);
        postEdit.image.url = imageUrl;
      }
      const {data} = await axios.patch(
        `${SERVER_URL}/posts/${postEdit?._id}`,
        postEdit,
      );
      // console.log(data);
      setCurrentPost({
        ...currentPost,
        content: data.post.content,
        image: data.post.image,
      });

      setPostEdit(data.post);
      showToast('success', 'successfully', 'Update post successfully!');
      setIsModalEditVisible(false);
    } catch (error) {
      setIsModalEditVisible(false);
    }
  };

  return (
    <View>
      <Modal
        onBackdropPress={() => setIsModalEditVisible(false)}
        onBackButtonPress={() => setIsModalEditVisible(false)}
        isVisible={isModalEditVisible}
        // swipeDirection="down"
        onSwipeComplete={toggleModalEdit}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        <View
          style={[
            styles.modalContent,
            {position: 'relative', overflow: 'hidden'},
          ]}>
          <View style={styles.center}>
            <View style={styles.barIcon} />
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <View style={{width: 65, height: 65}}>
                <AvatarComponent uri={auth.info.image} />
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: 19,
                    fontFamily: 'OpenSans-Regular',
                    fontWeight: '700',
                    color: Colors.semiDark,
                  }}>
                  {auth.info.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: Colors.darkText,
                    borderWidth: 1,
                    borderRadius: 3,
                    justifyContent: 'space-between',
                    gap: 5,
                    paddingHorizontal: 4,
                    maxWidth: 80,
                    marginTop: 2,
                  }}>
                  <IconIonicons name="earth" color={Colors.text} />
                  <Text style={{color: Colors.darkText}}>Public</Text>
                  <IconOcticons name="triangle-down" />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: Colors.blueFacebook,
                    gap: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                    borderRadius: 5,
                  }}
                  onPress={() => handleSaveFeed()}>
                  <Text
                    style={{
                      color: Colors.lightPrimary,
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                paddingVertical: 8,
              }}>
              <TextInput
                placeholder="What's on your mind?"
                style={{
                  borderWidth: 0.5,
                  borderColor: Colors.darkText,
                  maxHeight: 150,
                  minHeight: 80,
                  textAlignVertical: 'top',
                  borderRadius: 5,
                  fontSize: FontSize.medium,
                }}
                multiline
                onChangeText={text => setPostEdit({...postEdit, content: text})}
                value={postEdit.content}
              />
            </View>
            <View
              style={{
                padding: 5,
                borderWidth: 0.5,
                borderColor: Colors.darkText,
                borderRadius: 5,
              }}>
              <View
                style={{
                  backgroundColor: Colors.gray,
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 250,
                  borderRadius: 4,
                }}>
                {mediaFile || postEdit.image.url ? (
                  <Image
                    source={{
                      uri: mediaFile ? mediaFile.uri : postEdit.image.url,
                    }}
                    style={{width: '100%', height: '100%'}}
                  />
                ) : (
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
                        width: 80,
                        height: 80,
                        backgroundColor: '#dee0e4',
                      }}>
                      <IconMaterialIcons
                        name="add-photo-alternate"
                        size={40}
                        color={Colors.darkText}
                      />
                    </View>
                    <Text
                      style={{
                        color: Colors.darkText,
                        fontSize: FontSize.medium,
                      }}>
                      Add Video/Photo
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    borderRadius: 100,
                    backgroundColor: '#dee0e4',
                    height: 25,
                    width: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => handleRemoveMediaFile()}>
                  <IconFontAwesome5
                    name="times"
                    color={Colors.darkText}
                    size={15}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalEditFeed;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.lightPrimary,
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: '70%',
    paddingBottom: 20,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    // height: '100%',
    // backgroundColor: '#bbb',
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
  },
  text: {
    color: '#bbb',
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
  },
});
