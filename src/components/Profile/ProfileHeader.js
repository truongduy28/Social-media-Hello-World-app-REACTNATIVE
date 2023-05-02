/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';
import FontSize from '../../constants/FontSize';
import AvatarComponent from '../Material/AvatarComponent';
import LottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native';
import {Button} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import ModalProfileOption from './ModalProfileOption';

const ProfileHeader = ({tabState, profile, auth, isMe, fn}) => {
  const navigation = useNavigation();
  const {tab, setTab} = tabState;
  const {handleReport} = fn;
  const TAB_HANDLE = ['Posts', 'Followers', 'Followings', 'About'];

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{backgroundColor: Colors.lightPrimary, paddingBottom: 15}}>
      <View
        style={{
          height: 200,
          width: '100%',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          overflow: 'hidden',
          backgroundColor: 'red',
        }}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../../assets/images/photo-1620121692029-d088224ddc74.jpg')}
        />
        {/* <LottieView
          source={require('../../assets/json/93539-background.json')}
          autoPlay
          loop
          style={{width: '100%'}}
        /> */}
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          paddingTop: 60,
        }}>
        <View
          style={{
            width: 135,
            height: 135,
            position: 'absolute',
            top: '-50%',
            transform: [{translateY: -50}],
            backgroundColor: Colors.lightPrimary,
            borderRadius: 100,
            padding: 3.5,
          }}>
          <AvatarComponent uri={profile.image} size="large" color="white" />
        </View>
        <Text
          style={{
            color: Colors.text,
            fontSize: FontSize.large,
            fontFamily: 'OpenSans-Regular',
            fontWeight: '600',
          }}>
          {profile.name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 5,
            fontSize: 15,
            color: Colors.semiDark,
          }}>
          {profile.follower.length} Follower | {profile.following.length}{' '}
          Following
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 15,
          gap: 5,
        }}>
        {isMe ? (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.gray,
              gap: 10,
              paddingHorizontal: 30,
              paddingVertical: 7,
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('Edit-profile')}>
            <IconFontAwesome5 name="pen" color={Colors.semiDark} size={15} />
            <Text style={{color: Colors.semiDark, fontSize: FontSize.medium}}>
              Edit profile
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.blueFacebook,
              gap: 10,
              paddingHorizontal: 30,
              paddingVertical: 7,
              borderRadius: 5,
            }}>
            <IconFeather
              name="user-plus"
              color={Colors.lightPrimary}
              size={15}
            />
            <Text
              style={{color: Colors.lightPrimary, fontSize: FontSize.medium}}>
              Follow
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.gray,
            gap: 10,
            padding: 5,
            borderRadius: 5,
          }}
          onPress={() => setModalVisible(true)}>
          <IconIonicons
            name="ios-menu-outline"
            color={Colors.semiDark}
            size={25}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          gap: 10,
          paddingHorizontal: 20,
          justifyContent: 'center',
        }}>
        {TAB_HANDLE.map((t, index) => (
          <TouchableOpacity
            onPress={() => {
              setTab(t);
            }}
            key={index}>
            <View
              style={{
                backgroundColor: t === tab ? '#eaf2ff' : 'transparent',
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: t === tab ? Colors.blueFacebook : Colors.text,
                  fontWeight: 'bold',
                }}>
                {t}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <ModalProfileOption
        toggleState={{isModalVisible, setModalVisible, toggleModal}}
        fn={{handleReport}}
      />
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});
