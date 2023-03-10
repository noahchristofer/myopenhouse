import React,{useEffect, useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text,  Dimensions,StyleSheet, Image, TouchableOpacity} from 'react-native';
import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts, images } from '../../constraints';
import MyTextInput from '../../components/MainComponents/MyTextInput';
import Button from '../../components/MainComponents/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from '@rneui/base';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { UpdateUser } from '../../Services/LoginFunctions';
import Toast from 'react-native-simple-toast';

const ProfileEdit = (props) => {
  const [fName,setFName] = useState('')
  const [mName,setMName] = useState('')
  const [lName,setLName] = useState('')
  const [email,setEmail] = useState('')
  const [phNo,setPhNo] = useState('')
  const [password,setPassword] = useState('')
  const [cnfrPassword,setCnfrPassword] = useState('')
  const [image,setImage] = useState('')
  const [imageChange,setImageChange] = useState(false)
  const navigation = useNavigation()
  const route=useRoute()
  useEffect(()=>{
    setFName(route.params.first_name)
    setMName(route.params.middle_name)
    setLName(route.params.last_name)
    setEmail(route.params.email)
    setPhNo(route.params.phone)
    setImage(route.params.image||'')
  },[route])
  const [isLoading,setIsLoading] = useState(false)

  const ImageSelection=async()=>{
    ImagePicker.openPicker({
      mediaType:'photo'
    }).then(async(image) => {
      console.log(image)
      setIsLoading(true)
      try {
        let data=await RNFS.readFile( image.path, 'base64').
            then(res => { return`data:${image.mime};base64,${res}` })
        setImage(data);
        setImageChange(true)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    });
  }


const submitChanges=async()=>{
  if (cnfrPassword==password) {
    let data={}
    if (password) {
      data={first_name:fName,last_name:lName,middle_name:mName,email:email,phone:phNo,password:password}
    }else if (imageChange) {
      data={first_name:fName,last_name:lName,middle_name:mName,email:email,phone:phNo,image:image}
    }else if (password && imageChange) {
      data={first_name:fName,last_name:lName,middle_name:mName,email:email,phone:phNo,image:image,password:password}
    }
    else{
      data={first_name:fName,last_name:lName,middle_name:mName,email:email,phone:phNo}
    }
    setIsLoading(true)
    console.log(data)
    const updateData={type:'update_profile',table_name:'users',id:route.params.id,...data}
    try {
      const result = await UpdateUser(updateData)
      console.log(result.data.result)
      if (result.data.result){
        setIsLoading(false)
        navigation.goBack()
      }else{
        alert (result.data?.message)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }else{
    Toast.show('Password should match to Confirm Password', Toast.SHORT, [
      'UIAlertController',
    ]);
  }
}
    return (
      <MyContainer headerExist msg editHeader={'Edit Profile'} styleHeader={styles.header} loader={isLoading}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} >
      <View style={[style.layout,style.headerView]}>
      <View style={[style.justify]}>
        <TouchableOpacity onPress={ImageSelection}>
          {image?
          <Image source={{uri:image}} style={{width:100,height:100,borderRadius:12,backgroundColor:colors.lightGray}}/>:
          <View style={[style.justify,{width:100,height:100,borderRadius:12,backgroundColor:colors.lightGray}]}>
            <Icon type='antdesign'name='user' size={60}/>
          </View>
          }
        </TouchableOpacity>
                <Text style={styles.heading}>
                {`${route.params.first_name} ${route.params.last_name}`}
                </Text>
                <Text style={styles.subHeading}>
                {route.params.phone}
                </Text>
        </View>
        <Text style={[style.emailText,style.topMargin]}>
        First Name
        </Text>
        <MyTextInput
         placeholder={"First Name"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.inputInnerStyle}
         onChangeText={(text) => setFName(text)}
         value={fName}/>
        <Text style={[style.emailText,style.topMargin]}>
        Middle Name
        </Text>
        <MyTextInput
         placeholder={"Middle Name"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.inputInnerStyle}
         onChangeText={(text) => setMName(text)}
         value={mName}/>
        <Text style={[style.emailText,style.topMargin]}>
        Last Name
        </Text>
        <MyTextInput
         placeholder={"Last Name"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.inputInnerStyle}
         onChangeText={(text) => setLName(text)}
         value={lName}/>
        <Text style={[style.emailText,style.topMargin]}>
         Email
        </Text>
        <MyTextInput
         placeholder={"Email address"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.inputInnerStyle}
         onChangeText={(text) => setEmail(text)}
         value={email}/>
        <Text style={[style.emailText,style.topMargin]}>
        Phone Number
        </Text>
        <MyTextInput
         placeholder={"Phone Number"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.inputInnerStyle}
         onChangeText={(text) => setPhNo(text)}
         value={phNo}/>
        <Text style={[style.emailText,style.topMargin]}>
         Password
        </Text>
        <MyTextInput
         placeholder={"••••••••••"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.passwordInputinnerStyle}
         onChangeText={(text) => setPassword(text)}
         value={password}
         secureTextEntry/>
        <Text style={[style.emailText,style.topMargin]}>
        Confirm Password
        </Text>
        <MyTextInput
         placeholder={"••••••••••"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.passwordInputinnerStyle}
         onChangeText={(text) => setCnfrPassword(text)}
         value={cnfrPassword}
         secureTextEntry/>
         <View style={style.topMargin}>
         <Button 
          title={'Save Changes'}
          onPress={submitChanges}
          />
          </View>
      </View>
      </KeyboardAwareScrollView>
      </MyContainer>
    );
}

export default ProfileEdit;

const styles = StyleSheet.create({
  buttonView1:{
    borderRadius:10,
    backgroundColor:colors.lightBlue,
    marginBottom:20
  },
  header:{
      justifyContent:'flex-start'
  },heading:{
    fontFamily:fonts.UrbanistBold,
    // fontWeight:'bold',
    fontSize:24,
    lineHeight:32,
    color:colors.dark,
},subHeading:{
    fontFamily:fonts.UrbanistBold,
    // fontWeight:'bold',
    fontSize:14,
    lineHeight:20,
    color:colors.primaryColor,
},
})
