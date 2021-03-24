import styled from 'styled-components';

interface IProps {
  width?: string;
}

export const Card = styled.div<IProps>`
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

export const CardHeader = styled.div`
  border-radius: calc(0.35rem - 1px) calc(0.35rem - 1px) 0 0;
  padding-bottom: 1rem;
  padding-top: 1rem;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #f8f9fc;
  border-bottom: 1px solid #e3e6f0;
  color: #5a5c69;
  font-weight: 700;
`;

export const CardBody = styled.div`
  flex: 1 1 auto;
  padding: 1.25rem;
`;

export const CardSmallText = styled.p`
  font-size: 12px;
  color: darkgray;
`;
