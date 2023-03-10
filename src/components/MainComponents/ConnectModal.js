import React, {useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import style from '../../assets/css/style';
import {Cross} from '../../assets/images';
import {colors, fonts} from '../../constraints';
import Button from './Button';
import MyTextInput from './MyTextInput';

function ConnectModal(props) {
  const [question, setQuestion] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 1;
  const keyboardBehaivior = Platform.OS === 'ios' ? 'padding' : '';

  return (
    <Modal
      isVisible={props.visible}
      onBackButtonPress={props.hideModal}
      onBackdropPress={props.hideModal}>
      <View style={[style.layout, style.justify]}>
        <KeyboardAvoidingView
          behavior={keyboardBehaivior}
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={styles.modalView}>
            <View style={[style.flexRow, style.justify2, {padding: 10}]}>
              <View style={{width: 2, height: 2}} />
              <Text style={styles.modalItemText}>Message</Text>
              <TouchableOpacity onPress={props.hideModal}>
                <Cross />
              </TouchableOpacity>
            </View>
            <View style={style.line} />
            <Text style={styles.subItemText}>Send a Message</Text>
            <View style={style.justify}>
              <MyTextInput
                multiline={true}
                placeholder={'Message'}
                placeholderTextColor={colors.placeholderColor}
                containerStyle={[
                  style.inputContainerStyle,
                  {width: '92%', height: 100},
                ]}
                inputStyle={style.inputInnerStyle}
                onChangeText={text => setQuestion(text)}
                value={question}
              />
            </View>

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
                loading={props.loading}
                title={'Send'}
                onPress={() => {
                  props.sendConnect(question);
                }}
                ButtonStyle={styles.buttonView1}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

export default ConnectModal;
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
    fontSize: 16,
    lineHeight: 18,
    color: colors.dark,
    padding: 10,
  },
  buttonView1: {
    width: '90%',
    height: 40,
    marginBottom: 15,
  },
});
