
import React,{useState,useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList ,StyleSheet, Platform} from 'react-native';
import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts,constants } from '../../constraints';
import Button from '../../components/MainComponents/Button';

const Payment = (props) => {
    const DATA = [
        {
          id: '1',
          title: 'Cash',
        },
        {
          id: '2',
          title: 'Finance',
        },
        {
          id: '3',
          title: 'All Types',
        }]
  const [active,setActive] = useState(false)
  const [selectedId, setSelectedId] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(route?.params?.payment_type||"");

  const navigation = useNavigation()
  const route=useRoute()
  const [update,setUpdate] = useState(false)


  useEffect(()=>{
      if (selectedId) {
          setActive(true)
      }else{
          setActive(false)
      }
  },[selectedId])
  useEffect(()=>{
    setSelectedId(route?.params?.payment_type=='Cash'?'1':
    route?.params?.payment_type=='Finance'?'2':route?.params?.payment_type=='All Types'?'3':'')
},[route])

useEffect(()=>{
  if(route.params?.update)
  {
    setSelectedTitle(route.params.data.payment_type)
    setSelectedId(route?.params?.data.payment_type=='Cash'?'1':
    route?.params?.data.payment_type=='Finance'?'2':route?.params?.data.payment_type=='All Types'?'3':'')
    setUpdate(true)
  }else{
    setUpdate(false)
  }
 },[route])

  const handleSubmit=()=>{
    let data={}
    if (update) {
       data={...route.params.data,'payment_type':selectedTitle}
    } else {
       data={...route.params,'payment_type':selectedTitle}
    }
    navigation.navigate("Review",data)
  }

    return (
      <MyContainer headerExist>
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
        Type of Payment 
        </Text>
        <Text style={[style.emailText1,style.topLowMargin]}>
        Choose your preferred payment
        </Text>
        <FlatList 
            data={DATA}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
                const backgroundColor = item.id === selectedId ? true : false
            return(
            <TouchableOpacity onPress={()=>{
              setSelectedId(item.id)
              setSelectedTitle(item.title)}}>
             <View style={[style.lookingView,{
                 backgroundColor:backgroundColor?colors.lightestPrimary:colors.white,
                 borderColor:backgroundColor?colors.lightPrimaryColor:colors.lightGray,
                }]}>
               <Text style={[style.lookingText,{color:backgroundColor?colors.lightPrimaryColor:colors.lightblack}]}>
                {item.title}
               </Text>
              </View>
            </TouchableOpacity>
            )}}
            extraData={selectedId}
            />


        </View>
      
         <View style={[style.topMargin,{marginHorizontal:10}]}>
         <Button 
          title={update?'Update':'Continue'}
          ButtonStyle={styles.buttonView1}
          disabled={!active}
          onPress={handleSubmit}
          textStyle={{color:active?colors.white:colors.skyDark}}
          />
          </View>
         
      </MyContainer>
    );
}

export default Payment;

const styles = StyleSheet.create({
  buttonView1:{
    borderRadius:10,
    marginBottom:Platform.OS === "android" ?20:30,

  }
})
