import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import style from '../../../assets/css/style';
import MyContainer from '../../../components/MainComponents/MyContainer';
import {colors, fonts, constants} from '../../../constraints';
import {
  ArrowBack,
  BlueHome,
  Buyer,
  Group,
  HomeType,
  Main,
  RedHome,
  Seller,
  Vector,
} from '../../../assets/images';
import {Icon} from '@rneui/base';
import Button from '../../../components/MainComponents/Button';

const TypeScreen = props => {
  const DATA = [
    {
      id: '1',
      title: 'Single Family Home',
      subTitle: 'From tours to offer, help is only a tap away',
    },
    {
      id: '2',
      title: 'Multi Family Home',
      subTitle: 'From tours to offer, help is only a tap away',
    },
  ];

  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [active, setActive] = useState('');
  const route = useRoute();

  useEffect(() => {
    if (selectedId) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selectedId]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    route.params?.update ? setUpdate(true) : setUpdate(false);
  }, [route]);

  useEffect(() => {
    if (route.params?.update) {
      setSelectedId(
        route.params.data.estate_type === 'Single Family Home' ? '1' : '2',
      );
      setSelectedTitle(route.params.data.estate_type);
    }
  }, [route]);

  const handleSubmit = () => {
    update
      ? navigation.navigate('ReviewSeller', {
          ...route.params.data,
          estate_type: selectedTitle,
        })
      : navigation.navigate('Purchase', {
          ...route.params,
          estate_type: selectedTitle,
        });
  };

  return (
    <MyContainer headerExist BgColor={colors.light}>
      <View style={[style.layout]}>
        <View style={{backgroundColor: colors.light, padding: 15}}>
          <HomeType />
          <Text style={style.headerText1}>
            Select the type of real estate you're interested in selling.
          </Text>
        </View>
        <View style={{padding: 15}}>
          <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              const backgroundColor = item.id === selectedId ? true : false;
              return (
                <TouchableOpacity
                  // style={style.shadow}
                  onPress={() => {
                    setSelectedId(item.id);
                    setSelectedTitle(item.title);
                  }}>
                  <View style={[style.flexRow, style.justify1, styles.card]}>
                    {item.id === '1' ? <RedHome /> : <BlueHome />}
                    <View style={{width: '60%'}}>
                      <Text style={[style.emailText]}>{item.title}</Text>
                      <Text style={styles.subHeader}>{item.subTitle}</Text>
                    </View>
                    {backgroundColor ? (
                      <Icon
                        name="dot-circle"
                        type="font-awesome-5"
                        color={colors.primaryColor}
                      />
                    ) : (
                      <Icon
                        name="circle"
                        type="entypo"
                        color={colors.darkGray}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
            extraData={selectedId}
          />
        </View>
      </View>
      <View style={[style.topMargin, {marginHorizontal: 10}]}>
        <Button
          title={update ? 'Update' : 'Continue'}
          ButtonStyle={styles.buttonView1}
          disabled={!active}
          onPress={handleSubmit}
          textStyle={{color: active ? colors.white : colors.skyDark}}
        />
      </View>
    </MyContainer>
  );
};

export default TypeScreen;

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
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonView1: {
    borderRadius: 10,
    marginBottom: Platform.OS ? 30 : 20,
  },
});
