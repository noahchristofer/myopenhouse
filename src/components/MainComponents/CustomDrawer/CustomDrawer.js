import React, { Component } from 'react';
import { Text, TouchableOpacity, ImageBackground, Image, View, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { colors, images, icons, fonts } from '../../../constraints';
import { MenuIcon, D_MenuIcon } from 'svg';
import RBSheet from "react-native-raw-bottom-sheet";
import DrawerContent from '../CustomDrawer/DrawerContent';


let widthD = Dimensions.get('window').width;
let heightD = Dimensions.get('window').height;

export default class CustomDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.RBSheet.open()}
        style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center' }}>
        {global.user_role == 'driver' ?
          <D_MenuIcon
            width={22}
            height={22}
          />
          :
        <MenuIcon
        width={22}
        height={22}
      />
    }
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          closeOnDragDown={false}
          height={heightD}
          openDuration={50}
          animationType="none"
          closeDuration={1}
          customStyles={{
            container: {

              backgroundColor: 'rgba(0,0,0,0.5)',
              // alignItems: 'center'
            },
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.5)"
            },
            draggableIcon: {
              backgroundColor: colors.bottomSheetDragColor
            }
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => this.RBSheet.close()}
            accessible={false}
            style={{ width: '100%', height: '100%', backgroundColor: 'green' }}
          >
            <View style={{ width: '100%', height: '100%', borderRadius: 10 }}>
              <View style={{ width: '70%', height: '100%', backgroundColor: colors.whiteColor, borderRadius: 5,marginRight:10,
               shadowColor: Platform.OS==='ios'?'#D4D4D4':'#000',
               shadowOffset: { width: 0, height: 1 },
               shadowOpacity: 0.8,
               shadowRadius: 2,
               elevation: 2
            }}>
               <DrawerContent
               {...this.props}
               closeBSheet={() => this.RBSheet.close()}
               />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </RBSheet>
      </TouchableOpacity>
    );
  }
}
