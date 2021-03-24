import React from 'react';

import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import {
  Card,
  CardHeader,
  CardBody,
  CardSmallText,
} from 'components/atoms/Card';

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

describe('CardHeader atom component', () => {
  it('is expected to render the component correctly', () => {
    const cardHeader = renderer.create(<CardHeader />).toJSON();
    expect(cardHeader).toMatchSnapshot();
  });
});

describe('CardBody atom component', () => {
  it('is expected to render the component correctly', () => {
    const cardBody = renderer.create(<CardBody />).toJSON();
    expect(cardBody).toMatchSnapshot();
  });
});

describe('CardSmallText atom component', () => {
  it('is expected to render the component correctly', () => {
    const cardSmallText = renderer.create(<CardSmallText />).toJSON();
    expect(cardSmallText).toMatchSnapshot();
  });
});
