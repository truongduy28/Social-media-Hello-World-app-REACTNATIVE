/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import AvatarComponent from './../Material/AvatarComponent';
import Comment from './Comment';
import CreateComment from './CreateComment';

const CommentModal = ({toggleState, count, currentPostState, auth}) => {
  const {isModalVisible, toggleModal, setModalVisible} = toggleState;
  const {likeCount, commentCount} = count;
  const {currentPost, setCurrentPost} = currentPostState;

  return (
    <View>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        // swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,

                gap: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  flex: 1,
                }}>
                {likeCount > 0 &&
                  (!currentPost.likes.includes(auth.userId) ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <IconIonicons
                        name="ios-heart"
                        size={24}
                        color={Colors.redHeart}
                      />
                      <Text style={{marginBottom: 2}}>
                        {likeCount} like{likeCount > 1 && 's'}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <IconIonicons
                        name="heart"
                        size={24}
                        color={Colors.redHeart}
                      />
                      <Text style={{marginBottom: 2}}>
                        {likeCount > 1
                          ? `You and ${likeCount - 1} other${
                              likeCount > 2 ? 's' : ''
                            }`
                          : `You`}
                      </Text>
                    </View>
                  ))}
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Text style={{marginBottom: 2}}>
                  {commentCount > 0
                    ? `${commentCount} comment${commentCount != 1 && 's'}`
                    : 'No comments yet'}
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1, paddingHorizontal: 12}}>
            <ScrollView>
              {currentPost.comments
                ?.sort((a, b) => b.created.localeCompare(a.created))
                .filter(comment => comment.isDelete === false)
                .map(comment => (
                  <Comment
                    currentComment={comment}
                    userId={auth.userId}
                    postId={currentPost._id}
                    key={comment._id}
                  />
                ))}
            </ScrollView>
          </View>
          <CreateComment
            auth={auth}
            commentState={{
              postId: currentPost._id,
              currentPost,
              setCurrentPost,
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.lightPrimary,
    paddingTop: 12,
    // paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: '85%',
    // paddingBottom: 20,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 12,
    // height: '100%',
    // backgroundColor: '#bbb',
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
  },
  text: {
    color: '#bbb',
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
  },
});
