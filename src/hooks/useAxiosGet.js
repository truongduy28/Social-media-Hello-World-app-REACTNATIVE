import React, {useEffect, useReducer} from 'react';
import axios from 'axios';

const useAxiosGet = url => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'INIT':
          return {...state, isLoading: true, isError: false};
        case 'SUCCESS':
          return {
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload,
          };
        case 'ERROR':
          return {...state, isLoading: false, isError: true};

        default:
          break;
      }
    },
    {
      isLoading: false,
      isError: false,
      data: null,
    },
  );

  useEffect(() => {
    if (!url) return;
    const fetch = async () => {
      dispatch({type: 'INIT'});
      console.log('đang load');

      try {
        const result = await axios.get(url);
        console.log(result);
        dispatch({type: 'SUCCESS', data: result.data});
      } catch (error) {
        console.log(error);
        dispatch({type: 'ERROR'});
      }
    };
    fetch();
  }, [url]);
};

export default useAxiosGet;
