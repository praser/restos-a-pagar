import styled from 'styled-components';

const partContainer = styled.div`
  padding: 16px;
`;

export const DismissButton = styled.button`
  cursor: pointer;
  padding-left: 1rem;
  background-color: transparent;
  border: 0;
  appearance: none;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1;
  color: #000000;
  opacity: 0.5;
  text-shadow: 0 1px 0 #ffffff;
  outline: 0;

  &&:hover {
    opacity: 1;
  }
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

  ${({ alignLeft }) =>
    alignLeft &&
    `
    align-self: flex-end;
    height: 100%;
    width: 320px;
    margin-top: 0;
  `}
`;

export const Header = styled(partContainer)`
  border-bottom-color: #eeeeee;
  background-color: #fafafa;
  padding: 1rem 1rem;
  border-bottom: 1px solid #e3e6f0;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  display: flex;
  justify-content: space-between;
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

export const ProgressBar = styled.div`
  background-color: #4e73df;
  width: 100%;
  height: 1rem;
  border-radius: 0.35rem;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  animation: progress-bar-stripes 1s linear infinite;
  transition: width 0.6s ease;

  @keyframes progress-bar-stripes {
    from {
      background-position: 1rem 0;
    }
    to {
      background-position: 0 0;
    }
  }
`;
