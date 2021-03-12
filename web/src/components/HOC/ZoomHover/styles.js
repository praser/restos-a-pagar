import styled from 'styled-components';

export const ZoomHover = styled.div`
  display: flex;
  flex: 1;
  margin: 0 0.5%;
  justify-content: space-between;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    opacity: 1;
    box-shadow: 0 0.15rem 0.75rem 0.3rem rgba(58, 59, 69, 0.15);
  }

  &:first-child:last-child {
    margin: 0;
  }
`;
