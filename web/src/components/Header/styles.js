import styled from 'styled-components';

export const Container = styled.nav`
  align-items: center;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(58, 59, 69, 0.15) 0px 2.4px 28px 0px;
  box-sizing: border-box;
  color: rgb(133, 135, 150);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 1rem;
  font-weight: 400;
  height: 4.375rem;
  justify-content: flex-start;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  position: relative;
  text-align: left;
  text-size-adjust: 100%;
  width: 100%;
`;

export const Title = styled.h1`
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.9);
  display: block;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.2;
  margin-block-end: 0.83em;
  margin-block-start: 0.83em;
  margin-bottom: 0.5rem;
  margin-inline-end: 0;
  margin-inline-start: 0;
  margin-right: 1rem;
  margin-top: 0;
  padding: 0.3125rem 0;
  text-align: left;
  text-size-adjust: 100%;
  white-space: nowrap;
  width: 133.812px;
  -webkit-box-direction: normal;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

export const Navbar = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  min-height: 100%;
`;

export const Divider = styled.div`
  border-right-color: rgb(227, 230, 240);
  border-right-style: solid;
  border-right-width: 1px;
  box-sizing: border-box;
  color: rgb(133, 135, 150);
  display: block;
  font-size: 1rem;
  font-weight: 400;
  height: calc(4.325rem - 2rem);
  line-height: 1.5;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  margin: 1rem;
  text-align: left;
  text-size-adjust: 100%;
  width: 0;
`;
