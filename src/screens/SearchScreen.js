/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, ScrollView} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useDebounce from '../hooks/useDebounce';
import {useEffect} from 'react';
import axios from 'axios';
import {SERVER_URL} from '@env';
import ResultItem from '../components/Search/ResultItem';
import {sortNewestJsonResult} from '../utils/common';
import {ActivityIndicator} from 'react-native';

const SearchScreen = () => {
  const [tab, setTab] = useState('All');
  const MENU_TABS = ['All', 'Posts', 'People'];
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const debouncedKeyword = useDebounce(keyword, 500);

  // Use the debounced search term to make an API call

  useEffect(() => {
    const search = async () => {
      if (!keyword) return;
      setLoading(true);
      try {
        const {data} = await axios.get(
          SERVER_URL + '/users/search/' + debouncedKeyword,
        );

        let newestDataSorted = await sortNewestJsonResult(data);
        let tabSortedData = newestDataSorted;
        if (tab === 'Posts') {
          tabSortedData = newestDataSorted.filter(
            data => data.type.toLowerCase() === 'post',
          );
        } else if (tab === 'People') {
          tabSortedData = newestDataSorted.filter(
            data => data.type.toLowerCase() === 'user',
          );
        }
        setLoading(false);

        setResult(tabSortedData);
      } catch (error) {
        setLoading(false);
      }
    };
    search();
    return;
  }, [debouncedKeyword, tab]);

  const TabButton = ({t}) => {
    return (
      <View>
        <TouchableOpacity
          key={t}
          onPress={() => setTab(t)}
          style={{paddingHorizontal: 5}}>
          <Text
            style={{
              color: tab === t ? '#4473c9' : '#6d6d6d',
              fontSize: 17,
              fontWeight: 600,
            }}>
            {t}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: tab === t ? '#4473c9' : '#ffffff00',
            height: 5,
            marginTop: 5,
          }}></View>
      </View>
    );
  };

  const NoKeyword = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          marginTop: 50,
        }}>
        <Text style={{fontSize: 19}}>Plase enter keyword</Text>
        <Text style={{fontSize: 19}}>to search in Hello World !!!</Text>
      </View>
    );
  };

  const ResultData = () => {
    return loading ? (
      <LoadingData />
    ) : result.length == 0 ? (
      <NoData />
    ) : (
      <ScrollView style={{}}>
        {result.map((item, index) => (
          <ResultItem item={item} key={index} />
        ))}
        <View style={{height: 250}}></View>
      </ScrollView>
    );
  };

  const NoData = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          marginTop: 50,
        }}>
        <Text style={{fontSize: 19}}>No data matching with keyword</Text>
      </View>
    );
  };

  const LoadingData = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          height: 300,
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  };
  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={{
          backgroundColor: Colors.lightPrimary,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          gap: 10,
          paddingVertical: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconIonicons name="chevron-back" color={'#0d0d0d'} size={30} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <TextInput
            placeholder="Search in Hello World"
            style={{
              backgroundColor: '#f0f1f6',
              fontSize: 18,
              width: '100%',
              borderRadius: 20,
              paddingHorizontal: 10,
            }}
            onChangeText={text => setKeyword(text)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          backgroundColor: Colors.lightPrimary,
          paddingHorizontal: 20,
          paddingTop: 5,
        }}>
        {MENU_TABS.map(t => (
          <TabButton t={t} key={t} />
        ))}
      </View>
      <View>{!keyword ? <NoKeyword /> : <ResultData />}</View>
    </View>
  );
};

export default SearchScreen;
