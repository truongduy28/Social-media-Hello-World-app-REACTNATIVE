import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

// import Library
import Toast from 'react-native-toast-message';
import {AuthenticationProvider, useAuthentication} from './context/authContext';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

// import Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import Main from './screens/Main';
import Examples from './screens/B';
import WalkthroughScreen from './screens/WalkthroughScreen';
import PolicyScreen from './screens/PolicyScreen';
import StoredPostScreen from './screens/StoredPostScreen';
import WeatherScreen from './screens/WeatherScreen';
import AlbumScreen from './screens/AlbumScreen';
import ReportScreen from './screens/ReportScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import FocusMedia from './screens/FocusMedia';

const Stack = createStackNavigator();

const App = () => {
  // console.log(isLogedIn);
  return (
    <>
      <AuthenticationProvider>
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName={isLoaagedIn ? 'Main' : 'Login'}> */}
          <Stack.Navigator
            initialRouteName="Walkthrough"
            screenOptions={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen
              name="Walkthrough"
              component={WalkthroughScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="B"
              component={Examples}
              // options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen
              name="Policy"
              component={PolicyScreen}
              options={{
                headerTitleAlign: 'center',
                title: 'Terms and Policies',
              }}
            />
            <Stack.Screen
              name="Stored-post"
              component={StoredPostScreen}
              options={{
                headerTitleAlign: 'center',
                title: 'Saved Items',
              }}
            />
            <Stack.Screen
              name="Weather"
              component={WeatherScreen}
              options={{
                headerTitleAlign: 'center',
                // title: 'Saved Items',
              }}
            />
            <Stack.Screen
              name="Album"
              component={AlbumScreen}
              options={{
                headerTitleAlign: 'center',
                title: 'Your Album',
              }}
            />
            <Stack.Screen
              name="Report"
              component={ReportScreen}
              options={{
                headerTitleAlign: 'center',
                title: 'Your Report',
              }}
            />
            <Stack.Screen
              name="FocusMedia"
              component={FocusMedia}
              options={{
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthenticationProvider>
      <Toast />
    </>
  );
};

export default App;
