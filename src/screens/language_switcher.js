import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../stores/slices/LanguageSlice';
import { View, Text, Switch, TouchableOpacity, Image } from 'react-native';
import SizedBox from '../components/SizedBox';
import pixel from '../constant/pixel';
import IconManager from '../assets/IconManager';
import color from '../constant/color';

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.LanguageSlice.language);
  const isEnglish = currentLanguage === 'en';

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'my' : 'en';
    dispatch(setLanguage(newLanguage));
  };

  return (
    <View style={{alignItems: 'center',justifyContent: 'center',alignSelf: 'center',  }}>

      <TouchableOpacity 
        style={{borderRadius: pixel.spacing30, backgroundColor: color.Blue100}} 
        onPress={toggleLanguage}>
        <Image resizeMode='contain' source={isEnglish ? IconManager.uk_flag : IconManager.myanmar_flag} 
          style={{width: pixel.spacing32, height: pixel.spacing32,borderRadius: pixel.spacing30}} />
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSwitcher;
