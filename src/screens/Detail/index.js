import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';

import style from '../../assets/css/style';
import { colors, constants, fonts, images } from '../../constraints';

import MyContainer from '../../components/MainComponents/MyContainer';
import ModalDropdown from 'react-native-modal-dropdown';
import { Back, BlueCross, Down } from '../../assets/images';
import { Icon } from '@rneui/base';
import Button from '../../components/MainComponents/Button';
import Info from '../../components/MainComponents/Info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateUser } from '../../Services/LoginFunctions';
import ConnectModal from '../../components/MainComponents/ConnectModal';
import OfferModal from '../../components/MainComponents/OfferModal';
import AlertModal from '../../components/MainComponents/AlertModal';
import MyTextInput from '../../components/MainComponents/MyTextInput';
import DropDownPicker from 'react-native-dropdown-picker';

const Detail = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [infoView, setInfoView] = useState(false);
  const [image, setImage] = useState([]);
  const [favourite, setFavourite] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [askingPrice, setAskingPrice] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: 'Bedroom', value: 'Bedroom' },
    { label: 'Bathroom', value: 'Bathroom' },
    { label: 'Kitchen', value: 'Kitchen' },
    { label: 'Addition', value: 'Addition' },
    { label: 'Attic', value: 'Attic' },
    { label: 'Basement', value: 'Basement' },
    { label: 'Floors', value: 'Floors' },
    { label: 'Office', value: 'Office' },
    { label: 'Garage', value: 'Garage' },
  ]);


  const [connectModalVisible, setConnectModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);

  const DATA = [
    {
      id: '1',
      title: 'Kitchen remodel',
    },
    {
      id: '2',
      title: 'floors',
    },
  ];
  useEffect(() => {
    if (route.params.image !== '') {
      setImage(JSON.parse(route.params?.image));
    } else {
      setImage([]);
    }
    setFavourite(route.params.favourite);
  }, [route]);
  useLayoutEffect(() => {
    if (typeof route.params.renovation == String) {
      setItems(JSON.parse(route.params.renovation).map(item => ({ label: item, value: item })))
    } else {
      setItems(route.params.renovation.map(item => ({ label: item, value: item })))
    }
  }, [route]);

  const heartPress = async () => {
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 1 || getType == 0) {
      const user_id = await AsyncStorage.getItem('user_id');
      const sendData = {
        type: 'like_dislike',
        user_id: user_id,
        to_id: route.params.id,
        like_type: 'listing',
        status: 'like',
      };
      if (favourite == 'like') {
        setFavourite('null');
      } else {
        setFavourite('like');
      }
      try {
        await UpdateUser(sendData);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Toast.show(constants.alertType, Toast.SHORT, [
      //   'UIAlertController',
      // ]);
      setAlert(true);
    }
  };

  const sendOffer = async arg => {
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 1 || getType == 0) {
      setIsLoading(true);
      const user_id = await AsyncStorage.getItem('user_id');
      const data = {
        type: 'add_data',
        table_name: 'offers',
        user_id: user_id,
        listing_id: route.params?.id,
        ...arg,
      };
      try {
        const result = await UpdateUser(data);
        if (result.data?.result) {
          Toast.show('Custom Offer send', Toast.SHORT, ['UIAlertController']);
          HideOfferModal();
          setIsLoading(false);
        } else {
          console.log(result.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      // Toast.show(constants.alertType, Toast.SHORT, [
      //   'UIAlertController',
      // ]);
      setAlert(true);
    }
  };

  const sendConnection = async msg => {
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 1 || getType == 0) {
      setIsLoading(true);
      const user_id = await AsyncStorage.getItem('user_id');
      const data = {
        type: 'sendmsg',
        u_id: user_id,
        to_id: route.params?.user?.id,
        msg: msg,
      };
      try {
        const result = await UpdateUser(data);
        if (result.data?.result) {
          console.log(result.data);
          Toast.show('Message sent succefully', Toast.SHORT, [
            'UIAlertController',
          ]);

          HideConnectModal();
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      // Toast.show(constants.alertType, Toast.SHORT, [
      //   'UIAlertController',
      // ]);
      setAlert(true);
    }
  };

  const HideConnectModal = () => {
    setConnectModalVisible(false);
  };
  const HideOfferModal = () => {
    setOfferModalVisible(false);
  };
  const submitBtn = async () => {
    if (value.length == 0) return Toast.show('Please Select any renovations', Toast.SHORT, [
      'UIAlertController',
    ]);
    if (!askingPrice) return Toast.show('Please Select any Appraise price', Toast.SHORT, [
      'UIAlertController',
    ]);
    setIsLoading(true);
    const user_id = await AsyncStorage.getItem('user_id');
    const data = {
      type: 'add_data',
      user_id: user_id,
      table_name: "appraisals",
      listing_id: route.params.id,
      renovations_selected: JSON.stringify(value),
      appraisal_price: askingPrice
    };
    try {
      console.log(data)
      const result = await UpdateUser(data);
      if (result.data?.result) {
        console.log(result.data);
        Toast.show('Apprasial has been submitted', Toast.SHORT, [
          'UIAlertController',
        ]);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }

  }

  return (
    <>
      <AlertModal visible={alert} hideModal={() => setAlert(false)} />
      <MyContainer loader={isLoading}>
        <View style={[style.layout]}>
          <View>
            {image.length !== 0 ? (
              <FlatList
                data={image}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                  console.log(typeof ('itemmmmm', item));
                  return (
                    <Image
                      source={{ uri: `${constants.imageLink}${item}` }}
                      style={{
                        width: 370,
                        height: 326,
                        marginHorizontal: 8,
                        backgroundColor: colors.lightGray,
                      }}
                    />
                  );
                }}
              />
            ) : (
              <View
                style={[
                  style.justify,
                  {
                    width: 370,
                    height: 326,
                    marginHorizontal: 8,
                    backgroundColor: colors.lightGray,
                  },
                ]}>
                <Icon type="entypo" name="image" size={180} />
              </View>
            )}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: 'absolute',
                left: 10,
                marginTop: Platform.OS === 'ios' ? global.statusBarHeight : 12,
              }}>
              <Back />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.starView,
                {
                  marginTop:
                    Platform.OS === 'ios' ? global.statusBarHeight : 10,
                },
              ]}
              onPress={heartPress}>
              {favourite == 'like' ? (
                <Icon name="heart" type="entypo" size={26} color={colors.red} />
              ) : (
                <Icon name="heart-outlined" type="entypo" size={26} />
              )}
            </TouchableOpacity>
          </View>

          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={style.headerView}>
              <View
                style={[style.flexRow, { alignItems: 'center', marginTop: 10 }]}>
                {route.params?.user?.image ? (
                  <Image
                    source={{
                      uri: `${constants.imageLink}${route.params?.user?.image}`,
                    }}
                    style={styles.avatar}
                  />
                ) : (
                  <View
                    style={[
                      styles.avatar,
                      {
                        backgroundColor: colors.lightGray,
                        justifyContent: 'center',
                      },
                    ]}>
                    <Icon type="antdesign" name="user" size={18} />
                  </View>
                )}
                <Text style={styles.headerText}>
                  {`${route.params?.user?.first_name} ${route.params?.user?.last_name}`}
                </Text>
              </View>
              <Text style={styles.subHeader}>
                {route.params?.description || ""}
              </Text>
              <View style={[style.flexRow, style.justify]}>
                <Text style={styles.amountText}>${route.params?.askingPrice || ""}</Text>
                <Text style={styles.subHeader}>{` Seller’s Asking price`}</Text>
              </View>
              {/* <Text style={styles.subHeader}>OMV</Text>
              <Text style={styles.heading}>$750,000</Text> */}
              <Text style={styles.heading2}>Appraise My Home!</Text>
              <MyTextInput
                placeholder={"Appraise Price"}
                placeholderTextColor={colors.darkGray}
                containerStyle={[style.inputContainerStyle]}
                inputStyle={[style.inputInnerStyle]}
                keyboardType={"numeric"}
                onChangeText={(text) => setAskingPrice(text)}
                value={askingPrice} />

              {/* <ModalDropdown
                defaultValue={'$800k - $1000k'}
                options={['$200k - $400k', '$600k - $800k', '$800k - $1000k']}
                style={[style.inputContainerStyle]}
                textStyle={[style.dropDownText, { color: colors.darkBlack }]}
                dropdownStyle={[style.dropDownView, { width: '92%' }]}
                dropdownTextStyle={style.dropDownText}
                dropdownTextHighlightStyle={{ color: colors.primaryColor }}>
                {/* <View style={[style.flexRow,style.justify2,{width:'80%'}]}>
                    <Text style={style.dropDownText}>
                    $800k - $1000k
                    </Text>
                    <Down/>
                    </View> */}
              {/* </ModalDropdown> */}

              <Text style={styles.heading2}>
                What Would Make You Pay Top Dollar?
              </Text>

              <DropDownPicker
                open={open}
                placeholder="Please Select..."
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                mode="BADGE"
                zIndex={3000}
                zIndexInverse={1000}
                dropDownContainerStyle={{
                  borderColor: colors.lightGray,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                }}
                itemSeparator
                itemSeparatorStyle={{
                  backgroundColor: colors.lightGray,
                }}
                style={{
                  borderColor: colors.lightGray,
                }}
                selectedItemContainerStyle={{
                  backgroundColor: colors.lightestPrimary,
                }}
                listItemLabelStyle={{
                  textTransform: 'capitalize',
                }}
                selectedItemLabelStyle={{
                  fontWeight: 'bold',
                  color: colors.primaryColor,
                }}
                badgeDotColors={['#e76f51']}
              />
              {/* <ModalDropdown
                defaultValue={'2 Marked'}
                options={['2 Marked', '2 Marked', '3 Marked']}
                style={style.inputContainerStyle}
                textStyle={[style.dropDownText, { color: colors.darkBlack }]}
                dropdownStyle={[style.dropDownView, { width: '92%' }]}
                dropdownTextStyle={style.dropDownText}
                dropdownTextHighlightStyle={{ color: colors.primaryColor }}> */}
              {/* <View style={[style.flexRow,style.justify2,{width:'80%'}]}>
                    <Text style={style.dropDownText}>
                      2 Markedgjghjg
                    </Text>
                    <Down/>
                    </View>         */}
              {/* </ModalDropdown> */}
              {/* 
              <FlatList
                data={DATA}
                horizontal
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  return (
                    <View style={[style.flexRow, styles.itemView]}>
                      <Icon name="plus" type="entypo" size={14} />
                      <Text style={[style.emailText, styles.itemText]}>
                        {item.title}
                      </Text>
                      <BlueCross />
                    </View>
                  );
                }}
              /> */}
              <Button title={'Submit'} onPress={submitBtn} />
              {/* {!infoView ? (
                <TouchableOpacity onPress={() => setInfoView(true)}>
                  <Text
                    style={[
                      style.topMargin,
                      styles.subHeader,
                      styles.infoText,
                    ]}>
                    More Info
                  </Text>
                  <View style={[style.justify]}>
                    <Down />
                  </View>
                </TouchableOpacity>
              ) : (
                <Info />
              )} */}
              <View style={{ marginVertical: 15 }}>
                <Button
                  green
                  document
                  ButtonStyle={{ height: 50 }}
                  title={'Make An Offer'}
                  textStyle={{ paddingLeft: 5 }}
                  onPress={() => setOfferModalVisible(true)}
                />
                <Button
                  orange
                  tick
                  title={'Message'}
                  ButtonStyle={{ height: 50 }}
                  textStyle={{ paddingLeft: 5 }}
                  onPress={() => setConnectModalVisible(true)}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </MyContainer>
      <ConnectModal
        visible={connectModalVisible}
        hideModal={HideConnectModal}
        sendConnect={sendConnection}
      />
      <OfferModal
        visible={offerModalVisible}
        hideModal={HideOfferModal}
        sendOffer={sendOffer}
      />
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    fontFamily: fonts.UrbanistBold,
    // fontWeight:'bold',
    lineHeight: 26,
    fontSize: 24,
    color: colors.dark,
    paddingLeft: 10,
  },
  subHeader: {
    fontFamily: fonts.urbanistregular,
    fontSize: 12,
    lineHeight: 22,
    color: colors.solidGray,
    marginVertical: 10,
  },
  amountText: {
    fontFamily: fonts.UrbanistBold,
    // fontWeight:'bold',
    fontSize: 23,
    lineHeight: 30,
    marginVertical: 5,
    color: colors.purple,
  },
  heading: {
    fontFamily: fonts.InterBold,
    fontSize: 16,
    lineHeight: 19,
    color: colors.darkBlack,
  },
  heading2: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 14,
    lineHeight: 26,
    color: colors.dark,
    // fontWeight:'700'
  },
  itemView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.lighter,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 10,
    marginRight: 10,
    height: 32,
    padding: 5,
    paddingHorizontal: 9,
  },
  itemText: {
    marginVertical: 0,
    marginHorizontal: 5,
    fontSize: 14,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
  },
  starView: {
    position: 'absolute',
    backgroundColor: colors.white,
    padding: 7,
    borderRadius: 10,
    margin: 10,
    right: 0,
  },
});
