import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
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

//

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = email => {
    setEmail(email);
  };

  const handlePasswordChange = password => {
    setPassword(password);
  };

  const handleSubmit = () => {
    // handle login logic here
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.textXLWelcomeContainer}>Create account</Text>
            <Text style={styles.textWelcomeContainers}>
              Welcome back you've been missed!
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <AppTextInput placeholder="Full name" />

            <AppTextInput placeholder="Email" />
            <AppTextInput placeholder="Password" />
            <AppTextInput placeholder="Re-enter your password" />
          </View>

          {/* <View>
          <Text style={styles.textSForgotPassword}>Forgot your password ?</Text>
        </View> */}

          <TouchableOpacity
            style={styles.btnSignInContainer}
            onPress={() => navigation.navigate('Main')}>
            <Text style={styles.txtLSignIn}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => navigate('Register')}
            style={styles.viewCreateNewAcc}>
            <Text style={styles.txtLCreateNewAcc}>
              You already have an account?
              {
                <Text
                  style={{color: Colors.primary}}
                  onPress={() => navigation.navigate('Login')}>
                  Login now!
                </Text>
              }
            </Text>
          </TouchableOpacity>

          <View style={styles.viewOrContinue}>
            <Text style={styles.txtOrContinue}>Or continue with</Text>

            <View
              style={{
                marginTop: Spacing,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}>
                <Icon
                  name="logo-apple"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}>
                <Icon
                  name="logo-google"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}>
                <Icon
                  name="logo-facebook"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
  },
  textWelcomeContainers: {
    fontFamily: Font['poppins-semiBold'],
    fontSize: FontSize.large,
    maxWidth: '60%',
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
    marginVertical: Spacing * 3,
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
  },
  viewCreateNewAcc: {
    padding: Spacing,
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
