export const defaultMessage = {
  title: 'Uh-oh...',
  text: 'Algo deu errado. Por favor tente novamente.',
};

const getMessage = args => {
  return { ...defaultMessage, ...args };
};

export const possibleLocks = getMessage({
  text:
    'Houve um erro ao carrtegar os dados do pré bloqueio. Por favor tente novamente.',
});

export const possibleLocksFilters = getMessage({
  text:
    'Houve um erro ao obter os dados dos filtros. Por favor tente novamente',
});

export const loginFail = getMessage({
  title: 'Ops...',
  text:
    'Parece que a sua matrícula e a sua senha não estão corretas. Por favor tente novamente',
});
