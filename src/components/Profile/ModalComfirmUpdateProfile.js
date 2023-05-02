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
import LottieView from 'lottie-react-native';
import {ActivityIndicator} from 'react-native';

const ModalComfirmUpdateProfile = ({toggleState, profileState}) => {
  const {isModalVisible, toggleModal, setModalVisible} = toggleState;
  const {profile, setProfile, handleUpdateProfile, auth, isLoading} =
    profileState;
  return (
    <View>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        // swipeDirection="down"
        onSwipeComplete={toggleModal}
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
          <View style={{marginTop: 10}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: Colors.gray,
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}>
              <Text style={{fontSize: 17, color: Colors.text}}>
                Authentication Required
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <LottieView
                source={require('../../assets/json/88252-data-security.json')}
                loop
                autoPlay
                style={{
                  width: '70%',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 20,
                borderColor: Colors.gray,
                borderBottomWidth: 1,
              }}>
              <Text>ACCOUNT</Text>
              <Text
                style={{textTransform: 'uppercase', color: Colors.semiDark}}>
                {auth.info.email}
              </Text>
            </View>
            <View>
              <Text style={styles.labelText}>Current password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter current password..."
                onChangeText={text =>
                  setProfile({...profile, currentPassword: text})
                }
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.blueFacebook,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  marginTop: 60,
                  borderRadius: 10,
                }}
                onPress={() => handleUpdateProfile()}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: Colors.lightPrimary,
                  }}>
                  Comfirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isLoading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: '#e5e7eb80',
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={Colors.text} />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default ModalComfirmUpdateProfile;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    // height: 'auto',
  },
  modalContent: {
    backgroundColor: Colors.lightPrimary,
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
