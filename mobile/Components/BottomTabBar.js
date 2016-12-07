/**
 * BottomTabBar
 * Responsible for handling the transition between the Discover and StorkFront screens
 * Ryan St.Pierre, Sung-Hoon Kim, David Maydew
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
styles = require('../Styles/Layouts');
import BottomNav from '../Components/BottomNav'
import Discover from '../Screens/Discover.js'
import StorkFront from '../Screens/StorkFront.js'
import Tabbar from 'react-native-tabbar'
import Icon from 'react-native-vector-icons/FontAwesome';
import {bottomNavBarHeight} from '../helpers/dimension'

class BottomTabBar extends Component {

  constructor(props, context) {
    super(props, context)
    this.tabbarRef = null
    // If a screen has been passed go to that, else default to discover
    if (this.props.screen) {
      this.state = {
        tab: this.props.screen
      }
    } else {
      this.state = {
        tab: 'discover'
      }
    }
  }

  componentDidMount() {
    console.log(this.props.screen);
  }

  onTabSelect(tab) {
    this.setState({ tab: tab })
  }

  renderTabs() {
    return (
      <View style={{ flexDirection: 'row', borderTopWidth: 3, borderTopColor: 'pink' }}>
        <TouchableOpacity style={styles.tabItem} onPress={() => this.onTabSelect('discover')}>
          <Icon
            style = {(this.state.tab == 'discover') ? styles.iconActive : styles.tabIcon}
            name="globe" size={30} />
          <View>
            <Text
            style = {(this.state.tab == 'discover') ? styles.tabTextActive : styles.tabText}
            >Discover</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('storkFront')}>
          <Icon
          style = {(this.state.tab == 'storkFront') ? styles.iconActive : styles.tabIcon}
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

  renderContent() {
    const {tab} = this.state
    let content
    switch(tab) {
      case 'discover':
        content =   <Discover
             navigator={this.props.navigator} />
        break
      case 'storkFront':
        content = <StorkFront
           navigator={this.props.navigator} />
        break
    }
    return content
  }

  render() {
    return (
      <View style={styles.tabContainer}>
          <View>
            {this.renderContent()}
          </View>
          <Tabbar show={true}
               disable={true}
               ref={(ref) => this.tabbarRef = ref}
               style={{backgroundColor: '#cce5ff', height: bottomNavBarHeight() }}>
          {this.renderTabs()}
         </Tabbar>
      </View>
    );
  }
}


module.exports = BottomTabBar
