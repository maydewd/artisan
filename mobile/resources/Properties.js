/**
 * Properties
 * Ryan St.Pierre, Sung-Hoon Kim, David Maydew
 */

export const async_keys = {
  // async keys for authentication
  "USER" : "user",
  "TOKEN" : "jwtToken",
  // async keys for discover filtering
  "COST" : "cost",
  "MYPOSTS" : "myPosts",      // flag for whether or not to display user's own posts
  "LIKED" : "seeLiked",       // flag for whether or not to display previously liked posts
  "DISLIKED" : "seeDisliked", // flag for whether or not to display previously disliked posts
  "BUNDLE" : "bundlePosts",
  "DISTANCE" : "distance",
}

// TODO: Google Maps API key: https://developers.google.com/maps/documentation/geocoding/get-api-key
export const GOOGLE_API_KEY = '';

export function getAllAsyncKeys() {
  // get an array of async keys; intended for use with AsyncStorage.multiRemove
  return Object.keys(async_keys).map(function (key) { return async_keys[key]; });
}
