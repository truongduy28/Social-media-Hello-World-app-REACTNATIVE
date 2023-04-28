/* eslint-disable curly */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import ActivityIndicatorLoader from './../Loader/ActivityIndicatorLoader';

const ModalFeedOption = ({toggleState, fn}) => {
  const {
    isModalOptionVisible,
    setIsModalOptionVisible,
    toggleModalOption,
    isEdit,
    setIsEdit,
    isMe,
    isModalEditVisible,
    setIsModalEditVisible,
    toggleModalEdit,
    isLoadingShareFeed,
    isShared,
    isLoadingStoreFeed,
  } = toggleState;

  const {
    handleCopyContent,
    handleSharePost,
    handleDeletePost,
    handleArchivePost,
    handleReportFeed,
  } = fn;

  const handleEditOption = () => {
    setIsModalEditVisible(true);
    setIsModalOptionVisible(false);
  };

  return (
    <View>
      <Modal
        onBackdropPress={() => setIsModalOptionVisible(false)}
        onBackButtonPress={() => setIsModalOptionVisible(false)}
        isVisible={isModalOptionVisible}
        // swipeDirection="down"
        onSwipeComplete={toggleModalOption}
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
          <View>
            {!isShared && (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: Colors.darkText,
                  borderBottomWidth: 0.5,
                  paddingVertical: 15,
                }}
                onPress={() => handleSharePost()}>
                <Text style={{color: Colors.blueFacebook, fontSize: 17}}>
                  Share feed to wall
                </Text>
              </TouchableOpacity>
            )}

            {!isShared && (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: Colors.darkText,
                  borderBottomWidth: 0.5,
                  paddingVertical: 15,
                }}
                onPress={() => handleArchivePost()}>
                <Text style={{color: Colors.blueFacebook, fontSize: 17}}>
                  Save feed to store
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: Colors.darkText,
                borderBottomWidth: 0.5,
                paddingVertical: 15,
              }}
              onPress={() => handleCopyContent()}>
              <Text style={{color: Colors.blueFacebook, fontSize: 17}}>
                Copy content
              </Text>
            </TouchableOpacity>
            {isMe
              ? !isShared && (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomColor: Colors.darkText,
                      borderBottomWidth: 0.5,
                      paddingVertical: 15,
                    }}
                    onPress={() => handleEditOption()}>
                    <Text style={{color: Colors.blueFacebook, fontSize: 17}}>
                      Edit feed
                    </Text>
                  </TouchableOpacity>
                )
              : null}

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: Colors.darkText,
                borderBottomWidth: 0.5,
                paddingVertical: 15,
              }}
              onPress={() => handleReportFeed()}>
              <Text style={{color: Colors.blueFacebook, fontSize: 17}}>
                Report feed
              </Text>
            </TouchableOpacity>

            {isMe && (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: Colors.darkText,
                  borderBottomWidth: 0.5,
                  paddingVertical: 15,
                }}
                onPress={() => handleDeletePost()}>
                <Text style={{color: Colors.redHeart, fontSize: 17}}>
                  Delete
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {isLoadingShareFeed && <ActivityIndicatorLoader />}
          {isLoadingStoreFeed && <ActivityIndicatorLoader />}
        </View>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginBottom: 10,
            backgroundColor: Colors.lightPrimary,
            // paddingTop: 12,
            paddingHorizontal: 12,
            // borderTopRightRadius: 20,
            // borderTopLeftRadius: 20,
            borderRadius: 20,
            paddingBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: Colors.darkText,
            borderBottomWidth: 0.5,
            paddingVertical: 15,
          }}
          onPress={() => setIsModalOptionVisible(false)}>
          <Text style={{color: Colors.blueFacebook, fontSize: 17}}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ModalFeedOption;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    // height: 'auto',
  },
  modalContent: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: Colors.lightPrimary,
    // paddingTop: 12,
    paddingHorizontal: 12,
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    borderRadius: 20,

    // paddingBottom: 20,
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
  input: {
    borderColor: Colors.gray,
    borderBottomWidth: 1,
    backgroundColor: Colors.lightPrimary,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  labelText: {
    marginTop: 15,
    marginBottom: -3,
    color: Colors.semiDark,
    fontSize: 15,
  },
});
