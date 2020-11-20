import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const Collapse = styled.div`
  animation-delay: 0s;
  animation-direction: normal;
  animation-duration: 200ms;
  animation-fill-mode: none;
  animation-iteration-count: 1;
  animation-name: growIn;
  animation-play-state: running;
  animation-timing-function: ease;
  box-sizing: border-box;
  color: rgb(133, 135, 150);
  display: ${props => (props.expanded ? 'block' : 'none')};
  font-size: 16px;
  font-weight: 400;
  height: auto;
  left: 0px;
  line-height: 24px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  margin-bottom: 0px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 0px;
  position: relative;
  text-align: left;
  text-size-adjust: 100%;
  top: 0px;
  width: auto;
  z-index: 1;

  @keyframes growIn {
    0% {
      transform: scale(0.9);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const Collapsable = styled.div`
  background-color: rgb(255, 255, 255);
  border-bottom-left-radius: 5.6px;
  border-bottom-right-radius: 5.6px;
  border-top-left-radius: 5.6px;
  border-top-right-radius: 5.6px;
  box-shadow: none;
  box-sizing: border-box;
  color: rgb(133, 135, 150);
  display: block;
  font-size: 13.6px;
  font-weight: 400;
  line-height: 20.4px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  margin-bottom: 16px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  min-width: 160px;
  padding-bottom: 8px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 8px;
  text-align: left;
  text-size-adjust: 100%;
  width: 192px;
`;

export const Collapselink = styled(Link)`
  background-color: rgba(0, 0, 0, 0);
  border-bottom-left-radius: 5.6px;
  border-bottom-right-radius: 5.6px;
  border-top-left-radius: 5.6px;
  border-top-right-radius: 5.6px;
  box-sizing: border-box;
  color: rgb(58, 59, 69);
  cursor: pointer;
  display: block;
  font-size: 13.6px;
  font-weight: 400;
  height: 36px;
  line-height: 20.4px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  margin-bottom: 0px;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 0px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  text-align: left;
  text-decoration-color: rgb(58, 59, 69);
  text-decoration-line: none;
  text-decoration-style: solid;
  text-size-adjust: 100%;
  white-space: nowrap;
  width: 176px;

  &&:hover {
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    display: block;
    color: #3a3b45;
    text-decoration: none;
    border-radius: 0.35rem;
    white-space: nowrap;
    background-color: #eaecf4;
  }

  &&:active {
    background-color: #dddfeb;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-size: 13.6px;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 900;
  height: 13px;
  line-height: 13.6px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  margin-right: 10px;
  text-align: left;
  text-rendering: auto;
  text-size-adjust: 100%;
  width: 15.3125px;
`;

export const Navitem = styled.li`
  box-sizing: border-box;
  color: rgb(133, 135, 150);
  display: list-item;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  position: relative;
  text-align: left;
  text-size-adjust: 100%;
  width: 224px;
`;

export const Navlink = styled.a`
  background-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: block;
  font-size: 16px;
  font-weight: 400;
  height: 56px;
  line-height: 24px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  position: relative;
  text-align: left;
  text-decoration-color: rgba(255, 255, 255, 0.8);
  text-decoration-line: none;
  text-decoration-style: solid;
  text-size-adjust: 100%;
  width: 224px;

  &&:hover {
    color: #ffffff;
  }

  &:after {
    width: 1rem;
    text-align: center;
    float: right;
    vertical-align: 0;
    border: 0;
    font-weight: 900;
    content: ${props => (props.expanded ? "'\f107'" : "'\f105'")};
    font-family: 'Font Awesome 5 Free';
  }
`;

export const NavlinkText = styled.span`
  box-sizing: border-box;
  cursor: pointer;
  display: inline;
  font-size: 13.6px;
  font-weight: 400;
  line-height: 20.4px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  text-align: left;
  text-size-adjust: 100%;
`;
