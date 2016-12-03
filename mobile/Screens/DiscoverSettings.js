/**
 * Discover Screen
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
var NavigationBar = require('react-native-navbar');
import Icon from 'react-native-vector-icons/FontAwesome';
import { SegmentedControls } from 'react-native-radio-buttons';
styles = require('../Styles/Layouts');
import {radii, costBrackets} from '../resources/Preferences';

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

  componentDidMount() {
    AsyncStorage.multiGet(['distance', 'cost', 'myPosts', 'downedPost', 'seeLiked', 'seeDisliked'], (err, stores) => {
           var d = '5 miles';
           var c = '$20-100';
           var mP = false;
           var dP = false;
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
             var dP = JSON.parse(stores[3][1])
           }
           if(stores[4][1] != null) {
             var seeLiked = JSON.parse(stores[4][1])
           }
           if(stores[5][1] != null) {
             var seeDisliked = JSON.parse(stores[5][1])
           }
           this.setState({
             distance: d,
             cost: c,
             myPosts: mP,
             downedPost: dP,
             seeLiked: seeLiked,
             seeDisliked: seeDisliked
           })
           console.log(this.state)
       });
  }

  rightButton() {
    return (
      <View style = {styles.navIcon}>
        <Icon name="save" size={25} onPress={this._save.bind(this)}/>
      </View>
    )
  }

  _save() {
    var state = this.state;
    AsyncStorage.removeItem('bundlePosts')
    AsyncStorage.setItem('distance', this.state.distance);
    AsyncStorage.setItem('cost', this.state.cost);
    AsyncStorage.setItem('myPosts', JSON.stringify(this.state.myPosts));
    AsyncStorage.setItem('seeLiked', JSON.stringify(this.state.seeLiked));
    AsyncStorage.setItem('seeDisliked', JSON.stringify(this.state.seeDisliked));
    Alert.alert('Saved!')
  }

  render() {
    var titleConfig = {
     title: 'Discover Settings',
   };

   const leftButtonConfig = {
    title: 'Back',
    handler: () => {this.pop()}
  };

   const distanceOptions = radii();
   const priceOptions = costBrackets();

   function setDistance(selectedOption){
     this.setState({
       distance: selectedOption
     });
   }

   function setCost(selectedOption){
     this.setState({
       cost: selectedOption
     });
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
              <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text> See my posts</Text>
                <Switch
                    value={this.state.myPosts}
                    onValueChange={(val) =>  this.setState({
                         myPosts: val
                    })}
                />
              </View>
              <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text> See posts I have liked</Text>
                <Switch
                    value={this.state.seeLiked}
                    onValueChange={(val) =>  this.setState({
                       seeLiked: val
                     })}
                />
              </View>
              <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text> See post I have disliked </Text>
                <Switch
                    value={this.state.seeDisliked}
                    onValueChange={(val) =>  this.setState({
                       seeDisliked: val
                     })}
                />
              </View>
            </View>
      </View>
    );
  }

  pop() {
    this.props.navigator.push({
      id: 'discover',
    });
  }
}

module.exports = DiscoverSettings
