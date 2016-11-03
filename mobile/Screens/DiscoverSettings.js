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
  Switch
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import Icon from 'react-native-vector-icons/FontAwesome';
import { SegmentedControls } from 'react-native-radio-buttons';

class DiscoverSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      distance: '0-5 miles',
      cost: '$20-100',
      myPosts: false,
      downedPost: false
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(['distance', 'cost', 'myPosts', 'downedPost'], (err, stores) => {
           var d = '0-5 miles';
           var c = '$20-100';
           var mP = false;
           var dP = false
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
           this.setState({
             distance: d,
             cost: c,
             myPosts: mP,
             downedPost: dP
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
    AsyncStorage.setItem('distance', this.state.distance);
    AsyncStorage.setItem('cost', this.state.cost);
    AsyncStorage.setItem('myPosts', JSON.stringify(this.state.myPosts));
    AsyncStorage.setItem('downedPost', JSON.stringify(this.state.downedPost));
    console.log(AsyncStorage.getAllKeys())
    alert('Saved!')
  }

  render() {
    var titleConfig = {
     title: 'Discover Settings',
   };

   const leftButtonConfig = {
    title: 'Back',
    handler: () => {this.pop()}
  };

  const distanceOptions = [
     "0-5 miles",
     "5-10 miles",
     "10-15 miles"
   ];

   const priceOptions = [
      "$0-5",
      "$5-20",
      "$20-100",
      "$100+"
    ];


   function setDistance(selectedOption){
     this.setState({
       distance: selectedOption
     });
   }

   function setCost(selectedOption){
     console.log(selectedOption)
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
            <Text>
              Discover Distance
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
              <Text>
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
                <Text> See down voted posts</Text>
                <Switch
                    value={this.state.downedPost}
                    onValueChange={(val) =>  this.setState({
                       downedPost: val
                     })}
                />
              </View>
            </View>
      </View>
    );
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = DiscoverSettings
