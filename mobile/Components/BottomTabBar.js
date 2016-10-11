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
  TouchableOpacity
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
  }

  onTabSelect(tab) {
    this.setState({ tab })
  }

  renderTabs() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'pink' }}>
        <TouchableOpacity style={styles.tabItem} onPress={() => this.onTabSelect('discover')}>
          <View>
            <Text>Discover</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('storkFront')}>
          <View>
            <Text>StorkFront</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderContent() {
    const { tab } = this.state
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
      <View style={styles.container}>
         <View>
           {this.renderContent()}
          </View>
          <Tabbar show={true}
               disable={false}
               ref={(ref) => this.tabarRef = ref}
               style={{ backgroundColor: 'lightblue' }}>
          {this.renderTabs()}
         </Tabbar>
      </View>
    );
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

  tabItem: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center'
 }
});


module.exports = BottomTabBar
