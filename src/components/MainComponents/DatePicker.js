import React, { Component } from 'react';
import { Text, TouchableOpacity, ImageBackground, Image, View, Platform } from 'react-native';
import { colors, images, icons, fonts } from '../../constraints';
import { BackArrowWhite } from 'svg';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
export default class DatePicker2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            value: '',
            customDate: new Date(),
            toDateSend: this.props.type=='time'?moment().format('hh:mm A'): moment().format('YYYY-MM-DD')
        };
    }

    dateHandleFun(date_custom) {
        if(this.props.type == 'time'){ 
        var date23 = moment(date_custom).format('hh:mm A');
        }else{
        var date23 = moment(date_custom).format('YYYY-MM-DD');

        }
        this.setState({
            toDateSend: date23,
        })
    }

    confirmDate() {
        this.setState({
            value: this.state.toDateSend,
            modal: false
        })
        this.props.value(this.state.toDateSend)
    }

    render() {
        return (
            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 12, fontFamily: fonts.Medium, color: colors.blackColor, marginLeft: 5 }}>{this.props.text}</Text>
                <TouchableOpacity
                    onPress={() => this.setState({ modal: true })}
                    style={{
                        width: '98%', height: 45, borderRadius: 5, backgroundColor: colors.whiteColor, marginTop: 10, marginBottom: 5, marginLeft: 5, marginRight: 5,
                        shadowColor: Platform.OS==='ios'?'#D4D4D4':'#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 2
                    }}>
                    <View style={{ width: '100%', height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {this.props.setValue == '' ?
                            <Text style={{ fontSize: 12, fontFamily: fonts.Medium, paddingLeft: 10, color: colors.b5GrayColor }}>{this.props.placeholder}</Text>
                            :
                            <Text style={{ fontSize: 12, fontFamily: fonts.Medium, paddingLeft: 10, color: colors.blackColor }}>{this.props.setValue}</Text>
                        }
                        <Image
                            source={icons.down_Colap}
                            style={{ width: 15, height: 15, marginRight: 10, tintColor: colors.b5GrayColor }}
                        />
                    </View>
                </TouchableOpacity>
                <Modal
                    isVisible={this.state.modal}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 10, paddingBottom: 10 }}>
                        <View style={{ flex: 2 }}></View>
                        <View style={{ flex: 4, justifyContent: 'flex-end' }}>
                            <View style={{ width: '100%' }}>
                                <View style={{ width: '100%', backgroundColor: colors.whiteColor, height: 200, borderRadius: 15 }}>
                                    <View style={{ height: 140,alignItems:'center' }}>
                                        {this.props.type == 'time' ?
                                            <DatePicker
                                                date={this.state.customDate}
                                                onDateChange={customDate => this.dateHandleFun(customDate)}
                                                mode={'time'}
                                            />
                                            :
                                            <DatePicker
                                                date={this.state.customDate}
                                                onDateChange={customDate => this.dateHandleFun(customDate)}
                                                mode={'date'}
                                            />
                                        }

                                    </View>
                                    <TouchableOpacity
                                        onPress={() => this.confirmDate()}
                                        style={{ width: '100%', backgroundColor: colors.whiteColor, height: 50, marginTop: 5, justifyContent: 'space-around', alignItems: 'center', borderRadius: 15, }}>
                                        <Text style={{ fontSize: 16, fontFamily: fonts.Bold, color: colors.secondaryColor }}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.setState({ modal: false })}
                                    style={{ width: '100%', backgroundColor: colors.whiteColor, height: 50, marginTop: 5, justifyContent: 'space-around', alignItems: 'center', borderRadius: 15 }}>
                                    <Text style={{ fontSize: 16, fontFamily: fonts.Bold, color: colors.blueLight }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
