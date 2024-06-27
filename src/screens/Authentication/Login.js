import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import COLOR from '../../constant/color';
import {FontFamily, fontSizes, fontWeight} from '../../constant/font';
import SizedBox from '../../components/SizedBox';
import MandatoryTextInput from '../../components/TextInputBox/MandatoryTextInput';
import IconManager from '../../assets/IconManager';
import ActionButton from '../../components/Button/ActionButton';
import CustomCheckBox from '../../components/Button/CustomCheckBox';
import {string_key} from '../../constant/key';
import AppLoading from '../../components/Loading';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import ThemeSwitch from '../theme_switch';
import auth from '@react-native-firebase/auth';
import AlertDialog from '../../dialog/AlertDialog';
import { storeStringData,storeKeys } from '../../helper/AsyncStorage';
import pixel from '../../constant/pixel';
import LanguageSwitcher from '../language_switcher';
import { getTranslateText } from '../../language/translations';
import color from '../../constant/color';

const Login = () => {
  const navigation = useNavigation();
  const textInputRefs = useRef([]);
  const [valuesMandatory, setValueMandatory] = useState([]);
  const [secureText, setSecureText] = useState(true);
  const [isRemenber, setRemenber] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const darkMode = useSelector(state => state.ThemeSlice.appDarkMode);
  const appLanguage = useSelector(state => state.LanguageSlice.language);
  const dispatch = useDispatch();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [alertMessage,setAlertMessage] = useState('');
  const [isSuccess,setSuccess] = useState(false)

  const showDialog = (message,dialogType) => {
    setSuccess(dialogType)
    setAlertMessage(message)
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    // isSuccess && navigation.navigate('Login')
  };

  const secureTextChange = () => {
    setSecureText(!secureText);
  };

  const loginWithEmailAndPass = (email,password) =>{
    setLoading(true)
    auth().signInWithEmailAndPassword(email,password).then(()=>{
      isRemenber && storeStringData({
        key: storeKeys.rememberMe,
        data: string_key.rememberMeCredentialEnable,
      });
      setLoading(false)
      // navigation.navigate('HomeScreen')
      navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: 'HomeScreen' }],}));
    }).catch((error)=>{
      setLoading(false)
      showDialog(`${error.message}`,false)
    })
  }

  const checkboxOnOf = () => {
    setRemenber(!isRemenber);
    return isRemenber;
  };
  
  //uses of mandatoryTextInput
  // Function to get values from each mandatory TextInputComponent
  const getValuesMandatory = () => {
    textInputRefs.current.forEach(ref => {
      const value = ref.getValue();
      if (!value || value.trim() === '') {
        ref.setButtonPressed(true);
      } else {
        ref.setButtonPressed(false);
      }
    });
    const textInputValues = textInputRefs.current.map(ref => ref.getValue());
    // console.log("Text Input Values Optional:", textInputValues);
    return textInputValues;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //action required
  const loginInButtonPress = async () => {
    const mandatoryValues = getValuesMandatory(); // Invoke the function to get values
    setValueMandatory(mandatoryValues); // Set state with the obtained values
    // console.log(mandatoryValues);
    checkInputAreValid(mandatoryValues) ? (validateEmail(mandatoryValues[0]) ? loginWithEmailAndPass(mandatoryValues[0],mandatoryValues[1]) : showDialog('Invalid Email!',false) ) : showDialog('Please fill the fields!',false);
  };

  //validate the user input are not null or empty inside of mandatoryTextInput
  const checkInputAreValid = data => {
    return data.every(value => value && value.trim() !== '');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <SafeAreaView
        style={darkMode ? styles.Dcontainer : styles.container}>
        <StatusBar 
          animated={true} 
          backgroundColor={darkMode ? COLOR.DarkTheme : COLOR.Blue50}
          barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <ScrollView showsHorizontalScrollIndicator={false} width={'100%'}>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <View>
              <ThemeSwitch />
              <LanguageSwitcher />
            </View>
          </View>
          <View
            style={darkMode ? styles.Dcontainer : styles.container}>
            <SizedBox height={pixel.spacing4} />
            <Image
              resizeMode="contain"
              source={
                darkMode
                  ? IconManager.login_logo
                  : IconManager.login_logo
              }
              style={styles.imageHeader}
            />
            {/* <SizedBox height={pixel.spacing10} /> */}
            <Text style={darkMode ? styles.Dtitle : styles.title}>
            {getTranslateText(appLanguage,'signIn')}
            </Text>
            <SizedBox height={pixel.spacing4} />
            <Text
              style={darkMode ? styles.Dsubtitle : styles.subtitle}>
              {getTranslateText(appLanguage,'loginWelcomeText')}
            </Text>
            <SizedBox height={pixel.spacing16} />
            <View style={styles.textInputHolder}>
              <MandatoryTextInput
                ref={ref => (textInputRefs.current[0] = ref)}
                placeholder={getTranslateText(appLanguage,'yourEmail')}
                prefix={true}
                isEmail={true}
                prefixIcon={IconManager.email_light}
              />
            </View>
            <SizedBox height={pixel.spacing6} />
            <View style={styles.textInputHolder}>
              <MandatoryTextInput
                ref={ref => (textInputRefs.current[1] = ref)}
                placeholder={getTranslateText(appLanguage,'password')}
                prefix={true}
                prefixIcon={IconManager.password_light}
                postfix={true}
                postfixIcon={
                  secureText
                    ? IconManager.secureCloseEye
                    : IconManager.secureOpenEye
                }
                secureText={secureText}
                secureTextChange={secureTextChange}
              />
            </View>
            <View style={styles.checkBoxHolder}>
              <View style={styles.checkbox}>
                <CustomCheckBox
                  value={isRemenber}
                  onValueChange={checkboxOnOf}
                  tintColorTrue={darkMode ? COLOR.White : COLOR.Primary}
                  tintColorFalse={darkMode ? COLOR.White : COLOR.Primary}
                />
                <SizedBox width={pixel.spacing10} />
                <Text
                  style={
                    darkMode
                      ? styles.DrememberMe
                      : styles.rememberMe
                  }>
                  {getTranslateText(appLanguage,'rememberMe')}
                </Text>
              </View>
            </View>
            <SizedBox height={pixel.spacing16} />
            <View style={styles.textInputHolder}>
              <ActionButton
                text={getTranslateText(appLanguage,'login')}
                onPress={() => loginInButtonPress()}
              />
            </View>
            <SizedBox height={pixel.spacing8} />
            <AlertDialog visible={dialogVisible} onClose={closeDialog} message={alertMessage} isSuccess={isSuccess} />
            <View style={styles.footercontainer}>
              <View style={styles.footer}>
                <Text
                  style={
                    darkMode
                      ? styles.Dfootertext
                      : styles.footertext
                  }>
                  {getTranslateText(appLanguage,'dontHaveAnAccount')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Registeration');
                  }}>
                  <Text style={styles.signup}>{getTranslateText(appLanguage,'signUp')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {isLoading && <AppLoading />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  signup: {
    color: COLOR.Primary,
    fontFamily: FontFamily.PoppinRegular,
    fontSize: fontSizes.size15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pixel.spacing12,
  },
  footertext: {
    fontFamily: FontFamily.PoppinRegular,
    color: COLOR.Grey300,
    fontSize: fontSizes.size15,
  },
  Dfootertext: {
    fontFamily: FontFamily.PoppinRegular,
    color: COLOR.White,
    fontSize: fontSizes.size15,
  },
  footercontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  imageHeader: {
    width: pixel.spacing240,
    height: pixel.spacing240,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.Blue50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  Dcontainer: {
    flex: 1,
    backgroundColor: COLOR.DarkTheme,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginPhoto: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.PoppinBold,
    color: COLOR.Grey500,
    fontSize: fontSizes.size23,
    fontWeight: fontWeight.weight800,
    alignSelf: 'flex-start',
    marginLeft: pixel.spacing32,
  },
  Dtitle: {
    fontFamily: FontFamily.PoppinBold,
    color: COLOR.White,
    fontSize: fontSizes.size23,
    fontWeight: fontWeight.weight800,
    alignSelf: 'flex-start',
    marginLeft: pixel.spacing32,
  },
  subtitle: {
    fontFamily: FontFamily.PoppinRegular,
    fontSize: fontSizes.size16,
    color: COLOR.Grey400,
    fontWeight: fontWeight.weight400,
    textAlign: 'center',
    alignSelf: 'flex-start',
    marginLeft: pixel.spacing32,
  },
  Dsubtitle: {
    fontFamily: FontFamily.PoppinRegular,
    fontSize: fontSizes.size16,
    color: COLOR.White,
    fontWeight: fontWeight.weight400,
    textAlign: 'center',
    alignSelf: 'flex-start',
    marginLeft: pixel.spacing32,
  },
  checkBoxHolder: {
    width: '100%',
    paddingHorizontal: pixel.spacing24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputHolder: {
    width: '100%',
    paddingHorizontal: pixel.spacing30,
  },
  buttonStyle: {
    backgroundColor: COLOR.Primary,
    padding: pixel.spacing30,
    borderRadius: pixel.spacing20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  rememberMe: {
    color: COLOR.Grey500,
    fontFamily: 'Poppins-Regular',
    fontSize: fontSizes.size15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: pixel.spacing4,
  },
  DrememberMe: {
    color: COLOR.White,
    fontFamily: 'Poppins-Regular',
    fontSize: fontSizes.size15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: pixel.spacing4,
  },
  forgot: {
    fontFamily: FontFamily.PoppinRegular,
    color: COLOR.Primary,
    fontSize: fontSizes.size15,
  },
});
