/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import axios from 'axios';
import {SERVER_URL} from '@env';
import Colors from '../constants/Colors';
import LiveItem from '../components/LiveStream/LiveItem';

const BrowserLiveScreen = () => {
  const [liveStreams, setLiveStreams] = useState([]);

  useEffect(() => {
    const getAvaribleLiveStreams = async () => {
      try {
        const {data} = await axios.get(SERVER_URL + '/live-stream/streams');
        setLiveStreams(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAvaribleLiveStreams();
  }, []);
  return (
    <View style={{backgroundColor: '#1e1e1e', flex: 1}}>
      <Text>BrowserLiveScreen</Text>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            paddingHorizontal: 10,
          }}>
          {liveStreams.length !== 0 ? (
            liveStreams.map(live => <LiveItem key={live._id} live={live} />)
          ) : (
            <Text style={{fontSize: 30, color: Colors.lightPrimary}}>
              k co live
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BrowserLiveScreen;
