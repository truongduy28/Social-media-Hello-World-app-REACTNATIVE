/* eslint-disable react/react-in-jsx-scope */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CreateLiveScreen from '../../../screens/CreateLiveScreen';
import {Text} from 'react-native';
import Colors from '../../../constants/Colors';
import BrowserLiveScreen from '../../../screens/BrowserLiveScreen';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {color: Colors.lightPrimary},
        tabBarStyle: {backgroundColor: Colors.semiDark},
        tabBarIndicatorStyle: {backgroundColor: Colors.redHeart},
      }}>
      <Tab.Screen name="Browser-live" component={BrowserLiveScreen} />
      <Tab.Screen name="Create-live" component={CreateLiveScreen} />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
