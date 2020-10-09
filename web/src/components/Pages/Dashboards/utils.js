import {
  unidade as defUnidade,
  gestor as defGestor,
  tipoInfo as defTipoInfo,
} from '~/hooks/useApiRap/defaults';

export const initialState = {
  showFilters: false,
  unidade: defUnidade,
  gestor: defGestor,
  tipoInfo: defTipoInfo,
  status: {
    databasePosition: null,
  },
  parametros: {
    dataBloqueio: null,
  },
  estatisticas: {
    estatisticas: [
      {
        quantidade_operacoes: null,
        saldo_notas_empenho: null,
      },
    ],
  },
};

export const dataInitialState = {
  operacoes: [{}],
  operacoesCsv: [{}],
};

export const csvHeaders = [
  { key: 'anoExecucao', label: 'anoExecucao' },
  { key: 'anoOrcamentario', label: 'anoOrcamentario' },
  { key: 'operacao', label: 'operacao' },
  { key: 'dv', label: 'dv' },
  { key: 'proposta', label: 'proposta' },
  { key: 'anoProposta', label: 'anoProposta' },
  {
    key: 'anoOrcamentarioProposta',
    label: 'anoOrcamentarioProposta',
  },
  { key: 'convenio', label: 'convenio' },
  { key: 'gigovId', label: 'gigovId' },
  { key: 'gigovNome', label: 'gigovNome' },
  { key: 'proponente', label: 'proponente' },
  { key: 'uf', label: 'uf' },
  { key: 'siglaGestor', label: 'siglaGestor' },
  { key: 'nomeGestor', label: 'nomeGestor' },
  {
    key: 'enquadramentoLegislacao',
    label: 'enquadramentoLegislacao',
  },
  {
    key: 'enquadramentoLegislacaoComplemento',
    label: 'enquadramentoLegislacaoComplemento',
  },
  { key: 'situacaoContrato', label: 'situacaoContrato' },
  {
    key: 'situacaoContratoComplemento',
    label: 'situacaoContratoComplemento',
  },
  {
    key: 'percentualFisicoAferido',
    label: 'percentualFisicoAferido',
  },
  {
    key: 'percentualFinanceiroDesbloqueado',
    label: 'percentualFinanceiroDesbloqueado',
  },
  { key: 'dataVigencia', label: 'dataVigencia' },
  { key: 'dataSPA', label: 'dataSPA' },
  { key: 'dataVRPL', label: 'dataVRPL' },
  { key: 'dataAIO', label: 'dataAIO' },
  {
    key: 'dataCumprimentoCriteriosDesbloqueio',
    label: 'dataCumprimentoCriteriosDesbloqueio',
  },
  { key: 'valorRepasse', label: 'valorRepasse' },
  { key: 'objeto', label: 'objeto' },
  { key: 'valorDesembolsado', label: 'valorDesembolsado' },
];
