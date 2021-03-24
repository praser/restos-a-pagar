import React from 'react';

import renderer from 'react-test-renderer';

import Select from './Select';

describe('Select atom component', () => {
  it('is expected to render the component correctly', () => {
    const select = renderer.create(<Select />).toJSON();
    expect(select).toMatchSnapshot();
  });
});
