import React from 'react';

import renderer from 'react-test-renderer';

import CardBody from './CardBody';

describe('CardBody atom component', () => {
  it('is expected to render the component correctly', () => {
    const cardBody = renderer.create(<CardBody />).toJSON();
    expect(cardBody).toMatchSnapshot();
  });
});
