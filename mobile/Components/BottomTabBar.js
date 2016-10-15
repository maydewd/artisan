/**
 * Centered Screen
 * Used as a part Component for certain screens
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Navigator
} from 'react-native';
import BottomNav from '../Components/BottomNav'
import Discover from '../Screens/Discover.js'
import StorkFront from '../Screens/StorkFront.js'
import Tabbar from 'react-native-tabbar'
import Icon from 'react-native-vector-icons/FontAwesome';

class BottomTabBar extends Component {

  constructor(props, context) {
    super(props, context)
    this.tabarRef = null
    this.state = {
      tab: 'discover'
    }
    this.navScreen = <Navigator
       initialRoute={{id: 'discover'}}
       renderScene={this.renderScene.bind(this)}
       configureScene={(route) => {
         if (route.sceneConfig) {
           return route.sceneConfig;
         }
         return Navigator.SceneConfigs.FadeAndroid;
      }} />
  }

  onTabSelect(tab) {
    this.setState({ tab: tab })
    console.log('onTabSelect')
    console.log(tab)
    this.renderContent(tab)
  }

  renderTabs() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 2, borderTopColor: 'pink' }}>
        <TouchableOpacity style={styles.tabItem} onPress={() => this.onTabSelect('discover')}>
          <Icon
            style = {(this.state.tab == 'discover') ? styles.iconActive : styles.icon}
            name="globe" size={30} />
          <View>
            <Text
            style = {(this.state.tab == 'discover') ? styles.tabTextActive : styles.tabText}
            >Discover</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('storkFront')}>
          <Icon
          style = {(this.state.tab == 'storkFront') ? styles.iconActive : styles.icon}
          name="home" size={30} />
          <View>
            <Text
            style = {(this.state.tab == 'storkFront') ? styles.tabTextActive : styles.tabText}
            >StorkFront</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderContent(screen) {
    console.log(screen);
    switch(screen) {
      case 'discover':
        this.nav.pop();
        break
      case 'storkFront':
        this.nav.push({ id: screen});
        break
    }
  }

  render() {
    return (
      <View style={styles.container}>
          {this.navScreen}
          <Tabbar show={true}
               disable={false}
               ref={(ref) => this.tabarRef = ref}
               style={{ backgroundColor: 'lightblue' }}>
          {this.renderTabs()}
         </Tabbar>
      </View>
    );
  }

  renderScene(route, navigator) {
      this.nav = navigator
      var routeId = route.id;
      if (routeId === 'discover') {
        return (
          <Discover
            navigator={navigator} />
        );
      }
      if (routeId === 'storkFront') {
        return (
          <StorkFront
            navigator={navigator} />
        );
      }
  }
}

const styles = StyleSheet.create({

  centered: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },

  container: {
   flex: 1,
   backgroundColor: 'white'
  },

  tabTextActive: {
    fontSize: 10,
    color: 'blue'
  },

  tabText: {
    fontSize: 10,
  },

  iconActive : {
    color: 'blue'
  },

  icon : {
    color: 'black'
  },

  tabItem: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center'
 }
});


module.exports = BottomTabBar
