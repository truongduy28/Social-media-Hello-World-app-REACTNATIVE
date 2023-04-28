/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';

// Import components
import AppHeader from '../components/AppHeader';
import FeedContainer from '../components/Feed/FeedContainer';
import FeedLoader from '../components/Loader/FeedLoader';
import {useAuthentication} from '../context/authContext';

import {SERVER_URL} from '@env';

const HomeScreen = ({navigation}) => {
  const [allPost, setAllPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {auth} = useAuthentication();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      console.log('Starting... GET ALL POSTS');
      try {
        const {data} = await axios.get(
          `${SERVER_URL}/posts/all-posts?page=${page}`,
        );
        console.log('Success... GET ALL POSTS');
        setAllPost(data);
        setIsLoading(false);
      } catch (error) {
        console.log('Error... GET ALL POSTS');
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchPost();
  }, [navigation]);

  const handleLoadMore = async () => {
    try {
      const {data} = await axios.get(
        `${SERVER_URL}/posts/all-posts?page=${page + 1}`,
      );
      setAllPost(prevState => ({
        ...prevState,
        posts: [...prevState.posts, ...data.posts],
      }));
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <AppHeader />
      {isLoading ? (
        <FeedLoader />
      ) : (
        allPost && (
          <FeedContainer
            state={{allPost, setAllPost, handleLoadMore, isLoading}}
            auth={auth}
          />
        )
      )}
    </View>
  );
};

export default HomeScreen;
