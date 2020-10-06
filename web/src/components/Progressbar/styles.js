import styled from 'styled-components';

export const Container = styled.div`
  height: 0.5rem;
  margin-right: 1rem;
  margin-left: 1rem;
  display: flex;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #eaecf4;
  border-radius: 0.35rem;
  flex: 1;
  align-self: center;
`;

export const Progress = styled.div`
  background-color: #f6c23e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  transition: width 0.6s ease;
  width: ${({ width }) => width};
`;
