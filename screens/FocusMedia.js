/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React, {useLayoutEffect} from 'react';
import Colors from '../constants/Colors';
import {Button} from 'react-native';
import DownloadButton from '../components/Material/DownloadButton';

const FocusMedia = ({route, navigation}) => {
  const {user, uri, isVideo} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({title: `${user}'s ${isVideo ? 'Video' : 'Photo'}`});
  }, [navigation]);

  useLayoutEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => <DownloadButton uri={uri} />,
    });
  }, [navigation]);

  return isVideo ? null : (
    <View style={{flex: 1, backgroundColor: Colors.grayBackground}}>
      <Image
        style={{
          width: '100%',
          resizeMode: 'contain',
          height: '100%',
          objectFit: 'scale-down',
        }}
        source={{uri}}
      />
    </View>
  );
};

export default FocusMedia;
