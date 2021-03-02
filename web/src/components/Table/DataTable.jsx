import React, { useMemo, useState } from 'react';
import { formatProposta } from 'utils/numbers';
import Search from './Search';
import NoData from './NoData';
import { DTable } from './styles';

const DataTable = ({ data, searchable, noDataText, ...rest }) => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = searchable
    ? data.filter(
        item =>
          (item.operacao &&
            `${item.operacao}`
              .toLowerCase()
              .includes(filterText.toLowerCase())) ||
          (item.proposta &&
            `${formatProposta(item.proposta)}`
              .toLowerCase()
              .includes(filterText.toLowerCase())) ||
          (item.convenio &&
            `${item.convenio}`
              .toLowerCase()
              .includes(filterText.toLowerCase())),
      )
    : data;

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <Search
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DTable
      {...rest}
      data={filteredItems}
      subHeader
      subHeaderComponent={searchable && subHeaderComponentMemo}
      responsive
      pagination
      paginationComponentOptions={{
        rowsPerPageText: 'Resultados por página:',
        rangeSeparatorText: 'de',
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Todos',
      }}
      striped
      highlightOnHover
      noDataComponent={<NoData text={noDataText} />}
    />
  );
};

export default DataTable;
