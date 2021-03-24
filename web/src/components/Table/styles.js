import styled from 'styled-components';

import DataTable from 'react-data-table-component';

import Button from 'components/atoms/Button';

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

export const SearchClear = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 0;
  padding: 0.375rem 0.75rem;
  height: 2.4rem;
`;

export const NoDataImage = styled.img`
  height: 120px;
  margin-right: 50px;
`;

export const Table = styled.table`
  font-size: 13px;
  width: 100%;
  margin-bottom: 10px;
`;

export const THead = styled.thead`
  & > tr {
    background-color: rgba(186, 200, 243, 0.5);
  }
`;

export const TBody = styled.tbody`
  & > tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    background-color: rgba(186, 200, 243, 0.1);
  }
`;

export const Th = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: 600;
`;

export const Td = styled.td`
  padding: 10px;
`;

export const Tr = styled.tr``;
