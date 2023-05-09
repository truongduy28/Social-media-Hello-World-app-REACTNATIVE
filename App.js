import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

// import Library
import Toast from 'react-native-toast-message';
import {
  AuthenticationProvider,
  useAuthentication,
} from './src/context/authContext';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

// import Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Main from './src/screens/Main';
import Examples from './src/screens/B';
import WalkthroughScreen from './src/screens/WalkthroughScreen';
import PolicyScreen from './src/screens/PolicyScreen';
import StoredPostScreen from './src/screens/StoredPostScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import AlbumScreen from './src/screens/AlbumScreen';
import ReportScreen from './src/screens/ReportScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import FocusMedia from './src/screens/FocusMedia';
import DashboardScreen from './src/screens/DashboardScreen';
import SearchScreen from './src/screens/SearchScreen';
import MessengerScreen from './src/screens/MessengerScreen';
import LiveScreen from './src/screens/LiveScreen';
import HostLiveScreen from './src/screens/HostLiveScreen';
import WatchLiveScreen from './src/screens/WatchLiveScreen';

const Stack = createStackNavigator();

const App = () => {
  // console.log(isLogedIn);
  return (
    <>
      <AuthenticationProvider>
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName={isLoaagedIn ? 'Main' : 'Login'}> */}
          <Stack.Navigator
            // initialRouteName="Host-live"
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
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Messenger"
              component={MessengerScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Live"
              component={LiveScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Host-live"
              component={HostLiveScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Watch-live"
              component={WatchLiveScreen}
              options={{
                headerShown: false,
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
