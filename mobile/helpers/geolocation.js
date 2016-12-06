/**
 * Geolocation code
 * Ryan St.Pierre, Sung-Hoon Kim, David Maydew
 */
import React from 'react';
import {
  AsyncStorage
} from 'react-native';
import Geocoder from 'react-native-geocoder';
import {GOOGLE_API_KEY} from '../resources/Properties.js';

Geocoder.fallbackToGoogle(GOOGLE_API_KEY);

export function reverseGeocode() {
  AsyncStorage.getItem('position', (err, result) => {
    if (result === null) {
      return;
    }
    var position = JSON.parse(result)
    var loc = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    Geocoder.geocodePosition(loc).then(res => {
      console.log(res)
      // TODO: res is an array of geocoding objects, and the information is not guaranteed to be there
      AsyncStorage.setItem('locality', res[0].locality)
    })
    .catch(err => alert(JSON.stringify(err)))
  })
}

export function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition( (position) => {
      var lastPosition = JSON.stringify(position);
      console.log(lastPosition)
      AsyncStorage.setItem('position', lastPosition, () => {
        reverseGeocode();
      });
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000}
  );
}
