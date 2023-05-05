import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';
import AvatarComponent from '../Material/AvatarComponent';
import {formatHHMMDDMMYYY} from '../../utils/common';

const FeedResultItem = ({post}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <AvatarComponent uri={post.postedBy.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{post.postedBy.name}</Text>
          <Text style={styles.date}>{formatHHMMDDMMYYY(post.createdAt)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{post.content}</Text>
        {post.image.url ? (
          post.isVideo ? null : (
            <View style={styles.imageContainer}>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.image}
                  source={{uri: post.image.url}}
                  resizeMode="contain"
                />
              </View>
            </View>
          )
        ) : null}
      </View>
    </View>
  );
};

export default FeedResultItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPrimary,
    borderRadius: 10,
    elevation: 9,
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  details: {
    flex: 1,
  },
  name: {
    color: Colors.lightText,
    fontSize: 17,
    fontWeight: '600',
  },
  date: {
    color: Colors.lightText,
  },
  text: {
    color: '#333333',
    fontSize: 16,
    marginHorizontal: 5,
  },
  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    maxHeight: 250,
  },
  imageWrapper: {
    height: '100%',
    width: '100%',
  },
  image: {
    height: '100%',
    objectFit: 'scale-down',
    resizeMode: 'contain',
    width: '100%',
  },
});
