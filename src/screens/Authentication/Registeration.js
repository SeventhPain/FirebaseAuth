import React, {useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Pressable,
  StatusBar,
  Alert,
} from 'react-native';
import SPACING from '../../constant/pixel';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import COLOR from '../../constant/color';
import { FontFamily, fontSizes, fontWeight } from '../../constant/font';
import {useSelector, useDispatch} from 'react-redux';
import SizedBox from '../../components/SizedBox';
import assets from '../../assets/IconManager';
import {string_key} from '../../constant/key';
import MandatoryTextInput from '../../components/TextInputBox/MandatoryTextInput';
import ActionButton from '../../components/Button/ActionButton';
import IconManager from '../../assets/IconManager';
import auth from '@react-native-firebase/auth';
import AppLoading from '../../components/Loading';
import AlertDialog from '../../dialog/AlertDialog';
import { getTranslateText } from '../../language/translations';

const Registeration = () => {  // References to hold TextInputComponent instances
  const navigation = useNavigation();
  const textInputRefs = useRef([]);
  const [valuesMandatory, setValueMandatory] = useState([]);
  const [secureTextPass, setSecureTextPass] = useState(true);
  const [secureTextConfirmPass, setSecureTextConfirmPass] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const darkMode = useSelector(state => state.ThemeSlice.appDarkMode);
  const appLanguage = useSelector(state => state.LanguageSlice.language);

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
    isSuccess && navigation.navigate('Login')
  };

  const signUpWithFirebase = (email,password) =>{
    setLoading(true)
    auth().createUserWithEmailAndPassword(email,password).then((val)=>{
      setLoading(false)
      showDialog(`${email}\n has been registered.`,true)
      // navigation.navigate('Login')
    }).catch((error)=>{
      setLoading(false)
      showDialog(`${error.message}`,false)
    })
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const buttonClickAction = async () => {
    const mandatoryValues = getValuesMandatory(); // Invoke the function to get values
    setValueMandatory(mandatoryValues); // Set state with the obtained values
    const inputFieldsEmpty = !checkInputAreValid(mandatoryValues);
    inputFieldsEmpty ? showDialog('Please fill the fields!',false)
    : 
    (validateEmail(mandatoryValues[0]) && mandatoryValues[1] === mandatoryValues[2] 
    ? 
    signUpWithFirebase(mandatoryValues[0],mandatoryValues[1])
    : 
    (validateEmail(mandatoryValues[0]) ? showDialog('Password does not meet requirement!.',false)
    : 
    showDialog('Invalid email format!.',false)));
  };

  const checkInputAreValid = data => {
    return data.every(value => value && value.trim() !== '');
  };


  const secureTextChangePass = () => {
    setSecureTextPass(!secureTextPass);
  };

  const secureTextChangeConfirmPass = () => {
    setSecureTextConfirmPass(!secureTextConfirmPass);
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
        {/* <ThemeSwitch isDarkMode={darkMode} toggleTheme={handleToggleTheme} /> */}
          <View
            style={darkMode ? styles.Dcontainer : styles.container}>
            <SizedBox height={SPACING.spacing70} />
            <Image
              resizeMode="contain"
              source={
                darkMode
                  ? IconManager.login_logo
                  : IconManager.login_logo
              }
              style={styles.imageHeader}
            />
            <Text style={darkMode ? styles.Dtitle : styles.title}>
            {getTranslateText(appLanguage,'getStarted')}
            </Text>
            <SizedBox height={SPACING.spacing4} />
            <Text
              style={darkMode ? styles.Dsubtitle : styles.subtitle}>
              {getTranslateText(appLanguage,'registerWelcomeText')}
            </Text>
            <SizedBox height={SPACING.spacing16} />
            <View style={styles.textInputHolder}>
              <MandatoryTextInput
                ref={ref => (textInputRefs.current[0] = ref)}
                placeholder={getTranslateText(appLanguage,'yourEmail')}
                prefix={true}
                isEmail={true}
                prefixIcon={IconManager.email_light}
              />
            </View>
            <SizedBox height={SPACING.spacing6} />
            <View style={styles.textInputHolder}>
              <MandatoryTextInput
                ref={ref => (textInputRefs.current[1] = ref)}
                placeholder={getTranslateText(appLanguage,'password')}
                prefix={true}
                prefixIcon={IconManager.password_light}
                postfix={true}
                postfixIcon={
                  secureTextPass
                    ? IconManager.secureCloseEye
                    : IconManager.secureOpenEye
                }
                secureText={secureTextPass}
                secureTextChange={secureTextChangePass}
              />
            </View>
            <SizedBox height={SPACING.spacing6} />
            <View style={styles.textInputHolder}>
              <MandatoryTextInput
                ref={ref => (textInputRefs.current[2] = ref)}
                placeholder={getTranslateText(appLanguage,'confirmPassword')}
                prefix={true}
                prefixIcon={IconManager.password_light}
                postfix={true}
                postfixIcon={
                  secureTextConfirmPass
                    ? IconManager.secureCloseEye
                    : IconManager.secureOpenEye
                }
                secureText={secureTextConfirmPass}
                secureTextChange={secureTextChangeConfirmPass}
              />
            </View>
            <SizedBox height={SPACING.spacing8} />
            <AlertDialog visible={dialogVisible} onClose={closeDialog} message={alertMessage} isSuccess={isSuccess} />
            <View style={styles.textInputHolder}>
              <ActionButton
                text={getTranslateText(appLanguage,'register')}
                onPress={() => buttonClickAction()}
              />
            </View>
            <SizedBox height={SPACING.spacing8} />
            <View style={styles.footercontainer}>
              <View style={styles.footer}>
                <Text
                  style={
                    darkMode
                      ? styles.Dfootertext
                      : styles.footertext
                  }>
                  {getTranslateText(appLanguage,'alreadyHasAnAccount')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.pop(1)
                  }}>
                  <Text style={styles.signup}>{getTranslateText(appLanguage,'login')}</Text>
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

export default Registeration;

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
    marginTop: SPACING.spacing10,
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
    width: SPACING.spacing240,
    height: SPACING.spacing240,
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
    marginLeft: SPACING.spacing32,
  },
  Dtitle: {
    fontFamily: FontFamily.PoppinBold,
    color: COLOR.White,
    fontSize: fontSizes.size23,
    fontWeight: fontWeight.weight800,
    alignSelf: 'flex-start',
    marginLeft: SPACING.spacing32,
  },
  subtitle: {
    fontFamily: FontFamily.PoppinRegular,
    fontSize: fontSizes.size16,
    color: COLOR.Grey400,
    fontWeight: fontWeight.weight400,
    textAlign: 'center',
    alignSelf: 'flex-start',
    marginLeft: SPACING.spacing32,
  },
  Dsubtitle: {
    fontFamily: FontFamily.PoppinRegular,
    fontSize: fontSizes.size16,
    color: COLOR.White,
    fontWeight: fontWeight.weight400,
    textAlign: 'center',
    alignSelf: 'flex-start',
    marginLeft: SPACING.spacing32,
  },
  checkBoxHolder: {
    width: '100%',
    paddingHorizontal: SPACING.spacing24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputHolder: {
    width: '100%',
    paddingHorizontal: SPACING.spacing30,
  },
  buttonStyle: {
    backgroundColor: COLOR.Primary,
    padding: SPACING.spacing16,
    borderRadius: SPACING.spacing8,
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
    paddingTop: SPACING.spacing4,
  },
  DrememberMe: {
    color: COLOR.White,
    fontFamily: 'Poppins-Regular',
    fontSize: fontSizes.size15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.spacing4,
  },
  forgot: {
    fontFamily: FontFamily.PoppinRegular,
    color: COLOR.Primary,
    fontSize: fontSizes.size15,
  },
});
