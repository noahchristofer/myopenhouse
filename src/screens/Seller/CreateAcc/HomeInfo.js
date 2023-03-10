import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SectionList,
  Platform,
  Switch,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import style from '../../../assets/css/style';
import MyContainer from '../../../components/MainComponents/MyContainer';
import {colors, fonts, constants} from '../../../constraints';
import Button from '../../../components/MainComponents/Button';
import MyTextInput from '../../../components/MainComponents/MyTextInput';
import ModalDropdown from 'react-native-modal-dropdown';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import {Icon} from '@rneui/base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Down} from '../../../assets/images';
import {white} from 'react-native-paper/lib/typescript/styles/colors';
import DropDownPicker from 'react-native-dropdown-picker';

const HomeInfo = props => {
  const [selected, setSelected] = useState(true);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Bedroom', value: 'Bedroom'},
    {label: 'Bathroom', value: 'Bathroom'},
    {label: 'Kitchen', value: 'Kitchen'},
    {label: 'Addition', value: 'Addition'},
    {label: 'Attic', value: 'Attic'},
    {label: 'Basement', value: 'Basement'},
    {label: 'Floors', value: 'Floors'},
    {label: 'Office', value: 'Office'},
    {label: 'Garage', value: 'Garage'},
  ]);

  const [active, setActive] = useState(false);
  const [area, setArea] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [YearBuilt, setYearBuilt] = useState('');
  const value2 = useState('');
  const value3 = useState('');
  const label2 = useState('parking');
  const label3 = useState('Any renovations?');
  const parking = useState('');
  const renovations = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    if (YearBuilt && parking[0] && lotSize && area && value) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [YearBuilt, parking[0], lotSize, area, value]);

  const route = useRoute();

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    route.params?.update ? setUpdate(true) : setUpdate(false);
  }, [route]);

  useEffect(() => {
    if (route.params?.update) {
      label2[1](route.params.data.parking);
      setYearBuilt(route.params.data.year_built);
      parking[1](route.params.data.parking);
      setValue(JSON.parse(route.params.data.renovation));
      setLotSize(route.params.data.lot_size);
      setArea(route.params.data.home_sqft);
      setSelected(route.params.data.unit == 'Sqft' ? true : false);
    }
  }, [route]);

  const handleSubmit = () => {
    update
      ? navigation.navigate('ReviewSeller', {
          ...route.params.data,
          year_built: YearBuilt,
          parking: parking[0],
          lot_size: lotSize,
          home_sqft: area,
          renovation: JSON.stringify(value),
          unit: selected ? 'Sqft' : 'acreage',
        })
      : navigation.navigate('Facility', {
          ...route.params,
          year_built: YearBuilt,
          parking: parking[0],
          lot_size: lotSize,
          home_sqft: area,
          renovation: JSON.stringify(value),
          unit: selected ? 'Sqft' : 'acreage',
        });
  };
  let data2 = ['street parking', 'driveway', 'garage', 'no parking available'];

  const sectionData = [
    {
      title: {title: 'Parking'},
      data: [{name: data2, id: 1, label: label2, value: value2, type: parking}],
    },
  ];

  return (
    <MyContainer headerExist>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={[style.layout, style.headerView]}>
          <Text style={style.headerText}>Home History</Text>
          <Text style={[style.emailText1, style.topLowMargin]}>
            Tell us about your home.
          </Text>
          <View>
            <Text style={[style.emailText]}>Year Built</Text>
            <MyTextInput
              placeholder={'Year Built'}
              placeholderTextColor={colors.darkGray}
              containerStyle={style.inputContainerStyle}
              inputStyle={style.inputInnerStyle}
              onChangeText={text => setYearBuilt(text)}
              value={YearBuilt}
              keyboardType={'numeric'}
            />
            <SectionList
              sections={sectionData}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({section}) => (
                <Text style={style.emailText}>{section.title.title}</Text>
              )}
              renderItem={({item, index}) => {
                return (
                  <View style={{flexDirection: 'row'}}>
                    <ModalDropdown
                      // defaultValue={item.label[0]}
                      options={item.name}
                      style={style.inputContainerStyle}
                      textStyle={style.dropDownText}
                      dropdownStyle={style.dropDownView1}
                      dropdownTextStyle={style.dropDownText}
                      dropdownTextHighlightStyle={{color: colors.primaryColor}}
                      onSelect={(index, value) => item.type[1](value)}
                      renderRightComponent={() => {
                        return (
                          <View
                            style={{
                              marginLeft: '70%',
                              padding: 20,
                            }}>
                            {/* <Down/> */}
                          </View>
                        );
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        marginRight: 10,
                        marginTop: 20,
                      }}>
                      <TouchableOpacity>
                        <Down />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
            />
          </View>
          <View style={style.flexSpace}>
            <Text style={[style.emailText, {marginRight: 10}]}>Lot size</Text>
            {/* <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      /> */}
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={[
                  styles.Swicthes,
                  {
                    backgroundColor: selected ? colors.primaryColor : 'white',
                    borderWidth: selected ? 0 : 1,
                    borderColor: colors.lighterGray,
                  },
                ]}
                onPress={() => setSelected(!selected)}>
                <Text
                  style={{
                    color: selected ? 'white' : 'black',
                    fontFamily: fonts.InterRegular,
                  }}>
                  SqFt
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.Swicthes,
                  {
                    backgroundColor: !selected ? colors.primaryColor : 'white',
                    borderWidth: !selected ? 0 : 1,
                    borderColor: colors.lighterGray,
                  },
                ]}
                onPress={() => setSelected(!selected)}>
                <Text
                  style={{
                    color: !selected ? 'white' : 'black',
                    fontFamily: fonts.InterRegular,
                  }}>
                  Acreage
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <MyTextInput
            placeholder={'Lot size'}
            placeholderTextColor={colors.darkGray}
            containerStyle={style.inputContainerStyle}
            inputStyle={style.inputInnerStyle}
            onChangeText={text => setLotSize(text)}
            value={lotSize}
            keyboardType={'numeric'}
          />
          <Text style={[style.emailText]}>Home SqFt</Text>
          <MyTextInput
            placeholder={'Home SqFt'}
            placeholderTextColor={colors.darkGray}
            containerStyle={style.inputContainerStyle}
            inputStyle={style.inputInnerStyle}
            onChangeText={text => setArea(text)}
            value={area}
            keyboardType={'numeric'}
          />
          <Text style={[style.emailText]}>Any renovations?</Text>
          <DropDownPicker
            open={open}
            placeholder="Please Select..."
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple={true}
            mode="BADGE"
            zIndex={3000}
            zIndexInverse={1000}
            dropDownContainerStyle={{
              borderColor: colors.lightGray,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
            itemSeparator
            itemSeparatorStyle={{
              backgroundColor: colors.lightGray,
            }}
            style={{
              borderColor: colors.lightGray,
            }}
            selectedItemContainerStyle={{
              backgroundColor: colors.lightestPrimary,
            }}
            listItemLabelStyle={{
              textTransform: 'capitalize',
            }}
            selectedItemLabelStyle={{
              fontWeight: 'bold',
              color: colors.primaryColor,
            }}
            badgeDotColors={['#e76f51']}
          />
        </View>

        <View style={[style.topMargin, {marginHorizontal: 10}]}>
          <Button
            title={update ? 'Update' : 'Continue'}
            ButtonStyle={styles.buttonView1}
            disabled={!active}
            onPress={handleSubmit}
            textStyle={{color: active ? colors.white : colors.skyDark}}
          />
        </View>
      </KeyboardAwareScrollView>
    </MyContainer>
  );
};

export default HomeInfo;

const styles = StyleSheet.create({
  buttonView1: {
    borderRadius: 10,
    marginBottom: Platform.OS === 'android' ? 20 : 30,
  },
  Swicthes: {
    backgroundColor: colors.primaryColor,
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: colors.darkGray,
    borderWidth: 1,
    marginRight: 5,
    marginVertical: 5,
  },
});
