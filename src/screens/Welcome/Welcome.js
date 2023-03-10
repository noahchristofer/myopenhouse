import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text,FlatList, StyleSheet,Image,Platform} from 'react-native';
import style from '../../assets/css/style';
import Button from '../../components/MainComponents/Button';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts, images } from '../../constraints';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { login } from '../../Services/LoginFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const Welcome = (props) => {
  const [isLoading,setIsLoading] = useState(false)

  const DATA = [
    {
      id: '1',
      title: 'Google',
    },
    {
      id: '2',
      title: 'Facebook',
    }]
    const navigation = useNavigation()
    async function onFacebookButtonPress() {
      try {
        
        // Attempt login with permissions
        const res = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        
        if (res.isCancelled) {
          throw 'User cancelled the login process';
        }
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
        console.log('dat====>>',data)
        
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
        setIsLoading(true)
        const loginData={type:'social_login',token:data.accessToken.toString(),first_name:'',last_name:'',phone:'',email:''}
        const result = await login(loginData)
        if (result.data?.result){
          await AsyncStorage.setItem('user_id', String(result.data.user_id))
          await AsyncStorage.setItem('user_type', String(result.data.user_type))
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

        // Create a Firebase credential with the AccessToken
        // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        
        // Sign-in the user with the credential
        // const res=await auth().signInWithCredential(facebookCredential);
        console.log('res==',res)
      } catch (error) {
        console.log('eroooooo',error)
        setIsLoading(false)
      }
    }
    

    async function onGoogleButtonPress() {
      // Get the users ID token
      // const { idToken } = await GoogleSignin.signIn();
    
      // // Create a Google credential with the token
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // // Sign-in the user with the credential
      // return auth().signInWithCredential(googleCredential);
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // const currentUser = await GoogleSignin.signOut();
        setIsLoading(true)
        const loginData={type:'social_login',token:userInfo?.idToken,first_name:userInfo?.user?.name,last_name:'',phone:'',email:userInfo?.user?.email}
        const result = await login(loginData)
        console.log('logindata==',loginData)
        console.log('res==>>>>>>',result.data)
        if (result.data?.result){
          await AsyncStorage.setItem('user_id', String(result.data.user_id))
          await AsyncStorage.setItem('user_type', String(result.data.user_type))
          await AsyncStorage.setItem('user_email', userInfo?.user?.email)
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
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          console.log('SIGN_IN_CANCELLED',error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          console.log('IN_PROGRESS',error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          console.log('PLAY_SERVICES_NOT_AVAILABLE',error)
        } else {
          console.log('error',error)
          // some other error happened
        }
        setIsLoading(false)
      }    
    }
    

    return (
      <MyContainer loader={isLoading}>
        <View style={style.layout}>
          <Image source={images.Welcome} style={{width:'100%',height:'60%'}}/>
          <View style={style.headerView}>
          <Text style={style.headerText}>
          Welcome!
          </Text>
          <Text style={style.subHeader}>
          Please sign in to continue!
          </Text>
          {/* <Instagram/> */}
          <FlatList 
            data={DATA}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
            return(
              <Button google colors 
              ButtonStyle={styles.buttonView} 
              title={item.title}
              textStyle={styles.buttonText}
              // onPress={()=>item.title=='Facebook'? onFacebookButtonPress():onGoogleButtonPress()}
              />)}}
            />
             <Text style={styles.orText}>
               or
            </Text>
          </View>
        </View>
        <View style={style.horizentalMargin}>
        <Button
          lightBlue
          onPress={()=>navigation.navigate("SignIn")} 
          ButtonStyle={styles.buttonView1} 
          title={'Continue with Email'}
          textStyle={[styles.buttonText,{color:colors.primaryColor}]}/>
          </View>
      </MyContainer>
    );
}

export default Welcome;

const styles = StyleSheet.create({
  buttonView:{
    borderWidth:1,
    borderRadius:10,
    borderColor:colors.lightGray,
    marginVertical:5
  },
  buttonText:{
    color:colors.black,
    fontFamily:fonts.InterSemiBold,
    // fontWeight:"800"
  },orText:{
    color:colors.darkGray,
    fontFamily:fonts.InterMedium,
    fontSize:14,
    // fontWeight:'400',
    lineHeight:24,
    textAlign:'center'
  },
  buttonView1:{
    borderRadius:10,
    marginVertical:5,
    backgroundColor:colors.lightBlue,
    marginBottom: Platform.OS ? 30 : 20
   }
  
})
