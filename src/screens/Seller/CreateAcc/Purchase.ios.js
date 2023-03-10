
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import style from '../../../assets/css/style';
import MyContainer from '../../../components/MainComponents/MyContainer'
import { colors, fonts, constants } from '../../../constraints';
import Button from '../../../components/MainComponents/Button';
import MyTextInput from '../../../components/MainComponents/MyTextInput';
import ModalDropdown from 'react-native-modal-dropdown';
import { Down } from '../../../assets/images';
// import Slider from 'rn-range-slider';
import RangeSlider from '@jesster2k10/react-native-range-slider';

import Thumb from '../../../components/MainComponents/Slider/Thumb';
import Rail from '../../../components/MainComponents/Slider/Rail';
import RailSelected from '../../../components/MainComponents/Slider/RailSelected';
import Notch from '../../../components/MainComponents/Slider/Notch';
import Label from '../../../components/MainComponents/Slider/Lable';

const Purchase = (props) => {
  // const [active,setActive] = useState(false)
  const [price, setPrice] = useState('')
  const [value, setValue] = useState('Price range')

  const [low, setLow] = useState(20);
  const [high, setHigh] = useState(60);

  const navigation = useNavigation()
  const route = useRoute()

  // useEffect(()=>{
  //     if (price) {
  //         setActive(true)
  //     }else{
  //         setActive(false)
  //     }
  // },[])

  const [update, setUpdate] = useState(false)

  useEffect(() => {
    route.params?.update ?
      setUpdate(true) :
      setUpdate(false)
  }, [route])

  // useEffect(()=>{
  //   if(route.params?.update)
  //   {
  //     setPrice(route.params.data.price_range)
  //     setValue(route.params.data.price_range)
  //   }
  //  },[route])

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const handleSubmit = () => {
    update ?
      navigation.navigate("ReviewSeller", { ...route.params.data, price_range: `${low}-${high}` })
      :
      navigation.navigate("DataSeller", { ...route.params, price_range: `${low}-${high}` })
  }
  const onChange = (min, max) => {
    console.log('min: ', min)
    console.log('max: ', max)
    setLow(min);
    setHigh(max);
  }


  return (
    <MyContainer headerExist>
      <View style={[style.layout, style.headerView]}>
        <Text style={style.headerText}>
          Estimated Purchase Budget
        </Text>
        <Text style={[style.emailText1, style.topLowMargin]}>
          Please select a price range
        </Text>
        {/* <Text style={style.emailText}>
           OMV Price
        </Text>
        <MyTextInput
         placeholder={"$800k - $900k"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.inputInnerStyle}
         onChangeText={(text) => setPrice(text)}
         value={price}/> */}
        <Text style={style.emailText}>
          Price Range
        </Text>
        <RangeSlider
          type="range" // ios only
          min={50000}
          max={5000000}
          selectedMinimum={50000} // ios only
          selectedMaximum={1500000} // ios only
          tintColor="#d4d4d4"
          handleColor={colors.primaryColor}
          handlePressedColor={colors.primaryColor}
          tintColorBetweenHandles={colors.primaryColor}
          lineHeight={5}
          onChange={onChange}
        />
        {/* <Slider
        style={styles.slider}
        min={0}
        max={1000}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}/>
         <View style={styles.horizontalContainer}>
           <Text style={styles.valueText}>${low}k</Text>
           <Text style={styles.valueText}>${high}k</Text>
           </View>
     */}
        {/* <ModalDropdown
        defaultValue={value}
        options={['$700k - $800k ', "$800k - $900k","$1mil"]}
        style={style.inputContainerStyle}
        textStyle={style.dropDownText}
        dropdownStyle={style.dropDownView1}
        dropdownTextStyle={style.dropDownText}
        dropdownTextHighlightStyle={{color:colors.primaryColor}}
        onSelect={(index,value)=>setPrice(value)}
        renderRightComponent={()=>{
          return(
            <View
            style={{
              marginLeft:'60%',
              padding:20,
            }}>
            </View>
            )
        }}/> */}

      </View>

      <View style={[style.topMargin, { marginHorizontal: 10 }]}>
        <Button
          title={update ? 'Update' : 'Continue'}
          ButtonStyle={styles.buttonView1}
          // disabled={!active}
          onPress={handleSubmit}
        // textStyle={{color:colors.skyDark}}
        />
      </View>

    </MyContainer>
  );
}

export default Purchase;

const styles = StyleSheet.create({
  buttonView1: {
    borderRadius: 10,
    marginBottom: Platform.OS === "android" ? 20 : 30,

  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10
  },
  valueText: {
    // width: 50,
    color: colors.dark,
    fontSize: 12,
    fontFamily: fonts.InterMedium,
    lineHeight: 24
  },

})
