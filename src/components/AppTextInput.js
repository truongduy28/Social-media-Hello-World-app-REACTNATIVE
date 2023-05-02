/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';

const AppTextInput = ({...otherProps}) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={Colors.darkText}
      style={[
        {
          fontFamily: Font['poppins-regular'],
          fontSize: FontSize.small,
          padding: Spacing * 2,
          backgroundColor: Colors.lightPrimary,
          marginVertical: Spacing,
          borderBottomWidth: 1,
          borderColor: Colors.darkText,
        },
        focused && {
          shadowOffset: {width: 10, height: 10},
          shadowColor: 'black',
          shadowOpacity: 0.3,
          elevation: 5,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
