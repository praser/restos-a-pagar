import styled from 'styled-components';

const partContainer = styled.div`
  padding: 16px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: pink;
  width: 100%;
  height: 100%;
  align-items: center;
  transition: opacity 0.15s linear;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 1050;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: visibility 0.15s, opacity 0.15s linear;
`;

export const Container = styled.div`
  margin-top: 30px;
  width: 500px;
  flex-direction: column;
  background-color: #ffffff;
  justify-content: center;
`;

export const Header = styled(partContainer)`
  border-bottom-color: #eeeeee;
  background-color: #fafafa;
  padding: 1rem 1rem;
  border-bottom: 1px solid #e3e6f0;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  line-height: 1.5;
  font-size: 1.25rem;
  color: #885588;
`;
export const Body = styled(partContainer)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #858796;
  text-align: left;
`;
export const Footer = styled(partContainer)`
  display: flex;
  padding: 1rem;
  border-top: 1px solid #e3e6f0;
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
  justify-content: flex-end;
`;
