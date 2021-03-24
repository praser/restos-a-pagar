import React from 'react';

import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Card from './Card';

describe('Card atom component', () => {
  it('is expected to render the component correctly', () => {
    const card = renderer.create(<Card />).toJSON();
    expect(card).toMatchSnapshot();
  });

  it('is expected to have the right width if specified', () => {
    const { container } = render(<Card width="80px" />);
    expect(container.firstChild).toHaveStyle('width: 80px');
  });
});
