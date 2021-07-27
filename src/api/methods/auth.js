import api from '../constants';
import {getToken, storeName, storeToken} from '../../shared/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = {
  LOGIN: '/login',
  LOGOUT: '/Logout',
};

export const login = async model => {
  try {
    const values = {
      email: model.email,
      password: model.password,
    };
    const {data} = await api.post(auth.LOGIN, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const {token} = data.data;
    await storeToken(token);
    // const name = await AsyncStorage.setItem('user', data.user_name);
    // console.log(name);
    const {user_name} = data;
    await storeName(user_name);
    // storeName(data.result_name);
    // console.log('Token stored in Async Storage');
    console.log(data);

    return data;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    const token = await getToken();
    const {data} = await api.delete(auth.LOGOUT, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
