/* eslint-disable radix */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, {
  HOST_DEFAULT_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import ZegoUIKitSignalingPlugin from '@zegocloud/zego-uikit-signaling-plugin-rn';
import {ZEROCLOUD_APPID, ZEROCLOUD_APPSIGN} from '@env';
import {SERVER_URL} from '@env';
import axios from 'axios';

export default function HostLiveScreen(props) {
  const {route} = props;
  const {params} = route;
  const {userID, userName, liveID, liveInfo} = params;
  // const userID = '81abc287';
  // const userName = 'duy';
  // const liveID = '72hshytsg11';
  const offLiveStream = async () => {
    try {
      const res = await axios.put(
        SERVER_URL + '/live-stream/offline-live/' + liveInfo._id,
      );
      if (res.status === 200) props.navigation.navigate('Live');
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={parseInt(ZEROCLOUD_APPID)}
        appSign={ZEROCLOUD_APPSIGN}
        userID={userID}
        userName={userName}
        liveID={liveID}
        config={{
          ...HOST_DEFAULT_CONFIG,
          onLeaveLiveStreaming: () => {
            offLiveStream();
          },
        }}
        plugins={[ZegoUIKitSignalingPlugin]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  avView: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
  },
  ctrlBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 50,
    width: '100%',
    height: 50,
    zIndex: 2,
  },
  ctrlBtn: {
    flex: 1,
    width: 48,
    height: 48,
    marginLeft: 37 / 2,
    position: 'absolute',
  },
});
