
import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList ,StyleSheet, Platform} from 'react-native';
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
import ConditionItems from '../../../components/MainComponents/ConditionItems';



const Conditions = (props) => {
    const DATA = [
        {
          id: '1',
          title: 'Yes',
        },
        {
          id: '2',
          title: 'No',
        }]
//   const [active,setActive] = useState(false)
//   const [area,setArea] = useState('')
//   const value1 = useState('')
//   const value2 = useState('')
//   const value3 = useState('')
//   const label = useState('Beds')
//   const label2 = useState('Bath')
//   const label3 = useState('Water & Sewer Source')
  const [selectedId1, setSelectedId1] = useState("1");
  const [selectedId2, setSelectedId2] = useState("1");
  const [selectedId3, setSelectedId3] = useState("1");
  const [selectedId4, setSelectedId4] = useState("1");
  const [selectedId5, setSelectedId5] = useState("1");
  const [selectedId6, setSelectedId6] = useState("1");
  
  const [selectedTitle1, setSelectedTitle1] = useState("yes");
  const [selectedTitle2, setSelectedTitle2] = useState("yes");
  const [selectedTitle3, setSelectedTitle3] = useState("yes");
  const [selectedTitle4, setSelectedTitle4] = useState("yes");
  const [selectedTitle5, setSelectedTitle5] = useState("yes");
  const [selectedTitle6, setSelectedTitle6] = useState("yes");

  const navigation = useNavigation()
  const route=useRoute()
  // useEffect(()=>{
  //     if (value1[0] && value2[0] && value3[0] && area) {
  //         setActive(true)
  //     }else{
  //         setActive(false)
  //     }
  // },[value1[0],value2[0],value3[0],area])

//   let data = ['1','2', '3'];
//     let data2 = ['1','2','3'];
//   let data3 = ['Private','Public'];

    // const sectionData=[
    //     {
    //       title: {title:'Beds'},
    //       data: [
    //         { name:data,id:1,label:label,value:value1 },
    //       ]
    //     },
    //     {
    //       title: {title:'Bath'},
    //       data: [
    //         { name:data2,id:1,label:label2,value:value2 },
    //       ]
    //     },
    //     {
    //       title: {title:'Water & Sewer Source'},
    //       data: [
    //         { name:data3,id:1,label:label3,value:value3 },
    //       ]
    //     }
    //   ]
   
    const [update,setUpdate] = useState(false)

    useEffect(()=>{
     route.params?.update?
     setUpdate(true):
     setUpdate(false)
    },[route])
    useEffect(()=>{
      if(route.params?.update)
      {
        setSelectedId1(route.params.data.flooding =='Yes'?'1':'2')
        setSelectedId2(route.params.data.renovations =='Yes'?'1':'2')
        setSelectedId3(route.params.data.lead =='Yes'?'1':'2')
        setSelectedId4(route.params.data.fires =='Yes'?'1':'2')
        setSelectedId5(route.params.data.generator =='Yes'?'1':'2')

        setSelectedTitle1(route.params.data.flooding)
        setSelectedTitle2(route.params.data.renovations)
        setSelectedTitle3(route.params.data.lead)
        setSelectedTitle4(route.params.data.fires)
        setSelectedTitle5(route.params.data.generator)
      }
     },[route])

    const handleSubmit=()=>{
      update?
      navigation.navigate("ReviewSeller",{...route.params.data,flooding:selectedTitle1,renovations:selectedTitle2,lead:selectedTitle3,fires:selectedTitle4,generator:selectedTitle5})
      :
      navigation.navigate("Location",{...route.params,flooding:selectedTitle1,renovations:selectedTitle2,lead:selectedTitle3,fires:selectedTitle4,generator:selectedTitle5,})
    }

    return (
      <MyContainer headerExist>
        <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} >
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
        Conditions
        </Text>
        <Text style={[style.emailText1,style.topLowMargin]}>
        Detail about the conditions of the house
        </Text>
        {/* <View> */}

        {/* <SectionList
              sections={sectionData}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section }) => (
                <Text style={style.emailText}>
                    {section.title.title}
                </Text>
                )}
              renderItem={({ item, index }) => {
                return (
                  //   <Dropdown
                  //   baseColor={'transparent'}
                  //   data={item.name}
                  //   label={item.label[0]}
                  //   containerStyle={style.dropdown}
                  //   selectedItemColor={colors.primaryColor}
                  //   onChangeText={(args, index, data)=>{
                  //   item.value[1](args)
                  //   item.label[1]('')
                  // }}
                  //  />
                  <ModalDropdown
                  defaultValue={item.label[0]}
                  options={item.name}
                  style={style.inputContainerStyle}
                  textStyle={style.dropDownText}
                  dropdownStyle={style.dropDownView1}
                  dropdownTextStyle={style.dropDownText}
                  dropdownTextHighlightStyle={{color:colors.primaryColor}}/>
                   
                   )
                  }}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={false}
                  />
              </View>
            <Text style={[style.emailText,]}>
            HOA Fees
            </Text>
            <MyTextInput
             placeholder={"HOA Fees"}
             placeholderTextColor={colors.darkGray}
             containerStyle={style.inputContainerStyle}
             inputStyle={style.inputInnerStyle}
             onChangeText={(text) => setArea(text)}
             value={area}/> */}
          
        <ConditionItems DATA={DATA} setSelectedTitle={setSelectedTitle1} title={'Any flooding?'} selectedId={selectedId1} setSelectedId={setSelectedId1}/>
        <ConditionItems DATA={DATA} setSelectedTitle={setSelectedTitle2} title={'Any recent renovations?'} selectedId={selectedId2} setSelectedId={setSelectedId2}/>
        <ConditionItems DATA={DATA} setSelectedTitle={setSelectedTitle3} title={'Any lead?'} selectedId={selectedId3} setSelectedId={setSelectedId3}/>
        <ConditionItems DATA={DATA} setSelectedTitle={setSelectedTitle4} title={'Any fires?'} selectedId={selectedId4} setSelectedId={setSelectedId4}/>
        <ConditionItems DATA={DATA} setSelectedTitle={setSelectedTitle5} title={'Generator on-site?'} selectedId={selectedId5} setSelectedId={setSelectedId5}/>
       
        </View>
      
         <View style={[style.topMargin,{marginHorizontal:10}]}>
         <Button 
          title={update?'Update':'Next'}
          ButtonStyle={styles.buttonView1}
          // disabled={!active}
          onPress={handleSubmit}
          // textStyle={{color:active?colors.white:colors.skyDark}}
          />
          </View>
         </KeyboardAwareScrollView>
      </MyContainer>
    );
}

export default Conditions;

const styles = StyleSheet.create({
  buttonView1:{
    borderRadius:10,
    marginBottom:Platform.OS === "android" ?20:30,
  },
  buttonView2:{
    borderRadius:10,
    marginBottom:Platform.OS === "android" ?20:30,
    width:'87%'
  }
})
