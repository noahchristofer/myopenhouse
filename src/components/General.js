import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {colors, images, icons, fonts, constant} from '../constraints';
import Toast from 'react-native-simple-toast';
// import LottieView from 'lottie-react-native';
import ReactNativeModal from 'react-native-modal';
import {AppIcon} from '../assets/images';

export const MyStatusBar = props => {
  return (
    <StatusBar
      hidden={false}
      backgroundColor={props.color}
      barStyle={props.barStyle}
      translucent={false}
    />
  );
};

export const Loader = props => {
  return (
    <View>
      <ReactNativeModal
        animationType="fadeIn"
        transparent={true}
        deviceWidth={1}
        visible={props.loader || false}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <View style={{ width: 300, height: 300 }}> */}
          {/* <LottieView source={require('../assets/icons/LoaderJsonM.json')} autoPlay loop /> */}
          {/* <View style={{backgroundColor:colors.primaryColor,padding:20,borderRadius:10}}> */}
          <ActivityIndicator size="large" color={colors.primaryColor} />
          {/* <Text style={{fontFamily:fonts.UrbanistBold,fontSize:16,color:colors.dark,paddingTop:15}}> */}
          {/* Loading... */}
          {/* </Text> */}
          {/* </View> */}
          {/* </View> */}
        </View>
      </ReactNativeModal>
    </View>
  );
};

export const ImageLoader = props => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={colors.secondayColor} />
    </View>
  );
};
export const ImageNoPreview = props => {
  return (
    <View
      style={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <AppIcon />
      <Text
        style={{
          fontFamily: fonts.UrbanistBold,
          fontSize: 23,
          lineHeight: 25,
          color: colors.dark,
          paddingTop: 30,
        }}>
        {props.title}
      </Text>
    </View>
  );
};

export const showToast = message => {
  Toast.show(message, Toast.LONG);
};

// export const NotFound = (props) => {
//   return (
//     <View style={{ width: '100%', height: '65%', justifyContent: 'center', alignItems: 'center' }}>
//       <View style={{ width: '80%', height: '80%' }}>
//         <LottieView source={require('../json/NoDataFound.json')} autoPlay loop />
//       </View>
//     </View>
//   );
// }

export const CheckBox = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        width: 24,
        height: 24,
        borderRadius: 50,
        backgroundColor: '#F5F5F5',
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {props.checkStatus == true ? (
        <Image
          source={icons.checkMark}
          style={{width: 10, height: 12, tintColor: colors.secondaryColor}}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export const CheckBoxWithText = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 50,
          backgroundColor: '#F5F5F5',
          marginRight: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {props.status == true ? (
          <Image
            source={icons.checkMark}
            style={{width: 10, height: 12, tintColor: colors.secondaryColor}}
          />
        ) : null}
      </View>
      <Text style={{marginLeft: 5, fontFamily: fonts.SemiBold}}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
