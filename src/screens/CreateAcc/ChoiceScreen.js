import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import style from '../../assets/css/style';
import MyContainer from '../../components/MainComponents/MyContainer';
import {colors, fonts, constants} from '../../constraints';
import {
  ArrowBack,
  Buyer,
  Group,
  Main,
  Seller,
  Vector,
} from '../../assets/images';
import {UpdateUser} from '../../Services/LoginFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
const ChoiceScreen = props => {
  const [firstName, setFirstName] = useState();
  const DATA = [
    {
      id: '0',
      title: 'Seller',
      subTitle: 'Post, Get Ratings, Advice, and sell your home for Top Dollar!',
    },
    {
      id: '1',
      title: 'Buyer',
      subTitle:
        'Browse, Connect with Sellers, Appraise Homes, and find your dream home!',
    },
    {
      id: '2',
      title: 'Browsing',
      subTitle: 'Search homes, Appraise Homes, Give Advice, Explore!',
    },
  ];

  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = {...route.params};
    setFirstName(data.first_name);
    console.log('data.....................', data);
  }, []);

  const Onpress = async i => {
    const data = {...route.params, user_type: i.id};
    setIsLoading(true);
    const user_id = await AsyncStorage.getItem('user_id');
    const updataData = {
      ...data,
      type: 'update_data',
      table_name: 'users',
      id: user_id,
    };
    try {
      const result = await UpdateUser(updataData);
      if (result.data?.result) {
        await AsyncStorage.setItem('user_type', i.id);
        console.log(result.data);
        setIsLoading(false);
      } else {
        Toast.show(result.data.message, Toast.SHORT, ['UIAlertController']);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    switch (i.id) {
      case '0':
        navigation.navigate('TypeScreen', data);
        break;

      case '1':
        navigation.navigate('ActivityType', data);

        break;

      default:
        navigation.reset({
          index: 0,
          routes: [{name: 'Tabs'}],
        });

        await AsyncStorage.setItem('user_type', '2');
        // navigation.navigate('Tabs')
        break;
    }
  };

  return (
    <MyContainer loader={isLoading}>
      <View
        style={[
          style.layout,
          style.headerView,
          {marginTop: global.statusBarHeight},
        ]}>
        <Main />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', paddingLeft: 15}}>
          <ArrowBack />
        </TouchableOpacity>
        <Text style={style.headerText}>Hi {firstName}!</Text>
        <Text style={[style.subHeader]}>What are you looking to do?</Text>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => Onpress(item)}>
                <View style={[style.flexRow, style.justify1, styles.card]}>
                  {item.id == '1' ? (
                    <Seller />
                  ) : item.id == '2' ? (
                    <Buyer />
                  ) : (
                    <Group />
                  )}
                  <View style={{width: '60%'}}>
                    <Text style={[style.emailText]}>{item.title}</Text>
                    <Text style={styles.subHeader}>{item.subTitle}</Text>
                  </View>
                  <Vector />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MyContainer>
  );
};

export default ChoiceScreen;

const styles = StyleSheet.create({
  subHeader: {
    fontFamily: fonts.InterRegular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.lightblack,
    marginBottom: 10,
  },
  card: {
    marginTop: 5,
    padding: 15,
    borderColor: colors.lightGray,
    borderRadius: 5,
    borderWidth: 1,
  },
});
