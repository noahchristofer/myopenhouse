import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import style from '../../../assets/css/style';
import MyContainer from '../../../components/MainComponents/MyContainer';
import { colors, fonts, constants, images } from '../../../constraints';
import Button from '../../../components/MainComponents/Button';
import { Down, Edit, Marker1, Marker2, Upper } from '../../../assets/images';
import { UpdateSeller, UpdateUser } from '../../../Services/LoginFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const ReviewSeller = props => {
  const [DATA, setData] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const handleSubmit = async () => {
    let { first_name, middle_name, last_name, user_type, ...updateData } =
      route.params;
    setIsLoading(true);
    const user_id = await AsyncStorage.getItem('user_id');
    const data = {
      type: 'add_data',
      table_name: 'listing',
      user_id: user_id,
      ...updateData,
    };
    try {
      const result = await UpdateUser(data);
      if (result.data?.result) {
        setIsLoading(false);
        navigation.navigate('Terms', route.params);
      } else {
        console.log(result.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const EditBtn = i => {
    switch (i.id) {
      case '1':
        navigation.navigate('CreateAcc', { data: route.params, update: true });
        break;
      case '2':
        navigation.navigate('HomeInfo', { data: route.params, update: true });
        break;
      case '3':
        navigation.navigate('Conditions', { data: route.params, update: true });
        break;
      case '4':
        navigation.navigate('DataSeller', { data: route.params, update: true });
        break;
      case '5':
        navigation.navigate('Purchase', { data: route.params, update: true });
        break;
      case '6':
        navigation.navigate('Purchase', { data: route.params, update: true });
        break;

      default:
        navigation.navigate('Location', { data: route.params, update: true });
        break;
    }
  };


  const getPriceRange = () => {
    return route.params.price_range.split("-")
  }
  useEffect(() => {
    setData([
      {
        id: '1',
        title: 'Personal Infomation',
        subTitle: 'Completed',
        value: '',
        data: [
          {
            value: 'Full Name',
            sub_value: `${route.params.first_name} ${route.params.last_name}`,
            id: 1,
          },
        ],
      },
      {
        id: '2',
        title: 'Home Info ',
        subTitle: 'Completed',
        value: '',
        data: [
          {
            value: 'Year Built',
            sub_value: route.params.year_built,
            id: 1,
          },
          {
            value: 'Parking',
            sub_value: route.params.parking,
            id: 2,
          },
          {
            value: 'Lot size',
            sub_value: route.params.lot_size,
            id: 3,
          },
          {
            value: 'Home Span',
            sub_value: route.params.home_sqft,
            id: 4,
          },
          {
            value: 'Any renovations?',
            sub_value: route.params.renovation.toString(),
            id: 10,
          },
        ],
      },
      {
        id: '3',
        title: 'Conditions',
        subTitle: 'Completed',
        value: '',
        data: [
          {
            value: 'Any flooding?',
            sub_value: route.params.flooding,
            id: 1,
          },
          {
            value: 'Any recent renovations?',
            sub_value: route.params.renovations,
            id: 2,
          },
          {
            value: 'Any lead?',
            sub_value: route.params.lead,
            id: 3,
          },
          {
            value: 'Any fires?',
            sub_value: route.params.fires,
            id: 4,
          },
          {
            value: 'Generator on-site?',
            sub_value: route.params.generator,
            id: 5,
          },
          {
            value: 'Septic or Sewer?',
            sub_value: route.params.septic,
            id: 6,
          },
        ],
      },
      {
        id: '4',
        title: 'Estimated date seller',
        subTitle: 'Completed',
        value: '',
        data: [
          {
            value: 'Month range',
            sub_value: route.params.estimated_date,
            id: 1,
          },
        ],
      },
      {
        id: '5',
        title: 'Type of Real Estate. ',
        subTitle: 'Completed',
        value: route.params.estate_type,
        data: [
          {
            value: "Range of the home's value",
            sub_value: `${getPriceRange()[0]}-${getPriceRange()[1]}`,
            id: 1,
          },
        ],
      },
      {
        id: '6',
        title: 'Estimated Purchase Budget ',
        subTitle: `${getPriceRange()[0]}-${getPriceRange()[1]}`,
        value: '',
        data: [
          {
            value: 'Price Range',
            sub_value: `${getPriceRange()[0]}-${getPriceRange()[1]}`,
            id: 2,
          },
        ],
      },
      {
        id: '7',
        title: 'Location on map',
        subTitle: 'Completed',
        value: '',
        data: [
          {
            value: 'City',
            sub_value: route.params.city,
            id: 1,
          },
          {
            value: 'State',
            sub_value: route.params.state,
            id: 2,
          },
        ],
      },
    ]);
  }, [route]);

  return (
    <MyContainer headerExist loader={isLoading}>
      <View style={[style.layout, style.headerView]}>
        <Text style={style.headerText}>Review</Text>
        <Text style={[style.emailText1, style.topLowMargin]}>
          Please check and review
        </Text>

        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const iconVisible = item.id === selectedId ? true : false;
            return (
              <View style={styles.cardView}>
                <TouchableOpacity
                  onPress={() =>
                    selectedId !== item.id
                      ? setSelectedId(item.id)
                      : setSelectedId('')
                  }>
                  <View
                    style={[style.flexRow, { justifyContent: 'space-between' }]}>
                    <Text style={[style.emailText, { marginVertical: 0 }]}>
                      {item.title}
                    </Text>
                    <TouchableOpacity style={{ width: '10%' }}>
                      {iconVisible ? <Upper /> : <Down />}
                    </TouchableOpacity>
                  </View>
                  <Text style={style.emailText2}>{item.subTitle}</Text>
                </TouchableOpacity>
                {iconVisible ? (
                  <>
                    <FlatList
                      data={item.data}
                      keyExtractor={item => item.id}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => {
                        return (
                          <>
                            <View style={[style.flexRow, style.justify2]}>
                              <Text
                                style={[
                                  style.emailText5,
                                  { marginVertical: 5, color: colors.lightblack },
                                ]}>
                                {item.value}
                              </Text>
                              <Text
                                numberOfLines={1}
                                style={[
                                  style.subHeader1,
                                  {
                                    marginVertical: 5,
                                    fontFamily: fonts.InterThin,
                                    color: colors.darkest,
                                    fontSize: 15,
                                  },
                                ]}>
                                {item.sub_value}
                              </Text>
                            </View>
                          </>
                        );
                      }}
                    />
                    {item.id == '7' ? null : (
                      <TouchableOpacity onPress={() => EditBtn(item)}>
                        <Edit />
                      </TouchableOpacity>
                    )}
                  </>
                ) : null}
                {iconVisible && item.value !== '' ? (
                  <>
                    <View style={styles.secndView}>
                      <Text style={[style.emailText, { marginVertical: 0 }]}>
                        {item.value}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('TypeScreen', {
                          data: route.params,
                          update: true,
                        })
                      }>
                      <Edit />
                    </TouchableOpacity>
                  </>
                ) : null}
                {iconVisible && item.id == '7' ? (
                  <>
                    <Text style={style.emailText5}>Location</Text>
                    <View
                      style={{
                        width: '100%',
                        height: 150,
                        borderRadius: 10,
                        overflow: 'hidden',
                        marginVertical: 10,
                      }}>
                      <MapView
                        style={{ flex: 1 }}
                        provider={PROVIDER_GOOGLE}
                        region={{
                          latitude: route.params.lat || 25.276987,
                          longitude: route.params.lng || 55.296249,
                          latitudeDelta: 2,
                          longitudeDelta: 2,
                        }}
                        loadingEnabled={true}>
                        <Marker
                          coordinate={{
                            latitude: route.params.lat || 25.276987,
                            longitude: route.params.lng || 55.296249,
                          }}>
                          <View style={style.justify}>
                            <Marker1 />
                            <Marker2 />
                          </View>
                        </Marker>
                      </MapView>
                    </View>
                    <TouchableOpacity onPress={() => EditBtn(item)}>
                      <Edit />
                    </TouchableOpacity>
                  </>
                ) : null}
              </View>
            );
          }}
        />
      </View>

      <View
        style={[
          style.topMargin,
          style.flexRow,
          style.justify1,
          { marginLeft: 15 },
        ]}>
        <Button
          lightBlue
          title={'Back'}
          ButtonStyle={styles.buttonView1}
          onPress={() => navigation.goBack()}
          textStyle={{ color: colors.primaryColor }}
        />
        <Button
          title={'Continue'}
          onPress={handleSubmit}
          ButtonStyle={styles.buttonView1}
        />
      </View>
    </MyContainer>
  );
};

export default ReviewSeller;

const styles = StyleSheet.create({
  buttonView1: {
    width: '90%',
    marginBottom: Platform.OS === 'android' ? 20 : 30,
  },
  cardView: {
    paddingVertical: 20,
    borderColor: colors.gray,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  secndView: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 8,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
