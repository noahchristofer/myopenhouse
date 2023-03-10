import React, {useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  SectionList,
  FlatList,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from 'react-native';
import style from '../../assets/css/style';
import MyContainer from '../../components/MainComponents/MyContainer';
import {colors, constants, fonts, images} from '../../constraints';
import Button from '../../components/MainComponents/Button';
import {
  Accept,
  Cancel,
  Connect,
  Noti1,
  Noti2,
  Noti3,
  ProfileBtn,
  Request,
  Email1,
} from '../../assets/images';
import {Icon} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateUser} from '../../Services/LoginFunctions';
import RejectModal from '../../components/MainComponents/RejectModal';
import RejectModalSuccess from '../../components/MainComponents/RejectModalSuccess';
import Toast from 'react-native-simple-toast';

const Connections = props => {
  const navigation = useNavigation();
  const DATA = [
    {
      id: '1',
      title: 'All',
    },
    {
      id: '2',
      title: 'Request',
    },
    {
      id: '3',
      title: 'Accepted',
    },
    {
      id: '4',
      title: 'Cancelled',
    },
  ];

  const [userType, setUserType] = useState('');

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
  const [selectedId, setSelectedId] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectModalSuccess, setRejectModalSuccess] = useState(false);
  const [connectData, setConnectData] = useState([]);
  const [connectData1, setConnectData1] = useState([]);
  const [connectId, setConnectId] = useState([]);

  const topTabData = () => {
    if (selectedId == '2') {
      const data = connectData1.filter(e => {
        return e.status == '0';
      });
      setConnectData(data);
    } else if (selectedId == '3') {
      const data = connectData1.filter(e => {
        return e.status == '1';
      });
      setConnectData(data);
    } else if (selectedId == '4') {
      const data = connectData1.filter(e => {
        return e.status == '2';
      });
      setConnectData(data);
    } else {
      setConnectData(connectData1);
    }
  };

  useEffect(() => {
    topTabData();
  }, [selectedId, isLoading]);

  const getData = async () => {
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 1 || getType == 0) {
      setIsLoading(true);
      const user_id = await AsyncStorage.getItem('user_id');
      const updatedata = {
        type: 'get_data',
        user_id: user_id,
        table_name: 'offers',
      };
      try {
        const result = await UpdateUser(updatedata);
        if (result?.data?.data) {
          setConnectData(result.data.data);
          setConnectData1(result.data.data);
          setIsLoading(false);
        }
        setIsLoading(false);
        setLoading(false);
      } catch (error) {
        setIsLoading(false);
        setLoading(false);
      }
    } else {
      setIsLoading(false);
      setLoading(false);
      Toast.show(constants.alertType, Toast.SHORT, ['UIAlertController']);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (userType == 1 || userType == 0) {
        getData();
      }
      return () => {};
    }, []),
  );

  const acceptOffer = async id => {
    setIsLoading(true);
    const updatedata = {
      table_name: 'offers',
      type: 'update_data',
      id: id,
      status: 1,
    };
    try {
      const result = await UpdateUser(updatedata);
      console.log(result.data);
      getData();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const rejectOffer = async () => {
    setIsLoading(true);
    const updatedata = {
      type: 'update_data',
      id: connectId,
      status: 2,
      table_name: 'offers',
    };
    try {
      const result = await UpdateUser(updatedata);
      if (result.data.result) {
        getData();
        setIsLoading(false);
        setRejectModal(false);
        setRejectModalSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <RejectModal
        rejectOffer={rejectOffer}
        visible={rejectModal}
        hideModal={() => setRejectModal(false)}
      />
      <RejectModalSuccess
        visible={rejectModalSuccess}
        hideModal={() => setRejectModalSuccess(false)}
      />
      <MyContainer
        headerExist
        msg
        editHeader={'Connections'}
        styleHeader={styles.header}
        // loader={connectData.length > 0 ? isLoading : false}
      >
        <View
          style={[
            style.layout,
            style.headerView,
            {marginTop: Platform.OS === 'ios' ? 15 : 0},
          ]}>
          <View>
            <FlatList
              data={DATA}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                const backgroundColor = item.id === selectedId ? true : false;
                return (
                  <TouchableOpacity onPress={() => setSelectedId(item.id)}>
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
                        {item.title}
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
          <View style={style.line} />
          {!loading && connectData.length == 0 ? (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                marginTop: 200,
                alignItems: 'center',
              }}>
              <Connect />
            </View>
          ) : null}
          <FlatList
            data={connectData}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  getData();
                }}
              />
            }
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    {padding: 10, marginVertical: 10, borderRadius: 5},
                    styles.btnShadow,
                  ]}>
                  <View
                    style={[
                      style.flexRow,
                      style.justify2,
                      {paddingBottom: 10},
                    ]}>
                    <View style={[style.flexRow, style.justify]}>
                      {item.status == '0' ? (
                        <Request />
                      ) : item.status == '1' ? (
                        <Accept />
                      ) : (
                        <Cancel />
                      )}
                      <Text style={styles.headingText}>
                        {item.status == '0'
                          ? 'REQUESTED'
                          : item.status == '1'
                          ? 'ACCEPTED'
                          : 'CANCELLED'}
                      </Text>
                    </View>
                    <Text style={[styles.headingText, {color: colors.dark}]}>
                      {item.timestamp}
                    </Text>
                  </View>
                  <View style={style.line} />
                  <View style={[style.flexRow, style.justify2]}>
                    <Text style={styles.subHeadingText}>Amount</Text>
                    <Text style={styles.subHeadingText}>Kind of offer</Text>
                    <Text style={styles.subHeadingText}>Payment</Text>
                  </View>
                  <View style={[style.flexRow, style.justify2]}>
                    <Text
                      style={[
                        styles.subHeadingText2,
                        {color: colors.primaryColor},
                      ]}>
                      ${item.amount}
                    </Text>
                    <Text style={styles.subHeadingText2}>
                      {item.offer_kind}
                    </Text>
                    <Text style={styles.subHeadingText2}>
                      {item.payment_type}
                    </Text>
                  </View>
                  <View style={style.line} />
                  <View
                    style={[
                      style.flexRow,
                      style.justify2,
                      {marginVertical: 10},
                    ]}>
                    <View style={[style.flexRow]}>
                      {item?.user?.image !== '' &&
                      item?.user?.image !== undefined &&
                      item?.user?.image != null ? (
                        <Image
                          source={{
                            uri: `${constants.imageLink}${item?.user?.image}`,
                          }}
                          style={[
                            styles.avatar,
                            {backgroundColor: colors.lightGray},
                          ]}
                        />
                      ) : (
                        <View
                          style={[
                            style.justify,
                            styles.avatar,
                            {backgroundColor: colors.lightGray},
                          ]}>
                          <Icon type="antdesign" name="user" size={18} />
                        </View>
                      )}

                      {/* <Image source={images.Oval} style={styles.avatar}/> */}
                      <View style={{marginLeft: 8, justifyContent: 'center'}}>
                        <Text style={styles.headerText1}>
                          {`${item?.user?.first_name} ${item?.user?.last_name}`}
                        </Text>
                        <Text style={styles.subHedaer}>
                          {item?.user?.email}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity>
                      <ProfileBtn />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[style.flexRow, style.justify1, {marginLeft: 15}]}>
                    {item.status == '0' ? (
                      <>
                        <Button
                          title={'Reject'}
                          ligtherBluesh
                          ButtonStyle={styles.buttonView2}
                          textStyle={{color: colors.black}}
                          onPress={() => {
                            setConnectId(item.id);
                            setRejectModal(true);
                          }}
                        />
                        <Button
                          title={'Connect'}
                          orange
                          ButtonStyle={[
                            styles.buttonView2,
                            {
                              borderColor: colors.gray,
                              borderWidth: 0.8,
                              borderRadius: 10,
                            },
                          ]}
                          onPress={() => acceptOffer(item.id)}
                        />
                      </>
                    ) : item.status == '2' ? null : (
                      <>
                        <Button
                          title={'Chat'}
                          chat
                          ButtonStyle={styles.buttonView1}
                          onPress={() => {
                            navigation.navigate('ChatBox', {
                              userId: item.user_id,
                              listing: item.listing,
                              name: item.user.first_name,
                              img: `${constants.imageLink}${item.user.image}`,
                            });
                          }}
                        />
                        <Button
                          title={'Email'}
                          email
                          colors
                          ButtonStyle={[
                            styles.buttonView1,
                            {
                              borderColor: colors.gray,
                              borderWidth: 0.8,
                              borderRadius: 10,
                            },
                          ]}
                          textStyle={{color: colors.black}}
                        />
                      </>
                    )}
                    {/* <Button title={'Cancel'} 
                  lightBlue 
                  textStyle={{color:colors.primaryColor}}
                  ButtonStyle={styles.buttonView1}
                  /> */}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </MyContainer>
    </>
  );
};

export default React.memo(Connections);

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-start',
  },
  headerText: {
    fontFamily: fonts.UrbanistBold,
    // fontWeight:"bold",
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
  headingText: {
    fontFamily: fonts.urbanistSemiBold,
    color: colors.mediumBLACK,
    fontSize: 12,
    lineHeight: 22,
    marginLeft: 3,
  },
  subHeadingText: {
    fontFamily: fonts.urbanistSemiBold,
    color: colors.lightestGray,
    fontSize: 12,
    lineHeight: 22,
    marginVertical: 5,
  },
  subHeadingText2: {
    fontFamily: fonts.UrbanistBold,
    color: colors.black,
    fontSize: 13,
    marginTop: -3,
    marginVertical: 8,
    // fontWeight:'bold'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  headerText1: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.mediumDark,
  },
  subHedaer: {
    fontFamily: fonts.urbanistSemiBold,
    // fontWeight:'500',
    fontSize: 12,
    lineHeight: 22,
    color: colors.lightestGray,
  },
  buttonView1: {
    width: '88%',
  },
  buttonView2: {
    width: '90%',
  },
  btnShadow: {
    borderRadius: 10,
    shadowColor: '#d4d4d4',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
    backgroundColor: 'white',
  },
});
