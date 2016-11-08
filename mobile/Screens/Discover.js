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
    this.state = {
      currentListing: null
    };
  }

  componentDidMount() {

    AsyncStorage.removeItem('bundlePosts')
    AsyncStorage.getItem("bundlePosts").then((value) => {
           if(value != null) {
             var list = JSON.parse(value)
             if (list.length === 0) {
               this._fetchData()
             } else {
               this.setState( {
                 currentListing: list[0]
               });
             }
           } else {
               this._fetchData()
          }
       }).done();
  }

  _nextListing() {
    AsyncStorage.getItem("bundlePosts").then((value) => {
           if(value != null) {
             var list = JSON.parse(value);
             list.shift();
             AsyncStorage.setItem("bundlePosts", JSON.stringify(list));
             if (list.length === 0) {
               this._fetchData()
               alert("Fetching");
               return
             }
             this.setState( {
               currentListing: list[0]
             });
           } else {
               alert('this should not happen')
          }
       }).done();
  }

  _fetchData() {
    AsyncStorage.multiGet(['jwtToken', 'cost', 'myPosts'], (err, result) => {
      const jwt = result[0][1];
      const cost = result[1][1];
      let minCost, maxCost= null;
      switch(cost) {
        case '$0-5':
          minCost = 0;
          maxCost = 5;
          break;
        case '$5-20':
          minCost = 5;
          maxCost = 20;
          break;
        case '$20-100':
          minCost = 20;
          maxCost = 100;
          break;
        case '$100+':
          minCost = 100;
          break;
      }
      const myPosts = JSON.parse(result[2][1]);
      navigator.geolocation.getCurrentPosition (
        (position) => {
          fetch(`http://colab-sbx-137.oit.duke.edu:3000/api/listings?minCost=${minCost}&maxCost=${maxCost}&limit=1&hideMine=${!myPosts}&radius=10&lng=${position.coords.longitude}&lat=${position.coords.latitude}`,
            {method: "GET",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': jwt
              }})
            .then((response) => response.json())
            .then((responseData) => {
              console.log(responseData);
                var holder = [];
                responseData.forEach((item) => {
                  holder.push(item);
                })
                AsyncStorage.setItem('bundlePosts', JSON.stringify(holder));
                if (holder.length != 0) {
                  this.setState({
                    currentListing: holder[0]
                  })
                }
                console.log("Successfully grabbed data");
             })
            .catch(function(err) {
              alert("error");
              console.log("Error in Posting");
              console.log(err);
            })
            .done();
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
      );
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

    if (this.state.currentListing === null) {
      var components = null
    } else {
      var components =  <View>
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
    }

    return (
      <View>
        <NavigationBar
        style={styles.navBar}
        title={titleConfig}
        leftButton={this.leftButton()}
        rightButton={this.rightButton()}
        />
        <View style={styles.discover}>
          {components}
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
