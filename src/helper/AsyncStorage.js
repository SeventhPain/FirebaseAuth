import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

export const storeKeys = {
  rememberMe: '@AUTH:rememberMe',
};

export const clearData = async function ({key}) {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data cleared successfully.');
    // navigation.navigate('Login')
  } catch (error) {
    console.log('Error clearing data: ', error);
  }
};

export const storeStringData = async function ({key, data}) {
  try {
    await AsyncStorage.setItem(key, data);
    console.log('Data stored successfully.');
  } catch (error) {
    console.log('Error storing data: ', error);
  }
};

export const retrieveStringData = async function ({key}) {
  try {
    const storedData = await AsyncStorage.getItem(key);
    if (storedData !== null) {
      // console.log('Retrieved data:', storedData);
      return storedData;
    } else {
      console.log('No data stored.');
      return null;
    }
  } catch (error) {
    console.log('Error retrieving data: ', error);
    return null;
  }
};
