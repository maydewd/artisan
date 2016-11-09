import 'react-native';
import React from 'react';
import LoginScreen from '../Screens/LoginScreen.js';

import renderer from 'react-test-renderer';

it('Login renders correctly', () => {
  const tree = renderer.create(
    <LoginScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
