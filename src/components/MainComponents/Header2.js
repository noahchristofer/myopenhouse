import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from '@rneui/base';

import style from '../../assets/css/style';
import {colors, constants, fonts, images} from '../../constraints';
import {Notification, SmallDown} from '../../assets/images';
import {UpdateUser} from '../../Services/LoginFunctions';

function Header2({locationId}) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const DATA = [
    {
      id: '1',
      title: 'Popular',
    },
    {
      id: '2',
      title: 'Nearest',
    },
  ];

  const [selectedId, setSelectedId] = useState('1');
  const [selectedItem, setSelectedItem] = useState('Popular');
  const [data, setData] = useState('');

  const hideModal = () => {
    setVisible(false);
  };
  useEffect(() => {
    setSelectedItem(() => (selectedId == '2' ? 'Nearest' : 'Popular'));
    getProfileData();
  }, [selectedId]);
  useEffect(() => {
    locationId(selectedId);
  }, [selectedId]);

  const getProfileData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    let data = {type: 'get_data', table_name: 'users', id: user_id};
    try {
      const result = await UpdateUser(data);
      console.log('1234', result.data);
      if (result.data) {
        await setData(result.data.data[0]);
      } else {
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View
        style={[
          styles.mainView,
          {marginTop: Platform.OS === 'ios' ? global.statusBarHeight : 0},
        ]}>
        <View>
          <Text style={styles.locateText}>Location</Text>
          <TouchableOpacity
            style={[style.flexRow, style.justify]}
            onPress={() => setVisible(true)}>
            <Text style={styles.itemText}>{selectedItem}</Text>
            <View style={{paddingLeft: 5, paddingTop: 5}}>
              <SmallDown />
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.flexRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Notification />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            {/* <Image source={images.Avatar} style={styles.image}/> */}
            {data.image ? (
              <Image
                source={{uri: `${constants.imageLink}${data.image}`}}
                style={[styles.image, {marginLeft: 10}]}
              />
            ) : (
              <View
                style={[
                  style.justify,
                  {
                    width: 33,
                    height: 33,
                    borderRadius: 12,
                    backgroundColor: colors.lightGray,
                    marginLeft: 10,
                  },
                ]}>
                <Icon type="antdesign" name="user" size={20} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={visible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackButtonPress={hideModal}
        backdropOpacity={0}
        onBackdropPress={hideModal}>
        <View style={{flex: 1, marginTop: 40, marginLeft: 20}}>
          <View style={styles.modalView}>
            <FlatList
              data={DATA}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                const backgroundColor = item.id === selectedId ? true : false;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedId(item.id);
                      hideModal();
                    }}>
                    <View
                      style={[
                        styles.modalItemView,
                        {
                          backgroundColor: backgroundColor
                            ? colors.lightestPrimary
                            : colors.white,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.modalItemText,
                          {
                            color: backgroundColor
                              ? colors.primaryColor
                              : colors.lightblack,
                          },
                        ]}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              extraData={selectedId}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

export default Header2;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 1,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    padding: 15,
    backgroundColor: '#fff',
    width: '100%',
    height: 62,
    // shadowColor: '#000',
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity:  Platform.OS === 'ios' ? 0.1 : 0.4,
    // shadowRadius: Platform.OS === 'ios' ? 10 : 2,
    // elevation: 2
    borderBottomColor: '#1018281a',
    borderBottomWidth: 1,
    shadowColor: '#d4d4d4',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  locateText: {
    fontFamily: fonts.urbanistregular,
    color: colors.lightestGray,
    fontSize: 12,
    lineHeight: 22,
  },
  itemText: {
    fontSize: 18,
    color: colors.dark,
    fontFamily: fonts.UrbanistBold,
    // fontWeight:'bold'
  },
  image: {
    height: 33,
    width: 33,
    borderRadius: 5,
    marginLeft: 10,
  },
  modalView: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    width: '50%',
    height: '18%',
  },
  modalItemView: {
    padding: 20,
    borderRadius: 5,
  },
  modalItemText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 16,
    lineHeight: 16,
  },
});
