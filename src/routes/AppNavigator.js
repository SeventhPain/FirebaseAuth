import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import Login from '../screens/Authentication/Login';
import Registeration from '../screens/Authentication/Registeration';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from '../screens/home_screen';
import {retrieveStringData,storeKeys} from '../helper/AsyncStorage';
import { string_key } from '../constant/key';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLogin, setLogin] = useState(null);
  retrieveStringData

  useEffect(() => {
    SplashScreen.hide();
    fetchLoginCredentialData();
  }, []);

  const fetchLoginCredentialData = async () => {
    const rememberMe = await retrieveStringData({key: storeKeys.rememberMe});

    if (rememberMe === string_key.rememberMeCredentialDisable || rememberMe === null) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  if (isLogin === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogin === false ? 'Login' : 'HomeScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registeration" component={Registeration} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
