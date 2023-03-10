import React,{useState,useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList ,StyleSheet,Platform} from 'react-native';
import style from '../../../assets/css/style';
import  MyContainer from '../../../components/MainComponents/MyContainer'
import { colors, fonts,constants } from '../../../constraints';
import Button from '../../../components/MainComponents/Button';

const Timeline = (props) => {
    const DATA = [
        {
          id: '1',
          title: 'Within 3 Months',
        },
        {
          id: '2',
          title: '6 Months',
        },
        {
          id: '3',
          title: '1 Year',
        }]
  const [active,setActive] = useState(false)
  const [selectedId, setSelectedId] = useState("");
  const [selectedTitlte, setSelectedTitle] = useState("");

  const navigation = useNavigation()
  const route=useRoute()

  useEffect(()=>{
      if (selectedId) {
          setActive(true)
      }else{
          setActive(false)
      }
  },[selectedId])

  const handleSubmit=()=>{
    const data={...route.params,timeline:selectedTitlte}
    console.log(data)
    navigation.navigate("DataSeller",data)
  }
    return (
      <MyContainer headerExist>
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
        Timeline to buy 
        </Text>
        <Text style={[style.emailText1,style.topLowMargin]}>
        Tentative timeline to close the deal
        </Text>
        <FlatList 
            data={DATA}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
                const backgroundColor = item.id === selectedId ? true : false
            return(
            <TouchableOpacity onPress={()=>{
              setSelectedId(item.id)
              setSelectedTitle(item.title)
              }}>
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
          title={'Continue'}
          ButtonStyle={styles.buttonView1}
          disabled={!active}
          onPress={handleSubmit}
          textStyle={{color:active?colors.white:colors.skyDark}}
          />
          </View>
         
      </MyContainer>
    );
}

export default Timeline;

const styles = StyleSheet.create({
  buttonView1:{
    borderRadius:10,
    marginBottom:Platform.OS === "android" ?20:30,
  }
})
