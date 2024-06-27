// TextInputComponent.js

import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import COLOR from '../../constant/color';
import SPACING from '../../constant/pixel';
import {FontFamily, fontSizes} from '../../constant/font';
import IconManager from '../../assets/IconManager';
import { useSelector,useDispatch } from 'react-redux';

const MandatoryTextInput = ({mandatory = false, ...props}, ref) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const darkMode = useSelector(state => state.ThemeSlice.appDarkMode);

  const onChangeText = value => {
    setText(value);
    setIsButtonPressed(false); // Reset button press state when text changes

    // Update border color based on input validity
    const borderColor = value.trim() === '' ? 'red' : 'blue';
    setIsButtonPressed(false);
    setIsFocused(true);
  };

  // Expose getValue method via ref
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return text;
    },
    setButtonPressed: pressed => {
      setIsButtonPressed(pressed);
    },
  }));

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const borderColor = text === '' 
  ? (isButtonPressed && text.trim() === '' ? COLOR.Warning : isFocused ? COLOR.Primary : COLOR.Grey200) 
  : (props.isEmail ? (validateEmail(text) ? COLOR.Grey200 : COLOR.Warning ) :
    (isButtonPressed && text.trim() === ''
      ? COLOR.Warning
      : isFocused
      ? COLOR.Primary
      : COLOR.Grey200));

  return (
    <View style={[darkMode ? styles.Dcontainer : styles.container, {borderColor}]}>
      {props.prefix ? (
        <Image
          source={props.prefixIcon ? props.prefixIcon : IconManager.logo_light}
          style={{
            width: SPACING.spacing18,
            height: SPACING.spacing18,
            marginHorizontal: 4,
            tintColor: borderColor,
          }}
          resizeMode="contain"
        />
      ) : null}
      <TextInput
        style={darkMode ? styles.Dinput : styles.input}
        value={text}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={props.placeholder}
        placeholderTextColor={darkMode ? COLOR.Grey100 :COLOR.Grey300}
        secureTextEntry={props.secureText}
        multiline = {props.multiline}
        // numberOfLines={4}
        height = {props.height ? props.height : 'auto'}
      />
      {props.postfix ? (
        <TouchableOpacity onPress={props.secureTextChange}>
          <Image
            source={
              props.postfixIcon ? props.postfixIcon : IconManager.logo_light
            }
            style={{
              width: 16,
              height: 16,
              marginRight: 4,
              tintColor: borderColor,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.Blue50,
    paddingHorizontal: SPACING.spacing4,
    borderRadius: SPACING.spacing8,
    marginBottom: SPACING.spacing10,
    borderWidth: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Dcontainer: {
    backgroundColor: COLOR.DarkTheme,
    paddingHorizontal: SPACING.spacing4,
    borderRadius: SPACING.spacing8,
    marginBottom: SPACING.spacing10,
    borderWidth: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkThemecontainer: {
    backgroundColor: COLOR.DarkTheme,
    paddingHorizontal: SPACING.spacing4,
    borderRadius: SPACING.spacing8,
    marginBottom: SPACING.spacing10,
    borderWidth: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: fontSizes.size16,
    fontFamily: FontFamily.PoppinRegular,
    paddingVertical: SPACING.spacing10,
    color :  COLOR.DarkTheme
  },
  Dinput: {
    flex: 1,
    fontSize: fontSizes.size16,
    fontFamily: FontFamily.PoppinRegular,
    paddingVertical: SPACING.spacing10,
    color :  COLOR.White
  },
});

export default forwardRef(MandatoryTextInput);
