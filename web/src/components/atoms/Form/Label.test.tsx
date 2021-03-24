import React from 'react';

import renderer from 'react-test-renderer';

import Label from './Label';

describe('Label atom component', () => {
  it('is expected to render the component correctly', () => {
    const label = renderer.create(<Label />);
    expect(label).toMatchSnapshot();
  });
});
