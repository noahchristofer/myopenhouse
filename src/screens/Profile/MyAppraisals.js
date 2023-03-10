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
  ActivityIndicator,
  Image,
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
import { Icon } from '@rneui/base';

const MyAppraisals = props => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const [selectedCity, setSelectedCity] = useState('');
  const [connectModalVisible, setConnectModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [headerLocation, setHeaderLocation] = useState('');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const user_id = await AsyncStorage.getItem('user_id');
    const _data = {
      type: "get_data",
      table_name: "appraisals",
      user_id: user_id
    }
    try {
      const result = await UpdateUser(_data);
      console.log(result.data.data)
      if (result.data?.data) {
        setData(result.data.data);
        setIsLoading(false);
      } else {
        setData([]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };


  return (
    <>
      <AlertModal visible={alert} hideModal={() => setAlert(false)} />
      <MyContainer headerExist>
        <View style={[style.layout]}>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View style={{ padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.lightGray, marginTop: 20, marginHorizontal: 20 }}>
                  {item.listing.image ? (
                    <TouchableOpacity
                    >
                      <Image
                        source={{ uri: constants.imageLink + JSON.parse(item.listing.image) }}
                        style={{ width: '100%', height: 216, borderRadius: 10 }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                    >
                      <View
                        style={{
                          width: '100%',
                          height: 216,
                          backgroundColor: colors.lightGray,
                          justifyContent: 'center',
                        }}>
                        <Icon type="entypo" name="image" size={150} />
                      </View>
                    </TouchableOpacity>
                  )}
                  <Text style={[style.emailText,]} numberOfLines={1}>Address: <Text style={style.subHeader1}>{item.listing.address}</Text></Text>
                  <Text style={[style.emailText, { marginVertical: 0 }]}>Appraisal Price: <Text style={style.subHeader1}>${item.appraisal_price}</Text></Text>
                </View>
              );
            }}
            extraData={refresh}
          />
          {!isLoading && data.length == 0 ? (
            <ImageNoPreview title={'No Listing yet'} />
          ) : null}
        </View>
      </MyContainer>
    </>
  );
};

export default MyAppraisals;

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
