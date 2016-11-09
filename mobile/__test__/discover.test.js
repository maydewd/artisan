import 'react-native';
import React from 'react';
import Discover from '../Screens/Discover.js';

import renderer from 'react-test-renderer';

it('Discover renders correctly', () => {
  const tree = renderer.create(
    <Discover />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
