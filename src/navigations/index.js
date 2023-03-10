import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from '@rneui/themed';

import Intro from '../screens/intro/Intro';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import Welcome from '../screens/Welcome/Welcome';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Verification from '../screens/Verification';
import CreateAcc from '../screens/CreateAcc';
import ChoiceScreen from '../screens/CreateAcc/ChoiceScreen';
import ActivityType from '../screens/CreateAcc/ActivityType';
import SecType from '../screens/CreateAcc/SecType';
import Value from '../screens/CreateAcc/Value';
import Payment from '../screens/CreateAcc/Payment';
import Review from '../screens/CreateAcc/Review';
import Home from '../screens/Home';
import { colors } from '../constraints';
import Explore from '../screens/Explore';
import Favorites from '../screens/Favorites';
import Messages from '../screens/Messages';
import Profile from '../screens/Profile';
import Detail from '../screens/Detail';
import ChatBox from '../screens/Messages/ChatBox';
import ProfileEdit from '../screens/Profile/ProfileEdit';
import Notifications from '../screens/Notifications';
import Connections from '../screens/Connections';
import TypeScreen from '../screens/Seller/TypeScreen';
import Purchase from '../screens/Seller/CreateAcc/Purchase';
import Timeline from '../screens/Seller/CreateAcc/Timeline';
import DataSeller from '../screens/Seller/CreateAcc/DataSeller';
import HomeInfo from '../screens/Seller/CreateAcc/HomeInfo';
import Facility from '../screens/Seller/CreateAcc/Facility';
import Conditions from '../screens/Seller/CreateAcc/Conditions';
import Location from '../screens/Seller/CreateAcc/Location';
import Photos from '../screens/Seller/CreateAcc/Photos';
import ReviewSeller from '../screens/Seller/CreateAcc/Review';
import Terms from '../screens/Seller/CreateAcc/Terms';
import MyHomes from '../screens/Seller/MyHomes';
import Listing from '../screens/Seller/MyHomes/Listing';
import MyAppraisals from '../screens/Profile/MyAppraisals';

const Stack = createNativeStackNavigator();

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="CreateAcc" component={CreateAcc} />
        <Stack.Screen name="ChoiceScreen" component={ChoiceScreen} />
        <Stack.Screen name="ActivityType" component={ActivityType} />
        <Stack.Screen name="SecType" component={SecType} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="Tabs" component={MyTabs} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="ChatBox" component={ChatBox} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Connections" component={Connections} />
        <Stack.Screen name="TypeScreen" component={TypeScreen} />
        <Stack.Screen name="Value" component={Value} />
        <Stack.Screen name="Purchase" component={Purchase} />
        <Stack.Screen name="MyAppraisals" component={MyAppraisals} />
        <Stack.Screen name="Timeline" component={Timeline} />
        <Stack.Screen name="DataSeller" component={DataSeller} />
        <Stack.Screen name="HomeInfo" component={HomeInfo} />
        <Stack.Screen name="Facility" component={Facility} />
        <Stack.Screen name="Conditions" component={Conditions} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Photos" component={Photos} />
        <Stack.Screen name="ReviewSeller" component={ReviewSeller} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="MyHomes" component={MyHomes} />
        <Stack.Screen name="Listing" component={Listing} />
      </Stack.Navigator>
    );
  }
}

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.primaryColor}
      inactiveColor={colors.lighterGray}
      barStyle={{ backgroundColor: colors.white }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, name }) => (
            <>
              <MaterialCommunityIcons
                name="home-variant"
                color={color}
                size={26}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="search" type="octicons" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="heart-outlined" type="entypo" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="message1" type="antdesign" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="person-outline"
              type="ionicons"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
