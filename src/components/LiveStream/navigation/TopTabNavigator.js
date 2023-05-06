import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CreateLiveScreen from '../../../screens/CreateLiveScreen';
import {Text} from 'react-native';

const Tab = createMaterialTopTabNavigator();
const ViewContainer = () => {
  return <Text>ViewContainer</Text>;
};
const TopTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Create-live" component={CreateLiveScreen} />
      <Tab.Screen name="Live-container" component={ViewContainer} />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
