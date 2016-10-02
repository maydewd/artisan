/**
 * Centered Screen
 * Used as a part Component for certain screens
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  TabBarIOS,
  StyleSheet,
  Text,
  View,
  Image,

} from 'react-native';
import BottomNav from '../Components/BottomNav'
import Discover from '../Screens/Discover.js'
import StorkFront from '../Screens/StorkFront.js'

class MainNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'discover'
    }
  }

  render() {
    return (
      <TabBarIOS
      selectedTab = {this.state.selectedTab}
      unselectedTintColor="yellow"
      tintColor="blue"
      barTintColor="darkslateblue"
      >
      <TabBarIOS.Item
        title="Blue Tab"
        selected={this.state.selectedTab === 'discover'}
        systemIcon = "history"
        onPress={() => {
          console.log('pressed')
          this.setState({
            selectedTab: 'discover',
          });
        }}>
        {this._renderContent()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Other"
          systemIcon = "bookmarks"
          selected={this.state.selectedTab === 'other'}
          onPress={() => {
            console.log('other')
            this.setState({
              selectedTab: 'other',
            });
          }}>
            {this._renderStorkFront()}
          </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

  _renderContent() {
    console.log('trying to render');
    return (
      <Discover
        navigator={this.props.navigator} />
    );
  }

  _renderStorkFront() {
    console.log('trying to render');
    return (
      <StorkFront
        navigator={this.props.navigator} />
    );
  }
}

const styles = StyleSheet.create({

    centered: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    }
});


module.exports = MainNavBar
