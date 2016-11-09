import 'react-native';
import React from 'react';
import NewPost from '../Screens/NewPost.js';

import renderer from 'react-test-renderer';

it('New post renders correctly', () => {
  const tree = renderer.create(
    <NewPost />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
