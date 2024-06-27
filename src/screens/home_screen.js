import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';
  import React, {useRef, useState, useEffect} from 'react';
  import {CommonActions, useNavigation} from '@react-navigation/native';
  import {useSelector, useDispatch} from 'react-redux';
import COLOR from '../constant/color';
import { clearData, storeKeys } from '../helper/AsyncStorage';
  
  const HomeScreen = () => {
    // References to hold TextInputComponent instances
    const navigation = useNavigation();
    const darkMode = useSelector(state => state.ThemeSlice.appDarkMode);
  
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <SafeAreaView
          style={darkMode ? {backgroundColor: COLOR.DarkTheme,flex:1} : {backgroundColor: COLOR.Blue50,flex:1}}>
          <StatusBar 
            animated={true} 
            backgroundColor={darkMode ? COLOR.DarkTheme : COLOR.Blue50}
            barStyle={darkMode ? 'light-content' : 'dark-content'} />
            <View style={{flex:1, alignSelf: 'center',justifyContent: 'center'}}>
                <Text style={{color: darkMode?COLOR.White:COLOR.DarkTheme,fontSize: 16,}}>Login Successfully!!!</Text>
                <TouchableOpacity 
                    onPress={()=>{
                        clearData({key: storeKeys.rememberMe});
                        navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: 'Login' }],}));
                    }} style={{backgroundColor: COLOR.Primary,alignSelf: 'center',borderRadius: 8,}}>
                    <Text style={{marginVertical: 8, marginHorizontal: 16,color: COLOR.White}}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  };
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({
  });
  