import React from 'react';

import renderer from 'react-test-renderer';

import Input from './Input';

describe('Input atom component', () => {
  it('is expected to render the component correctly', () => {
    const input = renderer.create(<Input />);
    expect(input).toMatchSnapshot();
  });
});
