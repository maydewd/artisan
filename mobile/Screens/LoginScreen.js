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
import Icon from 'react-native-vector-icons/FontAwesome';
styles = require('../Styles/Layouts');

class LoginScreen extends Component {

    componentDidMount() {
        this.setState({username: 'devuser'});
        this.setState({password: 'securetest'});
    }

  render() {
    return (
      <CenteredView>
        <Image source = {require("../resources/Logo1.png")} style = {styles.logo} />
        <Icon.Button name="facebook" backgroundColor="#3b5998">
            Login with Facebook
        </Icon.Button>
        <View style = {styles.groupedTextBoxes}>
          <TextInput
            style={styles.textBox}
            placeholder="Username"
            onChangeText={(username) => this.setState({username})}
          />
          <TextInput
            style={styles.textBox}
            placeholder="Password"
            password = {true}
            onChangeText={(password) => this.setState({password})}
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
    const { username, password } = this.state
    console.log(username);
    console.log(password);
    if (this._authenticated()) {}
      var navigator = this.props.navigator;
      navigator.replace({
          id: 'mainView'
      });
  }

  //Not functional
  _submitLogin() {
    const { username, password } = this.state

    console.log(username);
    console.log(password);
    //Username and password reach this point
    fetch("http://colab-sbx-137.oit.duke.edu:3000/api/login",
      {method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: username, password: password})})
    .then((response) =>
      {
        console.log(response.json())
        return response.json()
      })
    .then((responseData) => {
      if (responseData.success === true) {
        AsyncStorage.setItem('jwtToken', responseData.token, () =>
          this.props.navigator.push({id:'mainView'})
        );
      }
       return responseData;
     })
    .then((data) => {
       console.log(data);
     })
    .catch(function(err) {
      //Error is caught here, saying Network request failed
        console.log("Getting an error here");
        console.log(err);
    })
    .done();
  }


  //placeholder
  _authenticated() {
    return true;
  }
}

module.exports = LoginScreen
