/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageItem from '../components/Setting/Album/ImageItem';
import Colors from '../constants/Colors';
import {SERVER_URL} from '@env';
import axios from 'axios';
import AlbumLoader from '../components/Loader/AlbumLoader';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {sortImages} from '../utils/common';
import ModalSortAlbum from '../components/Setting/Album/ModalSortAlbum';
import Nodata from '../components/Status/Nodata';

const AlbumScreen = ({route}) => {
  const {userId} = route.params;
  const [album, setAlbum] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState('newest');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const getAlbumOfUser = async () => {
      setIsLoading(true);
      try {
        const {data} = await axios.get(`${SERVER_URL}/posts/album/${userId}`);
        setAlbum(sortImages(data, sort));
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getAlbumOfUser();
  }, [userId, sort]);

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
          Story
        </Text>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', gap: 3}}
          onPress={() => setModalVisible(true)}>
          <Text
            style={{
              color: Colors.blueFacebook,
              fontSize: 18,
              textTransform: 'capitalize',
            }}>
            {sort}
          </Text>
          <IconIonicons
            name="caret-down"
            color={Colors.blueFacebook}
            size={15}
          />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <AlbumLoader />
      ) : album.length !== 0 ? (
        <ScrollView>
          {album.map((media, index) => (
            <ImageItem key={index} media={media} />
          ))}
        </ScrollView>
      ) : (
        <Nodata />
      )}
      <ModalSortAlbum
        toggleState={{isModalVisible, setModalVisible, toggleModal}}
        fn={{setSort}}
      />
    </View>
  );
};

export default AlbumScreen;
