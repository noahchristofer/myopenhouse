import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Icon} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  StyleSheet,
  SectionList,
  RefreshControl,
} from 'react-native';

import style from '../../assets/css/style';
import MyContainer from '../../components/MainComponents/MyContainer';
import MyTextInput from '../../components/MainComponents/MyTextInput';
import SearchItem from '../../components/MainComponents/SearchItem';
import {colors, constants} from '../../constraints';
import {UpdateUser} from '../../Services/LoginFunctions';
import Toast from 'react-native-simple-toast';
import {ImageNoPreview} from '../../components/General';
import AlertModal from '../../components/MainComponents/AlertModal';

const Favorites = props => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastId, setLastId] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // const [userType,setUserType]=useState('')

  // const getUser=async()=>{
  //   let typeUser= await AsyncStorage.getItem('user_type')
  //   setUserType(typeUser)
  //   if (typeUser==2) {
  //     alert('As a browser account you are not allowed to have favorites record')
  //   }
  // }
  // useEffect(()=>{
  //   getUser()
  // },[])

  const getData = async arg => {
    setRefreshing(true);
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 1 || getType == 0) {
      const user_id = await AsyncStorage.getItem('user_id');
      let _data = {
        type: 'get_data',
        table_name: 'favourites',
        user_id: user_id,
      };
      if (arg == 'search') {
        _data = {..._data, search: search};
      }
      try {
        const result = await UpdateUser(_data);
        if (result.data?.data) {
          setData(result.data.data);
        } else {
          setData([]);
        }
        setRefreshing(false);
        setIsLoading(false);
      } catch (error) {
        setRefreshing(false);
        setIsLoading(false);
      }
    } else {
      setAlert(true);
      // Toast.show(constants.alertType, Toast.SHORT, [
      //   'UIAlertController',
      // ]);
      setRefreshing(false);
      setIsLoading(false);
    }
  };
  const getMoreData = async () => {
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 1 || getType == 0) {
      const user_id = await AsyncStorage.getItem('user_id');
      let updateData = {
        type: 'get_data',
        table_name: 'favourites',
        user_id: user_id,
      };
      if (arg == 'search') {
        updateData = {...updateData, search: search};
      }
      try {
        const result = await UpdateUser({...updateData, last_id: lastId});
        if (result.data.data) {
          setData([...data, ...result.data.data]);
          setLastId(lastId + 1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {
        setLastId(1);
      };
    }, []),
  );

  const heartPress = async item => {
    const user_id = await AsyncStorage.getItem('user_id');
    const sendData = {
      type: 'like_dislike',
      user_id: user_id,
      to_id: item.listing.id,
      like_type: 'listing',
      status: 'like',
    };
    let data2 = data.filter(x => x.id !== item.id);
    setData(data2);
    try {
      await UpdateUser(sendData);
    } catch (error) {}
  };

  useEffect(() => {
    if (!search) {
      getData();
    }
  }, [search]);

  const searchText = () => {
    if (search !== '') {
      getData('search');
    } else {
      console.log('run nnnnnn');
    }
  };

  const [alert, setAlert] = useState(false);

  return (
    <>
      <AlertModal visible={alert} hideModal={() => setAlert(false)} />
      <MyContainer headerExist mainHeader HeaderTitle={'Favorites'}>
        <View style={[style.layout, style.headerView, {marginTop: 20}]}>
          <MyTextInput
            search={searchText}
            searchStyle={{margin: 10}}
            placeholder={'search'}
            placeholderTextColor={colors.darkGray}
            containerStyle={style.inputContainerStyle}
            inputStyle={[style.inputInnerStyle, {width: '85%'}]}
            onChangeText={text => setSearch(text)}
            value={search}
            returnKeyType={'search'}
            onSubmitBtn={searchText}
          />
          <View style={[{height: '92%'}]}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              onEndReached={() => {
                getMoreData();
              }}
              onEndReachedThreshold={0.5}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    getData();
                  }}
                />
              }
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <SearchItem
                    favorite
                    heartPress={() => heartPress(item)}
                    img={item?.to_user?.image || ''}
                    image={item?.listing?.image}
                    name={item?.to_user?.first_name || ''}
                    address={item?.listing?.address || ''}
                    bath={item?.listing?.baths || ''}
                    beds={item?.listing?.beds || ''}
                    size={item.listing?.home_sqft || ''}
                    price_range={item?.listing?.price_range || ''}
                  />
                );
              }}
            />
            {!isLoading && data.length == 0 ? (
              <ImageNoPreview title={'No Listing yet'} />
            ) : null}
          </View>
        </View>
      </MyContainer>
    </>
  );
};

export default Favorites;
const styles = StyleSheet.create({
  itemView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: colors.gray,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    marginRight: 10,
  },
  itemText: {
    marginVertical: 0,
    marginHorizontal: 5,
    fontSize: 12,
  },
});
