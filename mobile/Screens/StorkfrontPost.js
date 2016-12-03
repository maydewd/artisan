/**
 * screen for viewing storkfront post information
 */

import React, {Component} from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import Button from 'react-native-button'
import {usableWithTop, usablePercent, getScreenWidth} from '../helpers/dimension';
import {grabArtTypes} from '../resources/Types'
import { Kohana } from 'react-native-textinput-effects';
import FA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalPicker from 'react-native-modal-picker';
var ImagePicker = require('react-native-image-picker');

styles = require('../Styles/Layouts');
import {async_keys} from '../resources/Properties.js';


class StorkfrontPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.item._id,
      description: this.props.item.description,
      price: this.props.item.price,
      number: 0,  // TODO
      imagePath: this.props.item.imagePath,
      locality: this.props.item.locality,
      type: this.props.item.type,
      photoSource: null,
    };
  }
  _save() {
    const {description, type, price, photoSource, _id} = this.state;
    console.log("id: " + _id)
    console.log("description: " + description)
    console.log("type: " + type)
    console.log("photoSource: " + photoSource)
    // console.log(AsyncStorage.getItem(async_keys.TOKEN));
    var request = new XMLHttpRequest();
    request.open("POST", "http://colab-sbx-137.oit.duke.edu:3000/api/listings/"+_id);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'multipart/form-data');
    var body = new FormData();
    body.append('description', description);
    body.append('type', type);
    body.append('price', price);
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
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
        request.setRequestHeader('Authorization', result);
        request.send(body);
        console.log(body);
        console.log(request);
        console.log('request sent');
        alert('Thanks!')
        this.pop()
    });
  }
  _deletePressed() {
    Alert.alert( 'Delete', 'Are you sure you want to delete this post?', [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {text: 'OK', onPress: () => this._deletePost()},
    ] )
  }
  _deletePost() {
    var currID = this.state._id;
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      fetch("http://colab-sbx-137.oit.duke.edu:3000/api/listings/" + currID,
        {method: "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          }
        })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.success !== true) {
          console.log('Failed to delete')
        } else {
          console.log('deleted');
          alert('Thanks!')
          this.pop()
        }
      })
      .catch(function(err) {
        console.log("Error in delete request");
        console.log(err);
      })
      .done();
    });
  }
  render() {
    var titleConfig = {
      title: 'Storkfront Post',
    };
    const leftButtonConfig = {
      title: 'Back',
      handler: () => {this.pop()}
    };
    // TODO: put uri somewhere else
    return (
      <View>
        <NavigationBar
          style={styles.navBar}
          title={titleConfig}
          leftButton={leftButtonConfig}
        />
        <KeyboardAvoidingView behavior='position'>
        <View style = {{height: usableWithTop()}}>
          <TouchableOpacity style = {styles.sPostImageContainer} onPress={this.selectPhotoTapped.bind(this)}>
            <View>
              {
                this.state.photoSource === null ?
                  <Image style={styles.discoverPostImage} source={{uri: "http://colab-sbx-137.oit.duke.edu:3000/" + this.state.imagePath}} />:
                  <Image style={styles.sPostAvatar} source={this.state.photoSource} />
              }
              </View>
          </TouchableOpacity>
          {/* Description */}
          <Kohana
            style={styles.discoverPostStory}
            label={'Story'}
            iconClass={FA}
            iconName={'book'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: '#24518D' }}
            multiline = {true}
            numberOfLines = {2}
            value = {this.state.description != null ? this.state.description.toString() : "N/A"}
            onChangeText={(description) => this.setState({description})}
          />
          <Kohana
            style={styles.discoverPostLocation}
            editable= {false}
            label={'Location'}
            iconClass={FA}
            iconName={'globe'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: '#24518D' }}
            value = {this.state.locality != null ? this.state.locality.toString() : "N/A"}
          />
          <Kohana
            style={styles.discoverPostPrice}
            label={'Asking Price'}
            iconClass={MaterialIcons}
            iconName={'payment'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: '#24518D' }}
            keyboardType = 'numeric'
            value = {this.state.price != null ? this.state.price.toString() : "N/A"}
            onChangeText={(price) => this.setState({price})}
          />
          <ModalPicker
          data={grabArtTypes()}
          style = {{flex:1, width: getScreenWidth()}}
          initValue="Select a type"
          onChange={(option)=> this.setState({type:option.label})}
          >
              <Kohana
                style = {styles.discoverPostType}
                editable= {false}
                label={'Type'}
                iconClass={MaterialIcons}
                iconName={'subject'}
                iconColor={'#24518D'}
                labelStyle={{ color: 'pink' }}
                inputStyle={{ color: '#24518D' }}
                value={this.state.type != null ? this.state.type.toString() : "N/A"}
              />
          </ModalPicker>
          <View style={{flexDirection: "row"}}>
            <Button
              containerStyle={styles.saveButtonContainer}
              style={styles.saveButton}
              onPress={() => this._save()}>
              Save
            </Button>
            <Button
              containerStyle={styles.deleteButtonContainer}
              style={styles.deleteButton}
              onPress={() => this._deletePressed()}>
              Delete
            </Button>
          </View>
        </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  selectPhotoTapped() {
    console.log("Getting photo: storkfrontPost");
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

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = StorkfrontPost
