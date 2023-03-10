import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/base';
import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Back} from '../../assets/images';
import {colors, constants, fonts, images} from '../../constraints';

const ImageItem = props => {
  const navigation = useNavigation();
  return (
    <View>
      {props.img ? (
        <TouchableOpacity
          disabled={!props.listing}
          onPress={props.OnPressListing}>
          <Image
            source={{uri: props.img}}
            style={{width: '100%', height: 216}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={!props.listing}
          onPress={props.OnPressListing}>
          <View
            style={{
              width: '100%',
              height: 216,
              backgroundColor: colors.lightGray,
              justifyContent: 'center',
            }}>
            <Icon type="entypo" name="image" size={150} />
          </View>
        </TouchableOpacity>
      )}
      {props.listing ? null : (
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>Town Rating: A+</Text>
        </View>
      )}
      {props.listing ? null : (
        <TouchableOpacity style={[styles.starView]} onPress={props.heartPress}>
          {props.favourite == 'like' ? (
            <Icon name="heart" type="entypo" size={26} color={colors.red} />
          ) : (
            <Icon name="heart-outlined" type="entypo" size={26} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  ratingText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 14,
    lineHeight: 24,
    color: colors.green,
  },
  ratingView: {
    position: 'absolute',
    backgroundColor: colors.lightestGreen,
    borderRadius: 4,
    margin: 10,
    height: 28,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starView: {
    position: 'absolute',
    backgroundColor: colors.white,
    padding: 7,
    borderRadius: 10,
    margin: 10,
    right: 0,
  },
});
