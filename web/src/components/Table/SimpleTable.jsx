import { isEmpty } from 'lodash';
import React from 'react';
import NoData from './NoData';
import { Table, TBody, THead, Tr, Td, Th } from './styles';

const SimpleTable = ({ data, columns, noDataText }) => {
  const headers = columns.map(col => <Th>{col.name}</Th>);
  const body = data.map(d => (
    <Tr>
      {columns.map(col => (
        <Td>{d[col.selector]}</Td>
      ))}
    </Tr>
  ));

  const dataTable = (
    <Table>
      <THead>
        <Tr>{headers}</Tr>
      </THead>
      <TBody>{body}</TBody>
    </Table>
  );

  const noDataTable = (
    <Table>
      <Tr>
        <Td>
          <NoData text={noDataText} />
        </Td>
      </Tr>
    </Table>
  );

  return isEmpty(data) ? noDataTable : dataTable;
};

export default SimpleTable;
