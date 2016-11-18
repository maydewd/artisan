/**
 * New Post Screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  PixelRatio,
  Picker,
  Platform,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import Button from 'react-native-button'
var ImagePicker = require('react-native-image-picker');
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getScreenWidth, getScreenHeight, usablePercent, usableWithTop, bottomNavBarHeight} from '../helpers/dimension'
import {ValidateNewPost} from '../helpers/Validation'
import {grabArtTypes} from '../resources/Types'
import { Kohana } from 'react-native-textinput-effects';
import ModalPicker from 'react-native-modal-picker';
import FA from 'react-native-vector-icons/FontAwesome';

import Geocoder from 'react-native-geocoder';
// TODO:
var MY_KEY = 'AIzaSyB4Wup3-phaP5kaiLHUOELxdtMKzm1GuxI';
Geocoder.fallbackToGoogle(MY_KEY);

class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: null,
      price: null,
      photoSource: null,
      type: null,
      position: null,
      locality: null,
    };
  }

  render() {
    var titleConfig = {
     title: 'New Post',
   };

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
          <View style= {{height: usableWithTop()}}>
          <TouchableOpacity style = {styles.container} onPress={this.selectPhotoTapped.bind(this)}>
              <View>
                { this.state.photoSource === null ? <MaterialIcons name="add-a-photo" size= {50}/>:
                    <Image style={styles.avatar} source={this.state.photoSource} />
                  }
                </View>
            </TouchableOpacity>
            <Kohana
              style={{flex: 3, width: getScreenWidth(), minHeight: usablePercent(30), backgroundColor: 'white', paddingTop: 10, borderColor: 'gray', borderTopWidth: 1}}
              onChangeText={(username) => this.setState({username})}
              label={'Story'}
              iconClass={FA}
              iconName={'book'}
              iconColor={'#24518D'}
              labelStyle={{ color: 'pink' }}
              inputStyle={{ color: '#24518D' }}
              multiline = {true}
              numberOfLines = {2}
              onChangeText={(description) => this.setState({description})}
            />
            <Kohana
              style={{flex: 1, width: getScreenWidth(), minHeight: usablePercent(10), backgroundColor: 'white', borderColor: 'gray', borderTopWidth: 1}}
              onChangeText={(username) => this.setState({username})}
              label={'Asking Price'}
              iconClass={MaterialIcons}
              iconName={'payment'}
              iconColor={'#24518D'}
              labelStyle={{ color: 'pink' }}
              inputStyle={{ color: '#24518D' }}
              keyboardType = 'numeric'
              onChangeText={(price) => this.setState({price})}
            />
            <ModalPicker
                   data={grabArtTypes()}
                   style = {{flex:1, width: getScreenWidth()}}
                   initValue="Select a type"
                   onChange={(option)=> this.setState({type:option.label})}
                   >
                       <Kohana
                         style = {{width: getScreenWidth(), minHeight: usablePercent(10), borderColor: 'gray', borderTopWidth: 1}}
                         editable= {false}
                         label={'Type'}
                         iconClass={MaterialIcons}
                         iconName={'subject'}
                         iconColor={'#24518D'}
                         labelStyle={{ color: 'pink' }}
                         inputStyle={{ color: '#24518D' }}
                         value={this.state.type}
                       />
            </ModalPicker>
            <Button
              containerStyle={{padding:10, overflow:'hidden', maxHeight: bottomNavBarHeight(), backgroundColor: '#24518D', borderRadius: 2}}
              style={{fontSize: 20, color: 'white'}}
              onPress={() => this._postPressed()}>
              Post
            </Button>
            </View>
        </KeyboardAvoidingView>
      </View>
    );
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

  _getData() {
    return ({
      description: this.state.description,
      price: this.state.price,
      photoSource: this.state.photoSource,
      type: this.state.type,
      lat: this.state.lat,
      lng: this.state.lng,
      locality: this.state.locality,
    });
  }

  _post() {
    const data = this._getData()
    try {
      var tf = ValidateNewPost(this._getData());
    } catch(err) {
      alert(err.message);
      return;
    }
    var request = new XMLHttpRequest();
    request.open("POST", "http://colab-sbx-137.oit.duke.edu:3000/api/listings");
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'multipart/form-data');
    var body = new FormData();
    body.append('description', data.description);
    body.append('type', data.type);
    body.append('price', data.price);
    body.append('lat', data.lat);
    body.append('lng', data.lng);
    body.append('locality', data.locality);
    var photo;
    if (Platform.OS === 'android') {
      photo = {
        uri: data.photoSource.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
    } else {
      photo = {
        uri: data.photoSource,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
    }
    body.append('image', photo);
    AsyncStorage.getItem('jwtToken', (err, result) => {
        request.setRequestHeader('Authorization', result);
        request.send(body);
        alert('Thanks!')
        this.pop()
    });
  }

  _getLocation() {

    navigator.geolocation.getCurrentPosition (
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        var loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        Geocoder.geocodePosition(loc).then(res => {
          console.log(res)
          // TODO: res is an array of geocoding objects, and the information is not guaranteed to be there
          this.setState({locality: res[0].locality})
          this._post();
        })
        .catch(err => alert(JSON.stringify(err)))
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
    );
  }
  _postPressed() {
    this._getLocation();
  }
  pop() {
    this.props.navigator.pop()
  }

}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#cce5ff'
  },

  container: {
    width:  getScreenWidth(),
    height: usablePercent(50),
    alignItems: 'center',
    justifyContent: "space-around",
    backgroundColor: '#f6f6f6'
  },

  center: {
    alignItems: 'center',
    justifyContent: "space-around",
  },

  avatar: {
    resizeMode: 'contain',
    width: getScreenWidth(),
    height: usablePercent(50)
  },

  picker: {
    height: 150
  }
});


module.exports = NewPost
