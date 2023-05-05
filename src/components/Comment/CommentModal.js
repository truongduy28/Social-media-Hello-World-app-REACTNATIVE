/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import Comment from './Comment';
import CreateComment from './CreateComment';
import LottieView from 'lottie-react-native';
import {useState} from 'react';
import {useRef} from 'react';

const CommentModal = ({toggleState, count, currentPostState, auth}) => {
  const {isModalVisible, toggleModal, setModalVisible} = toggleState;
  const {likeCount, commentCount} = count;
  const {currentPost, setCurrentPost} = currentPostState;

  const [backgroundEffect, setBackgroundEffect] = useState({
    display: false,
    effect: '',
  });

  const happyKeywords = ['Glad', 'happy', 'love'];
  const congratsKeywords = ['Congrats', 'Congratulations', 'good', 'good jobs'];

  useEffect(() => {
    const checkBackgroundEffect = () => {
      for (
        let i = 0;
        i <
        currentPost.comments
          .sort((a, b) => b.created.localeCompare(a.created))
          .filter(comment => comment.isDelete === false).length;
        i++
      ) {
        const text = currentPost.comments[i].text.toLowerCase();

        for (let j = 0; j < happyKeywords.length; j++) {
          if (text.includes(happyKeywords[j].toLowerCase())) {
            setBackgroundEffect({
              display: true,
              effect: 'happy',
            });
            return;
          }
        }

        for (let j = 0; j < congratsKeywords.length; j++) {
          if (text.includes(congratsKeywords[j].toLowerCase())) {
            setBackgroundEffect({
              display: true,
              effect: 'congrats',
            });
            return;
          }
        }
      }

      setBackgroundEffect({
        display: false,
        effect: '',
      });
    };
    checkBackgroundEffect();
  }, [currentPost]);

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
            {backgroundEffect.display && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  zIndex: 1,
                }}>
                <LottieView
                  source={
                    backgroundEffect.effect === 'happy'
                      ? require('../../assets/json/81755-hearts-feedback.json')
                      : require('../../assets/json/85744-success.json')
                  }
                  autoPlay={true}
                  loop={false}
                  style={{width: '100%'}}
                />
              </View>
            )}
          </View>
          <View style={{flex: 1, paddingHorizontal: 12, zIndex: 2}}>
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
    paddingTop: 12,
    backgroundColor: Colors.lightPrimary,
    position: 'relative',
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
