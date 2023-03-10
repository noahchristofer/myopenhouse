import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PermissionsAndroid } from 'react-native';
import Toast from 'react-native-simple-toast';

import style from '../../assets/css/style';
import { colors, constants, fonts } from '../../constraints';

import MyContainer from '../../components/MainComponents/MyContainer';
import Header2 from '../../components/MainComponents/Header2';
import CardItem from '../../components/MainComponents/CardItem';
import ConnectModal from '../../components/MainComponents/ConnectModal';
import OfferModal from '../../components/MainComponents/OfferModal';
import { UpdateUser } from '../../Services/LoginFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import { ImageNoPreview } from '../../components/General';
import AlertModal from '../../components/MainComponents/AlertModal';

const Home = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    // const getLocation=async()=>{
    //   try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     {
    //       'title': 'openHouse',
    //       'message': 'openHouse access to your location '
    //     }
    //   )
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     Geolocation.getCurrentPosition(
    //       (position) => {
    //         setLocation({lat:position.coords.latitude,lng:position.coords.longitude})
    //       },
    //       (error) => {
    //         console.log(error.code, error.message);
    //       },
    //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000,showLocationDialog:true	 }
    //   );
    //   } else {
    //     Toast.show('Location permission denied', Toast.SHORT, [
    //       'UIAlertController',
    //     ])}
    // } catch (err) {
    //   console.warn(err)
    // }
    // }
    // getLocation()
    permissionAndroid();
  }, []);

  const permissionAndroid = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
      setTimeout(() => {
        getCurrentLocation();
      }, 1000);
    }
  };

  const getCurrentLocation = async () => {
    if (Platform.OS !== 'android') {
      Geolocation.requestAuthorization('always').then(res => {
        console.log(res);
      });
    }
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const [selectedId, setSelectedId] = useState(0);
  const [selectedCity, setSelectedCity] = useState('');
  const [connectModalVisible, setConnectModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [ids, setIds] = useState({});
  const [headerLocation, setHeaderLocation] = useState('');
  const [lastId, setLastId] = useState(1);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (headerLocation == '2') {
      getData('near', selectedCity);
    } else {
      getData('popular', selectedCity);
    }
  }, [headerLocation]);

  const getData = async (arg, city) => {
    setRefreshing(true);
    const getType = await AsyncStorage.getItem('user_type');
    const user_id = await AsyncStorage.getItem('user_id');
    let updateData = {};
    if (arg == 'popular') {
      updateData = {
        type: 'get_data',
        table_name: 'listing',
        sort: arg,
        city: city || '',
      };
    } else if (arg == 'near') {
      updateData = {
        type: 'get_data',
        table_name: 'listing',
        sort: arg,
        lat: location.lat,
        lng: location.lng,
        city: city,
      };
    }
    if (getType == 0 || (getType == 1 && !user_id)) {
      updateData = { ...updateData, user_id: user_id };
    }
    try {
      const result = await UpdateUser(updateData);
      if (result.data?.data) {
        setData(result.data.data);
        setRefreshing(false);
        setIsLoading(false);
      } else {
        setData([]);
        setRefreshing(false);
        setIsLoading(false);
      }
    } catch (error) {
      setRefreshing(false);
      setIsLoading(false);
    }
  };
  const getMoreData = async (arg, city) => {
    let updateData = {};

    const getType = await AsyncStorage.getItem('user_type');
    const user_id = await AsyncStorage.getItem('user_id');

    if (arg == 'popular') {
      updateData = {
        type: 'get_data',
        table_name: 'listing',
        sort: arg,
        city: city || '',
      };
    } else if (arg == 'near') {
      updateData = {
        type: 'get_data',
        table_name: 'listing',
        sort: arg,
        lat: location.lat,
        lng: location.lng,
        city: city || '',
      };
    }
    if (getType == 0 || (getType == 1 && !user_id)) {
      updateData = { ...updateData, user_id: user_id };
    }

    try {
      const result = await UpdateUser({ ...updateData, last_id: lastId });
      console.log('running', lastId);
      if (result.data?.data) {
        setLastId(lastId + 1);
        setData([...data, ...result.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUniqueArray = array => {
    var uniqueArray = [];
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  };

  const getCitiesData = async () => {
    let data = { type: 'get_data', table_name: 'listing' };
    try {
      const result = await UpdateUser(data);
      if (result.data?.data) {
        var res = result?.data?.data.map(({ city }) => city);
        setCities(['All', ...getUniqueArray(res)]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCitiesData();
  }, []);

  const HideConnectModal = () => {
    setConnectModalVisible(false);
  };
  const HideOfferModal = () => {
    setOfferModalVisible(false);
  };
  const sendConnection = async msg => {
    const user_id = await AsyncStorage.getItem('user_id');
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 1 || getType == 0) {
      setLoading(true);
      const data = { type: 'sendmsg', u_id: user_id, to_id: ids.to_id, msg: msg };
      try {
        const result = await UpdateUser(data);
        if (result.data?.result) {
          console.log(result.data);
          Toast.show('Message sent succefully', Toast.SHORT, [
            'UIAlertController',
          ]);
          HideConnectModal();
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      setConnectModalVisible(false);
      setAlert(true);
      // Toast.show(constants.alertType, Toast.SHORT, [
      //   'UIAlertController',
      // ])
      setLoading(false);
    }
  };
  const sendOffer = async arg => {
    const user_id = await AsyncStorage.getItem('user_id');
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 1 || getType == 0) {
      setLoading(true);
      const data = {
        type: 'add_data',
        table_name: 'offers',
        user_id: user_id,
        listing_id: ids.listingId,
        ...arg,
      };
      try {
        const result = await UpdateUser(data);
        if (result.data?.result) {
          Toast.show('Custom Offer send', Toast.SHORT, ['UIAlertController']);
          HideOfferModal();
          setLoading(false);
        } else {
          console.log(result.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setOfferModalVisible(false);
      setAlert(true);
      // Toast.show(constants.alertType, Toast.SHORT, [
      //   'UIAlertController',
      // ])
    }
  };
  const idsCollector = (list, user, to_id) => {
    setIds({ listingId: list, userId: user, to_id: to_id });
  };
  const heartPress = async item => {
    const user_id = await AsyncStorage.getItem('user_id');
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 1 || getType == 0) {
      const sendData = {
        type: 'like_dislike',
        user_id: user_id,
        to_id: item.id,
        like_type: 'listing',
        status: 'like',
      };
      let data2 = data.findIndex(x => x.id === item.id);
      if (item.favourite == 'like') {
        data[data2].favourite = 'null';
      } else {
        data[data2].favourite = 'like';
      }
      setData(data);
      setRefresh(pre => !pre);
      try {
        await UpdateUser(sendData);
      } catch (error) { }
    } else {
      setAlert(true);
      // Toast.show(constants.alertType, Toast.SHORT, [
      //   'UIAlertController',
      // ])
    }
  };

  const getCitiesListing = (index, arg) => {
    setSelectedId(index);
    setSelectedCity(arg);
    if (arg !== 'All') {
      getData(headerLocation == '1' ? 'popular' : 'near', arg);
    } else {
      getData(headerLocation == '1' ? 'popular' : 'near', (arg = ''));
    }
  };

  return (
    <>
      <AlertModal visible={alert} hideModal={() => setAlert(false)} />
      <MyContainer>
        <Header2 locationId={setHeaderLocation} />
        <View style={[style.layout]}>
          <View
            style={[
              style.headerView1,
              { borderBottomWidth: 0.5, borderColor: colors.lightGray },
            ]}>
            <FlatList
              data={cities}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                const backgroundColor = index === selectedId ? true : false;
                return (
                  <TouchableOpacity
                    onPress={() => getCitiesListing(index, item)}>
                    <View>
                      <Text
                        style={[
                          styles.headerText,
                          {
                            color: backgroundColor
                              ? colors.dark
                              : colors.lighterGray,
                          },
                        ]}>
                        {item}
                      </Text>
                      <View
                        style={[
                          styles.headerLine,
                          {
                            borderBottomColor: backgroundColor
                              ? colors.dark
                              : colors.white,
                          },
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
              extraData={selectedId}
            />
          </View>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            onEndReached={() => {
              getMoreData(headerLocation == '1' ? 'popular' : 'near');
            }}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  getCitiesData();
                  getData(
                    headerLocation == '1' ? 'popular' : 'near',
                    selectedCity,
                  );
                }}
              />
            }
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <CardItem
                  image={item.user.image}
                  favourite={item.favourite}
                  heartPress={() => heartPress(item)}
                  detailPress={() => navigation.navigate('Detail', item)}
                  onPressConnect={() => {
                    idsCollector(item.id, item.user_id, item?.user?.id);
                    setConnectModalVisible(true);
                  }}
                  onPressOffer={() => {
                    idsCollector(item.id, item.user_id, item?.user?.id);
                    setOfferModalVisible(true);
                  }}
                  beds={item.beds || 0}
                  baths={item.baths || 0}
                  priceRange={item.price_range}
                  sqft={item.home_sqft}
                  img={item.thumb}
                  name={`${item.user.first_name} ${item.user.last_name}`}
                  address={item.address}
                />
              );
            }}
            extraData={refresh}
          />
          {!isLoading && data.length == 0 ? (
            <ImageNoPreview title={'No Listing yet'} />
          ) : null}
        </View>
      </MyContainer>
      <ConnectModal
        loading={loading}
        visible={connectModalVisible}
        hideModal={HideConnectModal}
        sendConnect={sendConnection}
      />
      <OfferModal
        loading={loading}
        visible={offerModalVisible}
        hideModal={HideOfferModal}
        sendOffer={sendOffer}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.UrbanistBold,
    color: colors.dark,
    fontSize: 16,
    lineHeight: 26,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  headerLine: {
    borderBottomWidth: 2,
    width: '100%',
    marginTop: 15,
  },
});
