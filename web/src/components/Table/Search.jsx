import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SearchClear, SearchField } from './styles';

const Search = ({ filterText, onFilter, onClear }) => {
  return (
    <>
      <SearchField
        id="search"
        type="text"
        placeholder="Operação, proposta ou convênio"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <SearchClear type="button" onClick={onClear}>
        <FontAwesomeIcon icon={faEraser} />
      </SearchClear>
    </>
  );
};

export default Search;
