/* eslint-disable curly */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';

const ModalProfileOption = ({toggleState, fn}) => {
  const {isModalVisible, toggleModal, setModalVisible} = toggleState;
  const {handleReport} = fn;

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
          <View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: Colors.darkText,
                borderBottomWidth: 0.5,
                paddingVertical: 15,
              }}>
              <Text style={{color: Colors.blueFacebook, fontSize: 17}}>
                View photo album
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: Colors.darkText,
                borderBottomWidth: 0.5,
                paddingVertical: 15,
              }}
              onPress={() => handleReport()}>
              <Text style={{color: Colors.blueFacebook, fontSize: 17}}>
                Find support or report
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalProfileOption;

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
