import React,{useState,useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList ,StyleSheet,Platform} from 'react-native';
import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts,constants } from '../../constraints';
import Button from '../../components/MainComponents/Button';
import { Down, Edit, Upper } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateUser } from '../../Services/LoginFunctions';
import Toast from 'react-native-simple-toast';

const Review = (props) => {
  const navigation = useNavigation()
  const route=useRoute()
  const [isLoading,setIsLoading] = useState(false)

    const DATA = [
        {
          id: '1',
          title: 'What are you looking for? ',
          subTitle:"Completed",
          value:route.params?.looking_to
        },
        {
          id: '2',
          title: 'Purchase Budget',
          subTitle:`$${route.params?.min_budget}k - $${route.params?.max_budget}k`
        },
        {
          id: '3',
          title: 'Type of Payment',
          subTitle:"Completed",
          value:route.params?.payment_type
        },
    ]
  const [selectedId, setSelectedId] = useState("");

  const handleRoute=(i)=>{
    i.id==='3'?
    navigation.navigate('Payment',{data:route.params,update:true}):
    i.id=='1'?
    navigation.navigate('ActivityType',{data:route.params,update:true})
    :
    null
  }
  const handleSubmit=async()=>{
    console.log(route.params)
    let {first_name,last_name,user_type}=route.params
    const data={first_name,last_name,middle_name:'',user_type}
    setIsLoading(true)
    const user_id = await AsyncStorage.getItem('user_id')
    const updataData={...route.params,type:'update_data',table_name:'users',id:user_id}
    console.log(updataData)
    try {
      const result = await UpdateUser(updataData)
      if (result.data?.result){
        setIsLoading(false)
        if (route.params.looking_to=='Sell') {
          navigation.navigate('Tabs')
        }else{
          navigation.reset({
            index: 0,
            routes: [{ name: 'TypeScreen' ,params:data}],
          })
          }
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


    return (
      <MyContainer headerExist loader={isLoading}>
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
         Review
        </Text>
        <Text style={[style.emailText1,style.topLowMargin]}>
        Please check and review
        </Text>
    
        <FlatList 
            data={DATA}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
                const iconVisible = item.id === selectedId ? true : false
            return(
              <View style={styles.cardView}>
              <TouchableOpacity onPress={()=>
              selectedId!==item.id? 
                setSelectedId(item.id):setSelectedId('')}>
             <View style={[style.flexRow,{justifyContent:'space-between'}]}>
               <Text style={[style.emailText,{marginVertical:0}]}>
                 {item.title}
               </Text>
              <TouchableOpacity style={{width:'10%'}}>
                 {iconVisible?<Upper/>:<Down/>}
              </TouchableOpacity>
              </View>
              <Text style={style.emailText2}>
                {item.subTitle} 
              </Text>
              </TouchableOpacity>
             {(iconVisible && item.id !=='2')?
                <>
                <View style={styles.secndView}>
                   <Text  style={[style.emailText,{marginVertical:0}]}>
                     {item.value}
                   </Text>
                </View>
                <TouchableOpacity onPress={()=>handleRoute(item)}>
                  <Edit/>
                </TouchableOpacity>
                </>
                :null
            }
            </View>
            )}}
            />


        </View>
      
         <View style={[style.topMargin,style.flexRow,style.justify1,{marginLeft:15}]}>
         <Button 
         lightBlue
          title={'Back'}
          ButtonStyle={styles.buttonView1}
          onPress={()=>navigation.goBack()}
          textStyle={{color:colors.primaryColor}}
          />
         <Button 
          title={'Continue'}
          onPress={handleSubmit}
          ButtonStyle={styles.buttonView1}
          />
          </View>
         
      </MyContainer>
    );
}

export default Review;

const styles = StyleSheet.create({
  buttonView1:{
      width:'90%',
       marginBottom:Platform.OS === "android" ?20:30,
  },
  cardView:{
    paddingVertical:20,
    borderColor:colors.gray,
    borderBottomWidth:1,
    borderTopWidth:1
  },
  secndView:{
    borderColor:colors.gray,
    borderWidth:1,
    borderRadius:5,
    padding:5,
    marginBottom:8,
    width:'45%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:15
  }
})
