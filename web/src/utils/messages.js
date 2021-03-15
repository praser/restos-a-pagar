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
    text: `O lote de desbloqueio ${lote} contendo ${quantidade} notas de empenho foi gerado com sucesso e a área financeira foi notificada através da ${ce}. Aguarde o processamento do lote.`,
  });

export const createUnlockError = getMessage({
  text:
    'Houve um erro ao gerar o lote de desbloqueio. Por favor tente novamente.',
});

export const promptGerarLote = getMessage({
  title: 'Tem certeza?',
  text:
    'Esta ação não poderá ser desfeita e gerará uma CE solicitando que a área financeira faça o desbloqueio das notas de empenho selecionadas. Deseja prosseguir?',
});

export const loadOperacoes = getMessage({
  text:
    'Houve um problema ao carregar a lista de operações. Por favor tente novamente.',
});

export const createLiminarSuccess = getMessage({
  title: 'Lega!',
  text: 'A liminar foi cadastrada com sucesso.',
});

export const createLiminarFail = getMessage({
  text: 'Houve um erro ao cadastrar a liminar. Por favor tente novamente',
});

export const loadLiminaresFail = getMessage({
  title: 'Eita!',
  text:
    'Algo deu errado e não consegui carregar a lista de liminares. Por favor tente novamente e caso o problema persista entre em contato com o dono do sistema.',
});

export const checkLiminarSuccess = getMessage({
  title: 'Show de bola!',
  text:
    'A liminar foi atestada com sucesso. A partir de agora os empenhos atrelados a ela entrarão no monitoramento do painel.',
});

export const checkLiminarFail = getMessage({
  text:
    'Houve um problema ao realizar o ateste da liminar. Por favor tente novamente.',
});

export const loadEmpenhosFail = getMessage({
  text:
    'Não foi possível recuperar as notas de empenho no servidor. Por favor tente novamente.',
});

export const loadLotesDesbloqueioFail = getMessage({
  text:
    'Ops, houve um erro ao carregar os lotes de desbloqueio. Por favor tente novamente.',
});
