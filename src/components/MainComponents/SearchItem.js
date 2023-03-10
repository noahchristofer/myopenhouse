import {Icon} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import style from '../../assets/css/style';
import {Bedroom, BuildingSize, MsgDot, Toilet} from '../../assets/images';
import {colors, constants, fonts, images} from '../../constraints';

function SearchItem(props) {
  const [image, setImage] = useState('');
  const cha = () => {
    if (props.image) {
      let data = JSON.parse(props.image);
      setImage(data[0]);
    }
    if (props?.item?.image) {
      let update = JSON.parse(props?.item?.image);
      setImage(update[0]);
    }
  };
  useEffect(() => {
    cha();
  }, [props]);
  return (
    <View
      style={[
        style.flexRow,
        styles.itemView2,
        styles.btnShadow,
        {
          elevation: props.msg ? 0 : 10,
          padding: 10,
          height: props.favorite ? 120 : 84,
          justifyContent: props.favorite ? 'flex-start' : 'center',
        },
      ]}>
      <View>
        {image ? (
          <Image
            source={
              props.favorite
                ? {uri: `${constants.imageLink}${image}`}
                : props.msg
                ? {uri: `${constants.imageLink}${image}`}
                : {uri: `${constants.imageLink}${image}`}
            }
            style={{
              width: props.favorite ? 86 : 64,
              height: props.favorite ? 100 : 64,
              borderRadius: 6,
              backgroundColor: colors.lightGray,
            }}
          />
        ) : (
          <View
            style={[
              style.justify,
              {
                width: props.favorite ? 86 : 64,
                height: props.favorite ? 100 : 64,
                borderRadius: 6,
                backgroundColor: colors.lightGray,
              },
            ]}>
            <Icon type="entypo" name="image" size={40} />
          </View>
        )}
        {props.favorite ? (
          <TouchableOpacity
            style={[styles.starView]}
            onPress={props.heartPress}>
            <Icon name="heart" type="entypo" size={10} color={colors.red} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{marginLeft: 5, width: props.favorite ? '100%' : '65%'}}>
        {props.msg ? null : (
          <View style={[style.flexRow, style.justify4]}>
            {props.img ? (
              <Image
                source={{uri: `${constants.imageLink}${props.img}`}}
                style={[styles.img, {backgroundColor: colors.lightGray}]}
              />
            ) : (
              <View
                style={[
                  style.justify,
                  styles.img,
                  {backgroundColor: colors.lightGray},
                ]}>
                <Icon type="antdesign" name="user" size={8} />
              </View>
            )}
            <Text style={styles.headingText}>{props.name}</Text>
          </View>
        )}
        {props.msg ? (
          <View
            style={[
              style.flexRow,
              style.justify2,
              {marginVertical: 8, width: '68%'},
            ]}>
            <Text style={styles.headingText}>{props.item.price_range}</Text>
            <Text
              numberOfLines={1}
              style={[
                styles.subHeadingText,
                {paddingLeft: 2, fontFamily: fonts.UrbanistMedium},
              ]}>
              {props.item.address}
            </Text>
          </View>
        ) : (
          <Text style={styles.subHeadingText} numberOfLines={1}>
            {props.address}
          </Text>
        )}
        <View style={[style.flexRow, style.justify2, {width: '100%'}]}>
          <View style={[style.flexRow, style.justify4, styles.iconView]}>
            <Toilet />
            <Text style={styles.subImageText}>
              {props.bath || props.item?.baths}
            </Text>
          </View>
          <View style={[style.flexRow, style.justify4, styles.iconView]}>
            <Bedroom />
            <Text style={styles.subImageText}>
              {props.beds || props.item?.beds}
            </Text>
          </View>
          <View
            style={[
              style.flexRow,
              style.justify4,
              styles.iconView,
              {width: '70%'},
            ]}>
            <BuildingSize />
            <Text style={styles.subImageText}>
              {props.size || props.item?.home_sqft}SQ.F.T.
            </Text>
          </View>
        </View>
        {props.favorite ? (
          <View style={[style.flexRow, style.justify2, {width: '70%'}]}>
            <View style={[style.flexRow, style.justify4, {width: '75%'}]}>
              <Text style={style.subImageText2}>{props.price_range}</Text>
              <Text style={style.subImageText3}>Price</Text>
            </View>
            <View style={styles.circleView}>
              <Text style={styles.rateText}>A+</Text>
            </View>
          </View>
        ) : null}
      </View>
      {props.favorite ? null : props.msg ? (
        <View style={{justifyContent: 'center'}}>
          <MsgDot />
        </View>
      ) : (
        <View style={{height: 60}}>
          <View style={styles.circleView}>
            <Text style={styles.rateText}>A+</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default SearchItem;

const styles = StyleSheet.create({
  img: {
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  headingText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 12,
    lineHeight: 18,
    color: colors.dark,
    marginLeft: 3,
  },
  subHeadingText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 12,
    lineHeight: 22,
    color: colors.lightestGray,
  },
  subImageText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 12,
    lineHeight: 22,
    color: colors.mediumBLACK,
    marginLeft: 2,
  },
  iconView: {
    width: '10%',
  },
  circleView: {
    backgroundColor: colors.lightestGreen,
    width: 28,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 12,
    lineHeight: 24,
    color: colors.green,
  },
  starView: {
    position: 'absolute',
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 5,
    margin: 3,
    left: 0,
  },
  itemView2: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0.2, height: 0.2},
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 0.2,
  },
  btnShadow: {
    borderRadius: 10,
    shadowColor: '#888',
    shadowOffset: {width: 1, height: 1},
    elevation: 15,
    backgroundColor: 'white',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.8,
    shadowRadius: Platform.OS === 'ios' ? 3 : 2,
  },
});
