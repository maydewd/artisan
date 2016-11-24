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
  Modal
} from 'react-native';
styles = require('../Styles/Layouts');
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
      distance: '5 miles',
      cost: '$20-100',
      myPosts: false,
      downedPost: false,
      modalVisible: false,
    };
  }

  leftButton() {
    return (
      <TouchableOpacity style = {styles.registerRow} onPress={() => this._cancel()}>
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
           onRequestClose={() => {alert("Modal has been closed.")}}
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
                iconClass={MaterialIcons}
                style = {{width: 0.8 * getScreenWidth()}}
                labelStyle={{ color: '#24518D' }}
                inputStyle={{ color: '#24518D' }}
                iconName={'perm-identity'}
                iconColor={'#24518D'}
                autoCapitalize={'none'}
                autoCorrect={false}
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
              />
              <Sae
                label={'Confirm password'}
                iconClass={MaterialIcons}
                style = {{width: 0.8 * getScreenWidth()}}
                labelStyle={{ color: '#24518D' }}
                inputStyle={{ color: '#24518D' }}
                iconName={'lock'}
                iconColor={'#24518D'}
                autoCapitalize={'none'}
                autoCorrect={false}
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
        <TouchableOpacity  onPress={this.hideModal.bind(this)}>
          <Text> Got It!</Text>
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
    this._savePreferences();
    alert("need to register")
  }

  _savePreferences() {
    AsyncStorage.setItem('distance', this.state.distance);
    AsyncStorage.setItem('cost', this.state.cost);
    AsyncStorage.setItem('myPosts', JSON.stringify(this.state.myPosts));
    AsyncStorage.setItem('downedPost', JSON.stringify(this.state.downedPost));
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
       console.log('ImagePicker Error: ', response.error);
     }
     else if (response.customButton) {
       console.log('User tapped custom button: ', response.customButton);
     }
     else if (!response.didCancel){
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
         profileImage: source
       });
     }
    });
  }

  _cancel() {
    var navigator = this.props.navigator;
    navigator.pop();
  }

}

module.exports = Register
