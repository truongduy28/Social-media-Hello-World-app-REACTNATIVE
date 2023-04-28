import React from 'react';
import {View, Text, Dimensions, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../constants/Colors';
import Skeleton from '../Material/Skeleton';

const AlbumLoader = () => {
  const cardWidth = Dimensions.get('window').width * 0.95;

  // Array to store the Skeleton components
  const skeletons = [];
  for (let i = 0; i < 4; i++) {
    skeletons.push(
      <Skeleton key={i} height={250} width={cardWidth} style={styles.card} />,
    );
  }

  return <ScrollView style={styles.container}>{skeletons}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPrimary,
  },
  card: {
    marginLeft: '2.5%',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default AlbumLoader;
