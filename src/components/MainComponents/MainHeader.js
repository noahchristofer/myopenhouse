import React, { Component } from 'react';
import { Text, TouchableOpacity, ImageBackground, Image, View,Platform } from 'react-native';
import { colors, images, icons, fonts } from '../../constraints';
import { NotificationIcon, MenuIcon, ArrowBack } from 'svg';
import CustomDrawer from './CustomDrawer/CustomDrawer';
import { MyStatusBar } from '../General';
import {dataGet} from '../../utils/myAxios'
export default class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countAlerts:0,
        };
    }

    componentDidMount(){
        this.getAlerts();
    }

    getAlerts() {
        let body = new FormData();
        body.append('type', 'get_notifications');
        body.append('company_id', global.company_id);
        body.append('role', global.role_idTobac);
        body.append('user_id', global.user_id);
        dataGet({
            body
        })
          .then(res => {
            //   console.log("result",res);
            if (res.result == true) {
              this.setState({
                countAlerts: res.num,
    
              })
            }
    
          })
          .catch(err => { });
      }


    render() {
        return (
            <ImageBackground source={images.menuTopDesign}
                style={{ width: '100%', height: Platform.OS==='ios'?150:140, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',paddingBottom:10 }}
            >
                  <MyStatusBar
                    color={'transparent'}
                    barStyle={'light-content'}
                />
                {this.props.menuExist ?
                    <CustomDrawer
                        {...this.props}
                    />
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.whiteColor, borderRadius: 50, }}>
                                <ArrowBack
                                    width={20}
                                    height={20}
                                />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontFamily: fonts.ExtraBold, color: colors.whiteColor }}>{this.props.headerText}</Text>
                    </View>
                }
                {this.props.Cp ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={this.props.onPressSearch}
                            style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.whiteColor, borderRadius: 50, marginRight: 10 }}>
                            <Image
                                source={icons.search}
                                style={{ width: 15, height: 15, tintColor: colors.secondaryColor }}
                            />
                        </TouchableOpacity>
                        {this.props.AddBtnFalse == true ? <View style={{ width: 12, height: 12 }}></View> :
                            <TouchableOpacity
                                onPress={this.props.onPressAdd}
                                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginRight: '5%', backgroundColor: colors.whiteColor, borderRadius: 50 }}>
                                <Image
                                    source={icons.plus}
                                    style={{ width: 15, height: 15, tintColor: colors.secondaryColor }}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                    :
                    <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate("Notifications")}
                    style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                        <View style={{flexDirection:'row'}}>
                        <NotificationIcon
                            width={22}
                            height={22}
                        />
                        <View style={{minWidth:15,height:20,backgroundColor:colors.whiteColor,borderRadius:50,marginTop:-10,justifyContent:'center',alignItems:'center',paddingLeft:5,paddingRight:5,marginLeft:-7}}>
                            <Text style={{fontSize:10,fontFamily:fonts.SemiBold,color:colors.blackColor}}>{this.state.countAlerts}</Text>
                        </View>
                        </View>
                        </View>
                    </TouchableOpacity>
                }
            </ImageBackground>
        );
    }
}
