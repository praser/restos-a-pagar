export const defaultMessage = {
  title: 'Uh-oh...',
  text: 'Algo deu errado. Por favor tente novamente.',
};

const getMessage = args => {
  return { ...defaultMessage, ...args };
};

export const possibleLocksFilters = getMessage({
  text:
    'Houve um erro ao obter os dados dos filtros. Por favor tente novamente',
});
