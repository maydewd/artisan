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
  Platform
} from 'react-native';
var NavigationBar = require('react-native-navbar');
styles = require('../Styles/Layouts');
import Button from 'react-native-button'
var ImagePicker = require('react-native-image-picker');

class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      number: 0,
      avatarSource: null
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
        <View style= {{height:20}}/>
        <TextInput
          style={{height: 80, padding: 5}}
          multiline = {true}
          numberOfLines = {4}
          placeholder="Enter Description"
          onChangeText={(description) => this.setState({description})}
        />
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <Text>Ryan</Text>
        </TouchableOpacity>
        <View>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource} />
            }
        </View>
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
         avatarSource: source
       });
     }
    });
  }

  changeNumber() {
    myPhotoGetter.getPhoto(5, (error, result) => {
      if(error) {
        console.error(error);
      } else {
        this.setState({number: result});
      }
    })
  }

  _post() {
    this._getPhoto();
    const {description} = this.state;
    console.log(description)
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = NewPost
