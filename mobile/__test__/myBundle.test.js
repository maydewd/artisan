import 'react-native';
import React from 'react';
import MyBundle from '../Screens/MyBundle.js';

import renderer from 'react-test-renderer';

it('MyBundle post renders correctly', () => {
  const tree = renderer.create(
    <MyBundle />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
