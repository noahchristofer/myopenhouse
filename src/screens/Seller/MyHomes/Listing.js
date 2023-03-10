import React, {  useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {  useNavigation } from '@react-navigation/native';

import style from '../../../assets/css/style';
import { colors, fonts } from '../../../constraints';

import  MyContainer from '../../../components/MainComponents/MyContainer'
import CardItem from '../../../components/MainComponents/CardItem';
import { UpdateUser } from '../../../Services/LoginFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageNoPreview } from '../../../components/General';

const Listing = (props) => {
  const navigation = useNavigation()
  const [refreshing,setRefreshing] = useState(false)
const [data, setData] = useState([]);
const [lastId, setLastId] = useState(1);
const getData=async()=>{
  setRefreshing(true)
    const user_id = await AsyncStorage.getItem('user_id')
     let updateData={type:'get_data',table_name:'listing',user_id:user_id,own:true}
    console.log(updateData)
    try {
      const result = await UpdateUser(updateData)
      if (result?.data?.data){
        setData(result.data.data)
        setRefreshing(false)
      }else{
        setRefreshing(false)
      }
    } catch (error) {
      setRefreshing(false)
    }
}
const getMoreData=async()=>{

    const user_id = await AsyncStorage.getItem('user_id')

    let updateData={type:'get_data',table_name:'listing',user_id:user_id}

  try {
      const result = await UpdateUser({...updateData,last_id:lastId})
      console.log('running',lastId)
      if (result.data?.data){
        setLastId(lastId+1)
        setData([...data,...result.data.data])
      }
    } catch (error) {
      console.log(error)
    }
}

useEffect(()=>{
    getData()
},[])

    return (
      <>
      <MyContainer headerExist headTitle={"My Listing"}>
        <View style={[style.layout]}>
          {
            data?.length !==0 ?
          <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          onEndReached={()=>{getMoreData()}}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={()=>{
              getData()
            }}
            />
          } 
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>{
            return(
              <View style={{padding:7}}>
              <CardItem
              listing
              OnPressListing={()=>navigation.navigate('MyHomes',item)}
              image={item.user.image}
              favourite={item.favourite}
              beds={item.beds || 0}
              baths={item.baths || 0}
              priceRange={item.price_range}
              sqft={item.home_sqft}
              img={item.thumb}
              name={`${item.user.first_name} ${item.user.last_name}`}
              address={item.address}
              />
              </View>
              )}} 
              />
              :
              <ImageNoPreview title={'No Listing yet'}/>
            }
          </View>
      </MyContainer>
      </>
    );
}

export default Listing;

const styles = StyleSheet.create({
  headerText:{
    fontFamily:fonts.UrbanistBold,
    color:colors.dark,
    fontSize:16,
    lineHeight:26,
    marginHorizontal:15,
    textAlign:'center'
  },
  headerLine:{
    borderBottomWidth:2,
    width:'100%',
    marginTop:15,
  }
})
