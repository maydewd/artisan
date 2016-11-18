/**
 * Login Screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage,
  Dimensions,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
  Navigator
} from 'react-native';
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome';
styles = require('../Styles/Layouts');
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';
import {getScreenWidth, getScreenHeight, usablePercent} from '../helpers/dimension'
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

class LoginScreen extends Component {

    componentDidMount() {
        this.setState({
          username: 'devuser',
          password: 'securetest',
        });
    }

  render() {
    var height = getScreenHeight();
    var logoWidth = usablePercent(30);
    var logoHeight = usablePercent(30);
    return (

      <KeyboardAvoidingView behavior = 'position'>
      <View
              style = {{
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                paddingTop: 40,
                backgroundColor: '#e6f2ff',
                height: height
              }}
          >
        <Image source = {require("../resources/storkdLogo.png")}
          style = {{width: logoWidth, height: logoHeight}}
        />
        <FBLogin
            ref={(fbLogin) => { this.fbLogin = fbLogin }}
            permissions={["email","user_friends"]}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
             onLogin={function(data){
               console.log("Logged in!");
               console.log(data);
             }}
             onLogout={function(){
               console.log("Logged out.");
             }}
             onLoginFound={function(data){
               console.log("Existing login found.");
               console.log(data);
             }}
             onLoginNotFound={function(){
               console.log("No user logged in.");
             }}
             onError={function(data){
               console.log("ERROR");
               console.log(data);
             }}
             onCancel={function(){
               console.log("User cancelled.");
             }}
             onPermissionsMissing={function(data){
               console.log("Check permissions!");
               console.log(data);
             }}/>
        <View style = {{alignItems: 'center'}}>
          <Kohana
            style={{width: getScreenWidth() * .9, backgroundColor: 'white', borderTopRightRadius:10, borderTopLeftRadius:10 }}
            onChangeText={(username) => this.setState({username})}
            label={'Username'}
            iconClass={MaterialIcons}
            iconName={'perm-identity'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: 'pink' }}
            autoCapitalize={'none'}
            autoCorrect={false}
            returnKeyType = {'done'}
          />
          <Kohana
            style={{ width: getScreenWidth() * .9, backgroundColor: 'white', borderBottomRightRadius:10, borderBottomLeftRadius:10}}
            onChangeText={(password) => this.setState({password})}
            label={'Password'}
            iconClass={MaterialIcons}
            iconName={'lock'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: 'pink' }}
            password = {true}
            secureTextEntry = {true}
            returnKeyType = {'done'}
          />
          <View style = {{height: 10}} />
          <Button
            containerStyle={{paddingTop: 7, width: 110, height:40, overflow:'hidden', borderRadius:4, backgroundColor: 'pink'}}
            style={[styles.baseText, {fontSize: 20, color: 'white'}]}
            onPress={() => this._submitLogin()}>
            Login
          </Button>
        </View>
        <TouchableOpacity   onPress={() => this._register()}>
          <Text style={[styles.baseText, styles.instructions]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    );
  }

  _register() {
    var navigator = this.props.navigator;
    navigator.push({
        id: 'register',
        sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump
    });
  }


  //Get the AWT token given the username and password state of the app
  _submitLogin() {
    const { username, password } = this.state
    fetch("http://colab-sbx-137.oit.duke.edu:3000/api/login",
      {method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})})
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.success === true) {
        AsyncStorage.setItem('jwtToken', responseData.token, () =>
          this.props.navigator.push({
            id:'mainView',
            sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump
          })
        );
      } else {
        console.log("Incorrect login");
        alert('Incorrect username and password')
      }
       return responseData;
     })
    .catch(function(err) {
      console.log("Error in Login Fetch request");
      console.log(err);
      alert('Something went wrong- test your connection')
    })
    .done();
  }

}

module.exports = LoginScreen
