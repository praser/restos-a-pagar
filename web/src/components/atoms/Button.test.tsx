import React from 'react';

import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Button from 'components/atoms/Button';

describe('Button atom component', () => {
  it('is expected to render the component correctly', () => {
    const button = renderer.create(<Button>Teste</Button>).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('is expected to have a blue background by default', () => {
    const { container } = render(<Button>Teste</Button>);
    expect(container.firstChild).toHaveStyle('background-color: #4e73df');
  });

  it('is expected to have a gray background when secondary', () => {
    const { container } = render(<Button secondary>Teste</Button>);
    expect(container.firstChild).toHaveStyle('background-color: #36b9cc');
  });

  it('is expected to have a yellow background when warning', () => {
    const { container } = render(<Button warning>Teste</Button>);
    expect(container.firstChild).toHaveStyle('background-color: #f6c23e');
  });

  it('is expected to have a red background when danger', () => {
    const { container } = render(<Button danger>Teste</Button>);
    expect(container.firstChild).toHaveStyle('background-color: #ea4335');
  });

  it('is expected to be smaller when small', () => {
    const { container } = render(<Button small>Teste</Button>);
    expect(container.firstChild).toHaveStyle('padding: 0.25rem 0.5rem');
    expect(container.firstChild).toHaveStyle('font-size: 0.875rem');
    expect(container.firstChild).toHaveStyle('line-height: 1.5');
    expect(container.firstChild).toHaveStyle('border-radius: 0.2rem');
  });
});
