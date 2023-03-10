
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SectionList, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import style from '../../../assets/css/style';
import MyContainer from '../../../components/MainComponents/MyContainer'
import { colors, fonts, constants } from '../../../constraints';
import Button from '../../../components/MainComponents/Button';
import MyTextInput from '../../../components/MainComponents/MyTextInput';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Icon } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Down } from '../../../assets/images';



const Facility = (props) => {
  const DATA = [
    {
      id: '1',
      title: 'Yes',
    },
    {
      id: '2',
      title: 'No',
    }]
  const [active, setActive] = useState(false)
  const [area, setArea] = useState('')
  const [description, setDescription] = useState('')
  const value1 = useState('')
  const value2 = useState('')
  const value3 = useState('')
  const value4 = useState('')
  const label = useState('Beds')
  const label2 = useState('Bath')
  const label3 = useState('Sewer options')
  const label4 = useState('Water options')
  const [selectedId, setSelectedId] = useState("1");
  const [selectedTitle, setSelectedTitle] = useState("Yes");
  const beds = useState('')
  const bath = useState('')
  const water = useState('')
  const Sewer = useState('')


  const navigation = useNavigation()
  useEffect(() => {
    if (beds[0] && bath[0] && water[0] && Sewer[0] && area && selectedTitle && description) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [beds[0], bath[0], water[0], area, selectedTitle, Sewer[0], description])

  const route = useRoute()

  let data = ['1', '2', '3', '4+'];
  let data2 = ['1', '1.5', '2', '2.5', '3', '3.5', '4+'];
  let data3 = ['Town Sewer', 'Septic System', 'Other'];
  let data4 = ['Town Water', 'Well Water'];

  const sectionData = [
    {
      title: { title: 'Beds' },
      data: [
        { name: data, id: 1, label: label, value: value1, type: beds },
      ]
    },
    {
      title: { title: 'Bath' },
      data: [
        { name: data2, id: 3, label: label2, value: value2, type: bath },
      ]
    },
    {
      title: { title: 'Sewer options' },
      data: [
        { name: data3, id: 3, label: label3, value: value3, type: Sewer },
      ]
    },
    {
      title: { title: 'Water options' },
      data: [
        { name: data4, id: 4, label: label4, value: value4, type: water },
      ]
    }
  ]

  const handleSubmit = () => {
    const data = { ...route.params, beds: beds[0], baths: bath[0], water_source: water[0], sewer_source: Sewer[0], hoa_fees: area, condo: selectedTitle, description: description }
    navigation.navigate("Conditions", data)
  }

  return (
    <MyContainer headerExist>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
        <View style={[style.layout, style.headerView]}>
          <Text style={style.headerText}>
            Home Details
          </Text>
          <Text style={[style.emailText1, style.topLowMargin]}>
            Details about your faility and utensils
          </Text>
          <View>

            <SectionList
              sections={sectionData}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section }) => (
                <Text style={style.emailText}>
                  {section.title.title}
                </Text>
              )}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ flexDirection: 'row' }}>
                    <ModalDropdown
                      options={item.name}
                      style={style.inputContainerStyle}
                      textStyle={style.dropDownText}
                      dropdownStyle={style.dropDownView1}
                      dropdownTextStyle={style.dropDownText}
                      dropdownTextHighlightStyle={{ color: colors.primaryColor }}
                      onSelect={(index, value) => item.type[1](value)}
                      renderRightComponent={() => {
                        return (
                          <View
                            style={{
                              marginLeft: '70%',
                              padding: 20
                            }}>
                          </View>
                        )
                      }} />
                    <View style={{ position: 'absolute', right: 0, marginRight: 10, marginTop: 20 }}>
                      <TouchableOpacity>
                        <Down />
                      </TouchableOpacity>
                    </View>
                  </View>


                )
              }}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
            />
          </View>
          <Text style={[style.emailText,]}>
            HOA Fees
          </Text>
          <MyTextInput
            placeholder={"HOA Fees"}
            placeholderTextColor={colors.darkGray}
            containerStyle={style.inputContainerStyle}
            inputStyle={style.inputInnerStyle}
            keyboardType={"numeric"}
            onChangeText={(text) => setArea(text)}
            value={area} />
          <Text style={[style.emailText,]}>
            Description
          </Text>
          <MyTextInput
            multiline={true}
            placeholder={"Description"}
            placeholderTextColor={colors.darkGray}
            containerStyle={[style.inputContainerStyle, { height: 150, }]}
            inputStyle={[style.inputInnerStyle, {
              textAlignVertical: 'top',
              paddingTop: 10
            }]}
            keyboardType={"numeric"}
            onChangeText={(text) => setDescription(text)}
            value={description} />
          <Text style={[style.emailText, { fontSize: 20, lineHeight: 32, fontFamily: fonts.UrbanistBold }]}>
            Is this a condo?
          </Text>
          <View>
            <FlatList
              data={DATA}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const backgroundColor = item.id === selectedId ? true : false
                return (
                  <Button
                    title={item.title}
                    yes={backgroundColor}
                    colors={!backgroundColor}
                    unCheck={!backgroundColor}
                    ButtonStyle={[styles.buttonView2, { borderColor: backgroundColor ? colors.primaryColor : colors.gray, borderWidth: 1, borderRadius: 10 }]}
                    onPress={() => {
                      setSelectedId(item.id)
                      setSelectedTitle(item.title)
                    }}
                    textStyle={{ marginLeft: 10, color: backgroundColor ? colors.white : colors.skyDark }}
                  />
                )
              }}
              extraData={selectedId} />
          </View>


        </View>

        <View style={[style.topMargin, { marginHorizontal: 10 }]}>
          <Button
            title={'Next'}
            ButtonStyle={styles.buttonView1}
            disabled={!active}
            onPress={handleSubmit}
            textStyle={{ color: active ? colors.white : colors.skyDark }}
          />
        </View>
      </KeyboardAwareScrollView>
    </MyContainer>
  );
}

export default Facility;

const styles = StyleSheet.create({
  buttonView1: {
    borderRadius: 10,
    marginBottom: Platform.OS === "android" ? 20 : 30,
  },
  buttonView2: {
    borderRadius: 10,
    marginBottom: Platform.OS === "android" ? 20 : 30,
    width: '87%',
    height: 40
  }
})
