import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../../constants/Colors';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {formatFromNow} from '../../../utils/common';
import ModalSavedItemOption from './ModalSavedItemOption';
import axios from 'axios';
import {SERVER_URL} from '@env';
import {log} from 'react-native-reanimated';

const SavedItem = ({item, author, parentState}) => {
  const {items, setItems} = parentState;
  const MAXLENGTH = 50;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleRemove = async () => {
    setIsLoadingModal(true);

    try {
      const res = await axios.delete(
        `${SERVER_URL}/posts/delete-archived-post`,
        {
          data: {
            postId: item._id,
            userId: author,
          },
        },
      );

      if (res.status) {
        console.log('xong');
        setItems(items.filter(i => i._id !== item._id));
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoadingModal(false);
    setModalVisible(false);
  };

  return (
    <View key={item._id} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: item.image.url ? item.image.url : item.postedBy.image,
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          {item.content.length > MAXLENGTH
            ? item.content.trim().substring(0, MAXLENGTH) + '...'
            : item.content.trim()}
        </Text>
        <Text style={styles.postedByText}>{item.postedBy.name}</Text>
        <View style={styles.infoContainer}>
          <IconEntypo name="dot-single" size={20} color={Colors.blueFacebook} />
          <Text style={styles.timeText}>{formatFromNow(item.createdAt)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.dotsContainer}
        onPress={() => setModalVisible(true)}>
        <IconEntypo name="dots-three-horizontal" size={20} />
      </TouchableOpacity>

      <ModalSavedItemOption
        toggleState={{
          isModalVisible,
          toggleModal,
          setModalVisible,
          isLoadingModal,
        }}
        fn={{handleRemove}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  imageContainer: {
    width: '30%',
    maxWidth: 300,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentText: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  postedByText: {
    fontSize: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 5,
  },
  dotsContainer: {},
});

export default SavedItem;
