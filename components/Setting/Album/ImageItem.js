import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {formatDDMMYYY} from '../../../utils/common';

const ImageItem = ({media}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: media.url,
          }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.dateText}>{formatDDMMYYY(media.createdAt)}</Text>
          <View style={styles.iconsContainer}>
            <View style={styles.iconContainer}>
              <IconIonicons
                name="ios-heart-outline"
                size={28}
                color={Colors.lightPrimary}
              />
              <Text style={styles.iconText}>{media.likeCount}</Text>
            </View>
            <View style={styles.iconContainer}>
              <IconIonicons
                name="ios-chatbubble-ellipses-outline"
                size={28}
                color={Colors.lightPrimary}
              />
              <Text style={styles.iconText}>{media.commentCount}</Text>
            </View>
          </View>
        </View>
        <LinearGradient
          style={styles.gradient}
          colors={['#0000002e', '#0000009c', '#000000e0']}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  imageContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    height: 250,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    padding: 15,
  },
  dateText: {
    color: Colors.lightPrimary,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 40,
    fontWeight: '700',
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  iconText: {
    color: Colors.lightPrimary,
    fontSize: 20,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default ImageItem;
