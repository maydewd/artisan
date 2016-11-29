// property file
export const ASYNC_USER_KEY = "user";
export const ASYNC_TOKEN_KEY = "jwtToken"

// TODO: get yer own key
export const GOOGLE_API_KEY = 'AIzaSyB4Wup3-phaP5kaiLHUOELxdtMKzm1GuxI';

export function getAsyncKeys() {
  return [ASYNC_TOKEN_KEY, ASYNC_USER_KEY];
}
