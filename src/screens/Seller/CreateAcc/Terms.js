import React,{useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList ,StyleSheet, Image, ScrollView,Platform} from 'react-native';
import style from '../../../assets/css/style';
import  MyContainer from '../../../components/MainComponents/MyContainer'
import { colors, fonts,constants, images } from '../../../constraints';
import Button from '../../../components/MainComponents/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Terms = (props) => {
    
  const navigation = useNavigation()

    return (
      <MyContainer headerExist>
      <View style={[style.layout,style.headerView]}>
        <Text style={style.headerText}>
        Terms of Service
        </Text>
        <Text style={[style.emailText1,style.topLowMargin]}>
        Please check and review
        </Text>
    <ScrollView showsVerticalScrollIndicator={false} >
        <Text>
        These Terms of Use ("Terms") govern the access or use by you, an individual, from within the United States and its territories and possessions of applications, websites, content, products, and services (the "Services") made available in the United States and its territories and possessions by Lugg, Inc and its subsidiaries and affiliates (collectively, "Lugg"). PLEASE READ THESE TERMS CAREFULLY BEFORE ACCESSING OR USING THE SERVICES. In this Agreement, the words "including" and "include" mean "including, but not limited to."
These Terms of Use ("Terms") govern the access or use by you, an individual, from within the United States and its territories and possessions of applications, websites, content, products, and services (the "Services") made available in the United States and its territories and possessions by Lugg, Inc and its subsidiaries and affiliates (collectively, "Lugg"). PLEASE READ THESE TERMS CAREFULLY BEFORE ACCESSING OR USING THE SERVICES. In this Agreement, the words "including" and "include" mean "including, but not limited to."
These Terms of Use ("Terms") govern the access or use by you, an individual, from within the United States and its territories and possessions of applications, websites, content, products, and services (the "Services") made available in the United States and its territories and possessions by Lugg, Inc and its subsidiaries and affiliates (collectively, "Lugg"). PLEASE READ THESE TERMS CAREFULLY BEFORE ACCESSING OR USING THE SERVICES. In this Agreement, the words "including" and "include" mean "including, but not limited to."
        </Text>
        </ScrollView>
    
        </View>
      
         <View style={[style.topMargin,style.flexRow,style.justify1,{marginLeft:15}]}>
         <Button 
         lightBlue
          title={'Decline'}
          ButtonStyle={styles.buttonView1}
          onPress={()=>navigation.goBack()}
          textStyle={{color:colors.primaryColor}}
          />
         <Button 
          title={'Accept'}
          onPress={()=>navigation.navigate('Tabs')}
          ButtonStyle={styles.buttonView1}
          />
          </View>

      </MyContainer>
    );
}

export default Terms;

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
    width:'50%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:15
  }
})
