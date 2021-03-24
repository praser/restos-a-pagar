import React from 'react';

import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import FormGroup from './FormGroup';

describe('FormGroup atom component', () => {
  it('is expected to render the component correctly', () => {
    const formGroup = renderer.create(<FormGroup />).toJSON();
    expect(formGroup).toMatchSnapshot();
  });

  it('is expected to have style flex:1 if no width is provided', () => {
    const { container } = render(<FormGroup />);
    expect(container.firstChild).toHaveStyle('flex: 1');
  });

  it('is expected to have style width: 80% if it is provided', () => {
    const { container } = render(<FormGroup width="80%" />);
    expect(container.firstChild).toHaveStyle('width: 80%');
  });
});
