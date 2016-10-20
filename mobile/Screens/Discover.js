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
import {getScreenWidth, getScreenHeight} from '../helpers/dimension'

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
    if (this.state.storedListings.length === 0) {
      this._fetchData(this._nextListing.bind(this))
    }
  }

  _nextListing() {
    if (this.state.storedListings.length === 0) {
      alert("No more listings");
      return;
    }
    console.log("NEXT");
    console.log(this.state)
    const next = this.state.storedListings.shift();
    console.log(next);
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
      <View style ={{backgroundColor: '#f6f6f6', height: 620}}>
        <NavigationBar
        style={styles.navBar}
        title={titleConfig}
        leftButton={this.leftButton()}
        rightButton={this.rightButton()}
        />
        <View>
          <View style = {styles.centered && {flexDirection: "row", paddingRight: 5, paddingTop: 15}}>
            <View style={{flex:1}} />
            <Icon.Button name="info-circle"
              size={30}
              iconStyle={styles.discoverIconInfo}
              backgroundColor="lightblue"
              onPress={() => this._infoPressed()}>
            </Icon.Button>
          </View>
          <Image
               style = {[styles.discoverImage, {width: getScreenWidth()}]}
               source = {{uri: "http://colab-sbx-137.oit.duke.edu:3000/" + this.state.currentListing.imagePath}}
          />
          <View style = {styles.centered && {flexDirection: "row", paddingLeft: 30, paddingRight: 30}}>
            <Button
              containerStyle={styles.discoverButtonContainerDown}
              style={styles.discoverButtonDown}
              onPress={() => this._thumbsDownPressed()}>
              <Icon name="thumbs-down" size={40}/>
            </Button>
            <View style={{flex:1}}></View>
            <Button
              containerStyle={styles.discoverButtonContainerUp}
              style={styles.discoverButtonUp}
              onPress={() => this._thumbsUpPressed()}>
              <Icon name="thumbs-up" size={40}/>
            </Button>

          </View>
        </View>
      </View>
    );
  }
  _infoPressed() {
    //TODO
    console.log("pressed")
    this.props.navigator.push({
      id: 'discoverPost',
      item: this.state.currentListing
    });
  }
  _thumbsDownPressed() {
    // TODO: temp
    this._nextListing()
  }
  _thumbsUpPressed() {
    // TODO:
    this._nextListing()
  }
}

module.exports = Discover
