import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import { SmallButtonSecondary } from '../Button';

export const DTable = styled(DataTable)`
  width: calc(${window.innerWidth}px - 20.5rem);
`;

export const SearchField = styled.input`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6e707e;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 250px;
  &:focus {
    color: #6e707e;
    background-color: #fff;
    border-color: #bac8f3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
  }
`;

export const SearchClear = styled(SmallButtonSecondary)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 0;
  padding: 0.375rem 0.75rem;
  height: 2.4rem;
`;
