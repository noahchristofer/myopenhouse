import React from 'react';
import { ArrowBack, Call, HeaderIcon, Left, ProfileEdit, Video } from '../../assets/images';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { colors, constants, fonts, images } from '../../constraints';
import { useNavigation } from '@react-navigation/native';
import style from '../../assets/css/style';
import { Icon } from '@rneui/base';
function Header(props) {
    const navigation = useNavigation()

    return (
        <View style={[{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            padding: props.msg ? 8 : 15, marginTop: Platform.OS === 'ios' ? global.statusBarHeight : 1,
            backgroundColor: props.BgColor != undefined ? props.BgColor : '#fff',
            width: '100%',
            height: (props.HeaderTitle || props.msg || props.headTitle) ? 62 : 50,
        }, Platform.OS === "android" ? styles.shaddowIOS : styles.shaddowIOS, { borderBottomWidth: props.BgColor != undefined ? 0 : 1 }]}>
            {props.mainHeader ?
                <>
                    <Text style={{
                        fontFamily: fonts.UrbanistBold,
                        // fontWeight:'bold',
                        fontSize: 23, lineHeight: 25, color: colors.dark
                    }}>
                        {props.HeaderTitle}
                    </Text>
                    {props.headerIcon ?
                        <HeaderIcon /> : props.profileHeader ?
                            <TouchableOpacity onPress={props.ProfileHeaderPress}><ProfileEdit /></TouchableOpacity> : null
                    }
                </>
                : props.msg ?
                    <View style={[style.flexRow, style.justify2, { width: '100%', paddingRight: 5 }, props.styleHeader]}>

                        {props.editHeader ?
                            <>
                                <View>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Left />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{
                                    textAlign: 'center', width: '90%', fontFamily: fonts.UrbanistBold,
                                    // fontWeight:'bold',
                                    fontSize: 16, lineHeight: 34, color: colors.dark
                                }}>{props.editHeader}</Text>
                            </>
                            :
                            <>
                                <View style={[style.flexRow, style.justify4, { width: '73%' }]}>
                                    <View>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <Left />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[style.flexRow, style.justify1, { paddingLeft: 10 }]}>
                                        {
                                            props.img !== constants.imageLink ?
                                                <Image source={{ uri: props.img }} style={[style.img, { backgroundColor: colors.lightGray }]} />
                                                :
                                                <View style={[style.justify, style.img, { backgroundColor: colors.lightGray }]}>
                                                    <Icon type="entypo" name="image" size={40} />
                                                </View>

                                        }
                                        <View style={{ paddingLeft: 8 }}>
                                            <Text style={style.nameText}>
                                                {props.name}
                                            </Text>
                                            <Text style={style.msgText}>
                                                {props.time}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={props.oncallPress}>
                                    <Call />
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                    :
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ width: 50, height: 40, justifyContent: 'center', alignItems: 'flex-start' }}
                        >
                            <ArrowBack />
                        </TouchableOpacity>
                        {props.headTitle &&
                            <Text style={{
                                fontFamily: fonts.UrbanistBold,
                                fontSize: 23, lineHeight: 25, color: colors.dark, marginLeft: 10
                            }}>
                                {props.headTitle}
                            </Text>

                        }
                    </View>
            }

        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    shaddow: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 0 },
        elevation: 2,
        shadowOpacity: Platform.OS === 'ios' ? 0.1 : 2,
        shadowRadius: Platform.OS === 'ios' ? 9 : 0,
    },
    shaddowIOS: {
        // borderBottomColor: '#1018281a',
        // borderBottomWidth:1,
        // elevation: 2,
        // shadowOpacity:  Platform.OS === 'ios' ? 0.1 : 2,
        // shadowRadius: Platform.OS === 'ios' ? 9 : 0,

        borderBottomColor: '#1018281a',
        borderBottomWidth: 1,
        shadowColor: "#d4d4d4",
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    }
})