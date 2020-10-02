import styled from 'styled-components';

export const Divider = styled.hr`
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 1rem 1rem;
  border-top: 1px solid #eaecf4;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
`;

export const Navbar = styled.ul`
  width: 14rem;
  min-height: 100vh;
  background-color: #36b9cc;
  background-image: linear-gradient(180deg, #36b9cc 10%, #258391 100%);
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.p`
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.4);
  display: block;
  font-size: 10.4px;
  font-weight: 800;
  height: 15px;
  line-height: 15.6px;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  padding-bottom: 0px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 0px;
  text-align: left;
  text-size-adjust: 100%;
  text-transform: uppercase;
`;
