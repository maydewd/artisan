/**
 * Discover Settings, used to change search preferences
 * Ryan St.Pierre, Sung-Hoon Kim, David Maydew
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Switch,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SegmentedControls } from 'react-native-radio-buttons';
import {async_keys} from '../resources/Properties.js';
import {radii, costBrackets} from '../resources/Preferences';
styles = require('../Styles/Layouts');
var NavigationBar = require('react-native-navbar');

class DiscoverSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      distance: '5 miles',
      cost: '$20-100',
      myPosts: false,
      seeDisliked: false,
      seeLiked: false
    };
  }

  //Grabs current preferences from ASYNC storage
  componentDidMount() {
    AsyncStorage.multiGet([async_keys.DISTANCE, async_keys.COST, async_keys.MYPOSTS, async_keys.LIKED, async_keys.DISLIKED], (err, stores) => {
           var d = '5 miles';
           var c = '$20-100';
           var mP = false;
           var seeLiked = false;
           var seeDisliked = false
           if(stores[0][1] != null) {
             var d = stores[0][1]
           }
           if(stores[1][1] != null) {
             var c = stores[1][1]
           }
           if(stores[2][1] != null) {
             var mP = JSON.parse(stores[2][1])
           }
           if(stores[3][1] != null) {
             var seeLiked = JSON.parse(stores[3][1])
           }
           if(stores[4][1] != null) {
             var seeDisliked = JSON.parse(stores[4][1])
           }
           this.setState({
             distance: d,
             cost: c,
             myPosts: mP,
             seeLiked: seeLiked,
             seeDisliked: seeDisliked
           })
       });
  }

  rightButton() {
    return (
      <View style = {styles.navIcon}>
        <Icon name="save" size={25} onPress={this._save.bind(this)}/>
      </View>
    )
  }

  //Clears the cached posts so that the new changes can be reflected
  _save() {
    AsyncStorage.removeItem(async_keys.BUNDLE)
    AsyncStorage.setItem(async_keys.DISTANCE, this.state.distance);
    AsyncStorage.setItem(async_keys.COST, this.state.cost);
    AsyncStorage.setItem(async_keys.MYPOSTS, JSON.stringify(this.state.myPosts));
    AsyncStorage.setItem(async_keys.LIKED, JSON.stringify(this.state.seeLiked));
    AsyncStorage.setItem(async_keys.DISLIKED, JSON.stringify(this.state.seeDisliked));
    Alert.alert('Saved!')
  }

  render() {
   var titleConfig = {title: 'Discover Settings'};
   const leftButtonConfig = {title: 'Back', handler: () => {this._pop()}};
   const distanceOptions = radii();
   const priceOptions = costBrackets();

   function setDistance(selectedOption){
     this.setState({distance: selectedOption});
   }

   function setCost(selectedOption){
     this.setState({cost: selectedOption});
    }

    return (
      <View>
        <NavigationBar
        style={styles.navBar}
        title={titleConfig}
        leftButton={leftButtonConfig}
        rightButton={this.rightButton()}
        />
        <View>
          <View>
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
              </View>
              <Text style = {styles.settingsText}>
                Extras
              </Text>
              <View style = {styles.settingsView}>
                <Text> See my posts</Text>
                <Switch
                    value={this.state.myPosts}
                    onValueChange={(val) =>  this.setState({myPosts: val})}
                />
              </View>
              <View style = {styles.settingsView}>
                <Text> See posts I have liked</Text>
                <Switch
                    value={this.state.seeLiked}
                    onValueChange={(val) =>  this.setState({seeLiked: val})}
                />
              </View>
              <View style = {styles.settingsView}>
                <Text> See posts I have disliked </Text>
                <Switch
                    value={this.state.seeDisliked}
                    onValueChange={(val) =>  this.setState({seeDisliked: val})}
                />
              </View>
            </View>
      </View>
    );
  }

  _pop() {
    this.props.navigator.push({
      id: 'discover',
    });
  }
}

module.exports = DiscoverSettings
