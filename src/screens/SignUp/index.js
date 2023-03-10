import React,{useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts,constants } from '../../constraints';
import MyTextInput from '../../components/MainComponents/MyTextInput';
import Button from '../../components/MainComponents/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Checkboxes } from "../../assets/images";
import { register } from '../../Services/LoginFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const SignUp = (props) => {
  const [email,setEmail] = useState('')
  const [check,setCheck] = useState(false)
  const [checkLength,setCheckLength] = useState(false)
  const [firstLength,setFirstLength] = useState(false)
  const [checkNum,setCheckNum] = useState(false)
  const [firstNum,setFirstNum] = useState(false)
  const [checkLetter,setCheckLetter] = useState(false)
  const [firstLetter,setFirstLetter] = useState(false)
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [active,setActive] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  const navigation = useNavigation()

  const CheckPasswordLength=()=>{
    if (password !=="") {
      if(password.length <=16 && password.length >= 8){
        setCheckLength(true)
        setFirstLength(false)
      }else{
        setCheckLength(false)
        setFirstLength(false)
      }
    }else{
      setFirstLength(true)
      setCheckLength(false)
    }
  }
  const checkPasswordNum=()=>{
    if (password !=="") {
      const res=password.match(/\d+/g)
      if(res){
        setCheckNum(true)
        setFirstNum(false)
      }else{
        setCheckNum(false)
        setFirstNum(false)
      }
    }else{
      setFirstNum(true)
      setCheckNum(false)
    }
  }
  const checkPasswordLetter=()=>{
    if (password !=="") {
      const regex = /[a-zA-Z]/;
      if(regex.test(password)){
        setCheckLetter(true)
        setFirstLetter(false)
      }else{
        setCheckLetter(false)
        setFirstLetter(false)
      }
    }else{
      setFirstLetter(true)
      setCheckLetter(false)
    }
  }
  useEffect(()=>{
    CheckPasswordLength()
    checkPasswordNum()
    checkPasswordLetter()
  },[password])

  useEffect(()=>{
    if (checkNum && 
      checkLength && 
      checkLetter && 
      constants.regEmail.test(email?.trim()) && 
      check && 
      (password===confirmPassword)) 
    {
      setActive(true)
    }else{
      setActive(false)
    }
  },[checkNum,checkLength,email,check,confirmPassword])

  const handleSubmit = async() => {
    let email1=email?.trim();
    let email2=email1.toLowerCase()
    setIsLoading(true)
      let SignUpData={type:'send_otp',email:email2}
      try {
        const result = await register(SignUpData)
        if (result.data?.result){
          console.log(result.data)
          const data={email:email2,password:password,otp:result.data.code}
          setIsLoading(false)
          navigation.navigate('Verification',data)
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

    return (
      <MyContainer headerExist loader={isLoading}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} >
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
          Sign Up
        </Text>
        <Text style={style.subHeader}>
         Enter your email and password
        </Text>
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
         Password
        </Text>
        <MyTextInput
         placeholder={"Your password"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.passwordInputinnerStyle}
         onChangeText={(text) => setPassword(text)}
         value={password}
         secureTextEntry
         />
        <Text style={[style.emailText,style.topMargin]}>
         Confirm Password
        </Text>
        <MyTextInput
         placeholder={"Confirm Password"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.passwordInputinnerStyle}
         onChangeText={(text) => setConfirmPassword(text)}
         value={confirmPassword}
         secureTextEntry/>
        <View style={style.topMargin}/>
         <Text style={style.subHeader}>
          Your password must contain:
          </Text>
          <Text style={[style.subHeader,{color:checkLength?colors.primaryColor:firstLength?colors.darkGray:colors.red}]}>
          . 8 to 16 characters 
          </Text>
          <Text style={[style.subHeader,{color:checkLetter?colors.primaryColor:firstLetter?colors.darkGray:colors.red}]}>
          . At least one letter
          </Text>
          <Text style={[style.subHeader,,{color:checkNum?colors.primaryColor:firstNum?colors.darkGray:colors.red}]}>
          . At least 1 number
          </Text>

          
         <View style={style.topMargin}>

         <TouchableOpacity onPress={()=>setCheck(!check)}>
          <View style={[style.flexRow]}>
            <View style={{paddingTop:4,marginBottom:25}}>
            {check?<Checkboxes/>:
            <View style={style.checkView}/>}
            </View>
          <Text style={styles.checkText}>
          By signing up I agree to refoyer 
          <Text style={styles.privacyText}> Terms of Services
          </Text> and
            <Text style={styles.privacyText}> Privacy Policy
            </Text>
          </Text>
          </View>
          </TouchableOpacity>

         <Button 
          title={'Sign Up'}
          ButtonStyle={{marginBottom:15}}
          disabled={!active}
          onPress={handleSubmit}
          textStyle={{color:active?colors.white:colors.skyDark}}
          />
          </View>
        

          <Text style={[styles.checkText,{textAlign:'center',marginTop:10,marginBottom:10}]}> Already have an account?
          </Text>

        <Button
          lightBlue
          ButtonStyle={styles.buttonView1} 
          title={'Sign In'}
          onPress={()=>navigation.navigate("SignIn")} 
          textStyle={[styles.buttonText,{color:colors.primaryColor}]}/>
      </View>
      </KeyboardAwareScrollView>
      </MyContainer>
    );
}

export default SignUp;

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
  privacyText:{
    color:colors.primaryColor,
    // fontWeight:"bold"
    fontFamily:fonts.InterBold
  }
})
