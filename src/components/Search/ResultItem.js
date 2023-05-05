import {View, Text} from 'react-native';
import React from 'react';
import UserResultItem from './UserResultItem';
import FeedResultItem from './FeedResultItem';

const ResultItem = ({item}) => {
  return item.type === 'user' ? (
    <UserResultItem user={item.user} />
  ) : (
    <FeedResultItem post={item.post} />
  );
};

export default ResultItem;
