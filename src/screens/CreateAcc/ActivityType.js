import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import style from '../../assets/css/style';
import MyContainer from '../../components/MainComponents/MyContainer';
import {colors} from '../../constraints';
import Button from '../../components/MainComponents/Button';

const ActivityType = props => {
  const DATA = [
    {
      id: '1',
      title: 'Sell and Buy',
    },
    {
      id: '2',
      title: 'Buy',
    },
    {
      id: '3',
      title: 'Browse',
    },
  ];

  const navigation = useNavigation();
  const route = useRoute();

  const [active, setActive] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState(
    route?.params?.looking_to || '',
  );

  useEffect(() => {
    if (selectedId) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selectedId]);

  useEffect(() => {
    setSelectedId(
      route?.params?.looking_to == 'Sell and Buy'
        ? '1'
        : route?.params?.looking_to == 'Buy'
        ? '2'
        : '',
    );
  }, [route]);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (route.params?.update) {
      console.log(route?.params?.data.looking_to);
      setSelectedId(
        route.params?.data.looking_to == 'Sell and Buy'
          ? '1'
          : route.params?.data.looking_to == 'Buy'
          ? '2'
          : '',
      );
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  }, [route]);

  const onPress = useCallback(() => {
    if (update) {
      navigation.navigate('Review', {
        ...route.params.data,
        looking_to: selectedTitle,
      });
    } else {
      navigation.navigate('Value', {
        ...route.params,
        looking_to: selectedTitle,
      });
    }

    selectedId == '3'
      ? navigation.reset({
          index: 0,
          routes: [{name: 'Tabs'}],
        })
      : null;
  }, [selectedId, selectedTitle]);

  return (
    <MyContainer headerExist>
      <View style={[style.layout, style.headerView]}>
        <Text style={style.headerText}>What are you looking to do?</Text>
        <Text style={[style.emailText1, style.topLowMargin]}>
          Select what you are looking for
        </Text>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const backgroundColor = item.id === selectedId ? true : false;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedId(item.id);
                  setSelectedTitle(item.title);
                }}>
                <View
                  style={[
                    style.lookingView,
                    {
                      backgroundColor: backgroundColor
                        ? colors.lightestPrimary
                        : colors.white,
                      borderColor: backgroundColor
                        ? colors.lightPrimaryColor
                        : colors.lightGray,
                    },
                  ]}>
                  <Text
                    style={[
                      style.lookingText,
                      {
                        color: backgroundColor
                          ? colors.lightPrimaryColor
                          : colors.lightblack,
                      },
                    ]}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          extraData={selectedId}
        />
      </View>

      <View style={[style.topMargin, {marginHorizontal: 10}]}>
        <Button
          title={update ? 'Update' : 'Continue'}
          ButtonStyle={styles.buttonView1}
          disabled={!active}
          onPress={onPress}
          textStyle={{color: active ? colors.white : colors.skyDark}}
        />
      </View>
    </MyContainer>
  );
};

export default ActivityType;

const styles = StyleSheet.create({
  buttonView1: {
    borderRadius: 10,
    marginBottom: Platform.OS === 'android' ? 20 : 30,
  },
});
