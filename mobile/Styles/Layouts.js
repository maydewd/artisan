'use strict'
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    centered: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20
    },

    navBar: {
      backgroundColor: 'lightblue'
    },

    navIcon: {
      padding: 10
    },

    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },

    logo: {
      width: 150,
      height: 150
    },

    textBox: {
      height: 40,
      width: 300,
      borderWidth: 0.5,
      borderColor: '#0f0f0f',
      padding: 4,
      alignSelf: 'center'
    },

    groupedTextBoxes: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      maxHeight: 150
    },

    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },

    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },

    discoverImage: {
      flex: 1,
      resizeMode: 'contain',
      height: 400,
      width: 300
    },

    storkfrontScreen: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 5
    },

    storkFront: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: "flex-start",
      alignItems: "center",
    },

    storkFrontBanner: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: "flex-start",
      alignItems: "center",
      maxHeight: 80,
      padding: 5
    },

    storkfrontList: {
      paddingTop: 10,
      width: 375,
      maxHeight: 475
    },

    storkfrontProfileImage: {
      resizeMode: 'contain',
      height: 75,
      width: 75
    },

    storkfrontProfileText: {
      flex: 1,
      padding: 10,
      fontSize: 16,
    },

    storkfrontImage: {
      resizeMode: 'contain',
      height: 400,
      width: 300
    },

    storkfrontPostText: {
      fontSize: 14,

    },
});

module.exports = styles
