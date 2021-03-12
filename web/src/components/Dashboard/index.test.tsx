import React from 'react';

import renderer from 'react-test-renderer';

import IProps from './IProps';
import Dashboard from './index';

describe('Dashboard Component', () => {
  let props: IProps;
  beforeAll(() => {
    props = {
      anoOrcamentario: 2020,
      dataBloqueio: ' 2020-11-14 19:48:43.000',
    };
  });
  it('is expected to render correct component', () => {
    const dashboardComponent = renderer
      .create(<Dashboard {...props} />)
      .toJSON();
    expect(dashboardComponent).toMatchSnapshot();
  });
});
