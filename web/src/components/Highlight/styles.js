import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components';

import { handleVariant } from '~/utils/colors';

export const Container = styled.div`
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #e3e6f0;
  border-radius: 0.35rem;
  border-left: 0.25rem solid;
  border-left-color: ${({ variant }) => handleVariant(variant)};
  flex: 1;
  margin: 0 0.5%;
  justify-content: space-between;

  &:first-child:last-child {
    margin: 0;
  }
`;

export const Body = styled.div`
  display: flex;
  flex: 1 1 auto;
  padding: 1.25rem;
`;

export const Content = styled.div`
  padding-top: 0.5rem;
  height: 100%;
  flex: 1;
  color: #5a5c69;
  font-weight: 700;
  margin-bottom: 0;
  font-size: 1.25rem;
  line-height: 1.2;
`;

export const Title = styled.h5`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
  color: ${({ variant }) => handleVariant(variant)};
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #dddfeb;
  font-weight: 900;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  font-size: 2em;
  align-self: center;
`;
