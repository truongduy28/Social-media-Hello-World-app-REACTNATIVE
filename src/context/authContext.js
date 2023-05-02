/* eslint-disable no-unreachable */
import axios from 'axios';
import React, {createContext, useState, useEffect, useContext} from 'react';
import {SERVER_URL} from '@env';
// import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../utils/toastShow';

const Authentication = createContext();

const AuthenticationProvider = ({children}) => {
  // const [infoAuth, setInfoAuth] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(null);

  //  BASE CONSTRUCTOR
  //   USER_AUTH : {
  //   userId: 'id_STRING',
  //   info: {_id, name, image...}
  //  }

  useEffect(() => {
    checkLoginSessionFn();
  }, []);

  const loginFn = async (email, password) => {
    setIsLoading(true);

    try {
      // send request and wait for response
      const res = await axios.post(SERVER_URL + '/users/login', {
        email,
        password,
      });
      // happen error => break out
      if (!res?.data) {
        setIsLoading(false);
        return;
      }

      // if successfully login request
      setAuth({userId: res?.data.user._id, info: res?.data.user});

      AsyncStorage.setItem(
        'USER_AUTH',
        JSON.stringify({
          userId: res?.data.user._id,
          info: res?.data.user,
        }),
        err => {
          if (err) {
            console.log('an error');
            throw err;
          }
          console.log('user be stored in react native storage');
        },
      ).catch(err => {
        console.log('error is: ' + err);
      });
      setIsLoggedIn(true);
      showToast('success', 'Success!', res?.data.message);
      setIsLoading(false);
      return res?.data;
    } catch (error) {
      // if error happens
      console.log(error);
      showToast('error', 'Error', error.response?.data.msg);
      setIsLoading(false);
      return error.response?.data.msg;
    }
  };

  const checkLoginSessionFn = async () => {
    console.log('go go');
    setIsLoading(true);
    setIsLoggedIn(false);
    const userExits = await AsyncStorage.getItem('USER_AUTH');

    if (!userExits) {
      console.log('k co');
      setIsLoading(false);
      return false;
    }

    const {userId} = JSON.parse(userExits);

    // console.log(userId);
    try {
      const res = await axios.get(SERVER_URL + '/users/' + userId);
      if (res?.data.msg == 'Something went wrong. Try again!') {
        console.log('done k co session');
        setIsLoading(false);
        return false;
      }
      // console.log(res);
      setAuth({userId: res.data.user._id, info: res.data.user});
      console.log('done  co session');

      setIsLoading(false);
      setIsLoggedIn(true);
      return;
    } catch (error) {
      setIsLoading(false);
      console.log('err check cathc');
      console.log(error);
      return;
    }
  };

  const logoutFn = async () => {
    await AsyncStorage.removeItem('USER_AUTH');
    return;
  };

  const useAuth = async () => {
    const userExits = await AsyncStorage.getItem('USER_AUTH');
    if (!userExits) {
      console.log('Dont find user session on local storage');
      return null;
    }
    // console.log(JSON.parse(userExits));
    return JSON.parse(userExits);
  };

  return (
    <>
      <Authentication.Provider
        value={{
          isLoggedIn,
          isLoggedOut,
          loginFn,
          isLoading,
          checkLoginSessionFn,
          logoutFn,
          auth,
          setAuth,
        }}>
        {children}
      </Authentication.Provider>
    </>
  );
};
const useAuthentication = () => {
  return useContext(Authentication);
};

export {AuthenticationProvider, useAuthentication};
