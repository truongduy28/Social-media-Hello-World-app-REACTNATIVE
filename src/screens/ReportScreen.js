/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useAuthentication} from '../context/authContext';
import Colors from '../constants/Colors';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {SERVER_URL} from '@env';
import {showToast} from '../utils/toastShow';
import {useNavigation} from '@react-navigation/native';

const POST_TYPE = [
  'Nudity',
  'Spam',
  'Unauthorized sales',
  'Violence, Terrorism',
  'False information',
  'Something else',
];

const USER_TYPE = [
  'Fake someone',
  'Posting inappropriate things',
  'Something else',
];

const APP_TYPE = ['System error', 'Something else'];

const ReportScreen = ({route}) => {
  const {type_report, data_report} = route.params;
  const navigation = useNavigation();
  const {auth} = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);

  const [reportData, setReportData] = useState({
    content: '',
    type: '',
    reportedBy: auth.userId,
    feature: {
      source: type_report,
      link:
        type_report === 'post' || type_report === 'user'
          ? data_report._id
          : null,
    },
  });

  const handleTypePress = text => {
    setReportData({...reportData, type: text});
  };

  const typeElements = (
    type_report === 'post'
      ? POST_TYPE
      : type_report === 'user'
      ? USER_TYPE
      : APP_TYPE
  ).map((text, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleTypePress(text)}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: Colors.darkText,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: text === reportData.type ? Colors.text : Colors.darkText,
          fontSize: 19,
          fontWeight: text === reportData.type ? 700 : 600,
          flex: 1,
        }}>
        {text}
      </Text>
      {text === reportData.type && (
        <IconIonicons name="checkmark-sharp" size={30} color={'#59b259'} />
      )}
    </TouchableOpacity>
  ));

  const handleReport = async () => {
    setIsLoading(true);
    if (!reportData.content || !reportData.type) {
      showToast(
        'error',
        'Oops!',
        'Please choose a problem type and type to content report.',
      );
      return;
    }
    try {
      const {data} = await axios.post(`${SERVER_URL}/report`, reportData);
      showToast('success', 'Successfully!', data.message);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{position: 'relative', flex: 1, paddingBottom: 30}}>
      <ScrollView style={{backgroundColor: Colors.lightPrimary}}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: Colors.text}}>
            Please select a problem
          </Text>
          <Text style={{fontSize: 15}}>
            If someone is in immediate danger, get help before reporting to
            Facebook. Don't wait.
          </Text>
          {typeElements}
        </View>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: Colors.text}}>
            Type content for report
          </Text>
          <Text style={{fontSize: 15}}>
            Reference site about Lorem Ipsum, giving information on its origins,
            as well as a random Lipsum generator.
          </Text>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              backgroundColor: Colors.lightPrimary,
              borderRadius: 10,
              elevation: 6,
              marginVertical: 10,
            }}>
            <TextInput
              placeholder="content for report..."
              value={reportData.content}
              onChangeText={text =>
                setReportData({...reportData, content: text})
              }
              multiline
              style={{
                borderColor: Colors.darkText,
                borderWidth: 1,
                height: 150,
                textAlignVertical: 'top',
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 10,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: Colors.lightPrimary,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.blueFacebook,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}
          onPress={() => handleReport()}>
          <Text
            style={{
              color: Colors.lightPrimary,
              fontWeight: 700,
              fontSize: 20,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportScreen;
