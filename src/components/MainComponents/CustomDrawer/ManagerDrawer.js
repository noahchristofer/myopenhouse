import React, { Component } from 'react';
import { Text, TouchableOpacity, ImageBackground, Image, View, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { colors, images, icons, fonts } from '../../../constraints';
import { ButtonDrawer } from './DrawerButton';
import {
    Home, DashboardDrawer, MapDrawer, DrawerControlPanel,
    DrawerReport, DrawerSettings, DrawerMessage, DrawerFaq, DrawerAboutUs
} from 'svg';
import { showToast } from '../../General';

export default class ManagerDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ width: '100%' }}>
                <ButtonDrawer
                    icon={<Home />}
                    text={"Home"}
                    onPress={() => {
                        this.props.closeBSheet();
                        this.props.navigation.navigate("MenuScreen")
                    }}
                />
                <ButtonDrawer
                    icon={<DashboardDrawer />}
                    text={"Dashboard"}
                    onPress={() => {
                        this.props.closeBSheet();
                        this.props.navigation.navigate("Dashboard")
                    }}
                />
                <ButtonDrawer
                    icon={<MapDrawer />}
                    text={"Vehicle On Map"}
                    onPress={() => {
                        this.props.closeBSheet();
                        if (global.map_allow == true) {
                            this.props.navigation.navigate("VehicleOnMapRealtime")
                        } else {
                            showToast("You are not allowed to access this feature")
                        }
                    }}
                />
            </View>
        );
    }
}
