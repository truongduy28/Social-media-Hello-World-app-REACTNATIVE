/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList} from 'react-native';
import React, {useRef, useState} from 'react';
import Feed from './Feed';
import FeedLoader from '../Loader/FeedLoader';
import AppHeader from '../AppHeader';
import ToolBar from './ToolBar';
import SuggestPeople from '../SuggestPeople';

const FeedContainer = ({state, auth}) => {
  const {allPost, setAllPost, handleLoadMore, isLoading} = state;
  // const {scrollY} = uiState;

  const scrollViewRef = useRef(null);

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };

  return (
    <View style={{gap: 10}}>
      <FlatList
        ref={scrollViewRef}
        data={allPost.posts}
        renderItem={({item}) => (
          <Feed
            post={item}
            allPostState={{allPost, setAllPost}}
            fn={{handleScrollToTop}}
          />
        )}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={
          <View
            style={{
              height: 20,
              width: '100%',
            }}
          />
        }
        ListHeaderComponent={
          <>
            <ToolBar auth={auth} state={{allPost, setAllPost}} />
            <SuggestPeople />
          </>
        }
        onEndReached={() => handleLoadMore()}
        onEndReachedThreshold={1}
        ListFooterComponent={() => <FeedLoader />}
        // onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
      />
      {/* {allPost?.posts?.map(post => {
        return <Feed key={post._id} post={post} />;
      })} */}
    </View>
  );
  // return <FeedLoader />;
};

export default FeedContainer;
