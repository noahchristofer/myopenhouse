import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SectionList,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import style from '../../../assets/css/style';
import MyContainer from '../../../components/MainComponents/MyContainer';
import {colors, fonts, constants, images} from '../../../constraints';
import Button from '../../../components/MainComponents/Button';
import MyTextInput from '../../../components/MainComponents/MyTextInput';
import ModalDropdown from 'react-native-modal-dropdown';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import Modal from 'react-native-modal';
import {Icon} from '@rneui/base';
import {Marker1, Marker2, Cross} from '../../../assets/images';
import {GetPlaceName} from '../../../Services/LoginFunctions';

const Location = props => {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [markerData, setMarkerData] = useState({latitude: '', longitude: ''});

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (state && area) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [area, state]);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    route.params?.update ? setUpdate(true) : setUpdate(false);
  }, [route]);

  useEffect(() => {
    if (route.params?.update) {
      setArea(route.params.data.city);
      setState(route.params.data.state);
      setMarkerData({
        latitude: route.params.data.lat,
        longitude: route.params.data.lng,
      });
    }
  }, [route]);

  const handleSubmit = () => {
    update
      ? navigation.navigate('ReviewSeller', {
          ...route.params.data,
          city: city,
          state: state,
          lat: markerData.latitude,
          lng: markerData.longitude,
          address: area,
        })
      : navigation.navigate('Photos', {
          ...route.params,
          city: city,
          state: state,
          lat: markerData.latitude,
          lng: markerData.longitude,
          address: area,
        });
  };

  const hideModal = () => {
    setVisible(false);
  };

  const SetCity = async () => {
    const res = await GetPlaceName(markerData.latitude, markerData.longitude);
    let stateData = JSON.stringify(
      res.data.results[0].address_components.slice(-3)[0].long_name,
    );
    let stateData1 = JSON.stringify(
      res.data.results[0].address_components.slice(-2)[0].long_name,
    );
    stateData = stateData.slice(1, -1);
    stateData1 = stateData1.slice(1, -1);
    let data = JSON.stringify(res.data.results[0].formatted_address);
    data = data.slice(1, -1);
    setState(`${stateData}, ${stateData1}`);
    setArea(data);
  };
  useEffect(() => {
    if (markerData.latitude !== '') {
      SetCity();
    }
  }, [markerData]);

  return (
    <>
      <MyContainer headerExist>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={[style.layout, style.headerView]}>
            <Text style={style.headerText}>Location on map</Text>
            <Text style={[style.emailText1, style.topLowMargin]}>
              Your details will not be shared unless you decide to work with an
              agent.
            </Text>

            <Text style={[style.emailText]}>Search by City</Text>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={style.inputContainerStyle6}>
              {/* <MyTextInput
                locate
                // editable={false}
                placeholder={"City"}
                placeholderTextColor={colors.darkGray}
                containerStyle={[style.inputContainerStyle,{zIndex:0}]}
                inputStyle={style.passwordInputinnerStyle}
                onChangeText={(text) => setArea(text)}
                value={area}/> */}
              <Icon name="location-pin" type="entypo" size={18} />
              <Text
                style={style.passwordInputinnerStyle1}
                numberOfLines={1}
                ellipsizeMode="tail">
                {area}
              </Text>
            </TouchableOpacity>
            <Text style={style.emailText}>City</Text>

            <MyTextInput
              // locate
              // editable={false}
              placeholder={'City'}
              placeholderTextColor={colors.darkGray}
              containerStyle={style.inputContainerStyle}
              inputStyle={style.passwordInputinnerStyle}
              onChangeText={text => setCity(text)}
              value={city}
            />
            <Text style={style.emailText}>State</Text>

            <MyTextInput
              // locate
              // editable={false}
              placeholder={'State'}
              placeholderTextColor={colors.darkGray}
              containerStyle={style.inputContainerStyle}
              inputStyle={style.passwordInputinnerStyle}
              onChangeText={text => setState(text)}
              value={state}
            />

            <Text style={style.emailText}>Location</Text>

            <View
              style={{
                width: '100%',
                height: 150,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <MapView
                style={{flex: 1}}
                provider={
                  Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
                }
                region={{
                  latitude: markerData.latitude || 25.276987,
                  longitude: markerData.longitude || 55.296249,
                  latitudeDelta: 2,
                  longitudeDelta: 2,
                }}
                loadingEnabled={true}>
                <Marker
                  coordinate={{
                    latitude: markerData.latitude || 25.276987,
                    longitude: markerData.longitude || 55.296249,
                  }}
                  // draggable
                  // onDragEnd={(e) =>
                  // setMarkerData(e.nativeEvent.coordinate)}
                >
                  <View style={style.justify}>
                    <Marker1 />
                    <Marker2 />
                  </View>
                </Marker>
              </MapView>
            </View>
            {/* <Image source={images.locate} style={{width:'100%',height:150,borderRadius:10}}/> */}
          </View>

          <View style={[style.topMargin, {marginHorizontal: 10}]}>
            <Button
              title={update ? 'Update' : 'Next'}
              ButtonStyle={styles.buttonView1}
              disabled={!active}
              onPress={handleSubmit}
              textStyle={{color: active ? colors.white : colors.skyDark}}
            />
          </View>
        </KeyboardAwareScrollView>
      </MyContainer>
      <Modal
        isVisible={visible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            marginTop: global.statusBarHeight,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              marginRight: 15,
            }}>
            <View></View>
            <Text
              style={[
                style.headerText,
                {fontFamily: fonts.InterSemiBold, fontSize: 20, marginTop: 0},
              ]}>
              Search Location
            </Text>
            <TouchableOpacity onPress={() => hideModal()}>
              <Cross />
            </TouchableOpacity>
          </View>
          <GooglePlacesAutocomplete
            placeholder="Search by City"
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            styles={{
              container: {
                height: 10,
                flex: 1,
                zIndex: 2,
                height: '10%',
                width: '90%',
                alignSelf: 'center',
                borderBottomColor: '#d4d4d4',
                borderBottomWidth: 1,
                marginTop: 10,
              },
              textInput: {
                borderBottomColor: '#d4d4d4',
                borderBottomWidth: 0.5,
                color: 'black',
              },
            }}
            fetchDetails={true} // you need this to fetch the details object onPress
            onPress={(data, details = null) => {
              // setCity(data.terms[data.terms.length-2])
              setCity(data?.terms[data.terms.length - 2]?.value);
              // 'details' is provided when fetchDetails = true
              setMarkerData({
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              });
              setArea(data.description);
              setState(data.structured_formatting.secondary_text);
              hideModal();
            }}
            query={{
              key: constants.GOOGLE_API_KEY,
              language: 'en',
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default Location;

const styles = StyleSheet.create({
  buttonView1: {
    borderRadius: 10,
    marginBottom: Platform.OS === 'android' ? 20 : 30,
  },
  buttonView2: {
    borderRadius: 10,
    marginBottom: Platform.OS === 'android' ? 20 : 30,
    width: '87%',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
