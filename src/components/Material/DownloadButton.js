/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {extractFilenameFromUrl} from '../../utils/common';
import {showToast} from '../../utils/toastShow';

const DownloadButton = ({uri}) => {
  const handleDownLoad = () => {
    const fileName = extractFilenameFromUrl(uri);

    // Define the directory where you want to save the downloaded image
    const imagePath = ReactNativeBlobUtil.fs.dirs.PictureDir + '/' + fileName;
    // const PictureDir =
    //   Platform.OS === 'android'
    //     ? '/storage/emulated/0/Pictures'
    //     : RNFS.DocumentDirectoryPath + '/Pictures';
    // const imagePath = PictureDir + '/' + fileName;

    // Use RNFetchBlob to download the image
    ReactNativeBlobUtil.config({
      fileCache: true,
      path: imagePath,
    })
      .fetch('GET', uri, {})
      .then(res => {
        showToast('success', 'Done!', 'file is saved at ' + res.path());
      })
      .catch(error => {
        console.log('Error downloading image:', error);
      });
  };

  return (
    <TouchableOpacity
      onPress={() => handleDownLoad()}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      }}>
      <IconIonicons name="ios-download-outline" size={25} />
    </TouchableOpacity>
  );
};

export default DownloadButton;
