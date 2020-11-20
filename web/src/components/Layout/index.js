import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  background-color: #f8f9fc;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex: 1;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -5px;
  margin-left: -5px;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-direction: ${({ direction }) => direction};
`;
