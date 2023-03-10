
import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList ,StyleSheet, SectionList,Platform, Image} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import style from '../../../assets/css/style';
import  MyContainer from '../../../components/MainComponents/MyContainer'
import { colors, fonts,constants } from '../../../constraints';
import Button from '../../../components/MainComponents/Button';
import MyTextInput from '../../../components/MainComponents/MyTextInput';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Icon } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Upload,Cancel } from '../../../assets/images';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';


const Photos = (props) => {
  const [images,setImages]=useState([])
  const [img,setImg]=useState([])
    const DATA = [
        {
          id: '1',
          title: 'Yes',
        },
        {
          id: '2',
          title: 'No',
        }]


  const navigation = useNavigation()
  const ImageSelection=async()=>{
    ImagePicker.openPicker({
      // multiple: true,
      mediaType:'photo'
    }).then(async(image) => {
      console.log(image)
      // image.map(async({path})=> 
      // {
        let data=await RNFS.readFile( image.path, 'base64').
            then(res => { return {img:`data:${image.mime};base64, ${res}`} })
        setImg([...img,data]);
      // })
      setImages([...images,image.path]);
    });
  }

  const route=useRoute()
  const [active,setActive] = useState(false)

  useEffect(()=>{
      if (images.length!==0) {
          setActive(true)
      }else{
          setActive(false)
      }
  },[images])

  const handleSubmit=()=>{
    const data={...route.params,'image':JSON.stringify(img)}
    navigation.navigate("ReviewSeller",data)
  }




    return (
      <MyContainer headerExist>
        <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} >
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
        Add photos
        </Text>
        <Text style={[style.emailText1,style.topLowMargin]}>
        add your home photos
        </Text>
        <View style={style.topHighMargin}/>
        <TouchableOpacity onPress={ImageSelection} style={{alignItems:'center',justifyContent:'center',width:'100%'}}>
            <Upload/>
        </TouchableOpacity>

        <Text style={[style.emailText,style.topMargin]}>
        Photos
        </Text>
        {/* <Cancel /> */}
        {images && 
        <FlatList 
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item,index)=>index}
            renderItem={({item})=>{
            return(
           <Image style={{width:100,height:150,borderRadius:10,marginRight:10}}
           source={{uri:item}} />)}}/>}
       
        </View>
      
         <View style={[style.topMargin,{marginHorizontal:10}]}>
         <Button 
          title={'Next'}
          ButtonStyle={styles.buttonView1}
          disabled={!active}
          onPress={handleSubmit}
          textStyle={{color:active?colors.white:colors.skyDark}}
          />
          </View>
         </KeyboardAwareScrollView>
      </MyContainer>
    );
}

export default Photos;

const styles = StyleSheet.create({
  buttonView1:{
    borderRadius:10,
    marginBottom:Platform.OS === "android" ?20:30,
    
  },
  buttonView2:{
    borderRadius:10,
    marginBottom:20,
    width:'87%'
  }
})
