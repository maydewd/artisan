/**
 * Register
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  ScrollView,
  Switch,
  Modal,
  Alert
} from 'react-native';
styles = require('../Styles/Layouts');
import {async_keys} from '../resources/Properties.js';
const config = require('../config/server');
import Button from 'react-native-button';
import FA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getScreenWidth, getScreenHeight, usablePercent} from '../helpers/dimension'
import { Sae } from 'react-native-textinput-effects';
var NavigationBar = require('react-native-navbar');
var ImagePicker = require('react-native-image-picker');
import { SegmentedControls } from 'react-native-radio-buttons';
import {radii, costBrackets} from '../resources/Preferences';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      username: null,
      password: null,
      distance: '5 miles',
      cost: '$20-100',
      myPosts: false,
      downedPost: false,
      modalVisible: false,
      confirmPassword: null,
    };
  }

  leftButton() {
    return (
      <TouchableOpacity style = {styles.registerRow} onPress={() => this._pop()}>
          <Icon size = {20} name = "ios-arrow-back" style = {styles.registerArrow} />
          <Text style = {styles.registerCancel}> Cancel </Text>
      </TouchableOpacity>
    )
  }

  render() {
    var titleConfig = {
     title: 'Registration',
     tintColor: 'white'
   };

   function setDistance(selectedOption){
     this.setState({
       distance: selectedOption
     });
   }

   function setCost(selectedOption){
     this.setState({
       cost: selectedOption
     });
   }

   const priceOptions = costBrackets();
   const distanceOptions = radii();

    return (
      <View>
        <NavigationBar
        style={styles.registerNavBar}
        title={titleConfig}
        leftButton={this.leftButton()}
        />
        <Modal
           animationType={"slide"}
           transparent={false}
           visible={this.state.modalVisible}
         >
            {this.modal()}
         </Modal>
        <ScrollView style = {styles.registerBackground} >
          <View style = {{height: 20}}/>
          <View style = {{alignItems: 'center'}}>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style = {styles.registerContainer}>
                  { this.state.profileImage === null ?
                      <Text>Add a profile image</Text>:
                      <Image style={styles.registerAvatar} source={this.state.profileImage} />
                    }
                  </View>
              </TouchableOpacity>
              <Sae
                label={'Username'}
                onChangeText={(username) => this.setState({username})}
                iconClass={MaterialIcons}
                style = {styles.registerWidth}
                labelStyle={{ color: '#24518D' }}
                inputStyle={{ color: '#24518D' }}
                iconName={'perm-identity'}
                iconColor={'#24518D'}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              <Sae
                label={'Password'}
                onChangeText={(password) => this.setState({password})}
                iconClass={MaterialIcons}
                style = {styles.registerWidth}
                labelStyle={{ color: '#24518D' }}
                inputStyle={{ color: '#24518D' }}
                iconName={'lock'}
                iconColor={'#24518D'}
                autoCapitalize={'none'}
                autoCorrect={false}
                password = {true}
              />
              <Sae
                label={'Confirm password'}
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                iconClass={MaterialIcons}
                style = {styles.registerWidth}
                labelStyle={{ color: '#24518D' }}
                inputStyle={{ color: '#24518D' }}
                iconName={'lock'}
                iconColor={'#24518D'}
                autoCapitalize={'none'}
                autoCorrect={false}
                password = {true}
              />
              <View style = {{height: 20}}/>
              <View style = {styles.bottomBorder}>
                <Text style = {styles.registerText}> Preferences </Text>
                <FA name="info-circle"
                  size={20}
                  style={{position: 'absolute', left: getScreenWidth() - 30, top: 5}}
                  color= 'black'
                  onPress={() => this._infoPressed()}>
                </FA>
              </View>
              <Text style = {styles.settingsText}>
                Discover Radius
              </Text>
              <SegmentedControls
                tint= {'#24518D'}
                selectedTint= {'white'}
                backTint= {'lightgray'}
                options={ distanceOptions }
                allowFontScaling={ false } // default: true
                onSelection={ setDistance.bind(this) }
                selectedOption={ this.state.distance }
                />
                <Text style = {styles.settingsText}>
                  Price Range
                </Text>
                <SegmentedControls
                  tint= {'#24518D'}
                  selectedTint= {'white'}
                  backTint= {'lightgray'}
                  options={ priceOptions }
                  allowFontScaling={ false } // default: true
                  onSelection={ setCost.bind(this) }
                  selectedOption={ this.state.cost }
                  />
                  <Text style = {styles.settingsText}>
                    Extras
                  </Text>
                </View>
                <View>
                  <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text> See my posts</Text>
                    <Switch
                        value={this.state.myPosts}
                        onValueChange={(val) =>  this.setState({
                             myPosts: val
                        })}
                    />
                  </View>
                  <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text> See down voted posts</Text>
                    <Switch
                        value={this.state.downedPost}
                        onValueChange={(val) =>  this.setState({
                           downedPost: val
                         })}
                    />
                  </View>
                </View>
                <View style = {{height:10}}/>
                <Button
                  containerStyle={{paddingTop: 7, width: getScreenWidth(), height:40, overflow:'hidden', backgroundColor: 'pink'}}
                  style={[styles.baseText, {fontSize: 20, color: 'white'}]}
                  onPress={() => this._register()}>
                  Register
                </Button>
          </ScrollView>
      </View>
    );
  }

  modal() {
    return (
      <View style = {{height: getScreenHeight(), alignItems: 'center', justifyContent: 'center'}}>
        <Text style = {{textAlign: 'center'}}> These will be your default preferences that help you discover great, new art.</Text>
        <View style = {{height: 10}}/>
        <Text>  Do not worry they can be changed any time! </Text>
        <View style = {{height: 40}}/>
        <TouchableOpacity>
          <Button onPress={this.hideModal.bind(this)}> Got It!</Button>
        </TouchableOpacity>
      </View>
    );
  }

  hideModal() {
    this.setState({
      modalVisible: false,
    });
  }

  _infoPressed() {
    this.setState({
      modalVisible: true,
    })
  }

  //TODO
  _register() {
    const {username, password, confirmPassword, profileImage} = this.state;
    if (username == null || password == null || profileImage == null || confirmPassword == null) {
      Alert.alert('Incomplete', 'Check you filled out all the fields!');
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert('Check Passwords match', 'Confirm password does not match password field')
      return;
    }
    this._registerUser(username, password, profileImage);
    this._savePreferences();
    this._pop()
  }

  _registerUser(username, password, profileImage) {
    var request = new XMLHttpRequest();
    request.open("POST", config.url + config.register);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'multipart/form-data');
    var body = new FormData();
    body.append('username', username);
    body.append('password', password);
    var photo;
    if (Platform.OS === 'android') {
        photo = {
          uri: profileImage.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        };
    } else {
        photo = {
          uri: profileImage,
          type: 'image/jpeg',
          name: 'photo.jpg',
        };
      }
    body.append('image', photo);
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
        request.setRequestHeader('Authorization', result);
        request.send(body);
        Alert.alert('Thanks!')
    });
  }

  _savePreferences() {
    AsyncStorage.setItem(async_keys.DISTANCE, this.state.distance);
    AsyncStorage.setItem(async_keys.COST, this.state.cost);
    AsyncStorage.setItem(async_keys.MYPOSTS, JSON.stringify(this.state.myPosts));
    AsyncStorage.setItem(async_keys.DOWNED, JSON.stringify(this.state.downedPost));
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

    if (response.error) {
       return;
     }
     else if (response.customButton) {
       return;
     }
     else if (!response.didCancel){
       var source;
       if (Platform.OS === 'android') {
         source = {uri: response.uri, isStatic: true};
       } else {
         source = {uri: response.uri.replace('file://', ''), isStatic: true};
       }
       this.setState({
         profileImage: source
       });
     }
    });
  }

  _pop() {
    var navigator = this.props.navigator;
    navigator.pop();
  }

}

module.exports = Register
