import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

const UseShadow = style => {
  const [componentStyle, setComponentStyle] = useState(style);

  useEffect(() => {
    setComponentStyle(style);
  }, [style]);

  return ({children}) => {
    return <View style={[styles.container, componentStyle]}>{children}</View>;
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default UseShadow;
