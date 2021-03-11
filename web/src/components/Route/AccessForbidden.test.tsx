import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import AccessForbidden from 'components/Route/AccessForbidden';

describe('AccessForbiden Component', () => {
  it('is expected to render correct component', () => {
    const component = renderer.create(<AccessForbidden />).toJSON();
    expect(component).toMatchSnapshot();
  });

  describe('screen', () => {
    beforeEach(() => {
      render(<AccessForbidden />);
    });

    it('is expected to show the http code', () => {
      const text = '401';
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('expected to show the descript', () => {
      const text = 'Você não pode acessar essa página';
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('is expect to show a long descriptio', () => {
      const text =
        'Há uma diferença entre conhecer o caminho e percorrer o caminho.';
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
