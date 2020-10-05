export const defaultMessage = {
  title: 'Uh-oh...',
  text: 'Algo deu errado. Por favor tente novamente.',
};

const getMessage = args => {
  return { ...defaultMessage, ...args };
};

export const possibleLocks = getMessage({
  text:
    'Houve um erro ao carregar os dados da operações passíveis de bloqueio. Por favor tente novamente.',
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

export const ugsFail = getMessage({
  title: 'Ops...',
  text:
    'Algo estranho aconteceu quando busquei a lista de UGs. Por favor tente novamente.',
});

export const crateUgFail = getMessage({
  title: 'Ops...',
  text: 'Houve um erro ao cadastrar a UG. Por favor tente novamente',
});

export const createUgSuccess = getMessage({
  title: 'Maravilha!',
  text: 'A UG foi cadastrada com sucesso.',
});
