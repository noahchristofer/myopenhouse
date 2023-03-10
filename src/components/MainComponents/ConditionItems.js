import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import style from '../../assets/css/style';
import { colors, fonts } from '../../constraints';
import Button from './Button';

function ConditionItems(props) {
    return (
        <>
          <Text style={[style.emailText,{fontSize:18,marginVertical:3,lineHeight:32,fontFamily:fonts.UrbanistBold}]}>
            {props.title}
            </Text>
            <View>
            <FlatList 
            data={props.DATA}
            numColumns={2}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
                const backgroundColor = item.id === props.selectedId ? true : false
            return(
                <Button 
                title={item.title}
                yes={backgroundColor}
                colors={!backgroundColor}
                unCheck={!backgroundColor}
                ButtonStyle={[styles.buttonView2,{borderColor:backgroundColor?colors.primaryColor:colors.gray,borderWidth:1,borderRadius:10}]}
                onPress={()=>{
                    props.setSelectedTitle(item.title)
                    props.setSelectedId(item.id)}}
                textStyle={{marginLeft:10,color:backgroundColor?colors.white:colors.skyDark}}
                />
            )}}
            extraData={props.selectedId}/>
            </View>
        </>
    );
}

export default ConditionItems;

const styles = StyleSheet.create({
    buttonView1:{
        borderRadius:10,
        marginBottom:20,
        
      },
      buttonView2:{
        borderRadius:10,
        marginBottom:20,
        width:'87%',
        height:40
      }
    
})