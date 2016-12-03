// property file

export const async_keys = {
  // async keys for authentication
  "USER" : "user",
  "TOKEN" : "jwtToken",
  // async keys for discover filtering
  "COST" : "cost",
  "MYPOSTS" : "myPosts",
  "LIKED" : "seeLiked",
  "DISLIKED" : "seeDisliked",
  "BUNDLE" : "bundlePosts",
  "DISTANCE" : "distance",
  "DOWNED" : "downedPost",
}

// TODO: get yer own key
export const GOOGLE_API_KEY = 'AIzaSyB4Wup3-phaP5kaiLHUOELxdtMKzm1GuxI';

export function getAllAsyncKeys() {
  // get an array of async keys; intended for use with AsyncStorage.multiRemove
  return Object.keys(async_keys).map(function (key) { return async_keys[key]; });
}
