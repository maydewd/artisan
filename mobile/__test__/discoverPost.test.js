import 'react-native';
import React from 'react';
import DiscoverPost from '../Screens/DiscoverPost.js';

import renderer from 'react-test-renderer';

it('DiscoverPost renders correctly', () => {
  var item = {
    description: "This is a description",
    price: 10,
    imagePath: "www.path.com",
    location: null,
    type: "Ceramic"
  }
  const tree = renderer.create(
    <DiscoverPost item = {item}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
