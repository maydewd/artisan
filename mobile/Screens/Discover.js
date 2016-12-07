/**
 * The Discover Screen
 * Ryan St.Pierre, Sung-Hoon Kim, David Maydew
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Navigator
} from 'react-native';
import BottomNav from '../Components/BottomNav'
import MainNavBar from '../Components/MainNavBar'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'react-native-button';
import {async_keys} from '../resources/Properties.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getScreenWidth, getScreenHeight, getUsableScreenHeight, usablePercent} from '../helpers/dimension';
import * as Animatable from 'react-native-animatable';
const config = require('../config/server');
styles = require('../Styles/Layouts');
var NavigationBar = require('react-native-navbar');

//Animation time in ms
const ANIMATION_LENGTH = 1000;
const DOUBLE_PRESS_DELAY = 300;

class Discover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentListing: null,
      bundleSize: 0
    };
  }

  //Checks to see if any posts are cached and if not fetches
  //Additionally, the bundle size is checked to be indicated to the user
  componentDidMount() {
    AsyncStorage.getItem(async_keys.BUNDLE).then((value) => {
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
      this._updateBundleSize();
  }

  _updateBundleSize() {
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      fetch(config.url + config.likeCount,
        {method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          }})
        .then((response) => response.json())
        .then((responseData) => {
           if (responseData.success === true) {
             this.setState({bundleSize: responseData.payload});
          }
         })
        .catch(function(err) {
          alert(err);
        })
        .done();
    });
  }

  //Get the next post to display.  If nothing is cached fetch posts from the server
  _nextListing() {
    AsyncStorage.getItem(async_keys.BUNDLE).then((value) => {
           if(value != null) {
             var list = JSON.parse(value);
             list.shift();
             AsyncStorage.setItem(async_keys.BUNDLE, JSON.stringify(list));
             if (list.length === 0) {
               this._fetchData();
               return;
             }
             this.setState( {
               currentListing: list[0]
             });
           }
       }).done();
  }

  _fetchData() {
    AsyncStorage.multiGet([async_keys.TOKEN, async_keys.COST, async_keys.MYPOSTS, async_keys.LIKED, async_keys.DISLIKED, async_keys.DISTANCE], (err, result) => {
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
        default:
          minCost = 20;
          maxCost = 100;
          break;
      }
      const myPosts = JSON.parse(result[2][1]);
      const seeLiked = JSON.parse(result[3][1]);
      const seeDisliked = JSON.parse(result[4][1]);
      const distance = result[5][1];
      var radius = "&radius=10";
      switch(distance) {
        case '5 miles':
          radius = "&radius=5";
          break;
        case '10 miles':
          radius = "&radius=10";
          break;
        case '20 miles':
          radius = "&radius=20";
          break;
        case 'Any':
          radius = "";
          break;
      }
      // TODO fix radius in query
      navigator.geolocation.getCurrentPosition (
        (position) => {
          fetch(config.url + `/api/listings?minCost=${minCost}&maxCost=${maxCost}&limit=20&hideMine=${!myPosts}&hideLiked=${!seeLiked}&hideDisliked=${!seeDisliked}&lng=${position.coords.longitude}&lat=${position.coords.latitude}` + radius,
            {method: "GET",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': jwt
              }})
            .then((response) => response.json())
            .then((responseData) => {
                var holder = [];
                responseData.forEach((item) => {
                  holder.push(item);
                })
                AsyncStorage.setItem(async_keys.BUNDLE, JSON.stringify(holder));
                if (holder.length != 0) {
                  this.setState({
                    currentListing: holder[0]
                  })
                } else {
                  Alert.alert('No more posts', 'Try changing your discover preferences');
                  //Setting currentListing in state to null will signify no more posts
                  this.setState({
                    currentListing: null
                  })
                }
             })
            .catch(function(err) {
              return;
            })
            .done();
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
      );
    });
  }

  leftButton() {
    return  (
      <TouchableOpacity style = {styles.navIcon} onPress={(event) => {this._goToSettings()}}>
        <Ionicons name="ios-settings" size={30}/>
      </TouchableOpacity>
    );
  }

  _goToSettings() {
    this.props.navigator.push({id: 'discoverSettings'});
  }

  rightButton() {
    var displayText = this.state.bundleSize;
    if (this.state.bundleSize > 9) {
      displayText = "9+";
    }
    return (
      <TouchableOpacity style = {styles.navIcon}  onPress={(event) => {this._goToMyBundle()}}>
        <Ionicons name="ios-basket" size={30}/>
        <Animatable.View ref = "bubble" style = {styles.circle}>
          <Text style = {styles.displayText}>
            {displayText}
          </Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  }

  _goToMyBundle() {
    this.props.navigator.push({id: 'myBundle'});
  }

  render() {
    var titleConfig = {title: 'Discover',};
    //If there are no more posts to be displayed
    if (this.state.currentListing === null) {
      var components =
        <View style = {styles.centeredBoth}>
          <Text>No Posts Left</Text>
          <Text>Try changing your discover preferences</Text>
        </View>
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
          <TouchableWithoutFeedback  onPress={(event) => this._handleImagePress(event)}>
            <Image
                  style = {[styles.discoverImage, {width: getScreenWidth()}]}
                  source = {{uri: config.url + "/" + this.state.currentListing.imagePath}}
             />
          </TouchableWithoutFeedback>
          <View style = {styles.centered && {flexDirection: "row", paddingLeft: 30, paddingRight: 30, paddingBottom: 30, paddingTop: 2}}>
                <Button
                  containerStyle={styles.discoverButtonContainerDown}
                  style={styles.discoverButtonDown}
                  onPress={() => this._thumbsDownPressed()}
                >
                  <Icon name="thumbs-down" size={usablePercent(8)}/>
                </Button>
            <View style={{flex:1}}></View>
            <Animatable.View ref = "thumbsUp">
                <Button
                    containerStyle={styles.discoverButtonContainerUp}
                    style={styles.discoverButtonUp}
                    onPress={() => this._thumbsUpPressed()}>
                  <Icon name="thumbs-up" size={usablePercent(8)}/>
                </Button>
            </Animatable.View>
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
    this.props.navigator.push({
      id: 'discoverPost',
      item: this.state.currentListing,
      sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump
    });
  }

  _thumbsDownPressed() {
    var currID = this.state.currentListing._id;
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      fetch(config.url + config.listings + currID + "/dislike",
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
          console.log('Failed to dislike')
        }
        return responseData;
       })
      .catch(function(err) {
        alert(err);
      })
      .done();
    });
    this._nextListing()
  }

  _thumbsUpPressed() {
    var currID = this.state.currentListing._id;
    AsyncStorage.getItem('jwtToken', (err, result) => {
      fetch(config.url + config.listings + currID + "/like",
        {method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          }
        })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success !== true) {
          alert('Failed to like')
        } else if (responseData.message !== "User already liked post") {
          this._incrementBundleSize();
        }
        return responseData;
       })
      .catch(function(err) {
        alert(err);
      })
      .done();
  });

    this._nextListing();
  }

  _handleImagePress(e) {
    //Bruno Tavares double tap gesture
    const now = new Date().getTime();
    if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress;
      this.refs.thumbsUp.flash(ANIMATION_LENGTH);
      this._thumbsUpPressed();
      return;
    }
    else {
      this.lastImagePress = now;
      return;
    }
  }

  _incrementBundleSize() {
    //Run the animation "twice" so value changes in between
    this.refs.bubble.tada(ANIMATION_LENGTH/2).then((endstate) => {
        this.setState({
          bundleSize: this.state.bundleSize + 1
        });
        this.refs.bubble.tada(ANIMATION_LENGTH/2);
    });
  }
}

module.exports = Discover
