import React, { useMemo, useState } from 'react';
import { formatProposta } from '~/utils/numbers';
import Search from './Search';
import { DTable } from './styles';

const Table = ({ data, ...rest }) => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data.filter(
    item =>
      (item.operacao &&
        `${item.operacao}`.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.proposta &&
        `${formatProposta(item.proposta)}`
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.convenio &&
        `${item.convenio}`.toLowerCase().includes(filterText.toLowerCase())),
  );

  console.log(data);

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
      subHeaderComponent={subHeaderComponentMemo}
    />
  );
};

export default Table;
