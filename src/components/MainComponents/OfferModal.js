import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';

import style from '../../assets/css/style';
import {colors, fonts} from '../../constraints';

import {Cross, Down} from '../../assets/images';
import Button from './Button';
import MyTextInput from './MyTextInput';

function OfferModal(props) {
  const [question, setQuestion] = useState('');
  const [selectedId, setSelectedId] = useState('1');
  const [selectedTitle, setSelectedTitle] = useState('Cash');
  const [offer, setOffer] = useState('Buy As Is ');
  const [open, setOpen] = useState(false);
  const [label, setLable] = useState('Buy As Is ');
  const DATA = [
    {
      id: '1',
      title: 'Cash',
    },
    {
      id: '2',
      title: 'Finance',
    },
  ];

  return (
    <Modal
      isVisible={props.visible}
      onBackButtonPress={props.hideModal}
      onBackdropPress={props.hideModal}>
      <View style={[style.layout, style.justify]}>
        <View style={styles.modalView}>
          <View style={[style.flexRow, style.justify2, {padding: 10}]}>
            <View style={{width: 2, height: 2}} />
            <Text style={styles.modalItemText}>Make a Custom Offer</Text>
            <TouchableOpacity onPress={props.hideModal}>
              <Cross />
            </TouchableOpacity>
          </View>
          <View style={style.line} />
          <View style={{padding: 10}}>
            <Text style={styles.subItemText}>
              Please enter your offer amount
            </Text>
            <Text style={styles.subItemText2}>Amount</Text>
            <MyTextInput
              placeholder={'Amount'}
              keyboardType={'phone-pad'}
              placeholderTextColor={colors.placeholderColor}
              containerStyle={[style.inputContainerStyle]}
              inputStyle={style.inputInnerStyle}
              onChangeText={text => setQuestion(text)}
              value={question}
            />
            <Text style={styles.subItemText2}>Payment</Text>

            <View style={{height: 70}}>
              <FlatList
                data={DATA}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  const backgroundColor = item.id === selectedId ? true : false;
                  return (
                    <View>
                      <Button
                        colors={!backgroundColor}
                        green={backgroundColor}
                        unCheck={!backgroundColor}
                        check={backgroundColor}
                        title={item.title}
                        onPress={() => {
                          setSelectedTitle(item.title);
                          setSelectedId(item.id);
                        }}
                        ButtonStyle={styles.buttonView1}
                        textStyle={{
                          color: backgroundColor ? colors.white : colors.black,
                          paddingLeft: 5,
                        }}
                      />
                    </View>
                  );
                }}
                extraData={selectedId}
              />
            </View>

            <Text style={styles.subItemText2}>What Kind of offer?</Text>
            <View style={{flexDirection: 'row'}}>
              <ModalDropdown
                defaultValue={label}
                options={[
                  'Buy As Is ',
                  "Let's Connect First!",
                  'Pending Inspection',
                ]}
                style={style.inputContainerStyle}
                textStyle={style.dropDownText}
                dropdownStyle={style.dropDownView}
                dropdownTextStyle={style.dropDownText}
                dropdownTextHighlightStyle={{color: colors.primaryColor}}
                onSelect={(index, value) => setOffer(value)}
                // onDropdownWillShow={open}
                renderRightComponent={() => {
                  return (
                    <View
                      style={{
                        marginLeft: '70%',
                        padding: 20,
                      }}>
                      {/* <Down/> */}
                    </View>
                  );
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  marginRight: 10,
                  marginTop: 20,
                }}>
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Down />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                style.topLowMargin,
                style.flexRow,
                style.justify1,
                {marginLeft: 10},
              ]}>
              <Button
                lightBlue
                title={'Cancel'}
                ButtonStyle={styles.buttonView}
                onPress={props.hideModal}
                textStyle={{color: colors.primaryColor}}
              />
              <Button
                loading={props.loading}
                title={'Send'}
                onPress={() => {
                  if (question && selectedTitle && offer) {
                    props.sendOffer({
                      amount: question,
                      payment_type: selectedTitle,
                      offer_kind: offer,
                    });
                  } else {
                    Toast.show('Please enter your offer amount', Toast.SHORT, [
                      'UIAlertController',
                    ]);
                  }
                }}
                ButtonStyle={styles.buttonView}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default OfferModal;
const styles = StyleSheet.create({
  modalView: {
    borderRadius: 10,
    backgroundColor: colors.white,
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
    lineHeight: 24,
    color: colors.darkGray,
  },
  subItemText2: {
    fontFamily: fonts.urbanistSemiBold,
    fontSize: 16,
    lineHeight: 16,
    color: colors.dark,
    paddingVertical: 10,
  },
  buttonView1: {
    width: '84%',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
  },
  buttonView: {
    width: '90%',
    height: 40,
  },
});
