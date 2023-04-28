/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {SERVER_URL} from '@env';
import axios from 'axios';
import FeedLoader from './../Loader/FeedLoader';
import Feed from '../Feed/Feed';
import LottieView from 'lottie-react-native';
import Nodata from '../Status/Nodata';
import Colors from '../../constants/Colors';

const TabFeed = ({state}) => {
  const {profile, auth} = state;
  const [isLoading, setIsLoading] = useState(false);
  const [postsOfUser, setPostsOfUser] = useState(null);

  const scrollViewRef = useRef(null);

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      if (typeof scrollViewRef.current.scrollToOffset === 'function') {
        scrollViewRef.current.scrollToOffset({offset: 0, animated: true});
      }
    }
  };

  useEffect(() => {
    const handleGetAllPosts = async () => {
      setIsLoading(true);
      const {data} = await axios.get(
        `${SERVER_URL}/posts/get-all-posts-with-user/${profile._id}`,
      );
      const res = await data?.posts?.filter(post => post.isDelete === false);
      const result = {posts: res, success: true};
      if (res.length > 0) {
        setPostsOfUser(result);
      }
      setIsLoading(false);
    };
    handleGetAllPosts();
  }, [profile._id]);

  return (
    <View>
      {isLoading ? (
        <FeedLoader />
      ) : postsOfUser ? (
        <View
          style={{
            paddingHorizontal: 5,
            gap: 10,
            marginBottom: 100,
            marginTop: 10,
          }}
          ref={scrollViewRef}>
          {postsOfUser?.posts?.map(post => {
            return (
              <Feed
                key={post._id}
                post={post}
                allPostState={{
                  allPost: postsOfUser,
                  setAllPost: setPostsOfUser,
                }}
                fn={{handleScrollToTop}}
              />
            );
          })}
        </View>
      ) : (
        <View
          style={{
            backgroundColor: Colors.lightPrimary,
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300,
            paddingBottom: 50,
          }}>
          <Nodata width={'70%'} />
          <Text style={{fontSize: 17}}>
            This user not yet post any feed !!!
          </Text>
        </View>
      )}
    </View>
  );
};

export default TabFeed;
