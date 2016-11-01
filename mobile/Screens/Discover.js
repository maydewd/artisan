/**
 * Discover Screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import BottomNav from '../Components/BottomNav'
import MainNavBar from '../Components/MainNavBar'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'react-native-button';
styles = require('../Styles/Layouts');
var NavigationBar = require('react-native-navbar');
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getScreenWidth, getScreenHeight, getUsableScreenHeight, usablePercent} from '../helpers/dimension'

class Discover extends Component {
  constructor(props) {
    super(props);
    // TODO: make this better
    this.state = {
      storedListings: [],
      currentListing: {
        imagePath: 'public/uploads/listings/loading.jpg',
        description: 'N/A',
        location: 0,
        price: 0,
        number: 0,
        type: 'N/A'
      }
    };
  }

  componentDidMount() {
    // TODO: check if location services are on!
    if (this.state.storedListings.length === 0) {
      this._fetchData(this._nextListing.bind(this))
    }
  }

  _nextListing() {
    if (this.state.storedListings.length === 0) {
      alert("No more listings");
      return;
    }
    const next = this.state.storedListings.shift();
    this.setState( {
      currentListing: next
    });
  }

  _fetchData(callback) {
    AsyncStorage.getItem('jwtToken', (err, result) => {
      fetch("http://colab-sbx-137.oit.duke.edu:3000/api/listings",
        {method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          }})
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);

            responseData.forEach((item) => {
              this.state.storedListings.push(item);
            })

            console.log("Successfully grabbed data");
            callback()
         })
        .catch(function(err) {
          alert("error");
          console.log("Error in Posting");
          console.log(err);
        })
        .done();
    });
    console.log(this.state.storedListings)
  }

  leftButton() {
    return  (
      <View style = {styles.navIcon}>
        <Ionicons name="ios-settings" size={30} onPress={(event) => {this.goToSettings()}}/>
      </View>
    );
  }

  goToSettings() {
    console.log("pressed")
    this.props.navigator.push({
        id: 'discoverSettings'
    });
  }

  goToMyBundle() {
    console.log("pressed")
    this.props.navigator.push({
        id: 'myBundle'
    });
  }

  rightButton() {
    return (
      <View style = {styles.navIcon}>
        <Ionicons name="ios-basket" size={30} onPress={(event) => {this.goToMyBundle()}}/>
      </View>
    );
  }

  render() {
    var titleConfig = {
      title: 'Discover',
    };

    return (
      <View>
        <NavigationBar
        style={styles.navBar}
        title={titleConfig}
        leftButton={this.leftButton()}
        rightButton={this.rightButton()}
        />
        <View style ={{backgroundColor: 'white', height: getUsableScreenHeight()}}>
          <View style = {styles.centered && {flexDirection: "row", paddingRight: 5, paddingTop: 15, paddingBottom: 2}}>
            <View style={{flex:1}} />
            <Icon name="info-circle"
              size={usablePercent(6.5)}
              iconStyle={styles.discoverIconInfo}
              color= 'black'
              onPress={() => this._infoPressed()}>
            </Icon>
          </View>
          <Image
               style = {[styles.discoverImage, {width: getScreenWidth()}]}
               source = {{uri: "http://colab-sbx-137.oit.duke.edu:3000/" + this.state.currentListing.imagePath}}
          />
          <View style = {styles.centered && {flexDirection: "row", paddingLeft: 30, paddingRight: 30, paddingBottom: 30, paddingTop: 2}}>
            <Button
              containerStyle={styles.discoverButtonContainerDown}
              style={styles.discoverButtonDown}
              onPress={() => this._thumbsDownPressed()}>
              <Icon name="thumbs-down" size={usablePercent(8)}/>
            </Button>
            <View style={{flex:1}}></View>
            <Button
              containerStyle={styles.discoverButtonContainerUp}
              style={styles.discoverButtonUp}
              onPress={() => this._thumbsUpPressed()}>
              <Icon name="thumbs-up" size={usablePercent(8)}/>
            </Button>

          </View>
        </View>
      </View>
    );
  }

  _infoPressed() {
    //TODO
    console.log("info pressed")
    this.props.navigator.push({
      id: 'discoverPost',
      item: this.state.currentListing
    });
  }
  _thumbsDownPressed() {
    // TODO: other actions necessary
    this._nextListing()
  }

  _thumbsUpPressed() {
    var currID = this.state.currentListing._id;
    AsyncStorage.getItem('jwtToken', (err, result) => {
      fetch("http://colab-sbx-137.oit.duke.edu:3000/api/listings/" + currID + "/like",
        {method: "POST",
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
          console.log('Failed to like')
        }
         return responseData;
       })
      .catch(function(err) {
        console.log("Error in Login Fetch request");
        console.log(err);
      })
      .done();
  });

    this._nextListing();
  }
}

module.exports = Discover
