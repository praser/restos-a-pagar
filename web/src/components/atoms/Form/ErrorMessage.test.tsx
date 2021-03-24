import React from 'react';

import renderer from 'react-test-renderer';

import ErrorMessage from './ErrorMessage';

describe('ErrorMessage atom component', () => {
  it('is expected to render the component correctly', () => {
    const errorMessage = renderer.create(<ErrorMessage />).toJSON();
    expect(errorMessage).toMatchSnapshot();
  });
});
