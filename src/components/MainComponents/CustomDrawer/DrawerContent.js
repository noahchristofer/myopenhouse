import React, { Component } from 'react';
import { Text, TouchableOpacity, ImageBackground, Image, View, ScrollView,Alert } from 'react-native';
import { colors, images, icons, fonts, constant } from '../../../constraints';
import {  DrawerLogOut } from 'svg';
import ManagerDrawer from './ManagerDrawer';
import { ButtonDrawer } from './DrawerButton';

export default class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    alertLogoutFuc() {
        Alert.alert(
            "Log Out",
            "Are you sure to want logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.LogoutFunc() }
            ]
        );
    }
    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    LogoutFunc() {
        this.removeItemValue("@session");
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'FrontScreen' }],
        });
    }


    render() {
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: colors.b5GrayColor }}>
                    <TouchableOpacity style={{ width: 25, height: 25, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', marginTop: -10 }}>
                        <Image
                            source={icons.close}
                            style={{ width: 15, height: 15, marginRight: 15 }}
                        />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5 }}>
                        <Image
                            source={icons.avatar}
                            style={{ width: 60, height: 60, borderRadius: 50 }}
                        />
                        <View style={{ marginLeft: 10,width:'50%' }}>
                            <Text style={{ fontSize: 16, fontFamily: fonts.Bold, color: colors.blackColor }}>{global.user_name}</Text>
                            <Text style={{ fontSize: 12, fontFamily: fonts.SemiBold, color: colors.b5GrayColor }}>{global.user_role=='driver'?'Driver':'Manager'}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ height: 20 }}></TouchableOpacity>
                <ScrollView>
    
                    <ManagerDrawer
                        {...this.props}
                    />
        
                    <View style={{ width: '100%', height: 0.5, backgroundColor: colors.b5GrayColor, marginTop: 10 }}></View>
                    <View style={{ marginTop: 20 }}></View>
                    <ButtonDrawer
                        icon={<DrawerLogOut />}
                        text={"Log Out"}
                        onPress={()=>{
                        this.props.closeBSheet();
                            this.alertLogoutFuc()
                        }}
                    />
                </ScrollView>
                <View style={{ width: '100%', position: 'absolute', bottom: 15, justifyContent: 'center' }}>
                    <Text style={{ color: colors.b5GrayColor, marginLeft: '10%' }}>v {constant.buildVersion}</Text>
                </View>
            </View>
        );
    }
}


