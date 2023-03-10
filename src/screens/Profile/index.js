import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/base';

import style from '../../assets/css/style';
import { Homie, ProfileBtn, Setting, Star, Ticket } from '../../assets/images';
import MyContainer from '../../components/MainComponents/MyContainer';
import { colors, constants, fonts } from '../../constraints';
import { UpdateUser } from '../../Services/LoginFunctions';
import Toast from 'react-native-simple-toast';
import AlertModal from '../../components/MainComponents/AlertModal';
import LogoutModal from '../../components/MainComponents/LogoutModal';

const Profile = props => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState('');

  const getUser = async () => {
    let typeUser = await AsyncStorage.getItem('user_type');
    setUserType(typeUser);
  };
  useEffect(() => {
    getUser();
  }, []);

  const [listData, setListData] = useState([]);
  const getProfileScreenItems = async () => {
    const getType = await AsyncStorage.getItem('user_type');
    if (getType == 0) {
      setListData([
        {
          id: '1',
          title: 'My Home’s Data',
        },
        {
          id: '2',
          title: 'My Offers',
        },
        {
          id: '3',
          title: 'Setting',
        },
        {
          id: '4',
          title: 'Add Property',
        },
        {
          id: '5',
          title: 'My Appraisals',
        },
        {
          id: '6',
          title: 'Log out',
        },
      ]);
    } else {
      setListData([
        {
          id: '1',
          title: 'Connections',
        },
        {
          id: '2',
          title: 'Setting',
        },
        {
          id: '3',
          title: 'Log out',
        },
      ]);
    }
  };
  useEffect(() => {
    getProfileScreenItems();
  }, [isLoading]);
  const onPress = async i => {
    switch (i.title) {
      case 'Connections':
        if (userType == 1 || userType == 0) {
          navigation.navigate('Connections');
        } else {
          setAlert(true);
          // Toast.show(constants.alertType, Toast.SHORT, [
          //   'UIAlertController',
          // ])
        }
        break;
      case 'My Home’s Data':
        navigation.navigate('Listing');
        break;
      case 'My Offers':
        navigation.navigate('Connections');
        break;
      case 'Add Property':
        navigation.navigate('TypeScreen');
        break;
      case 'My Appraisals':
        navigation.navigate('MyAppraisals');
        break;
      case 'Log out':
        setLogouAlert(true);
        break;
      default:
        break;
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');

  const getProfileData = async () => {
    setIsLoading(true);
    const user_id = await AsyncStorage.getItem('user_id');
    let data = { type: 'get_data', table_name: 'users', id: user_id };
    try {
      const result = await UpdateUser(data);
      if (result.data) {
        setData(result.data.data[0]);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getProfileData();
      return () => { };
    }, []),
  );

  const [alert, setAlert] = useState(false);
  const [logouAlert, setLogouAlert] = useState(false);

  const Logout = async () => {
    setLogouAlert(false);
    await AsyncStorage.clear();
    // await GoogleSignin.signIn()
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <>
      <AlertModal visible={alert} hideModal={() => setAlert(false)} />
      <LogoutModal
        visible={logouAlert}
        hideModal={() => setLogouAlert(false)}
        Logout={Logout}
      />
      <MyContainer
        headerExist
        mainHeader
        profileHeader
        HeaderTitle={'Profile'}
        ProfileHeaderPress={() => navigation.navigate('ProfileEdit', data)}>
        <View style={[style.layout, style.headerView, { marginTop: 20 }]}>
          <View
            style={[
              style.flexRow,
              style.justify1,
              styles.header,
              { justifyContent: 'flex-start' },
            ]}>
            {data.image ? (
              <Image
                source={{ uri: `${constants.imageLink}${data.image}` }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 12,
                  backgroundColor: colors.lightGray,
                }}
              />
            ) : (
              <View
                style={[
                  style.justify,
                  {
                    width: 100,
                    height: 100,
                    borderRadius: 12,
                    backgroundColor: colors.lightGray,
                  },
                ]}>
                <Icon type="antdesign" name="user" size={60} />
              </View>
            )}
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.heading}>
                {`${data.first_name != undefined ? data.first_name : 'Browse User'
                  } ` || ''}
                <Text style={{ color: colors.lightestGray }}>
                  {data?.last_name || ''}
                </Text>
              </Text>
              <View
                style={[style.line, { backgroundColor: '#E9FBFF', flexGrow: 0 }]}
              />
              <Text style={styles.subHeading}>Joined 1 months ago</Text>
            </View>
          </View>
          <FlatList
            data={listData}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <>
                  <TouchableOpacity onPress={() => onPress(item)}>
                    <View
                      style={[
                        style.flexRow,
                        style.justify2,
                        { padding: 15, paddingVertical: 25 },
                      ]}>
                      <View style={[style.flexRow, { alignItems: 'center' }]}>
                        {item.id == '1' ? (
                          <Homie />
                        ) : item.id == '2' ? (
                          <Star />
                        ) : item.id == '3' ? (
                          <Ticket />
                        ) : item.id == '4' ? (
                          <Setting />
                        ) : (
                          <Icon name="plus" type="entypo" size={15} />
                        )}
                        <Text style={[styles.itemText, { marginLeft: 10 }]}>
                          {item.title}
                        </Text>
                      </View>
                      <ProfileBtn />
                    </View>
                  </TouchableOpacity>
                  <View
                    style={[
                      style.line,
                      { backgroundColor: '#E9FBFF', flexGrow: 0 },
                    ]}
                  />
                </>
              );
            }}
          />
        </View>
      </MyContainer>
    </>
  );
};

export default Profile;
const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.UrbanistBold,
    fontSize: 20,
    lineHeight: 30,
    color: colors.dark,
    paddingVertical: 10,
  },
  subHeading: {
    fontFamily: fonts.urbanistregular,
    fontSize: 12,
    lineHeight: 22,
    color: colors.lightestGray,
    paddingVertical: 10,
  },
  header: {
    shadowColor: Platform.OS === 'ios' ? '#d4d4d4' : '#888',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 20,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'white',
  },

  itemText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 14,
    lineHeight: 24,
    color: colors.dark,
  },
});
