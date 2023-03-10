import React,{useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text,  Dimensions,StyleSheet, Image, SectionList, FlatList} from 'react-native';
import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts, images } from '../../constraints';
import MyTextInput from '../../components/MainComponents/MyTextInput';
import Button from '../../components/MainComponents/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Noti1, Noti2, Noti3 } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateUser } from '../../Services/LoginFunctions';

const Notifications = (props) => {
  const navigation = useNavigation()

  const [isLoading,setIsLoading] = useState(false)
  const [data, setData] = useState([]);

  const getData=async()=>{
  setIsLoading(true)
    const user_id = await AsyncStorage.getItem('user_id')
    let data={type:'notifications',user_id:91}
    try {
      const result = await UpdateUser(data)
      console.log(result.data)
      if (result.data){
        setData(result.data.service)
        setIsLoading(false)
      }else{
        console.log(result.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
}
useEffect(()=>{
  getData()
},[])


  // const sectionData=[
  //   {
  //     title:'today' ,
  //     data: data
  //   }
  // ]
    return (
      <MyContainer headerExist msg editHeader={'Notifications'} styleHeader={styles.header} loader={isLoading}>
      {/* <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} > */}
      <View style={[style.layout,style.headerView]}>
      {/* <SectionList */}
      {/* // sections={sectionData}
      // stickySectionHeadersEnabled={false}
      // renderSectionHeader={({ section }) => ( */}
      {/* //   <View>
      //   <Text style={styles.heading}>
      //       {section.title}
      //   </Text>
      //   </View>
      // )} */}
      <FlatList
      data={data}
      renderItem={({ item, index }) => {
          return (
          <View style={[style.flexRow,style.topLowMargin,{
            width:'100%',borderBottomColor:colors.whiteLine,borderBottomWidth:1,
            paddingVertical:8,flexDirection:'row'}]}>
         {item.type=='received'?<Noti2/>:item.type=='accepted'?<Noti3/>:<Noti1/>}
          <View style={{width:'75%'}}>
          <Text style={styles.notiHeading}>
              {item.notification}
          </Text>
          <Text style={styles.notiSubHeading}>
              {/* {item.subTitle} */}
          </Text>
          </View>
          <Text style={styles.notiSubHeading}>
              {/* {item.subTitle} */}
              {item.datetime}
          </Text>
         </View>
         )}}
        keyExtractor={(item) => item.id}
        // showsVerticalScrollIndicator={false}
        // removeClippedSubviews={false}
        />

      </View>
      {/* </KeyboardAwareScrollView> */}
      </MyContainer>
    );
}

export default Notifications;

const styles = StyleSheet.create({
  header:{
      justifyContent:'flex-start'
  },
  heading:{
      fontFamily:fonts.UrbanistBold,
      // fontWeight:"bold",
      fontSize:16,
      lineHeight:22,
      color:colors.darkestGray
  },
  notiHeading:{
      fontFamily:fonts.UrbanistBold,
      // fontWeight:"bold",
      fontSize:14,
      lineHeight:20,
      color:colors.black,
      marginLeft:10
  },
  notiSubHeading:{
      fontFamily:fonts.urbanistregular,
      fontSize:12,
      lineHeight:18,
      color:colors.darkestGray,
      marginLeft:10
  }
})
