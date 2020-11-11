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

export const locks = getMessage({
  text:
    'Houve um erro ao carregar os dados da operações com empenho bloqueado. Por favor tente novamente.',
});

export const possibleLocksFilters = getMessage({
  text:
    'Houve um erro ao obter os dados dos filtros. Por favor tente novamente',
});

export const loginFail = getMessage({
  title: 'Ops...',
  text:
    'Parece que a sua matrícula e a sua senha não estão corretas. Por favor tente novamente.',
});

export const ugsFail = getMessage({
  title: 'Ops...',
  text:
    'Algo estranho aconteceu quando busquei a lista de UGs. Por favor tente novamente.',
});

export const createUgFail = getMessage({
  title: 'Ops...',
  text: 'Houve um erro ao cadastrar a UG. Por favor tente novamente.',
});

export const createUgSuccess = getMessage({
  title: 'Maravilha!',
  text: 'A UG foi cadastrada com sucesso.',
});

export const loadUgFail = getMessage({
  title: 'Eita...',
  text:
    'Não consegui carregar os dados da UG que você solicitou. Por favor tente novamnete.',
});

export const updateUgFail = getMessage({
  text: 'Houve um erro ao atualizar a UG. Por favor tente novamente.',
});

export const updateUgSuccess = getMessage({
  title: 'Maravilha!',
  text: 'A UG foi atualizada com sucesso.',
});

export const deleteUgFail = getMessage({
  text:
    'Houve um erro ao tentar deletar a UG e não foi possível finalizar a sua solicitação. Por favor tente novamente.',
});

export const deleteUgSucces = getMessage({
  title: 'Excelente!',
  text: 'A Ug foi removida com sucesso',
});

export const wrongBalanceFile = getMessage({
  title: 'Eita!!!',
  text:
    'O arquivo de saldo que você selecinou não está correto. Por favor seleciona o arquivo com os dados que foram extraídos do tesouro gerencial.',
});

export const createNeBalanceFail = getMessage({
  text:
    'Houve um erro ao enviar o arquivo de saldos das notas de empenho. Por favor tente novamente.',
});

export const createNeBalanceSuccess = getMessage({
  title: 'Maravilha...',
  text:
    'O arquivo foi enviado com sucesso. Você será avisado por e-mail quando os dados forem processados.',
});

export const unlocksFail = getMessage({
  text:
    'Houve um erro ao carregar as operações que estão aptas ao desbloqueio. Por favor tente novamente.',
});

export const createUnlockSuccess = ({ lote, quantidade, ce }) =>
  getMessage({
    title: 'Legal!',
    text: `O lote de desbloqueio ${lote} contendo ${quantidade} notas de empenho foi gerado com sucesso e a área financeira foi notificada através da CE ${ce}. Aguarde o processamento do lote.`,
  });

export const createUnlockError = getMessage({
  text:
    'Houve um erro ao gerar o lote de desbloqueio. Por favor tente novamente.',
});
