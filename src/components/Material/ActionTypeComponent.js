/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontisto from 'react-native-vector-icons/Fontisto';

const ActionTypeComponent = ({type}) => {
  let gradientColors, iconName;

  switch (type) {
    case 'like':
      gradientColors = ['#fd6582', '#f73a59', '#e71d3d'];
      iconName = 'heart-sharp';
      break;
    case 'comment':
      gradientColors = ['#74e68e', '#3fca65', '#17b342'];
      iconName = 'comment';
      break;
    case 'follow':
      gradientColors = ['#35b2f8', '#128bf1', '#1b60d9'];
      iconName = 'user';
      break;
    case 'post':
      gradientColors = ['#35b2f8', '#128bf1', '#1b60d9'];
      iconName = 'newsletter';
      break;
    case 'share':
      gradientColors = ['#f27bc4', '#eb71c8', '#a260d1'];
      iconName = 'share-a';
      break;
    default:
      gradientColors = ['#f67436', '#fe662a', '#e64d29'];
      iconName = 'ios-settings';
  }

  return (
    <LinearGradient
      style={{
        backgroundColor: Colors.redHeart,
        width: 27,
        height: 27,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -5,
        right: -3,
      }}
      colors={gradientColors}>
      {iconName === 'heart-sharp' && (
        <IconIonicons
          name={iconName}
          size={17}
          color={Colors.lightPrimary}
          style={{marginTop: 1}}
        />
      )}
      {iconName === 'comment' && (
        <IconMaterialCommunityIcons
          name={iconName}
          size={17}
          color={Colors.lightPrimary}
          style={{marginTop: 1}}
        />
      )}
      {iconName === 'user' && (
        <IconFontAwesome
          name={iconName}
          size={17}
          color={Colors.lightPrimary}
          style={{marginTop: 1}}
        />
      )}
      {iconName === 'newsletter' && (
        <IconEntypo
          name={iconName}
          size={17}
          color={Colors.lightPrimary}
          style={{marginTop: 1}}
        />
      )}
      {iconName === 'share-a' && (
        <IconFontisto
          name={iconName}
          size={15}
          color={Colors.lightPrimary}
          style={{marginTop: 1}}
        />
      )}
      {iconName === 'ios-settings' && (
        <IconIonicons
          name={iconName}
          size={15}
          color={Colors.lightPrimary}
          style={{marginTop: 1}}
        />
      )}
    </LinearGradient>
  );
};

export default ActionTypeComponent;
