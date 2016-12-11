/**
 * Storkfront settings Screen
 * Ryan St.Pierre, Sung-Hoon Kim, David Maydew
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
  AsyncStorage,
  Platform,
  Navigator
} from 'react-native';
var NavigationBar = require('react-native-navbar');
var ImagePicker = require('react-native-image-picker');
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Sae } from 'react-native-textinput-effects';
import { SegmentedControls } from 'react-native-radio-buttons';
const config = require('../config/server');
import {usableWithTop, getScreenWidth} from '../helpers/dimension'
import {getAllAsyncKeys, async_keys} from '../resources/Properties.js'
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
      var imageSource={uri: config.url + "/" + this.state.profile.imagePath};
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
          //Fill out if desired
        }}
        onLoginFound={function(data){
          //Fill out if desired
        }}
        onLoginNotFound={function(){
          //Fill out if desired
        }}
        onError={function(data){
          //Fill out if desired
        }}
        onCancel={function(){
          //Fill out if desired
        }}
        onPermissionsMissing={function(data){
          //Fill out if desired
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
      </View>
    );
  }

  toStorkFront() {
    this.props.navigator.push({
      id: 'mainView',
      screen: 'storkFront',
      sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
    });
  }

  pop() {
    this.props.navigator.pop();
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        //Fill out if desired
      }
      else if (response.error) {
        //Fill out if desired
      }
      else if (response.customButton) {
        //Fill out if desired
      }
      else {
        var source;
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
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      fetch(config.url + config.connectFb,
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
    request.open("POST", config.url + config.usersMe);
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
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        var data = JSON.parse(request.response)
        AsyncStorage.setItem(async_keys.USER, JSON.stringify(data.user), () => {
          alert('Thanks!')
          this.toStorkFront()
        });
      } else {
        console.warn('error');
      }
    };
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      request.setRequestHeader('Authorization', result);
      request.send(body);
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
        this._resetToLogin()
      });
    } else {
      this._resetToLogin()
    }
  }

  _resetToLogin() {
    // NOTE: currently, logout removes all async keys used by the app, including discover preferences
    keys = getAllAsyncKeys();
    AsyncStorage.multiRemove(keys, (err) => {
      console.log(err)
      this.props.navigator.resetTo({id: 'login'});
    });
  }
}

module.exports = StorkFrontSettings
