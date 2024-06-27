import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IconManager from '../assets/IconManager';
import pixel from '../constant/pixel';
import color from '../constant/color';
import { toggleTheme } from '../stores/slices/ThemeSlice';

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ThemeSlice.appDarkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={{borderRadius: pixel.spacing30}} 
        onPress={handleToggleTheme}>
        <Image resizeMode='contain' source={darkMode ? IconManager.dark_mode : IconManager.light_mode} 
          style={{width: pixel.spacing32, height: pixel.spacing32,borderRadius: pixel.spacing30}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  text: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default ThemeSwitch;
