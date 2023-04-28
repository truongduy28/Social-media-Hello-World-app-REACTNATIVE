import {getDownloadURL, uploadBytes} from 'firebase/storage';
import moment from 'moment';
import storageRef, {storage} from './../helper/firebase';
import {launchImageLibrary} from 'react-native-image-picker';
import Clipboard from '@react-native-clipboard/clipboard';

export const handleViewProfile = (navigation, userId, auth) => {
  navigation.navigate('Profile', {
    userId,
    auth,
  });
};

export const uploadToFirebase = async file => {
  const response = await fetch(file.uri);
  const blob = await response.blob();
  const reference = storageRef(storage, `file/${file.fileName}`);
  const snapshot = await uploadBytes(reference, blob);
  const url = await getDownloadURL(snapshot.ref);
  console.log(url);
  return url;
};

export const formatFromNow = time => moment(time).fromNow();

export const checkMediaType = fileType => {
  const validVideoTypes = ['mp4', 'ogg', 'webm'];
  const tempArr = fileType.split('/');
  const type = tempArr[tempArr.length - 1];
  if (validVideoTypes.includes(type)) {
    return true;
  }
  return false;
};

export const selectOneFile = async setState => {
  await launchImageLibrary({
    mediaType: 'mixed',
    quality: 1,
  }).then(res => {
    if (!res.didCancel) {
      setState(res.assets[0]);
    }
  });
};

export const copyToClipboard = text => {
  Clipboard.setString(text);
};

const getTextFromClipboard = async () => {
  const text = await Clipboard.getString();
  return text;
};

export const formatDDMMYYY = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
};

// Only use ALBUM SCREENS
export const sortImages = (images, sortParam) => {
  switch (sortParam) {
    case 'newest':
      return images.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    case 'oldest':
      return images.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
    case 'most favorite':
      return images.sort((a, b) => b.likeCount - a.likeCount);
    case 'most comments':
      return images.sort((a, b) => b.commentCount - a.commentCount);
    default:
      // If an invalid sort parameter is passed, default to sorting by newest
      return images.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
  }
};

export const extractFilenameFromUrl = url => {
  const startIndex = url.lastIndexOf('/') + 1; // Find the index of the last occurrence of '/'
  const endIndex = url.indexOf('?'); // Find the index of the first occurrence of '?'
  const filename = url.substring(startIndex, endIndex); // Extract the filename using substring()
  return filename;
};
