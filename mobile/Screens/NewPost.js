/**
 * Allow user to make a new post
 * Ryan St.Pierre, Sung-Hoon Kim, David Maydew
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
  KeyboardAvoidingView,
  Navigator,
  Alert
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
import {async_keys} from '../resources/Properties.js';
import Geocoder from 'react-native-geocoder';
import {GOOGLE_API_KEY} from '../resources/Properties.js'
// Set Google Maps geocoding API key in case native geocoder fails
Geocoder.fallbackToGoogle(GOOGLE_API_KEY);
const config = require('../config/server');
styles = require('../Styles/Layouts');

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: null,
      price: null,
      photoSource: null,
      type: null,
      lat: null,
      lng: null,
      locality: null,
    };
  }

  componentWillMount() {
    // flag to prevent state changes due to asynchronous geolocation calls when unmounted
    this.mounted = true;
    // do geolocation and geocoding now, as they take a long time
    this._getLocation()
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    var titleConfig = {title: 'New Post'};
    const leftButtonConfig = {title: 'Back', handler: () => {this.toStorkFront()}};
    return (
      <View>
        <NavigationBar
          style={styles.navBar}
          title={titleConfig}
          leftButton={leftButtonConfig}
        />
        <KeyboardAvoidingView behavior='position'>
          <View style= {{height: usableWithTop()}}>
            <TouchableOpacity style = {styles.newPostContainer} onPress={this.selectPhotoTapped.bind(this)}>
              <View>
                { this.state.photoSource === null ? <MaterialIcons name="add-a-photo" size= {50}/>:
                  <Image style={styles.newPostAvatar} source={this.state.photoSource} />
                }
              </View>
            </TouchableOpacity>
            <Kohana
              style={styles.story}
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
              style={styles.askingPrice}
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
              style = {styles.flexAndWidth}
              initValue="Select a type"
              onChange={(option)=> this.setState({type:option.label})}
            >
              <Kohana
                style = {styles.newPostType}
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
              containerStyle={styles.newPostButton}
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
        //Fill in if desired
      }
      else if (response.error) {
        //Fill in if desired
      }
      else if (response.customButton) {
        //Fill in if desired
      }
      else {
        var source;
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }
        this.setState({photoSource: source});
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
    request.open("POST", config.url + config.listings);
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
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      request.setRequestHeader('Authorization', result);
      request.send(body);
      Alert.alert('Thanks!')
      this.toStorkFront()
    });
  }

  // updates the state with location information. The callback is optional
  _getLocation(callback) {
    navigator.geolocation.getCurrentPosition (
      (position) => {
        if (!this.mounted) {
          return;
        }
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        var loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        Geocoder.geocodePosition(loc).then(res => {
          /*
          NOTE: res is an array of geocoding objects, and the information is not guaranteed to be there.
          It has information other than locality, which we do not use.
          For the full object specification, see: https://github.com/devfd/react-native-geocoder#geocoding-object-format
          */
          if (!this.mounted) {
            return;
          }
          this.setState({
            locality: res[0].locality   // locality refers to city, town, or political entity
          })
          if (callback) {
            callback();
          }
        })
        .catch(err => {
          alert(err.message);
        })
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
    );
  }

  _postPressed() {
    // if location coding has not finished by the time of posting, try again
    if (this.state.lat === null || this.state.lng === null || this.state.locality === null) {
      this._getLocation(this._post);
    } else {
      this._post();
    }
  }

  toStorkFront() {
    this.props.navigator.push({
      id: 'mainView',
      screen: 'storkFront',
      sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
    });
  }
}

module.exports = NewPost
