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
import Colors from '../../../constants/Colors';

const ModalSortAlbum = ({toggleState, fn}) => {
  const {isModalVisible, toggleModal, setModalVisible} = toggleState;
  const {setSort} = fn;

  const OPTION = [
    {name: 'newest', textColor: Colors.blueFacebook},
    {name: 'oldest', textColor: Colors.blueFacebook},
    {name: 'most favorite', textColor: Colors.blueFacebook},
    {name: 'most comments', textColor: Colors.blueFacebook},
  ];

  return (
    <View>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
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
          {OPTION.map(opt => (
            <TouchableOpacity
              key={opt.name}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: Colors.darkText,
                borderBottomWidth: 0.65,
                paddingVertical: 15,
              }}
              onPress={() => {
                setSort(opt.name);
                setModalVisible(false);
              }}>
              <Text
                style={{
                  color: opt.textColor,
                  fontSize: 17,
                  textTransform: 'capitalize',
                }}>
                {opt.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default ModalSortAlbum;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: Colors.lightPrimary,
    paddingHorizontal: 12,
    borderRadius: 20,
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
