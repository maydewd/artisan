/**
 * Storkfront settings Screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from 'react-native';
var NavigationBar = require('react-native-navbar');
var ImagePicker = require('react-native-image-picker');
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Sae } from 'react-native-textinput-effects';
import { SegmentedControls } from 'react-native-radio-buttons';

import {usableWithTop, getScreenWidth} from '../helpers/dimension'
import {getAsyncKeys, ASYNC_TOKEN_KEY} from '../resources/Properties.js'
styles = require('../Styles/Layouts');

class StorkFrontSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile,
      username: this.props.profile.username,
      password: null,
      photoSource: null,
      fblinked: this.props.profile.facebookID != null,
    };
  }


  render() {
    var titleConfig = {
      title: 'Profile Settings',
    };
    if(this.state.profile.imagePath === null) {
      var imageSource = {uri: this.state.profile.facebookImagePath};
    } else {
      var imageSource={uri: "http://colab-sbx-137.oit.duke.edu:3000/" + this.state.profile.imagePath};
    }
    var fbButton = null;
    if (!this.state.fblinked) {
      fbButton = <FBLogin
        facebookText="Link to Facebook"
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={["email","user_friends"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={(data) => this._connectFB(data)}
        onLogout={function(){
          console.log("Logged out.");
        }}
        onLoginFound={function(data){
          console.log("Existing login found.");
          console.log(data)
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
        }}
      />
    }

    const leftButtonConfig = {
      title: 'Back',
      handler: () => {this.pop()}
    };

    return (

      <View>
        <NavigationBar
        style={styles.navBar}
        title={titleConfig}
        leftButton={leftButtonConfig}
        />
        <KeyboardAvoidingView behavior='position'>
          <View style = {{height: usableWithTop(), alignItems: 'center'}}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style = {styles.profileImageContainer}>
                { this.state.photoSource === null ? <Image style = {styles.profileImage} source={imageSource} />:
                  <Image style={styles.profileImage} source={this.state.photoSource} />
                }
              </View>
            </TouchableOpacity>
            <Sae
              label={'Username'}
              iconClass={MaterialIcons}
              style = {{width: 0.8 * getScreenWidth()}}
              labelStyle={{ color: '#24518D' }}
              inputStyle={{ color: '#24518D' }}
              iconName={'perm-identity'}
              iconColor={'#24518D'}
              autoCapitalize={'none'}
              autoCorrect={false}
              value={this.state.username}
              onChangeText={(username) => this.setState({username})}
            />
            <Sae
              label={'Password'}
              iconClass={MaterialIcons}
              style = {{width: 0.8 * getScreenWidth()}}
              labelStyle={{ color: '#24518D' }}
              inputStyle={{ color: '#24518D' }}
              iconName={'lock'}
              iconColor={'#24518D'}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry = {true}
              onChangeText={(password) => this.setState({password})}
            />
            <View style={{flex:1}}></View>
            {fbButton}
            <Button
              containerStyle={styles.fullWidthSaveButtonContainer}
              style={styles.saveButton}
              onPress={() => this._save()}>
              Save
            </Button>
            <Button
              containerStyle={styles.logoutContainer}
              style={styles.logout}
              onPress={() => this._logoutPressed()}>
              Log out
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  pop() {
    this.props.navigator.pop();
  }
  selectPhotoTapped() {
    console.log("Getting photo");
    const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

     if (response.didCancel) {
       console.log('User cancelled photo picker');
     }
     else if (response.error) {
       console.log('ImagePicker Error: ', response.error);
     }
     else if (response.customButton) {
       console.log('User tapped custom button: ', response.customButton);
     }
     else {
       var source;

       // You can display the image using either:
       //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

       //Or:
       if (Platform.OS === 'android') {
         source = {uri: response.uri, isStatic: true};
       } else {
         source = {uri: response.uri.replace('file://', ''), isStatic: true};
       }

       this.setState({
         photoSource: source
       });
     }
    });
  }

  _connectFB(data) {
    AsyncStorage.getItem(ASYNC_TOKEN_KEY, (err, result) => {
      // console.log(result)
      // console.log(data.credentials.token)
      fetch("http://colab-sbx-137.oit.duke.edu:3000/api/connect/fb",
        {method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result,
            'access_token': data.credentials.token
          }
        })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success === true) {
          alert('Successfully linked!')
          this.setState({fblinked: true})
        } else {
          console.log(responseData.message)
          alert('Invalid FB login')
        }
        return responseData;
      })
      .catch(function(err) {
        console.log(err)
        alert('Something went wrong- test your connection')
      })
      .done();
    })
  }

  _save() {
    const {username, password, photoSource} = this.state;
    var request = new XMLHttpRequest();
    request.open("POST", "http://colab-sbx-137.oit.duke.edu:3000/api/users/me");
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'multipart/form-data');
    var body = new FormData();
    body.append('username', username);
    if (password !== null) {
      body.append('password', password);
    }
    if (photoSource !==null) {
      var photo;
      if (Platform.OS === 'android') {
        photo = {
          uri: photoSource.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        };
      } else {
        photo = {
          uri: photoSource,
          type: 'image/jpeg',
          name: 'photo.jpg',
        };
      }
      body.append('image', photo);
    }
    AsyncStorage.getItem('jwtToken', (err, result) => {
        request.setRequestHeader('Authorization', result);
        request.send(body);
        console.log(body);
        console.log(request);
        console.log('request sent');
        alert('Thanks!')
        this.pop()
    });
  }
  _logoutPressed() {
    Alert.alert( 'Log out', 'Are you sure you want to log out?', [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {text: 'OK', onPress: () => this._logout()},
    ] )
  }
  _logout() {
    if (this.state.fblinked) {
      FBLoginManager.logout((err, data) => {
        console.log(err)
        console.log(data)
        this._resetToLogin()
      });
    } else {
      this._resetToLogin()
    }
  }
  _resetToLogin() {
    keys = getAsyncKeys();
    AsyncStorage.multiRemove(keys, (err) => {
      console.log(err)
      this.props.navigator.resetTo({id: 'login'});
    });
  }
}

module.exports = StorkFrontSettings
