import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import style from '../../assets/css/style';
import { RatingA, RatingAplus, RatingB, RatingBplus, RatingC } from '../../assets/images';
import { colors, fonts } from '../../constraints';

const Info=(props)=> {
    const DATA = [
        {
          id: '1',
          title: 'Public School',
          rating:'A'
        },
        {
          id: '2',
          title: 'Crime & Safety',
          rating:'A+'
        },
        {
          id: '3',
          title: 'Housing',
          rating:'A'
        },
        {
          id: '4',
          title: 'Nightlife',
          rating:'C'
        },
        {
          id: '5',
          title: 'Good for Families',
          rating:'B+'
        },
        {
          id: '6',
          title: 'Diversity',
          rating:'B'
        }
    ]
    const DATA2 = [
        {
          id: '1',
          Year: '2022',
          Tax:'5.92',
          positive:true,
          taxValue:'7.41',
          Assement:'550.000',
        },
        {
          id: '2',
          Year: '2021',
          Tax:'4.92',
          positive:true,
          taxValue:'7.41',
          Assement:'550.000',
        },
        {
          id: '3',
          Year: '2020',
          Tax:'5.92',
          positive:false,
          taxValue:'1.41',
          Assement:'550.000',
        },
        {
          id: '4',
          Year: '2019',
          Tax:'2.12',
          positive:true,
          taxValue:'7.41',
          Assement:'550.000',
        },
        {
          id: '5',
          Year: '2018',
          Tax:'3.92',
          positive:false,
          taxValue:'3.41',
          Assement:'550.000',
        }
    ]
      const Data1=[{
        id: '1',
        title: 'Sale History',
      },
      {
        id: '2',
        title: 'Tax History',
      }]

      const [selectedId,setSelectedId]=useState('1')
    return (
        <View>
            <Text style={style.emailText3}>
            Niche Rating
            </Text>
            <View style={[style.justify,styles.nicheRatingView]}>
              <View style={[style.justify,styles.nicheRatingCircle]}>
                <Text style={styles.ratingtext}>
                A+
                </Text>
              </View>
              <Text style={style.emailText3}>
                Overal Niche Grade
              </Text>
            </View>
            <FlatList
                data={DATA}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>{
                    return(
                        <View style={[style.flexRow,styles.centerView]}>
                            {item.rating == 'A'?<RatingA/>
                            :item.rating == 'A+'?<RatingAplus/>
                            :item.rating == 'B'?<RatingB/>
                            :item.rating == 'B+'?<RatingBplus/>
                            :item.rating == 'C'?<RatingC/>:null}
                            <Text style={styles.headingText}>
                                {item.title}
                            </Text>
                        </View> 
                    )}}/>
            <TouchableOpacity>
            <Text style={styles.subButton}>
                View more
            </Text>
            </TouchableOpacity>
            <Text style={style.emailText3}>
              Sale & Tax History
            </Text>
            <View style={styles.buttonView}>
            <FlatList
                data={Data1}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>{
                    const backgroundColor = item.id === selectedId ? true : false
                    return(
                        <TouchableOpacity onPress={()=>setSelectedId(item.id)} 
                        style={[styles.centerView,{borderRadius:10,backgroundColor:backgroundColor?colors.white:null}]}>
                        <Text style={[styles.subButtonText,{color:backgroundColor?colors.black:colors.darkerGray}]}>
                           {item.title}
                       </Text>
                       </TouchableOpacity>
                    )}}
                    extraData={selectedId}/>
            </View>
            <View style={[style.flexRow,style.justify2]}>
                <Text style={styles.textYear}>
                  Year
                </Text>
                <Text style={styles.textYear}>
                  Property Tax
                </Text>
                <Text style={[styles.textYear,{paddingLeft:10}]}>
                  Assesment
                </Text>
            </View>
            <FlatList
                data={DATA2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>{
                    return(
                        <View style={style.flexRow}>
                        <Text style={styles.itemText}>
                           {item.Year}
                        </Text>
                        <Text style={styles.itemText}>
                           ${item.Tax}
                           <Text style={[styles.subItem,{color:item.positive?colors.green:colors.lightRed}]}>
                               {` ${item.positive?'+':'-'}${item.taxValue}`}
                           </Text>
                        </Text>
                        <Text style={[styles.itemText,{paddingLeft:10}]}>
                           {item.Assement}
                        </Text>
                        </View>
                    )}}
                    />
            <TouchableOpacity>
            <Text style={styles.subButton}>
                View more
            </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Info;

const styles = StyleSheet.create({
    headingText:{
        fontFamily:fonts.urbanistSemiBold,
        fontSize:14,
        lineHeight:24,
        color:colors.dark,
        paddingHorizontal:15,
        paddingRight:30,
        paddingVertical:5
    },
    subButton:{
        fontFamily:fonts.UrbanistBold,
        fontSize:12,
        lineHeight:22,
        color:colors.primaryColor,
        // fontWeight:'bold',
        textAlign:'center',
        marginVertical:10
    },
    subButtonText:{
        fontFamily:fonts.InterMedium,
        fontSize:14,
        textAlign:'center',
    },
    buttonView:{
        marginTop:10,
        backgroundColor:colors.mediumdarkGray,
        borderRadius:10,
        borderColor:colors.mediumdarkGray,
        borderWidth:3
    },
    centerView:{
        paddingVertical:12,
        width:'50%',
        alignItems:'center'
    },
    textYear:{
        color:colors.lightpurple,
        fontFamily:fonts.urbanistregular,
        fontSize:14,
        lineHeight:24,
        marginVertical:10,
        width:'33%'
    },
    itemText:{
        fontFamily:fonts.urbanistSemiBold,
        fontSize:14,
        lineHeight:24,
        color:colors.dark,
        marginVertical:10,
        width:'33%',
    },
    subItem:{
        fontSize:9,
        lineHeight:24,
        fontFamily:fonts.urbanistSemiBold,
    },
    nicheRatingView:{
      backgroundColor:colors.lightestGreen,
      height:120,
      borderRadius:10,
      marginVertical:10
    },
    nicheRatingCircle:{
      backgroundColor:colors.lightGreen,
      width:50,
      height:50,
      borderRadius:25
    },
    ratingtext:{
      color:colors.lighterGreen,
      fontFamily:fonts.UrbanistBold,
      // fontWeight:'bold',
      lineHeight:24,
      fontSize:16
    }
})