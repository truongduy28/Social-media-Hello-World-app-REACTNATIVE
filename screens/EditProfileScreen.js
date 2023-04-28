/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AvatarComponent from './../components/Material/AvatarComponent';
import Colors from '../constants/Colors';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import axios from 'axios';
import {SERVER_URL} from '@env';
import {showToast} from './../utils/toastShow';
import {selectOneFile, uploadToFirebase} from '../utils/common';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActivityIndicatorLoader from './../components/Loader/ActivityIndicatorLoader';
import ModalComfirmUpdateProfile from './../components/Profile/ModalComfirmUpdateProfile';

const EditProfileScreen = ({route, navigation}) => {
  const {auth} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);
  const [profile, setProfile] = useState({
    name: auth.info.name,
    about: auth.info.about,
    city: auth.info.city,
    image: auth.info.image,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    id: auth.userId,
  });

  const handleUpdateProfile = async () => {
    // toggleModal();
    // console.log(profile);
    try {
      setIsLoading(true);
      if (mediaFile) {
        // console.log('type media ');
        const imageUrl = await uploadToFirebase(mediaFile);
        profile.image = imageUrl;
      }
      const {data} = await axios.put(
        `${SERVER_URL}/users/update-user`,
        profile,
      );
      showToast('success', 'Successfully updated', data.msg);
      setIsLoading(false);
      navigation.navigate('Profile');
    } catch (error) {
      setIsLoading(false);
      showToast('error', 'Oops!!!', error.response.data.msg);
      setModalVisible(false);
    }
  };

  // useEffect(() => {
  //   if (!mediaFile) return;
  //   auth.info.image = mediaFile.uri;
  // }, [mediaFile]);

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.lightPrimary,
        flex: 1,
        position: 'relative',
      }}>
      <View style={styles.section}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <View>
            <Text style={styles.text}>Profile Avatar</Text>
            <Text style={{fontStyle: 'italic', fontSize: 14}}>
              Pick a picture from your device
            </Text>
          </View>
          <TouchableOpacity onPress={() => selectOneFile(setMediaFile)}>
            <Text style={{color: Colors.blueFacebook}}>Change new avatar</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <View style={{width: 150, height: 150, position: 'relative'}}>
            <AvatarComponent
              uri={mediaFile ? mediaFile.uri : auth.info.image}
            />
            {mediaFile && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 3,
                  right: 3,
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
            )}
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Details</Text>
        <Text style={{fontStyle: 'italic', fontSize: 14}}>
          Infomations can be publiced expect password
        </Text>
        <View>
          <View>
            <Text style={styles.labelText}>Name of user</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name..."
              onChangeText={text => setProfile({...profile, name: text})}
              value={profile.name}
            />
          </View>
          <View>
            <Text style={styles.labelText}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter city..."
              onChangeText={text => setProfile({...profile, city: text})}
              value={profile.city || ''}
            />
          </View>
          <View>
            <Text style={styles.labelText}>About user</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter about..."
              onChangeText={text => setProfile({...profile, about: text})}
              value={profile.about || ''}
            />
          </View>
          <View>
            <Text style={styles.labelText}>New password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new password..."
              onChangeText={text => setProfile({...profile, newPassword: text})}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Re-enter new password</Text>
            <TextInput
              style={styles.input}
              placeholder="Re-enter new password..."
              onChangeText={text =>
                setProfile({...profile, confirmNewPassword: text})
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
                marginTop: 20,
                borderRadius: 10,
              }}
              onPress={() => toggleModal()}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: Colors.lightPrimary,
                }}>
                Update Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalComfirmUpdateProfile
        toggleState={{isModalVisible, setModalVisible, toggleModal}}
        profileState={{
          profile,
          setProfile,
          handleUpdateProfile,
          auth,
          isLoading,
        }}
      />
    </ScrollView>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 700,
  },
  section: {
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 20,
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
