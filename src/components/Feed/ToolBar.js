/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppTextInput from '../AppTextInput';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import FontSize from '../../constants/FontSize';
import {useNavigation} from '@react-navigation/native';
import CreateFeedModal from './CreateFeedModal';

const ToolBar = ({auth, state}) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <View
        style={{
          padding: 10,
          flex: 1,
          backgroundColor: Colors.lightPrimary,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <View style={{width: 45, height: 45, overflow: 'hidden'}}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 50}}
            source={{uri: auth.info.image}}></Image>
        </View>
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => setModalVisible(true)}>
          <Text
            style={{
              fontSize: FontSize.medium,
            }}>
            What's on your mind?
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <IconIonicons name="images" size={26} color="#3db058" />
          </TouchableOpacity>
        </View>
      </View>
      <CreateFeedModal
        toggleState={{isModalVisible, setModalVisible, toggleModal}}
        auth={auth}
        state={state}
      />
    </>
  );
};

export default ToolBar;

const styles = StyleSheet.create({});
