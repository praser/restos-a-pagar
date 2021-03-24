import styled from 'styled-components';

interface IProp {
  width?: string;
}

const FormGroup = styled.div<IProp>`
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
  ${({ width }) => width && `width: ${width};`}
  ${({ width }) => !width && `flex: 1;`}

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export default FormGroup;
