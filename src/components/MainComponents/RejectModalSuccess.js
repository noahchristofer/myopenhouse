import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from "react-native-modal";

import style from '../../assets/css/style';
import { colors, fonts } from '../../constraints';

import { CheckTick, Cross } from '../../assets/images';
import Button from './Button';
import MyTextInput from './MyTextInput';


function RejectModalSuccess(props) {
    return (
        <Modal isVisible={props.visible} onBackButtonPress={props.hideModal} onBackdropPress={props.hideModal}>
            <View style={[style.layout,style.justify]}>
                <View style={[styles.modalView,{padding:10,width:"100%"}]}>
                    <View style={[style.flexRow,style.justify2,{padding:10}]}>
                        <View style={{width:2,height:2}}/>
                        <TouchableOpacity onPress={props.hideModal}>
                            <Cross/>
                        </TouchableOpacity>
                    </View>
                    <View style={style.line}/>
                    <View style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                    <CheckTick/>
                    <Text style={styles.subItemText}>
                        Offer is rejected successfully
                    </Text>

                </View>
                        <Button 
                        title={'Ok'}
                        onPress={props.hideModal}
                        />
                </View>
            </View>
        </Modal>
    );
}

export default RejectModalSuccess;
const styles = StyleSheet.create({
    modalView:{
        borderRadius:10,
        backgroundColor:colors.white,
    },
    modalItemText:{
        fontFamily:fonts.urbanistSemiBold,
        fontSize:18,
        lineHeight:18,
        color:colors.dark
    },
    subItemText:{
        fontFamily:fonts.urbanistSemiBold,
        fontSize:16,
        lineHeight:24,
        color:colors.darkGray,
    },
    subItemText2:{
        fontFamily:fonts.urbanistSemiBold,
        fontSize:16,
        lineHeight:16,
        color:colors.dark,
        paddingVertical:10
    },
    buttonView1:{
        width:'84%',
        borderColor:colors.gray,
        borderWidth:1,
        borderRadius:10,
        height:40
    },
    buttonView:{
        width:'90%',
        height:40,
    }
})