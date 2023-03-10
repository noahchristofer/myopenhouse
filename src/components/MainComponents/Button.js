import { Icon } from '@rneui/base';
import React from 'react';
import {Text,TouchableOpacity,View ,Image, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../assets/css/style';
import {Circle, Document, FillCircle, Google,Microsoft,RadioButtons,Tick,Yahoo,Email1} from '../../assets/images';
import { colors, images } from '../../constraints';

const Button = (props) => {
    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
           <LinearGradient colors={props.colors?['white','white']:props.ligtherBluesh?[colors.ligtherBluesh,colors.ligtherBluesh]:props.lightBlue?[colors.lightBlue,colors.lightBlue]:props.disabled?[colors.skyLight,colors.skyLight]:props.green?[colors.green,colors.green]:props.orange?[colors.orange,colors.orange]:['#00DBFF', '#10A5F5', '#10A5F5']} 
            style={[style.justify,style.button,props.ButtonStyle,style.flexRow]}>
                {props.google?
                <View style={style.paddingMediumRight}>
                    {props.title=='Google'?<Google/>:<Image source={images.faceBook} style={{width:25,height:25}}/> }
                </View>
                :null}
                {props.tick?
                    <Tick/>:props.document?<Document/>:null
                }
                {props.check?
                    <FillCircle/>:props.unCheck?
                    <Circle/>
                    :null
                }
                {props.yes?
                    <RadioButtons/>:null
                }
                {props.chat?
                    <Icon name='chatbubble-ellipses-outline' type='ionicon' color={colors.white} style={{marginRight:10}}/>:
                    props.email?
                    
                    <Email1 style={{marginRight:10}}/>
                    :null
                }
                {
                    props.loading?<ActivityIndicator/>:
            <Text style={[style.buttonText,props.textStyle]}>
                {props.title}
            </Text>
                }
           </LinearGradient>
        </TouchableOpacity>
    );
}

export default Button;
