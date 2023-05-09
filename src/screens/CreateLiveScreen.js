import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AvatarComponent from './../components/Material/AvatarComponent';
import {useAuthentication} from '../context/authContext';
import Colors from '../constants/Colors';
import LottieView from 'lottie-react-native';
import {showToast} from './../utils/toastShow';
import {SERVER_URL, ZEROCLOUD_APPSIGN} from '@env';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

// console.log(ZEROCLOUD_APPSIGN);

const CreateLiveScreen = () => {
  const {auth} = useAuthentication();
  const [data, setData] = useState({
    content: '',
    streamedBy: auth.userId,
  });

  const navigation = useNavigation();

  const handleCreateLive = async () => {
    if (!data.content) {
      showToast('error', 'Oops!', 'Description is required!!!');
      return;
    }
    try {
      const res = await axios.post(
        SERVER_URL + '/live-stream/create-live',
        data,
      );
      console.log(res.data);
      if (res.status === 201) {
        console.log(res.data);
        navigation.navigate('Host-live', {
          userID: res.data.streamedBy._id,
          userName: res.data.streamedBy.name,
          liveID: res.data.roomId.toString(),
          liveInfo: {
            _id: res.data._id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <AvatarComponent uri={auth.info.image} />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.name}>{auth.info.name}</Text>
              <Text style={styles.status}>streaming now !!!</Text>
            </View>

            <LottieView
              source={require('../assets/json/135841-rec-animation.json')}
              autoPlay
              loop
              style={{width: 50}}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>
              Description for live stream
            </Text>
            <TextInput
              placeholder="Enter description for live stream... "
              placeholderTextColor="#eee"
              multiline
              style={styles.descriptionInput}
              onChangeText={text => setData({...data, content: text})}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCreateLive()}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    elevation: 12,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
  },
  content: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.text,
    width: '90%',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarContainer: {
    width: 50,
    height: 50,
  },
  name: {
    color: Colors.lightPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    color: Colors.lightPrimary,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  descriptionTitle: {
    color: Colors.lightPrimary,
    fontSize: 17,
    marginBottom: 10,
  },
  descriptionInput: {
    color: Colors.lightPrimary,
    fontSize: 16,
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 150,
    paddingHorizontal: 10,
    gap: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.redHeart,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.lightPrimary,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default CreateLiveScreen;
