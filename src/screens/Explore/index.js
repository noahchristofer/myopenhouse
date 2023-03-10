import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Icon} from '@rneui/base';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';

import style from '../../assets/css/style';
import {ImageNoPreview} from '../../components/General';
import AlertModal from '../../components/MainComponents/AlertModal';
import MyContainer from '../../components/MainComponents/MyContainer';
import MyTextInput from '../../components/MainComponents/MyTextInput';
import SearchItem from '../../components/MainComponents/SearchItem';
import {colors} from '../../constraints';
import {UpdateUser} from '../../Services/LoginFunctions';
import {
  recentSearches,
  recentSearchRemove,
  recentSearchRemoveAll,
} from '../../Store/ActionsCreator';

const Explore = props => {
  const dispatch = useDispatch();
  const {searchReducer} = useSelector(state => state);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [user_id, setUser_Id] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastId, setLastId] = useState(1);

  const getUser = async () => {
    let typeUser = await AsyncStorage.getItem('user_id');
    setUser_Id(typeUser);
  };
  useEffect(() => {
    getUser();
  }, []);

  const getData = async (bool, arg) => {
    const userId = await AsyncStorage.getItem('user_id');
    setRefreshing(true);
    let updateData = {};
    if (bool) {
      if (arg) {
        updateData = {type: 'get_data', table_name: 'listing', search: arg};
      } else {
        updateData = {type: 'get_data', table_name: 'listing', search: search};
      }
    } else {
      updateData = {type: 'get_data', table_name: 'listing'};
    }
    try {
      const result = await UpdateUser({...updateData, user_id: userId});
      setLoading(false);
      setRefreshing(false);
      if (result.data.data) {
        setData(result.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      setRefreshing(false);
      setLoading(false);
      console.log(error);
    }
  };
  const getMoreData = async (bool, arg) => {
    let userId = await AsyncStorage.getItem('user_id');
    let updateData = {};
    if (bool) {
      if (arg) {
        updateData = {type: 'get_data', table_name: 'listing', search: arg};
      } else {
        updateData = {type: 'get_data', table_name: 'listing', search: search};
      }
    } else {
      updateData = {type: 'get_data', table_name: 'listing'};
    }
    try {
      const result = await UpdateUser({
        ...updateData,
        last_id: lastId,
        user_id: userId,
      });
      if (result.data.data) {
        setLastId(lastId + 1);
        setData([...data, ...result.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getData(false);
      return () => {
        setSearch('');
        setLastId(1);
      };
    }, []),
  );

  useEffect(() => {
    if (!search) {
      getData(false);
    }
  }, [search]);

  useEffect(() => {
    if (searchReducer.user_id !== user_id) {
      dispatch(recentSearchRemoveAll());
    }
  }, []);

  const searchText = () => {
    if (search !== '') {
      dispatch(recentSearches({data: search, user_id: user_id}));
      getData(true);
    } else {
      console.log('run nnnnnn');
    }
  };

  const removeRecentSearch = async item => {
    dispatch(recentSearchRemove(item));
  };
  const clearAll = async () => {
    dispatch(recentSearchRemoveAll());
  };
  const onItemPress = arg => {
    setSearch(arg);
    getData(true, arg);
  };

  return (
    <>
      <MyContainer headerExist mainHeader headerIcon HeaderTitle={'Explore'}>
        <View style={[style.layout, style.headerView, {marginTop: 20}]}>
          <MyTextInput
            search={searchText}
            searchStyle={{margin: 10}}
            placeholder={'search'}
            placeholderTextColor={colors.darkGray}
            containerStyle={[style.inputContainerStyle7]}
            inputStyle={[style.inputInnerStyle, {width: '82%'}]}
            onChangeText={text => {
              setSearch(text);
            }}
            returnKeyType={'search'}
            value={search}
            onSubmitBtn={searchText}
          />
          {searchReducer.data.length !== 0 && (
            <View style={[style.flexRow, style.justify2]}>
              <Text style={style.exploreSearchText}>Recent Search</Text>
              <TouchableOpacity onPress={clearAll}>
                <Text style={style.exploreSearchsubText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          )}
          <View>
            <FlatList
              data={searchReducer.data}
              horizontal
              extraData={searchReducer.data}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => {
                return (
                  <View style={[style.flexRow, styles.itemView]}>
                    <TouchableOpacity onPress={() => onItemPress(item)}>
                      <Text
                        style={[style.exploreSearchsubText, styles.itemText]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeRecentSearch(item)}>
                      <Icon name="cross" type="entypo" size={14} />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          {/* <SectionList
              sections={sectionData}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section }) => (
              )} */}
          <View style={[style.flexRow, style.justify2]}>
            <Text style={style.exploreSearchText}>Top Search</Text>
            <Text style={style.exploreSearchsubText}>Show More</Text>
          </View>
          <View style={[{height: '83%'}]}>
            {/* {data?.length !==0? */}
            <FlatList
              data={data}
              onEndReached={() => {
                search ? getMoreData(true) : getMoreData(false);
              }}
              onEndReachedThreshold={0.5}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    search ? getData(true) : getData(false);
                  }}
                />
              }
              renderItem={({item, index}) => {
                return (
                  <SearchItem
                    img={item?.user?.image}
                    image={item?.image}
                    name={item?.user?.first_name || ''}
                    address={item?.address || ''}
                    bath={item?.baths || ''}
                    beds={item?.beds || ''}
                    size={item.home_sqft || ''}
                    price_range={item?.price_range || ''}
                  />
                );
              }}
              keyExtractor={item => item.id}
            />
            {/* : */}
            {!loading && data.length == 0 ? (
              <ImageNoPreview title={'No Listing yet'} />
            ) : null}
          </View>
          {/* } */}
          {/* <View style={[style.flexRow,style.justify2]}>
            <Text style={style.exploreSearchText}>
            Top Search
            </Text>
            <Text style={style.exploreSearchsubText}>
            Show More
            </Text>
            </View>
            <FlatList
            data={DATA}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
              return(
                <SearchItem/>
              )}}/> */}
        </View>
      </MyContainer>
    </>
  );
};

export default Explore;
const styles = StyleSheet.create({
  itemView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.messageBlue,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
    marginRight: 9,
    height: 40,
  },
  itemText: {
    marginVertical: 0,
    marginHorizontal: 5,
    fontSize: 12,
    lineHeight: 22,
  },
});
