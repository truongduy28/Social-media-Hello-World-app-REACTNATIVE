// Import React
import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadToFirebase} from '../utils/common';

const Example = () => {
  const [singleFile, setSingleFile] = useState('');
  const [test, setTest] = useState({
    name: 'test',
    url: '',
  });

  const submit = async () => {
    if (singleFile) {
      const url = await uploadToFirebase(singleFile);
      setTest({...test, url: url});
      console.log(test);
      return;
    }
    console.log(test);
  };

  const selectOneFile = async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      quality: 1,
    }).then(res => {
      if (!res.didCancel) {
        console.log(res);
        setSingleFile(res.assets[0]);
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example of File Picker in React Native
      </Text>
      <View style={styles.container}>
        {/*To show single file attribute*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectOneFile}>
          {/*Single file selection button*/}
          <Text style={{marginRight: 10, fontSize: 19}}>
            Click here to pick one file
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
        {/*Showing the data of selected Single file*/}
        <Text style={styles.textStyle}>
          File Names: {singleFile.fileName ? singleFile.fileName : ''}
          {'\n'}
          Type: {singleFile.type ? singleFile.type : ''}
          {'\n'}
          File Size: {singleFile.fileSize ? singleFile.fileSize : ''}
          {'\n'}
          URI: {singleFile.uri ? singleFile.uri : ''}
          {'\n'}
        </Text>
        <TouchableOpacity onPress={() => submit()}>
          <Text>suuuuuub</Text>
        </TouchableOpacity>
        {singleFile && (
          <Image
            source={{uri: singleFile.uri}}
            style={{width: '100%', height: '100%'}}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Example;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});
