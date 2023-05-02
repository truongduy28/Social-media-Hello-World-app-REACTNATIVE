import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import {DATA} from '../assets/fake/policy';

const PolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/que-es-el-shadowban.png.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>Policy Center</Text>
      <Text style={styles.subtitle}>
        Tools to help you control your privacy and security on Hello World
      </Text>
      {DATA.map(d => (
        <View style={styles.cardContainer} key={d.title}>
          <View style={styles.card}>
            <Image source={d.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{d.title}</Text>
            <Text style={styles.cardContent}>{d.content}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightPrimary,
    overflow: 'hidden',
  },
  imageContainer: {
    maxHeight: 180,
    backgroundColor: 'yellow',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.text,
    fontWeight: 'bold',
    marginTop: 15,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: '15%',
    fontSize: 17,
    marginBottom: 15,
  },
  cardContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 0,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 5,
    position: 'relative',
  },
  cardImage: {
    height: 100,
    width: '100%',
  },
  cardTitle: {
    marginHorizontal: 15,
    marginTop: 10,
    fontSize: 19,
    color: '#000',
    fontWeight: 'bold',
  },
  cardContent: {
    marginHorizontal: 15,
    marginBottom: 15,
    fontSize: 17,
  },
});

export default PolicyScreen;
