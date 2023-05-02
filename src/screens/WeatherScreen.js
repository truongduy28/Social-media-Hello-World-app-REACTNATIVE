/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput} from 'react-native';
import axios from 'axios';
import {API_WEATHER_SERVER} from '@env';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import LottieView from 'lottie-react-native';
import useDebounce from '../hooks/useDebounce';
import {handleWeatherClassification} from '../utils/weather';

const WeatherScreen = () => {
  const [location, setLocation] = useState('Cần Thơ');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundType, setBackgroundType] = useState('cloud');
  const [miniList, setMiniList] = useState([
    {
      name: 'Gusts',
      icon: require('../assets/json/105527-speed-test.json'),
      value: 0,
    },
    {
      name: 'Cloud',
      icon: require('../assets/json/4396-clouds.json'),
      value: 0,
    },
    {
      name: 'Humidity',
      icon: require('../assets/json/72236-humidly.json'),
      value: 0,
    },
    {
      name: 'Wind',
      icon: require('../assets/json/65004-windy-icon.json'),
      value: 0,
    },
  ]);

  const debouncedLocation = useDebounce(location, 250);

  useEffect(() => {
    handleGetWeather();
  }, [debouncedLocation]);

  const handleGetWeather = async () => {
    setIsLoading(true);
    try {
      const {data} = await axios.get(API_WEATHER_SERVER + '&q=' + location);
      setWeather(data);

      setMiniList([
        {
          name: 'Gusts',
          icon: require('../assets/json/105527-speed-test.json'),
          value: data.current.gust_kph,
        },
        {
          name: 'Cloud',
          icon: require('../assets/json/4396-clouds.json'),
          value: data.current.cloud,
        },
        {
          name: 'Humidity',
          icon: require('../assets/json/72236-humidly.json'),
          value: data.current.humidity,
        },
        {
          name: 'Wind',
          icon: require('../assets/json/65004-windy-icon.json'),
          value: data.current.wind_kph,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    weather && (
      <View style={styles.container}>
        <ImageBackground
          source={handleWeatherClassification(
            weather.current?.condition?.text || '',
          )}
          style={styles.imageBackground}>
          <View style={styles.weatherInfoHeader}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#d9d9e380',
                borderRadius: 20,
                paddingHorizontal: 15,
                marginHorizontal: 50,
                maxWidth: 500,
                marginBottom: 20,
              }}>
              <TextInput
                style={{
                  fontSize: 18,
                  flex: 1,
                  textAlign: 'center',
                }}
                placeholder="Typing your city..."
                value={location}
                onChangeText={text => setLocation(text)}
              />
              <IconIonicons name="search" size={22} />
            </View>
            <Text style={styles.locationText}>{weather.location.name}</Text>
            <Text style={[styles.locationText, {fontSize: 25}]}>
              ({weather.location.country})
            </Text>
            <Text style={styles.temperatureText}>
              {weather.current.temp_c}°
            </Text>
            <Text
              style={[
                styles.locationText,
                {fontSize: 25, textAlign: 'center'},
              ]}>
              - {weather.current?.condition?.text} -
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: Colors.lightPrimary,
              zIndex: 2,
              left: 0,
              right: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 15,
            }}>
            <View
              style={{
                marginHorizontal: 'auto',
                backgroundColor: '#d6d6d6',
                height: 8,
                width: 70,
                borderRadius: 10,
                alignSelf: 'center',
              }}></View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: Colors.lightText,
                fontWeight: 500,
                marginBottom: 20,
                marginTop: 10,
              }}>
              Weather today
            </Text>
            <View style={{flexDirection: 'row'}}>
              {miniList.map(item => (
                <View
                  key={item.name}
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <LottieView
                    source={item.icon}
                    autoPlay
                    style={{width: '50%', height: 50}}
                  />
                  <Text>{item.name}</Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'SFProDisplay-Regular',
                      fontWeight: '300',
                      color: Colors.text,
                    }}>
                    {item.value}km/h
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.overlay}></View>
        </ImageBackground>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    position: 'relative',
  },
  weatherInfoHeader: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    padding: 10,
    // backgroundColor: 'red',
    right: 0,
    left: 0,
  },
  locationText: {
    color: Colors.lightPrimary,
    fontSize: 35,
    fontFamily: 'SFProDisplay-Regular',
    fontWeight: '300',
  },
  temperatureText: {
    color: Colors.lightPrimary,
    fontSize: 100,
    fontFamily: 'SFProDisplay-Regular',
    fontWeight: '700',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000073',
    zIndex: 1,
  },
});

export default WeatherScreen;
