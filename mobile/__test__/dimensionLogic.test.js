import {
  getScreenHeight,
  getUsableScreenHeight,
  usablePercent,
  usableWithTop,
  bottomNavBarHeight,
  topNavBarHeight}
from '../helpers/dimension'

import renderer from 'react-test-renderer';

test('100% of usable screen height equals the screen height', () => {
  expect(usablePercent(100)).toBe(getUsableScreenHeight());
});

test('Screen Height equal or greater than Usable with top', () => {
  expect(getUsableScreenHeight()).toBeLessThanOrEqual(getScreenHeight());
});
