import styled from 'styled-components';

interface IProps {
  width?: string;
}

const Card = styled.div<IProps>`
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #e3e6f0;
  border-radius: 0.35rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  ${({ width }) => width && { width }}
`;

export default Card;
