import React, { Component } from 'react';
import { Text, TouchableOpacity, ImageBackground, Image, View, TextInput, ScrollView,Platform } from 'react-native';
import { colors, images, icons, fonts } from '../../constraints';
import { LineSvg } from 'svg';
import Modal from 'react-native-modal';
export default class PickerMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            placeholderState: true,
            viewDisplay: false
        };
    }

    render() {

        return (
            <View style={{ width: '100%', height: 'auto' }}>
                <Text style={{ fontSize: 12, fontFamily: fonts.Medium, color: colors.blackColor, marginLeft: 5 }}>{this.props.text}</Text>
                <TouchableOpacity
                    onPress={this.props.onPress}
                    style={{
                        width: '98%', height: 45, borderRadius: 5, backgroundColor: colors.whiteColor, marginTop: 10, marginBottom: 5, marginLeft: 5, marginRight: 5,
                        shadowColor: Platform.OS==='ios'?'#D4D4D4':'#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 2
                    }}>
                    <View style={{ width: '100%', height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {this.props.value == '' ?
                            <Text style={{ fontSize: 12, fontFamily: fonts.Medium, paddingLeft: 10, color: colors.b5GrayColor }}>{this.props.placeholder}</Text>
                            :
                            <Text style={{ fontSize: 12, fontFamily: fonts.Medium, paddingLeft: 10, color: colors.blackColor }}>{this.props.value}</Text>
                        }
                        <Image
                            source={icons.down_Colap}
                            style={{ width: 15, height: 15, marginRight: 10, tintColor: colors.b5GrayColor }}
                        />
                    </View>
                </TouchableOpacity>
                {this.props.open ?
                    <View style={{
                        width: '80%', height: 100, backgroundColor: '#f1f1f1', position: 'absolute', top: 71, zIndex: 1, alignSelf: 'center', right: 2, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                        shadowColor: Platform.OS==='ios'?'#D4D4D4':'#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 2,
                        paddingBottom: 10
                    }}>
                        <ScrollView>
                            {this.props.children}
                        </ScrollView>
                    </View>
                    :
                    null}
                {/* <Modal
                    isVisible={this.state.modal}
                    animationType="slide"
                    transparent={true}
                    onBackdropPress={() => this.setState({ modal: false })}
                >
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0)', borderRadius: 10, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '100%', backgroundColor: colors.whiteColor, paddingTop: 15, paddingBottom: 5, borderRadius: 10, maxHeight: 300, }}>
                            <Text style={{ fontSize: 16, fontFamily: fonts.ExtraBold, color: colors.blackColor, textAlign: 'center' }}>Please Select</Text>
                            <ScrollView>
                                {this.props.Option.map((item, index) => (
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, borderBottomWidth: 0.5, borderBottomColor: colors.b5GrayColor, paddingBottom: 8 }}>
                                        <View style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 2, marginLeft: 15 }}></View>
                                        <Text style={{ fontSize: 14, fontFamily: fonts.Medium, color: colors.blackColor, marginLeft: 15, width: '70%' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}

                            </ScrollView>
                            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop: 15 }}>
                                <TouchableOpacity style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontFamily: fonts.Bold, color: colors.secondaryColor }}>Confirm</Text>
                                </TouchableOpacity>
                                <LineSvg />
                                <TouchableOpacity
                                    onPress={() => this.setState({ modal: false })}
                                    style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontFamily: fonts.Bold, color: colors.blackColor }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal> */}
            </View>
        );
    }
}

export const MyPickerItem = (props) => {
    return (
        <TouchableOpacity 
        onPress={props.onPress}
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, borderBottomWidth: 0.5, borderBottomColor: colors.b5GrayColor, paddingBottom: 8 }}>
            {/* <View style={{ width: 15, height: 15, borderRadius: 50, borderWidth: 2, marginLeft: 15 }}></View> */}
            <Text style={{ fontSize: 14, fontFamily: fonts.Medium, color: colors.blackColor, marginLeft: 15, width: '70%' }}>{props.value}</Text>
        </TouchableOpacity>
    );
}

// export const MyPickerModel = (props) => {
//     return (
//         <Modal
//             isVisible={this.state.modal}
//             animationType="slide"
//             transparent={true}
//             onBackdropPress={() => this.setState({ modal: false })}
//         >
//             <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0)', borderRadius: 10, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
//                 <View style={{ width: '100%', backgroundColor: colors.whiteColor, paddingTop: 15, paddingBottom: 5, borderRadius: 10, maxHeight: 300, }}>
//                     <Text style={{ fontSize: 16, fontFamily: fonts.ExtraBold, color: colors.blackColor, textAlign: 'center' }}>Please Select</Text>
//                     <ScrollView>
//                         {this.props.Option.map((item, index) => (
//                             <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, borderBottomWidth: 0.5, borderBottomColor: colors.b5GrayColor, paddingBottom: 8 }}>
//                                 <View style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 2, marginLeft: 15 }}></View>
//                                 <Text style={{ fontSize: 14, fontFamily: fonts.Medium, color: colors.blackColor, marginLeft: 15, width: '70%' }}>{item.name}</Text>
//                             </TouchableOpacity>
//                         ))}

//                     </ScrollView>
//                     <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop: 15 }}>
//                         <TouchableOpacity style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 14, fontFamily: fonts.Bold, color: colors.secondaryColor }}>Confirm</Text>
//                         </TouchableOpacity>
//                         <LineSvg />
//                         <TouchableOpacity
//                             onPress={() => this.setState({ modal: false })}
//                             style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ fontSize: 14, fontFamily: fonts.Bold, color: colors.blackColor }}>Cancel</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//             </View>
//         </Modal>
//     );
// }