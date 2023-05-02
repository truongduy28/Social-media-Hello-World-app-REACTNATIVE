/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

//import libary
import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import asset sources
import AppTextInput from '../components/AppTextInput';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import DEVICE from '../constants/Layout';
import {useAuthentication} from '../context/authContext';
import AuthLoader from '../components/Loader/AuthLoader';
import LottieView from 'lottie-react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loginFn, isLoading} = useAuthentication();

  const handleEmailChange = email => {
    setEmail(email);
  };

  const handlePasswordChange = password => {
    setPassword(password);
  };

  const handleSubmit = async () => {
    const log = await loginFn(email, password);
    if (!log?.accessToken) return;
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.text} />

      {isLoading && <AuthLoader />}
      {/* <AuthLoader /> */}
      <View
        style={{
          position: 'relative',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <LottieView
          source={require('../assets/json/1278-Login.json')}
          style={{
            height: '110%',
            position: 'absolute',
            top: -130,
          }}
          autoPlay
          loop
        />
        <View
          style={{
            backgroundColor: Colors.lightPrimary,
            position: 'absolute',
            zIndex: 2,
            width: '100%',
            padding: 20,
            borderRadius: 15,
            bottom: -20,
          }}>
          <View>
            <Text style={styles.textXLWelcomeContainer}> Login here </Text>
            <Text style={styles.textWelcomeContainers}>
              Welcome back you've been missed!
            </Text>
            <AppTextInput
              placeholder="Email"
              onChangeText={text => handleEmailChange(text)}
              defaultValue={email}
            />
            <AppTextInput
              placeholder="Password"
              onChangeText={text => handlePasswordChange(text)}
              defaultValue={password}
            />
            <Text
              style={{
                fontFamily: Font['poppins-semiBold'],
                fontSize: FontSize.small,
                color: Colors.primary,
                alignSelf: 'flex-end',
              }}>
              Forgot your password ?
            </Text>
            <TouchableOpacity
              style={styles.btnSignInContainer}
              onPress={handleSubmit}>
              <Text style={styles.txtLSignIn}> Sign in </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={styles.viewCreateNewAcc}>
              <Text style={styles.txtLCreateNewAcc}> Create new account </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#16161670',
            zIndex: 1,
          }}
        />
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: Spacing * 2,
    minHeight: DEVICE.height,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  textXLWelcomeContainer: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: Font['poppins-bold'],
    marginVertical: Spacing * 3,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textWelcomeContainers: {
    fontFamily: Font['poppins-semiBold'],
    fontSize: FontSize.large,
    // maxWidth: '60%',
    paddingHorizontal: '20%',
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: Spacing * 3,
  },
  textSForgotPassword: {
    fontFamily: Font['poppins-semiBold'],
    fontSize: FontSize.small,
    color: Colors.primary,
    alignSelf: 'flex-end',
  },
  btnSignInContainer: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 2,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  txtLSignIn: {
    fontFamily: Font['poppins-bold'],
    color: Colors.onPrimary,
    textAlign: 'center',
    fontSize: FontSize.large,
    fontWeight: 'bold',
  },
  viewCreateNewAcc: {
    padding: Spacing,
    marginBottom: 30,
  },
  txtLCreateNewAcc: {
    fontFamily: Font['poppins-semiBold'],
    color: Colors.text,
    textAlign: 'center',
    fontSize: FontSize.small,
  },
  viewOrContinue: {
    marginVertical: Spacing * 3,
  },
  txtOrContinue: {
    fontFamily: Font['poppins-semiBold'],
    color: Colors.primary,
    textAlign: 'center',
    fontSize: FontSize.small,
  },
});
