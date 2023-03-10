import {Icon} from '@rneui/base';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import style from '../../assets/css/style';
import {Bedroom, BuildingSize, Dots, Toilet} from '../../assets/images';
import {colors, constants, fonts, images} from '../../constraints';
import Button from './Button';
import ImageItem from './ImageItem';

function CardItem(props) {
  return (
    <View style={styles.mainView}>
      {props.listing ? null : (
        <View
          style={[
            style.flexRow,
            style.justify2,
            {
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.4,
              shadowRadius: Platform.OS === 'ios' ? 3 : 2,
              elevation: 5,
              backgroundColor: '#fff',
              width: '100%',
              height: 54,
              paddingBottom: 10,
            },
          ]}>
          <View style={[style.flexRow]}>
            {props.image ? (
              <Image
                source={{uri: `${constants.imageLink}${props.image}`}}
                style={styles.avatar}
              />
            ) : (
              <View
                style={[
                  styles.avatar,
                  {backgroundColor: colors.lightGray, justifyContent: 'center'},
                ]}>
                <Icon type="antdesign" name="user" size={18} />
              </View>
            )}
            <View
              style={{
                marginLeft: 8,
                justifyContent: 'center',
                marginTop: 11,
                width: '70%',
              }}>
              <Text numberOfLines={1} style={styles.headerText}>
                {props.name}
              </Text>
              <Text numberOfLines={1} style={styles.subHedaer}>
                {props.address}
              </Text>
            </View>
          </View>
          <View style={[style.justify, {width: '20%', height: 30}]}>
            <Dots />
          </View>
        </View>
      )}
      <TouchableOpacity onPress={props.detailPress}>
        <ImageItem {...props} />
        <View style={{padding: 10}}>
          <View style={[style.flexRow, style.justify2, {width: '100%'}]}>
            <View style={[style.flexRow, style.justify1, {width: '5%'}]}>
              <Toilet />
              <Text style={styles.subImageText}>{props.baths}</Text>
            </View>
            <View style={[style.flexRow, style.justify1, {width: '5%'}]}>
              <Bedroom />
              <Text style={styles.subImageText}>{props.beds}</Text>
            </View>
            <View style={[style.flexRow, style.justify4, {width: '25%'}]}>
              <BuildingSize />
              <Text numberOfLines={1} style={styles.subImageText}>
                {props.sqft} SQ.F.T.
              </Text>
            </View>
            <View style={[style.flexRow, style.justify3, {width: '30%'}]}>
              <Text style={style.subImageText2} numberOfLines={1}>
                {props.priceRange}
              </Text>
              <Text style={style.subImageText3}>Price</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {props.listing ? null : (
        <View style={[style.flexRow, style.justify1, {marginLeft: 25}]}>
          <Button
            green
            document
            title={'Make An Offer'}
            ButtonStyle={styles.buttonView1}
            textStyle={{paddingLeft: 5}}
            onPress={props.onPressOffer}
          />
          <Button
            orange
            tick
            title={'Message'}
            ButtonStyle={styles.buttonView1}
            textStyle={{paddingLeft: 5}}
            onPress={props.onPressConnect}
          />
        </View>
      )}
    </View>
  );
}

export default CardItem;

const styles = StyleSheet.create({
  buttonView1: {
    width: '85%',
    height: 40,
    borderRadius: 8,
  },
  mainView: {
    borderColor: colors.gray,
    // marginTop:10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 10,
    marginTop: 11,
    backgroundColor: colors.lightGray,
  },
  headerText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.mediumDark,
  },
  subHedaer: {
    fontFamily: fonts.UrbanistMedium,
    // fontWeight:'500',
    fontSize: 12,
    lineHeight: 13,
    color: colors.lightestGray,
  },
  subImageText: {
    fontFamily: fonts.urbanistSemiBold,
    marginLeft: 5,
    color: colors.mediumBLACK,
    fontSize: 14,
    lineHeight: 22,
  },
  subImageText2: {
    fontFamily: fonts.UrbanistBold,
    // fontWeight:'bold',
    color: colors.primaryColor,
    fontSize: 16,
    lineHeight: 30,
  },
  subImageText3: {
    fontFamily: fonts.urbanistSemiBold,
    marginLeft: 5,
    color: colors.mediumBLACK,
    fontSize: 10,
    lineHeight: 24,
  },
});
