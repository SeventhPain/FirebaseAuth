// src/translations.js

const translate = {
    en: { 
      signIn: 'Sign In',
      loginWelcomeText: 'to access your account.',
      yourEmail: 'Your Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      rememberMe: 'Remember me',
      login: 'Login',
      register: 'Register',
      dontHaveAnAccount: `Don't  have an account?`,
      signUp: 'Sign Up',
      getStarted: 'Get Started',
      registerWelcomeText: 'by creating a Free Account',
      alreadyHasAnAccount: 'Alreday has an account.',
     },
    my: { 
      signIn: 'လော့ကင်၀င်ပါ',
      loginWelcomeText: 'မင်းရဲ့အကောင့်ထဲသို့ရောက်ရှိရန်။',
      yourEmail: 'မင်းရဲ့အီးမေး',
      password: 'ပါ့စ်ဝှက်',
      confirmPassword: 'ပါ့စ်ဝှက်အတည်ပြု',
      rememberMe: 'မှတ်ထားပါ',
      login: 'လော့ကင်၀င်မည်',
      register: 'အကောင့်ဖွင့်မည်',
      dontHaveAnAccount: `အကောင့်မရှိသေးပါ။`,
      signUp: 'အကောင့်သစ်ဖွင့်မည်',
      getStarted: 'အစပြုပါ',
      registerWelcomeText: 'ဖရီးအကောင့်တစ်ခုလုပ်ပြီး',
      alreadyHasAnAccount: 'အကောင့်ရှိပြီးသားပါ။',
     },
  };
  
  export const getTranslateText = (language, key) => {
    return translate[language][key];
  };
  