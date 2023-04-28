/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import {useEffect} from 'react';
import {SERVER_URL} from '@env';
import axios from 'axios';
import {useAuthentication} from '../context/authContext';
import {useNavigation} from '@react-navigation/native';
import SuggestUserLoader from './Loader/SuggestUserLoader';

const SuggestPeople = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [peples, setPeples] = useState([]);
  const {auth} = useAuthentication();

  useEffect(() => {
    const getDataSuggestUser = async () => {
      setIsLoading(true);
      const {data} = await axios.get(
        `${SERVER_URL}/users/suggest-newest-user/${auth.userId}`,
      );
      data?.people?.filter(u => {
        auth.userId.includes(u._id);
      });
      setPeples(data?.people);
      setIsLoading(false);
    };
    getDataSuggestUser();
  }, []);

  const Loading = () => {
    const loaderCount = 6;
    const loadersArray = [...Array(loaderCount)];

    return (
      <>
        {loadersArray.map((_, index) => (
          <SuggestUserLoader key={index} />
        ))}
      </>
    );
  };

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        marginVertical: 7,
        padding: 10,
      }}>
      <ScrollView
        style={{flexDirection: 'row'}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Loading />
        ) : (
          peples.map((user, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: 80,
                height: 80,
                overflow: 'hidden',
                borderRadius: 50,
                backgroundColor: '#70d7e7',
                padding: 3,
                marginHorizontal: 2,
              }}
              onPress={() =>
                navigation.navigate('Profile', {
                  userId: user._id,
                  auth,
                })
              }>
              <Image
                source={{uri: user.image}}
                style={{width: '100%', height: '100%', borderRadius: 50}}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default SuggestPeople;

const styles = StyleSheet.create({});
