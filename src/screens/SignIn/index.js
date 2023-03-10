import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text,  Dimensions,StyleSheet,Platform} from 'react-native';
import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts } from '../../constraints';
import MyTextInput from '../../components/MainComponents/MyTextInput';
import Button from '../../components/MainComponents/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { login } from '../../Services/LoginFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const SignIn = (props) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const navigation = useNavigation()


  const handleSubmit = async() => {
    if (!email?.trim()) {
      Toast.show('Email is required', Toast.SHORT, [
        'UIAlertController',
      ]);
  
      return;
    }
    if (!password) {
      Toast.show('Password is required', Toast.SHORT, [
        'UIAlertController',
      ]);

      return;
    }
    let email1=email?.trim();
    let email2=email1.toLowerCase()
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email2) === true){
      setIsLoading(true)
      let SignInData={type:'login',email:email2,password:password}
      try {
        const result = await login(SignInData)
        if (result.data?.result){
          await AsyncStorage.setItem('user_id', String(result.data.user_id))
          await AsyncStorage.setItem('user_type', result.data.user_type)
          await AsyncStorage.setItem('user_email', result.data.email)
          setIsLoading(false)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tabs' }],
          })
        }else{
          Toast.show(result.data.message, Toast.SHORT, [
            'UIAlertController',
          ]);
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    }
    else{
      Toast.show('Valid Email is required', Toast.SHORT, [
        'UIAlertController',
      ]);
    }
  }
    return (
      <MyContainer headerExist loader={isLoading}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} >
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
          Sign In
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
         placeholder={"••••••••••"}
         placeholderTextColor={colors.darkGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={style.passwordInputinnerStyle}
         onChangeText={(text) => setPassword(text)}
         value={password}
         secureTextEntry/>
         <View style={style.topMargin}>
         <Button 
          title={'Sign In'}
          onPress={handleSubmit}
          />
          </View>

          <View>
          <Text style={[styles.checkText,{textAlign:'center',marginTop:10,marginBottom:10}]}> Don't have an account?
          </Text>
          <Button
          lightBlue
          ButtonStyle={styles.buttonView1} 
          title={'Sign Up'}
          textStyle={[styles.buttonText,{color:colors.primaryColor}]}
          onPress={()=>navigation.navigate("SignUp")}/>
          </View>
      </View>

   

      {/* <View style={style.horizentalMargin}>
        <Button
          lightBlue
          ButtonStyle={styles.buttonView1} 
          title={'Sign Up'}
          textStyle={[styles.buttonText,{color:colors.primaryColor}]}
          onPress={()=>navigation.navigate("SignUp")}/>
      </View> */}
      </KeyboardAwareScrollView>
      </MyContainer>
    );
}

export default SignIn;

const styles = StyleSheet.create({
  buttonView1:{
    borderRadius:10,
    backgroundColor:colors.lightBlue,
    marginBottom:Platform.OS === "android" ?20:30,
    
  }
})
