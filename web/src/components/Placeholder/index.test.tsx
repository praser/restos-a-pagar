import React from 'react';

import renderer from 'react-test-renderer';

import IProps from './IProps';
import Placeholder from './index';

import image from 'assets/undraw_well_done_i2wr.svg';

describe('Placeholder Component', () => {
  let props: IProps;
  beforeAll(() => {
    props = {
      src: image,
    };
  });

  it('is expected to render the component correctly', () => {
    const component = renderer.create(<Placeholder {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
