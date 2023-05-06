import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';

const MessengerScreen = ({navigation}) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <LottieView
          source={require('../assets/json/30786-online-chat.json')}
          style={styles.animation}
          autoPlay
          loop
        />
        <Text style={styles.text}>
          Messenger is currently only available on the website platform!!!
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.goBackButton]}
            onPress={handleGoBack}>
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.chatButton]}>
            <Text style={styles.buttonText}>Chat in Website</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default MessengerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  animation: {
    width: '100%',
  },
  text: {
    color: Colors.lightPrimary,
    fontSize: 25,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginHorizontal: 30,
    marginVertical: 35,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackButton: {
    backgroundColor: Colors.darkText,
  },
  chatButton: {
    backgroundColor: Colors.redHeart,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: Colors.lightPrimary,
  },
});
