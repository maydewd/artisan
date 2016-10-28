/**
 * Discover Screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import Icon from 'react-native-vector-icons/FontAwesome';
import { SegmentedControls } from 'react-native-radio-buttons';
import { Switch } from 'react-native-switch';

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

  rightButton() {
    return (
      <View style = {styles.navIcon}>
        <Icon name="save" size={25}/>
      </View>
    )
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
        <View style = {{justifyContent: 'center', alignItems: 'center'}} >
          <Text>
            Discover Distance
          </Text>
          <SegmentedControls
            tint= {'#f80046'}
            selectedTint= {'white'}
            backTint= {'#1e2126'}
            options={ distanceOptions }
            allowFontScaling={ false } // default: true
            onSelection={ setDistance.bind(this) }
            selectedOption={ this.state.distance }
            />
            <Text>
              Price Range
            </Text>
            <SegmentedControls
              tint= {'#f80046'}
              selectedTint= {'white'}
              backTint= {'#1e2126'}
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
                  onValueChange={(val) => console.log(val)}
                  disabled={false}
                  activeText={'On'}
                  inActiveText={'Off'}
                  backgroundActive={'green'}
                  backgroundInactive={'gray'}
                  circleActiveColor={'#30a566'}
                  circleInActiveColor={'#000000'}
              />
            </View>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text> See down voted posts</Text>
              <Switch
                  value={this.state.downedPost}
                  onValueChange={(val) =>  this.setState({
                     distance: val
                   })}
                  disabled={false}
                  activeText={'On'}
                  inActiveText={'Off'}
                  backgroundActive={'green'}
                  backgroundInactive={'gray'}
                  circleActiveColor={'#30a566'}
                  circleInActiveColor={'#000000'}
              />
            </View>
      </View>
    );
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = DiscoverSettings
