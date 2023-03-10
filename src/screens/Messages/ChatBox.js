import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, TouchableOpacity, Image, View, FlatList, StyleSheet, SectionList, TouchableHighlight } from 'react-native';

import style from '../../assets/css/style';
import  MyContainer from '../../components/MainComponents/MyContainer'
import { colors, fonts, images } from '../../constraints';
import SearchItem from '../../components/MainComponents/SearchItem';
import { Icon } from '@rneui/base';
import { SendIcon } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { UpdateUser } from '../../Services/LoginFunctions';
import MessageItem from '../../components/MainComponents/MessageItem';
import MyTextInput from '../../components/MainComponents/MyTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const ChatBox =(props)=> {
  const [messagevalue, setmessagevalue] = React.useState('')
  const [messages, setMessage] = useState([])
  const flatListRef = useRef()
  const getTime=()=>{
    var d = new Date();
    return `${d.getHours()}:${d.getMinutes()}`
  }

  const MessageHandler =async() => {
    let data = {
      to_id: route?.params?.userId,
      msg: messagevalue,
      u_id: userId,
      type:'sendmsg'
    }
    if (messagevalue.trim() != '') {
      sendMsg(data)
      getMsgRepeatdly()
      setMessage([...messages,{
        senderid: userId,
        msg: messagevalue,
        date:getTime()
      }])
      setmessagevalue('')
    }
  }
  const [userId, setUserId] = useState('');

  const sendMsg=async(arg)=>{
    try {
      await UpdateUser(arg)
    } catch (error) {
      console.log(error)
    }
  }
  const getUser=async()=>{
    const user_id = await AsyncStorage.getItem('user_id')
    setUserId(user_id)
  }
  useEffect(()=>{
    if (!userId) {
      getUser()
    }
  },[userId])

  const [isLoading,setIsLoading] = useState(false)
  const route = useRoute()

  const getData=async()=>{
  setIsLoading(true)
  const user_id = await AsyncStorage.getItem('user_id')
    const updatedata={type:'getchat',u_id:user_id,to_id:route?.params.userId}
    try {
        let data=[]
      await UpdateUser(updatedata)
          .then((res)=>{

            res.data.chat.forEach((e)=>{
                data=[...data,
                  {
                    senderid: e.sender_id,
                    msg: e.msg,
                    date:e.date,
                    timestamp:e.timestamp
                  }]
                })
              })
        setMessage(data)
        setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
}
  const getMsgRepeatdly=async()=>{
    console.log('calliiinnnggg')
    if (messages.length!==0) {
      const user_id = await AsyncStorage.getItem('user_id')
      const updatedata={type:'checkmsg',u_id:user_id,to_id:route?.params.userId,timestamp:messages[messages.length-1].timestamp}
      console.log(updatedata)
      if (updatedata.timestamp!==undefined) {
        try {
          let data=[]
          await UpdateUser(updatedata)
          .then((res)=>{
            
            res?.data?.chat.forEach((e)=>{
              let msgData=res?.data?.chat[0]
              if (msgData) {
                if (e.sender_id != user_id) {
                  data=[...messages,
                    {
                      senderid: e.sender_id,
                      msg: e.msg,
                      date:e.date,
                      timestamp:e.timestamp
                    }
                  ]
                  setMessage(data)
                }else{
                  data=messages;
                  data.splice(-1);
                  data=[...data,
                    {
                      senderid: e.sender_id,
                      msg: e.msg,
                      date:e.date,
                      timestamp:e.timestamp
                    }
                  ]
                  setMessage(data)
                }
              }
            })
            console.log('resshghsjgh',res?.data?.chat)
          }
          )
        } catch (error) {
          console.log(error)
        }
      }
      }
    }
    const sendMsgSeen=async()=>{
  const user_id = await AsyncStorage.getItem('user_id')
    const updatedata={type:'msg_seen',u_id:user_id,to_id:route?.params.userId}
    try {
      let result = await UpdateUser(updatedata)
      console.log('msg==>>>seen===>>',result.data)
    } catch (error) {
      console.log(error)
    }
}
useEffect(()=>{
  if (route.params) {
    getData()
    sendMsgSeen()
  }
},[route])

useFocusEffect(
  React.useCallback(() => {
     let myInterval = setInterval(getMsgRepeatdly, 10000);
    return () => {
      clearInterval(myInterval);
    };
  }, [messages])
);

    return (
        <MyContainer headerExist msg name={route.params.name} img={route.params.img} time={messages.length!==0 ? messages[messages.length-1].date:''} loader={isLoading}>
        <View style={[style.layout,{paddingHorizontal:10}]}>
          {route?.params?.listing ?<SearchItem msg item={route.params.listing}/>:null}
          <View style={style.line}/>
          <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} >
          <FlatList
          data={messages}
          ref={flatListRef}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={({ item }) => (
            <MessageItem
            id={item.senderid}
            // image={item?.image ? { uri: item?.image } : ''}
            userId={userId}
            msg={item.msg}
            date={item.date}
            />
            )}
            />
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.inputContainer}>
        <MyTextInput
         autoFocus={true}
         placeholder={"Type your message"}
         placeholderTextColor={colors.lightestGray}
         containerStyle={style.inputContainerStyle}
         inputStyle={[style.inputInnerStyle,{width:'85%'}]}
         onChangeText={setmessagevalue}
         value={messagevalue}/>
        <TouchableOpacity onPress={MessageHandler} style={{position:'absolute',right:0}}>
           <SendIcon/>
         </TouchableOpacity>
          </View>
      </MyContainer>
    );
}

export default ChatBox;
const styles = StyleSheet.create({
  img:{
      width:48,
      height:48,
      borderRadius:10
  },
  nameText:{
      fontFamily:fonts.urbanistSemiBold,
      fontSize:14,
      lineHeight:24,
      color:colors.black
  },
  msgText:{
      fontFamily:fonts.urbanistSemiBold,
      fontSize:12,
      lineHeight:22,
      color:colors.lighterGray
  }, 
  inputContainer: {
    marginHorizontal:10,
    height:Platform.OS==='ios' ? 80 : null
  }
})
