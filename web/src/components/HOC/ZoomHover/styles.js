import styled from 'styled-components';

import { primarySc8 } from '~/utils/colors.js';

export const ZoomHover = styled.div`
  display: flex;
  flex: 1;
  margin: 0 0.5%;
  justify-content: space-between;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    opacity: 1;
    box-shadow: 0 0.15rem 0.75rem 0.3rem rgba(58, 59, 69, 0.15);

    &:first-child:last-child {
      margin: 0;
    }
  }

  &:after {
    content: '';
    background: ${primarySc8};
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px !important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s;
  }

  &:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s;
  }
`;
