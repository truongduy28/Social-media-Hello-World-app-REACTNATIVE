/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import {TouchableOpacity} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import axios from 'axios';
import {SERVER_URL} from '@env';
import {useEffect} from 'react';
import {useAuthentication} from '../context/authContext';
import {ScrollView} from 'react-native';
import {Image} from 'react-native';
import SavedItem from '../components/Setting/SavedIFeed/SavedItem';
import Nodata from '../components/Status/Nodata';

const StoredPostScreen = () => {
  const {auth} = useAuthentication();
  const [isLoading, setisLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getSavedItems = async () => {
      const {data} = await axios.get(
        `${SERVER_URL}/posts/get-archived-post/${auth.userId}`,
      );
      setItems(data.archivedPosts);
    };
    getSavedItems();
  }, []);

  // console.log(items);

  return (
    <View style={{flex: 1, backgroundColor: Colors.lightPrimary}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}>
        <Text style={{fontSize: 20, color: Colors.text, fontWeight: 700}}>
          Saved Items
        </Text>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
          <Text style={{color: Colors.blueFacebook, fontSize: 18}}>All</Text>
          <IconIonicons
            name="caret-down"
            color={Colors.blueFacebook}
            size={15}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{gap: 10}}>
        {items.length !== 0 ? (
          items.map(item => (
            <SavedItem
              item={item}
              key={item._id}
              author={auth.userId}
              parentState={{items, setItems}}
            />
          ))
        ) : (
          <View style={{height: 400, width: '100%'}}>
            <Nodata />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default StoredPostScreen;
