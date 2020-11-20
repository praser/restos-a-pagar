export const handleVisibility = setState => {
  setState(prev => {
    const showFilters = !prev.showFilters;
    return { ...prev, showFilters };
  });
};

export const handleClick = (setState, state) => {
  const { unidade, gestor, tipoInfo } = state;
  setState(prev => ({ ...prev, unidade, gestor, tipoInfo }));
  handleVisibility(setState);
};
