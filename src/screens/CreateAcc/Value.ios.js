import React,{useState,useEffect, useCallback} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Platform, FlatList ,StyleSheet} from 'react-native';
// import Slider from 'rn-range-slider';
import RangeSlider from '@jesster2k10/react-native-range-slider';

import Thumb from '../../components/MainComponents/Slider/Thumb';
import Rail from '../../components/MainComponents/Slider/Rail';
import RailSelected from '../../components/MainComponents/Slider/RailSelected';
import Notch from '../../components/MainComponents/Slider/Notch';
import Label from '../../components/MainComponents/Slider/Lable';

import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts,constants } from '../../constraints';
import Button from '../../components/MainComponents/Button';



const Value = (props) => {
    const DATA = [
        {
          id: '1',
          title: 'Get Insights on My Home',
        },
        {
          id: '2',
          title: 'Sell and Buy',
        }]
  const [check,setCheck] = useState(false)
  const [low, setLow] = useState(20);
  const [high, setHigh] = useState(60);


  const navigation = useNavigation()
  const route=useRoute()

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail/>, []);
  const renderRailSelected = useCallback(() => <RailSelected/>, []);
  const renderLabel = useCallback(value => <Label text={value}/>, []);
  const renderNotch = useCallback(() => <Notch/>, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const handleSubmit=()=>{
    const data={...route.params,'min_budget':low,'max_budget':high}
    navigation.navigate("Payment",data)
}
const onChange = (min, max) => {
  console.log('min: ', min)
  console.log('max: ', max)
  setLow(min);
  setHigh(max);
}
    return (
      <MyContainer headerExist>
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
        Purchase Budget
        </Text>
        <Text style={[style.emailText1,style.topMargin]}>
        Please select a range of the home's value
        </Text>
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
        </View>
      
         <View style={[style.topMargin,{marginHorizontal:10}]}>
         <Button 
          title={'Continue'}
          ButtonStyle={styles.buttonView1}
          onPress={handleSubmit}
          />
          </View>
         
      </MyContainer>
    );
}

export default Value;

const styles = StyleSheet.create({
  buttonView1:{
    borderRadius:10,
    marginBottom:Platform.OS === "android" ?20:30,
  },
  textcheck:{
      fontFamily:fonts.InterRegular,
      fontSize:14,
      lineHeight:20,
      color:colors.lightblack,
      paddingLeft:5
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal:10
  },
  valueText: {
    // width: 50,
    color: colors.dark,
    fontSize: 12,
    fontFamily:fonts.InterMedium,
    lineHeight:24
  },
})
