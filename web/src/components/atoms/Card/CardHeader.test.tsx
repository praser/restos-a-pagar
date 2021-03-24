import React from 'react';

import renderer from 'react-test-renderer';

import CardHeader from './CardHeader';

describe('CardHeader atom component', () => {
  it('is expected to render the component correctly', () => {
    const cardHeader = renderer.create(<CardHeader />).toJSON();
    expect(cardHeader).toMatchSnapshot();
  });
});
