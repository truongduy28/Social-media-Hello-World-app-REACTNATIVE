import React from 'react';
import Toast from 'react-native-toast-message';
import {AuthenticationProvider} from './src/context/authContext';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  Main,
  LiveScreen,
  WalkthroughScreen,
  PolicyScreen,
  StoredPostScreen,
  WeatherScreen,
  AlbumScreen,
  ReportScreen,
  FocusMedia,
  DashboardScreen,
  SearchScreen,
  MessengerScreen,
  HostLiveScreen,
  WatchLiveScreen,
  FeedScreen,
} from './src/screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <AuthenticationProvider>
        <NavigationContainer>
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
            <Stack.Screen
              name="Feed"
              component={FeedScreen}
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
