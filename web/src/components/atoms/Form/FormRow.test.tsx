import React from 'react';

import renderer from 'react-test-renderer';

import FormRow from './FormRow';

describe('FormRow atom component', () => {
  it('is expected to render the component correctly', () => {
    const formRow = renderer.create(<FormRow />);
    expect(formRow).toMatchSnapshot();
  });
});
