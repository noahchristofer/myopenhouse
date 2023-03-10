import React,{useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList ,StyleSheet} from 'react-native';
import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts,constants } from '../../constraints';
import Button from '../../components/MainComponents/Button';

const SecType = (props) => {
    const DATA = [
        {
          id: '1',
          title: 'Get Insights on My Home',
        },
        {
          id: '2',
          title: 'Sell and Buy',
        }]
  const [active,setActive] = useState(false)
  const [selectedId, setSelectedId] = useState("");

  const navigation = useNavigation()
  useEffect(()=>{
      if (selectedId) {
          setActive(true)
      }else{
          setActive(false)
      }
  },[selectedId])

    return (
      <MyContainer headerExist>
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
        What would you like to do? 
        </Text>
        <Text style={[style.emailText1,style.topLowMargin]}>
        Select what would you like to do
        </Text>
        <FlatList 
            data={DATA}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
                const backgroundColor = item.id === selectedId ? true : false
            return(
            <TouchableOpacity onPress={()=>setSelectedId(item.id)}>
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
          onPress={()=>navigation.navigate("Value")}
          textStyle={{color:active?colors.white:colors.skyDark}}
          />
          </View>
         
      </MyContainer>
    );
}

export default SecType;

const styles = StyleSheet.create({
  buttonView1:{
    borderRadius:10,
    marginBottom:20,
  }
})
