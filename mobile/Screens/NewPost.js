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
  ScrollView
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import Button from 'react-native-button'
var ImagePicker = require('react-native-image-picker');

class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      number: 0,
      photoSource: null,
      type: 'ceramics'
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
        <ScrollView style = {{height: 600}}>
          <TouchableOpacity style = {styles.container} onPress={this.selectPhotoTapped.bind(this)}>
              <View>
                { this.state.photoSource === null ? <Text>Select a Photo</Text> :
                    <Image style={styles.avatar} source={this.state.photoSource} />
                  }
                </View>
            </TouchableOpacity>
            <TextInput
              style={{height: 130, padding: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'gray'}}
              multiline = {true}
              numberOfLines = {3}
              placeholder="Story"
              onChangeText={(description) => this.setState({description})}
            />
            <TextInput
              style={{height: 40, padding: 5}}
              placeholder="Location"
            />
            <TextInput
              style={{height: 40, padding: 5, borderBottomWidth: 1, borderColor: 'gray'}}
              placeholder="Asking Price"
            />
            <Picker
                style = {styles.picker}
                selectedValue={this.state.type}
                onValueChange={(selected) => this.setState({type: selected})}
                mode="dropdown">
                <Picker.Item label="Painting" value="painting" />
                <Picker.Item label="Sculpture" value="sculpture" />
                <Picker.Item label="Jewelry" value="jewelry" />
                <Picker.Item label="Furntiture" value="furniture" />
                <Picker.Item label="Ceramics" value="ceramics" />
            </Picker>
            <Button
              containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}}
              style={{fontSize: 20, color: 'white'}}
              onPress={() => this._post()}>
              Post
            </Button>
        </ScrollView>
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
    const {description, type} = this.state;
    console.log("description: " + description)
    console.log("type: " + type)
  }

  pop() {
    this.props.navigator.pop()
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'lightblue'
  },

  container: {
    width: 400,
    height: 300,
    alignItems: 'center',
    justifyContent: "space-around",
  },

  center: {
    alignItems: 'center',
    justifyContent: "space-around",
  },

  avatar: {
    resizeMode: 'contain',
    width: 400,
    height: 300
  },

  picker: {
    height: 150
  }
});


module.exports = NewPost
