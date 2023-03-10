import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';
// import CookieManager from '@react-native-community/cookies';

export default class Instagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  setIgToken = (data) => {
    console.log('data', data)
    // this.setState({ token: data.access_token })
  }

  onClear() {
    // CookieManager.clearAll(true)
    //   .then((res) => {
    //     // this.setState({ token: null })
    //   });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.instagramLogin.show()}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Login now</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.btn, { marginTop: 10, backgroundColor: 'green' }]}
          onPress={() => this.onClear()}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>
        </TouchableOpacity>
        <Text style={{ margin: 10 }}>Token: {this.state.token}</Text>
        {this.state.failure && (
          <View>
            <Text style={{ margin: 10 }}>
              failure: {JSON.stringify(this.state.failure)}
            </Text>
          </View>
        )} */}
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          appId='795952524900485'
          appSecret='7b3453ff597d9a19d29ca566fc8602d4'
          redirectUrl='https://openhouse-59d9d.firebaseapp.com/__/auth/handler'
          incognito={false}
          scopes={['user_profile', 'user_media']}
          onLoginSuccess={this.setIgToken}
          onLoginFailure={(data) => console.log(data)}
          language='en' //default is 'en' for english
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  btn: {
    borderRadius: 5,
    backgroundColor: 'orange',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

