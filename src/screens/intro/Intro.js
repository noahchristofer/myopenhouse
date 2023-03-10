import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
//  import { SliderBox } from "react-native-image-slider-box";
import style from '../../assets/css/style';
import Button from '../../components/MainComponents/Button';
import MyContainer from '../../components/MainComponents/MyContainer';
import {colors, fonts, images} from '../../constraints';
import Swiper from 'react-native-swiper';
import {Logo1} from '../../assets/images';

const Intro = props => {
  const navigation = useNavigation();
  const [image, setImage] = useState([]);
  //  const images = [
  //   // require('../../assets/images/logo2.png'),
  //   // require('../../assets/images/logo2.png'),
  //   // require('../../assets/images/logo2.png'),
  //     "https://images1.epochhk.com/pictures/112999/Fotolia_61981708_Subscription_L@1200x1200.jpg",
  //     "https://i1.read01.com/SIG=3d308k4/304a3259317255786a6f.jpg",
  //     "https://images1.epochhk.com/pictures/112999/Fotolia_61981708_Subscription_L@1200x1200.jpg",
  //     "https://i1.read01.com/SIG=3d308k4/304a3259317255786a6f.jpg"

  // ]
  // setImage(images)
  return (
    <MyContainer>
      <View style={style.layout}>
        <Swiper
          style={styles.wrapper}
          dotStyle={{width: 35, height: 5}}
          activeDotStyle={{width: 35, height: 5}}
          activeDotColor={'#192252'}>
          <View style={styles.slide1}>
            <Logo1 />
          </View>
          <View style={styles.slide1}>
            <Logo1 />
          </View>
          <View style={styles.slide1}>
            <Logo1 />
          </View>
        </Swiper>
        <View style={styles.headerView}>
          <Text style={styles.header}>Peace be to this House!</Text>
          <Text style={styles.subHeader}>
            Everything you need to sell your home for top dollar.
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 25}}>
        <Button
          title={'Get Started'}
          ButtonStyle={{marginBottom: Platform.OS ? 30 : 20}}
          onPress={() => navigation.navigate('Welcome')}
        />
      </View>
    </MyContainer>
  );
};

export default Intro;

const styles = StyleSheet.create({
  header: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 36,
    lineHeight: 46,
    color: colors.dark,
  },
  dot: {
    width: 35,
    height: 5,
    borderRadius: 2,
    marginHorizontal: -8,
    padding: 0,
    margin: 0,
  },
  subHeader: {
    fontFamily: fonts.urbanistregular,
    fontSize: 16,
    lineHeight: 26,
  },
  box: {
    position: 'absolute',
    bottom: -10,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  headerView: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  wrapper: {
    height: '70%',
  },
});
