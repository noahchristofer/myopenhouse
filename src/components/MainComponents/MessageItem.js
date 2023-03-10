import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { colors, fonts } from '../../constraints'

const MessageItem = ({ id, userId, msg,date }) => {
  return (
    <View style={styles.container}>
      {id != userId ? (
        <View style={styles.leftContainer}>
          {/* <Image source={image} style={styles.Image} /> */}
          <Text style={styles.leftmsg}>{msg}</Text>
          <Text style={styles.timeText}>{date}</Text>
        </View>
      ) : (
        <View style={styles.rightContainer}>
          <Text style={styles.rightmsg}>{msg}</Text>
          <Text style={styles.timeText}>{date}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  leftContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
    width:'80%',
    paddingLeft:10
  },
  Image: {
    width: 55,
    borderRadius: 50,
    height: 55,
    borderColor: colors.Bgpurple,
    borderWidth: 1,
    marginRight: 5,
    width:'80%',
  },
  leftmsg: {
    backgroundColor: colors.messageBlue,
    padding: 15,
    color: colors.dark,
    fontSize: 14,
    fontWeight: '500',
    overflow: 'hidden',
    fontFamily:fonts.urbanistregular,
    borderRadius:8
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent:'flex-end',
    paddingRight:10,
    maxWidth:"80%",
    marginLeft:'20%',
  },
  rightmsg: {
    backgroundColor: colors.primaryColor,
    color: colors.white,
    padding: 15,
    overflow: 'hidden',
    fontSize: 14,
    fontFamily:fonts.urbanistregular,
    fontWeight: '500',
    marginTop: 10,
    borderRadius:8,
    // borderBottomLeftRadius:15,
    // borderTopRightRadius:15,
    // borderTopLeftRadius:15
  },
  timeText:{
    color:colors.lightestGray,
    fontFamily:fonts.urbanistregular,
    fontSize:12
  }
})

export default MessageItem
