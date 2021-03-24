import React from 'react';

import renderer from 'react-test-renderer';

import CardSmallText from './CardSmallText';

describe('CardSmallText atom component', () => {
  it('is expected to render the component correctly', () => {
    const cardSmallText = renderer.create(<CardSmallText />).toJSON();
    expect(cardSmallText).toMatchSnapshot();
  });
});
