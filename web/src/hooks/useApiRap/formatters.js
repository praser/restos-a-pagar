import { formatISO, parseISO } from '~/utils/dates';
import { formatDecimal, parseNumber } from '~/utils/numbers';
import * as defaults from './defaults';

export const unidade = und => {
  const { id: value, nome: label } = und;
  return { value, label };
};

export const unidades = unds => {
  const arr = unds.map(u => unidade(u));

  arr.splice(0, 0, defaults.unidade);
  return arr;
};

export const gestor = gtr => {
  const { siglaGestor: value, nomeGestor } = gtr;
  return { value, label: `${value} - ${nomeGestor}` };
};

export const gestores = gtrs => {
  const arr = gtrs.map(g => gestor(g));

  arr.splice(0, 0, defaults.gestor);
  return arr;
};

export const tipoInfo = tipo => {
  const { tipoInformacaoId: value, tipoInformacaoDescricao: label } = tipo;
  return { value, label };
};

export const tiposInfo = tipos => {
  return tipos.map(tipo => tipoInfo(tipo));
};

export const operacao = (opr, options = {}) => {
  const dafaultOptions = {
    date: parseISO,
    decimal: parseNumber,
  };

  const currOptions = { ...dafaultOptions, ...options };

  const {
    created_at: createdAt,
    dataAIO,
    dataCumprimentoCriteriosDesbloqueio,
    dataSPA,
    dataVRPL,
    dataVigencia,
    updated_at: updatedAt,
    percentualFisicoAferido,
    percentualFinanceiroDesbloqueado,
    valorRepasse,
    valorDesembolsado,
  } = opr;

  return {
    ...opr,
    createdAt: currOptions.date(createdAt),
    dataAIO: currOptions.date(dataAIO),
    dataCumprimentoCriteriosDesbloqueio: currOptions.date(
      dataCumprimentoCriteriosDesbloqueio,
    ),
    dataSPA: currOptions.date(dataSPA),
    dataVRPL: currOptions.date(dataVRPL),
    dataVigencia: currOptions.date(dataVigencia),
    updatedAt: currOptions.date(updatedAt),
    percentualFisicoAferido: currOptions.decimal(percentualFisicoAferido),
    percentualFinanceiroDesbloqueado: currOptions.decimal(
      percentualFinanceiroDesbloqueado,
    ),
    valorRepasse: currOptions.decimal(valorRepasse),
    valorDesembolsado: currOptions.decimal(valorDesembolsado),
  };
};

export const operacoes = oprs => {
  return oprs.map(opr => operacao(opr));
};

export const operacoesCsv = oprs => {
  const options = { date: formatISO, decimal: formatDecimal };
  return oprs.map(opr => operacao(opr, options));
};

export const status = (opr, options = {}) => {
  const dafaultOptions = {
    date: parseISO,
    decimal: parseNumber,
  };

  const currOptions = { ...dafaultOptions, ...options };

  const { databasePosition, databaseLastUpdate } = opr;

  return {
    ...opr,
    databasePosition: currOptions.date(databasePosition),
    databaseLastUpdate: currOptions.date(databaseLastUpdate),
  };
};

export const parametros = (opr, options = {}) => {
  const dafaultOptions = {
    date: parseISO,
    decimal: parseNumber,
  };

  const currOptions = { ...dafaultOptions, ...options };

  const { dataBloqueio, dataCancelamento } = opr;

  return {
    ...opr,
    dataBloqueio: currOptions.date(dataBloqueio),
    dataCancelamento: currOptions.date(dataCancelamento),
  };
};

const estatisticaBloqueio = (opr, options = {}) => {
  const dafaultOptions = {
    date: parseISO,
    decimal: parseNumber,
  };

  const currOptions = { ...dafaultOptions, ...options };

  const { data } = opr;

  return {
    ...opr,
    data: currOptions.date(data),
  };
};

export const estatisticasBloqueio = data => data.map(estatisticaBloqueio);
