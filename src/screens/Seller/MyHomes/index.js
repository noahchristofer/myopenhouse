import {useNavigation, useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/base';
import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  StyleSheet,
  SectionList,
  Platform,
  ScrollView,
} from 'react-native';

import styles from '../../../assets/css/style';
import {Bedroom, BuildingSize, HomeBtn, Toilet} from '../../../assets/images';
import MyContainer from '../../../components/MainComponents/MyContainer';
import MyTextInput from '../../../components/MainComponents/MyTextInput';
import {colors, fonts, icons, images} from '../../../constraints';

const MyHomes = () => {
  const [dashboard, setDashboard] = useState(true);
  const [price, setPrice] = useState('');
  const DATA = [
    {
      id: '1',
      title: 'Kitchen remodel',
    },
    {
      id: '2',
      title: 'Upgrade wet spaces',
    },
    {
      id: '3',
      title: 'Kitchen remodel',
    },
    {
      id: '4',
      title: 'floors',
    },
  ];
  const route = useRoute();
  console.log(route.params);
  return (
    <MyContainer
      headerExist
      msg
      editHeader={'My Home’s Data'}
      styleHeader={styles.header}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 80}}>
          <View style={[{width: '100%', marginTop: 10}, styles.flexAlignItem]}>
          {route.params?.thumb ?
               <Image source={{uri:route.params?.thumb}} style={{width:86,height:110,borderRadius:12,backgroundColor:colors.lightGray}}/>
               :
                <View style={[styles.justify,{width: 86, height: 110,borderRadius:6,backgroundColor:colors.lightGray}]}>
                  <Icon type='entypo' name="image" size={60}/>
                </View>}
            <View style={{marginLeft: 10, width: '60%'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.InterSemiBold,
                  color: colors.black,
                }}>{`${route.params.user.first_name} ${route.params.user.last_name}`}</Text>
              <View style={[{marginTop: 10}, styles.flexSpace]}>
                <View style={[styles.flexAlignItem]}>
                  <Toilet />
                  <Text style={[styles.textHomeA,{fontFamily:fonts.urbanistSemiBold}]}>{route.params.baths}</Text>
                </View>
                <View style={[styles.flexAlignItem]}>
                  <Bedroom />

                  <Text style={[styles.textHomeA,{fontFamily:fonts.urbanistSemiBold}]}>{route.params.beds}</Text>
                </View>
                <View style={[styles.flexAlignItem]}>
                  <BuildingSize />
                  <Text style={[styles.textHomeA,{fontFamily:fonts.urbanistSemiBold}]}>
                    {route.params.home_sqft} Sq. Ft.
                  </Text>
                </View>
              </View>
              <View style={[{marginTop: 12}, styles.flexAlignItem]}>
                <TouchableOpacity
                  style={[
                    styles.itemCenter,
                    styles.btnEditDetail,
                    styless.btnShadow,
                  ]}>
                  <Text style={styles.fontEditDetail}>Edit details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: '#E9FBFF',
                      borderRadius: 8,
                      marginLeft: 10,
                    },
                    styles.btnEditDetail,
                    styles.itemCenter,
                  ]}>
                  <Text style={styles.fontEditDetail}>Public view</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={[
              {
                width: '100%',
                backgroundColor: '#F2F4F5',
                height: 45,
                marginTop: 20,
                borderRadius: 8,
              },
              styles.flexAlignItem,
            ]}>
            <TouchableOpacity
              onPress={() => setDashboard(true)}
              style={[
                {
                  width: '48%',
                  height: 40,
                  backgroundColor: dashboard ? colors.white : 'transparent',
                  marginLeft: 5,
                  borderRadius: 6,
                },
                styles.itemCenter,
              ]}>
              <Text
                style={[
                  styles.fontEditDetail,
                  {color: dashboard ? colors.black : colors.darkerGray},
                ]}>
                Dashboard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDashboard(false)}
              style={[
                {
                  width: '48%',
                  height: 40,
                  backgroundColor: !dashboard ? colors.white : 'transparent',
                  marginLeft: 5,
                  borderRadius: 6,
                },
                styles.itemCenter,
              ]}>
              <Text
                style={[
                  styles.fontEditDetail,
                  {color: !dashboard ? colors.black : colors.darkerGray},
                ]}>
                Home’s Data
              </Text>
            </TouchableOpacity>
          </View>

          {dashboard ? (
            <View style={{marginTop: 24, marginBottom: 5}}>
              <Text style={styles.homeTextHeader}>30 Day Activity</Text>
              <Text style={styles.subhomeTextHeader}>
                Based on homes in your area
              </Text>
            </View>
          ) : null}

          <View style={[styles.contentCard, {marginTop: 25}]}>
            <Text
              style={{
                marginLeft: '5%',
                marginTop: 10,
                fontSize: 11,
                color: '#7F8AA0',
              }}>{!dashboard ?
                "Total Home Views":
                "My Open house Estimate"
              }
            </Text>
            <View style={[styles.flexSpace, {marginLeft: '5%', marginTop: 10}]}>
              <Text style={styles.txtCardSubHead}>{dashboard?"$578,731":"294"}</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.InterMedium,
                  color: '#7BCC32',
                  marginRight: '5%',
                }}>
                +15% Last year
              </Text>
            </View>
          </View>

          {!dashboard ? (
            <View style={[styles.flexSpace]}>
              <View style={{width: '31%'}}>
                <View style={[styles.contentCard, {marginTop: 25}]}>
                  <Text
                    style={{
                      marginLeft: '10%',
                      marginTop: 10,
                      fontSize: 11,
                      color: '#7F8AA0',
                    }}>
                    + Exterior
                  </Text>
                  <View
                    style={[
                      styles.flexSpace,
                      {marginLeft: '10%', marginTop: 10},
                    ]}>
                    <Text style={styles.txtCardSubHead}>294</Text>
                  </View>
                </View>
              </View>
              <View style={{width: '31%'}}>
                <View style={[styles.contentCard, {marginTop: 25}]}>
                  <Text
                    style={{
                      marginLeft: '10%',
                      marginTop: 10,
                      fontSize: 11,
                      color: '#7F8AA0',
                    }}>
                    + floors
                  </Text>
                  <View
                    style={[
                      styles.flexSpace,
                      {marginLeft: '10%', marginTop: 10},
                    ]}>
                    <Text style={styles.txtCardSubHead}>294</Text>
                  </View>
                </View>
              </View>
              <View style={{width: '31%'}}>
                <View style={[styles.contentCard, {marginTop: 25}]}>
                  <Text
                    style={{
                      marginLeft: '10%',
                      marginTop: 10,
                      fontSize: 11,
                      color: '#7F8AA0',
                    }}>
                    + Landscaping
                  </Text>
                  <View
                    style={[
                      styles.flexSpace,
                      {marginLeft: '10%', marginTop: 10},
                    ]}>
                    <Text style={styles.txtCardSubHead}>294</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : null}

          <View style={[styles.flexSpace]}>
            <View style={{width: '48%'}}>
              <View style={[styles.contentCard, {marginTop: 25}]}>
                <Text
                  style={{
                    marginLeft: '10%',
                    marginTop: 10,
                    fontSize: 11,
                    color: '#7F8AA0',
                  }}>
                  + Upgrade wet spaces
                </Text>
                <View
                  style={[
                    styles.flexSpace,
                    {marginLeft: '10%', marginTop: 10},
                  ]}>
                  <Text style={styles.txtCardSubHead}>294</Text>
                </View>
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={[styles.contentCard, {marginTop: 25}]}>
                <Text
                  style={{
                    marginLeft: '10%',
                    marginTop: 10,
                    fontSize: 11,
                    color: '#7F8AA0',
                  }}>
                  + Kitchen remodel
                </Text>
                <View
                  style={[
                    styles.flexSpace,
                    {marginLeft: '10%', marginTop: 10},
                  ]}>
                  <Text style={styles.txtCardSubHead}>294</Text>
                </View>
              </View>
            </View>
          </View>
          {!dashboard ? (
            <>
              <View style={[styles.line, {marginTop: 20}]} />
              <View style={[styles.flexSpace, {marginTop: 15}]}>
                <Text style={styless.subHeading}>Most Value Rating</Text>
                <Text style={styless.heading}>$800k - $1000k</Text>
              </View>

              <View style={[styles.line, {marginTop: 20}]} />
              <View style={[styles.flexSpace, {marginTop: 15}]}>
                <Text style={styless.subHeading}>Avg. Value Price</Text>
                <Text style={styless.heading}>$1100K</Text>
              </View>
              <View style={[styles.line, {marginTop: 20}]} />
              <View
                style={[styles.flexRow, {alignItems: 'center', marginTop: 10}]}>
                <Text style={[styless.heading]}>Home's Data</Text>
                <Text style={styless.subHeading}>(249)</Text>
              </View>

              <View style={styless.boxShadow}>
                <View
                  style={[
                    styles.flexRow,
                    styles.justify5,
                    {
                      marginVertical: 10,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  ]}>
                  <View style={[styles.flexRow]}>
                    <Image source={images.Oval} style={styless.avatar} />
                    <View style={{marginLeft: 8, justifyContent: 'center'}}>
                      <Text style={styless.headerText}>Beantown617</Text>
                      <Text style={styless.subheaderText}>
                        5600 Sq,Ft. Lot ,Boston, MA
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <HomeBtn />
                  </TouchableOpacity>
                </View>
                <View style={[styles.line, {marginTop: 5}]} />
                <View style={{marginTop: 10}}>
                  <Text style={styles.subHedaer}>What’s my value?</Text>
                  <Text style={[styless.heading, {marginLeft: 0}]}>$1100K</Text>
                </View>
                <Text style={[styles.subHedaer, {marginTop: 10}]}>
                  what would make you pay top dollar?
                </Text>
                <FlatList
                  data={DATA}
                  numColumns={2}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                    return (
                      <View style={[styles.flexRow, styless.itemView]}>
                        <Icon name="plus" type="entypo" size={14} />
                        <Text style={[styles.emailText, styless.itemText]}>
                          {item.title}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </>
          ) : (
            <>
              <View style={[styles.line, {marginTop: 20}]} />
              <View
                style={[styles.topMargin, styles.flexRow, styles.flexSpace]}>
                <View>
                  <Text
                    style={[styless.subHeading, {color: colors.lightblack}]}>
                    Equity Mortgage Balance
                  </Text>
                  <Text style={styless.subHeading1}>
                    Estimate balance minus
                  </Text>
                </View>
                <MyTextInput
                  placeholder={'Balance'}
                  placeholderTextColor={colors.darkGray}
                  containerStyle={[
                    styles.inputContainerStyle,
                    {width: '45%', height: 34},
                  ]}
                  inputStyle={styles.inputInnerStyle}
                  onChangeText={text => setPrice(text)}
                  value={price}
                />
              </View>
              <View style={[styles.line, {marginTop: 20}]} />
              <View style={[styles.topMargin, styles.flexSpace]}>
                <Text style={[styless.subHeading, {color: colors.lightblack}]}>
                  My Open House Estimate
                </Text>
                <Text style={styless.subHeading2}>$276,000.00</Text>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </MyContainer>
  );
};

export default MyHomes;

const styless = StyleSheet.create({
  heading: {
    fontFamily: fonts.UrbanistBold,
    // fontWeight:"bold",
    fontSize: 14,
    lineHeight: 20,
    color: colors.black,
    marginLeft: 10,
  },
  subHeading: {
    fontFamily: fonts.urbanistregular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.black,
    marginLeft: 10,
  },
  subHeading1: {
    fontFamily: fonts.InterRegular,
    fontSize: 10,
    lineHeight: 15,
    color: colors.ligtherGray,
    marginLeft: 10,
  },
  subHeading2: {
    fontFamily: fonts.UrbanistBold,
    fontSize: 19,
    lineHeight: 23,
    color: colors.primaryColor,
  },
  btnShadow: {
    borderRadius: 10,
    shadowColor: '#888',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: 'white',
  },
  boxShadow: {},
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  itemView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.lighter,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 5,
    marginRight: 10,
    height: 32,
    padding: 5,
    paddingHorizontal: 9,
  },
  itemText: {
    marginVertical: 0,
    marginHorizontal: 5,
    fontSize: 12,
    marginRight: 10,
  },
  headerText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.dark,
  },
  subheaderText: {
    fontFamily: fonts.UrbanistMedium,
    fontSize: 12,
    lineHeight: 22,
    color: colors.lightestGray,
  },
});
