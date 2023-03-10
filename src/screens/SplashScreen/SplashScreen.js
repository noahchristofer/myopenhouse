import React, { useEffect, useState } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { colors, images, fonts } from '../../constraints';
import LinearGradient from 'react-native-linear-gradient';
import Splash_logo from '../../assets/images/splash_logo.svg';
import style from '../../assets/css/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SplashScreen = () => {
  const [userId, setUser] = useState('');
  const navigation = useNavigation();

  const getUserId = async () => {
    let user_id = await AsyncStorage.getItem('user_id');
    setUser(
      user_id,
      setTimeout(() => {
        if (user_id) {
          navigation.replace('Tabs');
        } else {
          navigation.replace('Intro');
          console.log(userId);
        }
      }, 2000),
    );
  };

  useEffect(() => {
    getUserId();
    // GoogleSignin.configure({
    //     webClientId: '762973691348-kvqomb5hri8eb09ksgaq11suq0p00l9c.apps.googleusercontent.com',
    //   });
  }, []);
  return (
    <LinearGradient
      colors={['#00DBFF', '#10A5F5', '#10A5F5']}
      //   colors={['white', 'white', 'white']}
      style={style.splashBg}>
      <StatusBar hidden={true} />
      <Splash_logo />
      {/* <Image source={require('../../assets/images/SplashLogo.png')} style={{width:'81%',height:150,resizeMode:'contain'}}/> */}
    </LinearGradient>
  );
};
export default SplashScreen;
