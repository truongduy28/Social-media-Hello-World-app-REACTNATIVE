import Toast from 'react-native-toast-message';

export const showToast = (
  type = 'success',
  text1 = 'Hello',
  text2 = 'This is some something 👋',
) => {
  Toast.show({
    type: type,
    text1,
    text2,
  });
};
