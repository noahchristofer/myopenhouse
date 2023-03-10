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
            customDateFrom: new Date(),
            customDateTo: new Date(),
            toDateSend: moment().format('YYYY-MM-DD'),
            fromDateSend: moment().format('YYYY-MM-DD')
        };
    }

    dateHandleFunTo(date_custom) {
        var date23 = moment(date_custom).format('YYYY-MM-DD');
        this.setState({
            toDateSend: date23,
        })
    }
    
    dateHandleFunFrom(date_custom) {
        var date23 = moment(date_custom).format('YYYY-MM-DD');
        this.setState({
            fromDateSend: date23,
        })

    }

    confirmDate() {
        console.log("from daee", this.state.fromDateSend);
        this.props.dateFrom(this.state.fromDateSend)
        this.props.dateTo(this.state.toDateSend)
        this.props.close()
    }

    render() {
        return (
            <View style={{ width: '100%' }}>

                <Modal
                    isVisible={this.props.show}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 10, paddingBottom: 10 }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 5,justifyContent:'flex-end' }}>
                            <View style={{ width: '100%' }}>
                                <View style={{ width: '100%', backgroundColor: colors.whiteColor, height: 'auto', borderRadius: 15 }}>
                                    <View style={{ height: 140,overflow:'hidden' }}>
                                        <Text style={{ fontSize: 16, fontFamily: fonts.Bold, color: colors.secondaryColor, marginLeft: 5,textAlign:'center',marginBottom:10 }}>From</Text>

                                        <DatePicker
                                            date={this.state.customDateFrom}
                                            onDateChange={customDate => this.dateHandleFunFrom(customDate)}
                                            mode={'date'}
                                        />
                                    </View>
                                    <View style={{ height: 140,marginTop:25,overflow:'hidden' }}>
                                    <Text style={{ fontSize: 16, fontFamily: fonts.Bold, color: colors.secondaryColor, marginLeft: 5,textAlign:'center',marginBottom:10 }}>To</Text>


                                        <DatePicker
                                            date={this.state.customDateTo}
                                            onDateChange={customDate => this.dateHandleFunTo(customDate)}
                                            mode={'date'}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => this.confirmDate()}
                                        style={{ width: '100%', backgroundColor: colors.whiteColor, height: 50, marginTop: 5, justifyContent: 'space-around', alignItems: 'center', borderRadius: 15, }}>
                                        <Text style={{ fontSize: 16, fontFamily: fonts.Bold, color: colors.secondaryColor }}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={this.props.close}
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
