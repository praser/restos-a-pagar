import { filter } from 'lodash';

export const handleFilterVisibility = setState => {
  setState(prev => {
    const showFilters = !prev.showFilters;
    return { ...prev, showFilters };
  });
};

export const handleFilter = (setState, filters) => {
  const [unidades, gestores, tiposInfo] = filters;
  setState(prev => {
    const showFilters = false;
    const unidade = unidades;
    const gestor = gestores;
    const tipoInfo = tiposInfo;
    return { ...prev, showFilters, unidade, gestor, tipoInfo };
  });
};
