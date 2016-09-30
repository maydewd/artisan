/**
 * Login Screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
import CenteredView from '../Screens/CenteredView'
import Button from 'react-native-button'

class LoginScreen extends Component {

  render() {
    return (
      <CenteredView>
        <Image source = {require("../resources/Logo1.png")} style = {styles.logo} />
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          style={{fontSize: 20, color: 'blue'}}>
          Facebook
        </Button>
        <View style = {styles.groupedTextBoxes}>
          <TextInput
            style={styles.textBox}
            placeholder="Username"
          />
          <TextInput
            style={styles.textBox}
            placeholder="Password"
            password = {true}
          />
          <Button
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
            style={{fontSize: 20, color: 'pink'}}
            onPress={() => this._loginPressed()}>
            Login
          </Button>
        </View>
        <Text style={styles.instructions}>
          Sign Up
        </Text>
      </CenteredView>
    );
  }

  _loginPressed() {
    console.log("trying to log in")
    var navigator = this.props.navigator;
    navigator.replace({
        id: 'discover'
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 150,
    height: 150
  },
  textBox: {
    height: 40,
    width: 300,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    alignSelf: 'center'
  },
  groupedTextBoxes: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxHeight: 150
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


module.exports = LoginScreen
