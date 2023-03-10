import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity,StyleSheet,Platform} from 'react-native';
import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts,constants } from '../../constraints';
import Button from '../../components/MainComponents/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Email } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { register } from '../../Services/LoginFunctions';
import Toast from 'react-native-simple-toast';


const Verification = (props) => {
  const [email,setEmail] = useState('')
  const [codeTxt,setCodeText] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const navigation = useNavigation()
  const route=useRoute()

  useEffect(()=>{
    // console.log(route.params)
    // setEmail(route.params.email)
  },[route])

  const handleSubmit=async(code)=>{
    console.log('call')

    if (code==route.params.otp) {
      console.log('not call')
      let SignUpData={type:'register',email:route.params.email,password:route.params.password}
      try {
        const result = await register(SignUpData)
        console.log(result.data?.result)
        console.log(result.data)
        if (result.data?.result){
          console.log(result.data)
          let userId=String(result.data.user_id)
          await AsyncStorage.setItem('user_id', userId)
          await AsyncStorage.setItem('user_email', result.data.email)
          setIsLoading(false)
          navigation.navigate('CreateAcc')
        }else{
          Toast.show(result.data.message, Toast.SHORT, [
            'UIAlertController',
          ]);
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  }



    return (
      <MyContainer headerExist loader={isLoading}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} >
      <View style={[style.layout,style.headerView]}>
        <View style={[style.justify,{marginTop:Platform.OS==='ios'?15:null}]}>
          <Email/>
        </View>
        <Text style={[style.headerText,style.topHighMargin]}>
          Verify Your Email
        </Text>
        <Text style={{marginTop:5}}>{route.params.email}</Text>
        <Text style={[style.emailText,{fontSize:18,lineHeight:18}]}>
        {email}
        </Text>
        <Text style={[style.subHeader,{marginTop:-25,fontFamily:fonts.InterRegular,fontSize:15}]}>
        Please check your email and enter the verification code to confirm your email. If you did not receive an email, or if the code is expired, you can resend one.
        </Text>
        <View style={[style.justify,{marginTop:10}]}>
         <OTPInputView
          style={{width: '70%', height: 70}}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled = {(code => handleSubmit(code))}
          />
        </View>
        <View style={style.topMargin}/>
        <Button
          title={'Resend Code'}
          // onPress={()=>navigation.navigate("SignIn")} 
          />
          <View style={style.topMargin}/>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
        <Text style={[style.emailText,styles.changeEmail]}>
           Change Email
        </Text>
        </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
      </MyContainer>
    );
}

export default Verification;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius:5,
    borderColor:colors.skyLight,
    color:colors.darkest
  },

  underlineStyleHighLighted: {
    borderColor: colors.primaryColor,
    borderWidth:2,
    color:colors.darkest
  },
  changeEmail:{
    fontFamily:fonts.InterBold,
    // fontWeight:'bold',
    textAlign:'center'
  }
})
