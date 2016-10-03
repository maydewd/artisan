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

class AndroidTab extends Component {

  constructor(props, context) {
    super(props, context)
    this.tabarRef = null
    this.state = {
      tab: 'item1'
    }
  }

  onTabSelect(tab) {
    this.setState({ tab })
  }

  renderTabs() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'green' }}>
        <TouchableOpacity style={styles.tabItem} onPress={() => this.onTabSelect('item1')}>
          <View>
            <Text>Item 1</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('item2')}>
          <View>
            <Text>Item 2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('item3')}>
          <View>
            <Text>Item 3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('item4')}>
          <View>
            <Text>Item 4</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('item5')}>
          <View>
            <Text>Item 5</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderContent() {
    const { tab } = this.state
    let content
    switch(tab) {
      case 'item1':
        content = <Text>This is the content 1</Text>
        break
      case 'item2':
        content = <Text>This is the content 2</Text>
        break
      case 'item3':
        content = <Text>This is the content 3</Text>
        break
      case 'item4':
        content = <Text>This is the content 4</Text>
        break
      case 'item5':
        content = <Text>This is the content 5</Text>
        break
    }

    return content
  }

  render() {
    return (
      <View style={styles.container}>
         <View style={{ paddingTop: 30 }}>
           {this.renderContent()}
          </View>
          <Tabbar show={true}
               disable={false}
               ref={(ref) => this.tabarRef = ref}
               style={{ backgroundColor: 'red' }}>
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
  }
});


module.exports = AndroidTab
