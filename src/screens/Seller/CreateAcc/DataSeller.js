
import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList ,StyleSheet,Platform} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import style from '../../../assets/css/style';
import  MyContainer from '../../../components/MainComponents/MyContainer'
import { colors, fonts,constants } from '../../../constraints';
import Button from '../../../components/MainComponents/Button';
import MyTextInput from '../../../components/MainComponents/MyTextInput';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Icon } from '@rneui/base';
import { Down } from '../../../assets/images';



const DataSeller = (props) => {
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
  const [show,setShow] = useState(false)
  const [value,setValue] = useState('Range')
  const [price,setPrice] = useState('')

  const navigation = useNavigation()
  const route=useRoute()

  useEffect(()=>{
      if (price) {
          setActive(true)
      }else{
          setActive(false)
      }
  },[price])

  const [update,setUpdate] = useState(false)

    useEffect(()=>{
     route.params?.update?
     setUpdate(true):
     setUpdate(false)
    },[route])

    useEffect(()=>{
      if(route.params?.update)
      {
        setPrice(route.params.data.estimated_date)
        setValue(route.params.data.estimated_date)
      }
     },[route])

  const handleSubmit=()=>{
    update?
    navigation.navigate("ReviewSeller",{...route.params.data,estimated_date:price})
    :
    navigation.navigate("HomeInfo",{...route.params,estimated_date:price})
  }
 

    return (
      <MyContainer headerExist>
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
        When Would You like to Sell Your Home?
        </Text>
        <Text style={[style.emailText1,style.topLowMargin]}>
        Estimated date seller
        </Text>
        
        <Text style={style.emailText}>
         Month Range
        </Text>

        <ModalDropdown
        defaultValue={value}
        options={['1-3 Months ', "3-6 Months","Within 1 Year","Waiting on Best Offer"]}
        style={style.inputContainerStyle}
        textStyle={[style.dropDownText,{textTransform:'none'}]}
        dropdownStyle={style.dropDownView1}
        dropdownTextStyle={[style.dropDownText,{textTransform:'none'}]}
        renderRightComponent={()=>{
          return(
            <View
            style={{
              marginLeft:'70%',
              padding:20,
            }}>
            {/* <Down/> */}
            </View>
            )
        }}
        dropdownTextHighlightStyle={{color:colors.primaryColor}}
        onSelect={(index,value)=>setPrice(value)}/>
        {/* <Text style={style.emailText}>
         Month Range
        </Text> */}
        {/* <Dropdown
        baseColor={'transparent'}
        data={data}
        label={label[0]}
        containerStyle={style.dropdown}
        selectedItemColor={colors.primaryColor}
        onChangeText={(args, index, data)=>{
        setPrice(args)
        label[1]('')
      }}
       /> */}

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

export default DataSeller;

const styles = StyleSheet.create({
  buttonView1:{
    borderRadius:10,
    marginBottom:Platform.OS === "android" ?20:30,
  }
})
