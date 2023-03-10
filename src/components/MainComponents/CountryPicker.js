import React, { Component } from 'react';
import { Text, TouchableOpacity, ImageBackground, Image, View, Platform } from 'react-native';
import { colors, images, icons, fonts } from '../../constraints';
import CountryPicker from 'react-native-country-picker-modal';

export default class CountryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> CountryPicker </Text>
      </View>
    );
  }
}
