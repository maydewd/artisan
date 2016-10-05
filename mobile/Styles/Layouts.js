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
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    storkfrontList: {
      flex: 1,
    },
    storkfrontProfileImage: {
      flex: 1,
      resizeMode: 'contain',
    },
    storkfrontProfileText: {
      flex: 1,
      fontSize: 24,
      textAlign: 'center',
    },

    storkfrontImage: {
      resizeMode: 'contain',
      height: 800,
    },
    storkfrontPostText: {
      fontSize: 50,
    },
});

module.exports = styles
