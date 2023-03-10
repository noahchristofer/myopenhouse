import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  StyleSheet,
  SectionList,
  TouchableHighlight,
  Dimensions,
  RefreshControl,
  Platform,
  Animated,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import Swipeable from 'react-native-swipeable';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import style from '../../assets/css/style';
import MyContainer from '../../components/MainComponents/MyContainer';
import MyTextInput from '../../components/MainComponents/MyTextInput';
import {colors, constants, fonts, images} from '../../constraints';
import {Archive, Delete} from '../../assets/images';
import {UpdateUser} from '../../Services/LoginFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from '@rneui/base';
import Toast from 'react-native-simple-toast';
import {ImageNoPreview} from '../../components/General';
import AlertModal from '../../components/MainComponents/AlertModal';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';

const Messages = props => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [msgs, setMsgs] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 1 || getType == 0) {
      setIsLoading(true);
      const user_id = await AsyncStorage.getItem('user_id');
      const data = {type: 'chat_list', u_id: user_id};
      try {
        const result = await UpdateUser(data);
        console.log(result.data);
        if (result.data.chat) {
          setMsgs(result.data.chat);
          setIsLoading(false);
          setLoading(false);
        } else {
          console.log(result.data);
          setIsLoading(false);
          setLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setLoading(false);
        console.log(error);
      }
    } else {
      setAlert(true);
      setLoading(false);
      setIsLoading(false);
      // Toast.show(constants.alertType, Toast.SHORT, [
      //   'UIAlertController',
      // ]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      console.log('msfsgnks', msgs);
      return () => {};
    }, []),
  );

  const deleteChat = async item => {
    setIsLoading(true);
    const user_id = await AsyncStorage.getItem('user_id');
    const data = {type: 'chat_delete', user_id: user_id, to_id: item.sender_id};
    try {
      const result = await UpdateUser(data);
      console.log(result.data);
      if (result.data.result) {
        getData();
        setIsLoading(false);
      } else {
        console.log(result.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const rightButtons = item => [
    <TouchableOpacity
      style={{marginLeft: 20, marginTop: 10}}
      onPress={() => deleteChat(item)}>
      <Delete />
    </TouchableOpacity>,
    <TouchableOpacity style={{marginTop: 10}}>
      <Archive />
    </TouchableOpacity>,
  ];
  const [alert, setAlert] = useState(false);

  const renderLeftActions = item => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginTop: 10, marginRight: 10}}
          onPress={() => deleteChat(item)}>
          <Delete />
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 10}}>
          <Archive />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <AlertModal visible={alert} hideModal={() => setAlert(false)} />
      <MyContainer headerExist mainHeader HeaderTitle={'Messages'}>
        <View
          style={[
            style.layout,
            style.headerView,
            {marginTop: Platform.OS === 'ios' ? 20 : 10},
          ]}>
          <MyTextInput
            search
            searchStyle={{margin: 10}}
            placeholder={'search'}
            placeholderTextColor={colors.darkGray}
            containerStyle={style.inputContainerStyle}
            inputStyle={[style.inputInnerStyle, {width: '85%'}]}
            onChangeText={text => setSearch(text)}
            value={search}
          />
          <View style={style.topMargin}>
            <FlatList
              data={msgs}
              keyExtractor={item => item.timestamp}
              style={{height: '100%'}}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => {
                    getData();
                  }}
                />
              }
              renderItem={({item}) => {
                return (
                  <>
                    <GestureHandlerRootView style={{flex: 1}}>
                      <Swipeable
                        renderRightActions={() => renderLeftActions(item)}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('ChatBox', {
                              userId: item.sender_id,
                              name: item.sender_name,
                              img: item.sender_img,
                            })
                          }
                          style={[
                            style.flexRow,
                            {
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '90%',
                              height: 70,
                              borderColor: colors.messageBlue,
                              borderBottomWidth: 1,
                            },
                          ]}>
                          <View style={style.flexRow}>
                            <View>
                              {item.sender_img !== constants.imageLink ? (
                                <Image
                                  source={{uri: item.sender_img}}
                                  style={[
                                    style.img,
                                    {backgroundColor: colors.lightGray},
                                  ]}
                                />
                              ) : (
                                <View
                                  style={[
                                    style.justify,
                                    style.img,
                                    {backgroundColor: colors.lightGray},
                                  ]}>
                                  <Icon
                                    type="antdesign"
                                    name="user"
                                    size={20}
                                  />
                                </View>
                              )}
                              {item.unseen == '1' && (
                                <View
                                  style={{
                                    backgroundColor: 'red',
                                    position: 'absolute',
                                    width: 8,
                                    height: 8,
                                    right: 0,
                                    borderRadius: 4,
                                  }}
                                />
                              )}
                            </View>
                            <View style={{paddingLeft: 10, width: '60%'}}>
                              <Text numberOfLines={1} style={style.nameText}>
                                {item.sender_name || ''}
                              </Text>
                              <Text numberOfLines={1} style={style.msgText}>
                                {item.msg}
                              </Text>
                            </View>
                          </View>
                          <Text
                            style={[
                              style.msgText,
                              {color: colors.lightestGray},
                            ]}>
                            {item.date}
                          </Text>
                        </TouchableOpacity>
                      </Swipeable>
                    </GestureHandlerRootView>

                    {/* </Swipeable> */}
                  </>
                );
              }}
            />
            {!loading && msgs.length == 0 ? (
              <ImageNoPreview title={'No Message yet'} />
            ) : null}
          </View>
        </View>
      </MyContainer>
    </>
  );
};

export default Messages;
const styles = StyleSheet.create({});
