import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import style from '../../assets/css/style';
import {Cross} from '../../assets/images';
import {colors, constants, fonts} from '../../constraints';
import Button from './Button';
import MyTextInput from './MyTextInput';

function LogoutModal(props) {
  return (
    <Modal
      isVisible={props.visible}
      onBackButtonPress={props.hideModal}
      onBackdropPress={props.hideModal}>
      <View style={[style.layout, style.justify]}>
        <View style={styles.modalView}>
          <View style={[style.flexRow, style.justify2, {padding: 10}]}>
            <View style={{width: 2, height: 2}} />
            <Text style={styles.modalItemText}>Alert</Text>
            <TouchableOpacity onPress={props.hideModal}>
              <Cross />
            </TouchableOpacity>
          </View>
          <View style={style.line} />
          <Text style={styles.subItemText}>
            Are You sure that you want to logout?
          </Text>
          <View style={style.justify}></View>

          <View
            style={[
              style.topMargin,
              style.flexRow,
              style.justify1,
              {marginLeft: 15},
            ]}>
            <Button
              lightBlue
              title={'Cancel'}
              ButtonStyle={styles.buttonView1}
              onPress={props.hideModal}
              textStyle={{color: colors.primaryColor}}
            />
            <Button
              title={'LogOut'}
              onPress={props.Logout}
              ButtonStyle={styles.buttonView1}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default LogoutModal;
const styles = StyleSheet.create({
  modalView: {
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  modalItemView: {
    padding: 20,
    borderRadius: 5,
  },
  modalItemText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 18,
    lineHeight: 18,
    color: colors.dark,
  },
  subItemText: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 18,
    lineHeight: 18,
    color: colors.dark,
    padding: 15,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonView1: {
    width: '90%',
    height: 40,
    marginBottom: 15,
  },
});
