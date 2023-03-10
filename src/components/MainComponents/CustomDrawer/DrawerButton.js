import React, { Component } from 'react';
import { Text, TouchableOpacity, ImageBackground, Image, View, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { colors, images, icons, fonts } from '../../../constraints';

export const ButtonDrawer = (props) => {
    return (
        <TouchableOpacity 
        onPress={props.onPress}
        style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 40, backgroundColor: colors.whiteColor }}>
            <View style={{width:'15%',justifyContent:'center',alignItems:'center',marginLeft:'5%' }}>
                {props.icon}
            </View>
            <Text style={{  fontSize: 15, fontFamily: fonts.SemiBold,width:'70%', }}>{props.text}</Text>
        </TouchableOpacity>
    );
}