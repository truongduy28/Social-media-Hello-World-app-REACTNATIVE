import axios from 'axios';

const loginFunc = async ({email, password}) => {
  try {
    const req = await axios.post(process.env.SERVER_URL + '/users/login', {
      email,
      password,
    });
    return req;
  } catch (error) {
    return error;
  }
};

export {loginFunc};
