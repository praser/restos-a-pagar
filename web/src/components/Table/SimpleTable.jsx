import { isEmpty, isFunction } from 'lodash';
import React from 'react';
import NoData from './NoData';
import { Table, TBody, THead, Tr, Td, Th } from './styles';

const SimpleTable = ({ data, columns, noDataText }) => {
  const headers = columns.map(col => <Th key={col.selector}>{col.name}</Th>);
  const body = data.map(d => (
    <Tr key={d.id}>
      {columns.map(col => {
        const value = isFunction(col.format) ? col.format(d) : d[col.selector];
        return <Td key={col.selector}>{value}</Td>;
      })}
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
      <TBody>
        <Tr>
          <Td>
            <center>
              <NoData text={noDataText} />
            </center>
          </Td>
        </Tr>
      </TBody>
    </Table>
  );

  return isEmpty(data) ? noDataTable : dataTable;
};

export default SimpleTable;
