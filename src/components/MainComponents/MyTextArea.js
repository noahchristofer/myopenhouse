import React, { Component } from 'react';
import { Text, TouchableOpacity, ImageBackground, Image, View, TextInput,Platform } from 'react-native';
import { colors, images, icons, fonts } from '../../constraints';

export default class MyTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ width: '100%', marginTop: 5,zIndex:-1 }}>
                <Text style={{ fontSize: 12, fontFamily: fonts.Medium, color: colors.blackColor, marginLeft: 5 }}>{this.props.title}</Text>
                <View style={{
                    width: '98%', height: 100, borderRadius: 5, backgroundColor: colors.whiteColor, marginTop: 10, marginBottom: 5, marginLeft: 5, marginRight: 5,
                    shadowColor: Platform.OS==='ios'?'#D4D4D4':'#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 2
                }}>
                    <TextInput
                        style={{ width: '97%', height: 100, backgroundColor: colors.whiteColor, paddingLeft: 10, fontSize: 12, fontFamily: fonts.Medium, color: colors.blackColor, }}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChangeText={this.props.onChangeText}
                        editable={this.props.editable}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
            </View>
        );
    }
}
