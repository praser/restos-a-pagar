import { formatDate } from '~/utils/dates';
import { formatPercent, formatCurrency, formatProposta } from '~/utils/numbers';

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

export const operacoesColumns = [
  { name: 'Operação', selector: 'operacao', sortable: true },
  {
    name: 'Proposta',
    selector: 'proposta',
    sortable: true,
    grow: 2,
    format: row => formatProposta(row.proposta),
  },
  { name: 'Convênio', selector: 'convenio', sortable: true },
  { name: 'Ano orçamento', selector: 'anoOrcamentario', sortable: true },
  {
    name: 'Retirada da suspensiva',
    selector: 'dataRetiradaSuspensiva',
    sortable: true,
    grow: 2,
    format: row => formatDate(row.dataRetiradaSuspensiva),
  },
  { name: 'GIGOV', selector: 'gigovNome', sortable: true },
  {
    name: 'Valor repasse',
    selector: 'valorRepasse',
    sortable: true,
    format: row => formatCurrency(row.valorDesembolsado),
  },
  {
    name: 'Valor desembolsado',
    selector: 'valorDesembolsado',
    sortable: true,
    format: row => formatCurrency(row.valorDesembolsado),
  },
  {
    name: 'Proponente',
    selector: 'proponente',
    sortable: true,
    grow: 3,
    format: row => `${row.proponente}/${row.uf}`,
  },
  {
    name: 'Gestor',
    selector: 'nomeGestor',
    sortable: true,
    grow: 3,
    format: row => `${row.siglaGestor} - ${row.nomeGestor}`,
  },
  {
    name: 'Legislação',
    selector: 'enquadramentoLegislacao',
    sortable: true,
    grow: 2,
  },
  {
    name: 'Legislação complemento',
    selector: 'enquadramentoLegislacaoComplemento',
    grow: 6,
    sortable: true,
  },
  { name: 'Situação', selector: 'situacaoContrato', sortable: true, grow: 2 },
  {
    name: 'Situação complemento',
    selector: 'situacaoContratoComplemento',
    sortable: true,
    grow: 3,
  },
  {
    name: '% físico aferido',
    selector: 'percentualFisicoAferido',
    sortable: true,
    format: row => formatPercent(row.percentualFisicoAferido),
  },
  {
    name: '% financeiro desbloqueado',
    selector: 'percentualFinanceiroDesbloqueado',
    sortable: true,
    format: row => formatPercent(row.percentualFinanceiroDesbloqueado),
  },
  {
    name: 'Início vigência',
    selector: 'dataVigencia',
    sortable: true,
    grow: 2,
    format: row => formatDate(row.dataVigencia),
  },
  {
    name: 'SPA',
    selector: 'dataSPA',
    sortable: true,
    grow: 2,
    format: row => formatDate(row.dataSPA),
  },
  {
    name: 'VRPL',
    selector: 'dataVRPL',
    sortable: true,
    grow: 2,
    format: row => formatDate(row.dataVRPL),
  },
  {
    name: 'AIO',
    selector: 'dataAIO',
    sortable: true,
    grow: 2,
    format: row => formatDate(row.dataAIO),
  },
  { name: 'Objeto', selector: 'objeto', sortable: true, grow: 10 },
];
