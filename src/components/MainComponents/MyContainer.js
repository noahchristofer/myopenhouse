import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Platform, Linking, ScrollView, TouchableOpacity, StatusBar, KeyboardAvoidingView } from 'react-native';
import { colors, images, icons, fonts } from '../../constraints';
import { MyStatusBar, Loader, NotFound } from '../General';
// import MainHeader from './MainHeader';
import  StyleSheet  from '../../assets/css/style'
import Header from './Header';
const MyContainer = (props) => {


    useEffect(() => {
    
    }, [])

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 1;
    const keyboardBehaivior = Platform.OS === 'ios' ? 'padding' : '';
    return (
        <KeyboardAvoidingView  >
            <View style={[StyleSheet.mainBackground,{overflow:'hidden',}]}>
                {props.loader && <Loader
                    loader={props.loader}
                />}
                {Platform.OS === 'ios' ?
                     <StatusBar
                     hidden={false}
                     backgroundColor={'white'}
                     barStyle={'dark-content'}
                     translucent={false}
                   />
                    :
                    <MyStatusBar
                        color={'white'}
                        barStyle={'dark-content'}
                    />
                }
                {props.headerExist == true ?
                    <Header
                        {...props}
                    />:null
                }
                {props.dataFound == true ?
                    <NotFound />
                    :
                    props.children
                }
            </View>
        </KeyboardAvoidingView>
    );
}

export default MyContainer
