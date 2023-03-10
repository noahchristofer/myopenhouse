import React, {useState} from 'react';
import {View, TextInput, Image, Text, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {colors, images} from '../../constraints';
import {Icon} from '@rneui/base';
const MyTextInput = props => {
  const [hidePass, setHidePass] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const handleInputFocus = () => setIsFocused(true);

  const handleInputBlur = () => setIsFocused(false);
  return (
    <View
      style={[
        props.containerStyle,
        {
          borderColor: isFocused ? colors.primaryColor : colors.lightGray,
          borderWidth: isFocused ? 2 : 1,
        },
      ]}>
      {!_.isNil(props.image) && (
        <View style={props.imageViewStyle}>
          <Image style={props.imageStyle} source={props.image} />
        </View>
      )}
      {!_.isNil(props.countryCode) && (
        <View style={props.textViewStyle}>
          <Text style={props.countryCodeStyle}>{props.countryCode}</Text>
        </View>
      )}
      {!_.isNil(props.sterick) && (
        <View style={props.sterickTextViewStyle}>
          <Text style={props.sterickTextStyle}>{props.sterick}</Text>
        </View>
      )}
      {!_.isNil(props.search) && (
        <TouchableOpacity style={props.searchStyle} onPress={props.search}>
          <Icon name="search1" type="antdesign" size={15} />
        </TouchableOpacity>
      )}
      {!_.isNil(props.locate) && (
        <View style={props.searchStyle}>
          <Icon name="location-pin" type="entypo" size={18} />
        </View>
      )}
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        style={props.inputStyle}
        onChangeText={props.onChangeText}
        value={props.value}
        keyboardType={props.keyboardType}
        secureTextEntry={
          props.secureTextEntry ? (hidePass ? true : false) : false
        }
        editable={props.editable}
        maxLength={props.maxLength}
        autoComplete={props.autoComplete}
        onEndEditing={props.onEndEditing}
        multiline={props.multiline}
        onFocus={() => handleInputFocus()}
        onBlur={() => handleInputBlur()}
        autoFocus={props.autoFocus}
        returnKeyType={props.returnKeyType}
        onSubmitEditing={props.onSubmitBtn}
      />
      {!_.isNil(props.secureTextEntry) && (
        <TouchableOpacity
          style={{
            height: '100%',
            width: '15%',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onPress={() => {
            setHidePass(!hidePass);
          }}>
          <Image
            style={{height: 15, width: 20, resizeMode: 'cover'}}
            source={hidePass ? images.hideIcon : images.unHide1}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default MyTextInput;
