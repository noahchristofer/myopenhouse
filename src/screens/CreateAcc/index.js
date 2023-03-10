import React,{useState,useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts,constants } from '../../constraints';
import MyTextInput from '../../components/MainComponents/MyTextInput';
import Button from '../../components/MainComponents/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Checkboxes } from "../../assets/images";

const CreateAcc = (props) => {
  const [fName,setFName] = useState('')
  const [middleName,setmiddleName] = useState('')
  const [lastName,setLastName] = useState('')
  const [active,setActive] = useState(false)
  
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(()=>{
    if ((fName!=="")&&(lastName!=="")) {
      setActive(true)
    }else{
      setActive(false)
    }
  },[fName,lastName])
  
  const [update,setUpdate] = useState(false)

  useEffect(()=>{
   route.params?.update?
   setUpdate(true):
   setUpdate(false)
  },[route])

  useEffect(()=>{
    if(route.params?.update)
    {
      setFName(route.params.data.first_name)
      setmiddleName(route.params.data.middle_name)
      setLastName(route.params.data.last_name)
    }
   },[route])

  const handleSubmit=()=>{
    update?
    navigation.navigate('ReviewSeller',{...route.params.data,'first_name':fName,'last_name':lastName,'middle_name':middleName})
    :
    navigation.navigate("ChoiceScreen",{'first_name':fName,'last_name':lastName,'middle_name':middleName})
  }

    return (
      <MyContainer headerExist>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} >
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
          What’s your name?
        </Text>
        <Text style={[style.emailText,style.topMargin]}>
        First Name
        </Text>
        <MyTextInput
         placeholder={"First Name"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.inputInnerStyle}
         onChangeText={(text) => setFName(text)}
         value={fName}
         />
        <Text style={[style.emailText,style.topMargin]}>
        Middle name
        </Text>
        <MyTextInput
         placeholder={"Middle Name (Optional)"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.inputInnerStyle}
         onChangeText={(text) => setmiddleName(text)}
         value={middleName}
         />
        <Text style={[style.emailText,style.topMargin]}>
        Last Name
        </Text>
        <MyTextInput
         placeholder={"Last Name"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.inputInnerStyle}
         onChangeText={(text) => setLastName(text)}
         value={lastName}
         />
      
         <View style={style.topMargin}>
         <Button 
          title={update?'Update':'Let’s Go'}
          ButtonStyle={{marginBottom:15}}
          disabled={!active}
          onPress={handleSubmit}
          textStyle={{color:active?colors.white:colors.skyDark}}
          />
          </View>
         
      </View>
      </KeyboardAwareScrollView>
      </MyContainer>
    );
}

export default CreateAcc;

const styles = StyleSheet.create({
  buttonView1:{
    borderRadius:10,
    backgroundColor:colors.lightBlue,
    marginBottom:20
  },
  checkText:{
    color:colors.darkGray,
    fontFamily:fonts.InterMedium,
    fontSize:14,
    // fontWeight:'400',
    lineHeight:20,
    width:'90%',
    paddingLeft:10
  },
  checkView:{
    borderColor:colors.gray,
    borderWidth:1,
    padding:9,
    borderRadius:5,
  }
})
