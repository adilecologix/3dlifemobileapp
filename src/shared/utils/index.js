import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
    console.log('Token stored in Async Storage');
  } catch (err) {
    throw err;
  }
};
export const storeName = async name => {
  try {
    await AsyncStorage.setItem('name', JSON.stringify(name));
    console.log('Name stored in Async Storage', JSON.stringify(name));
  } catch (err) {
    throw err;
  }
};

export const isTokenAvailable = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    throw 'Token not available';
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      console.log('Token retrieved from Async Storage', token);
      return token;
    } else {
      throw 'Token not found!';
    }
  } catch (err) {
    console.error(err);
    throw 'Token not available';
  }
};
export const getName = async () => {
  try {
    const name = await AsyncStorage.getItem('name');
    if (name) {
      const result = JSON.parse(name);
      return result;
    } else {
      throw 'Name not found!';
    }
  } catch (err) {
    console.error(err);
    throw 'Name not available';
  }
};

export const deleteToken = async () => {
  try {
    const token = await AsyncStorage.removeItem('token');
    if (!token) {
      console.log('Token deleted from Async Storage', token);
    } else {
      throw 'Token not found!!!';
    }
  } catch (err) {
    console.log(err);
    throw 'Token not Available';
  }
};
