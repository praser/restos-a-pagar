import { parseISO } from 'date-fns';
import * as defaults from './defaults';

export const unidade = unidade => {
  const { id: value, nome: label } = unidade;
  return { value, label };
};

export const unidades = unidades => {
  const arr = unidades.map(u => unidade(u));

  arr.splice(0, 0, defaults.unidade);
  return arr;
};

export const gestor = gestor => {
  const { siglaGestor: value, nomeGestor } = gestor;
  return { value, label: `${value} - ${nomeGestor}` };
};

export const gestores = gestores => {
  const arr = gestores.map(g => gestor(g));

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

export const operacao = operacao => {
  const {
    created_at,
    dataAIO,
    dataCumprimentoCriteriosDesbloqueio,
    dataSPA,
    dataVRPL,
    dataVigencia,
    updated_at,
  } = operacao;

  return {
    ...operacao,
    createdAt: parseISO(created_at),
    dataAIO: parseISO(dataAIO),
    dataCumprimentoCriteriosDesbloqueio: parseISO(
      dataCumprimentoCriteriosDesbloqueio,
    ),
    dataSPA: parseISO(dataSPA),
    dataVRPL: parseISO(dataVRPL),
    dataVigencia: parseISO(dataVigencia),
    updatedAt: parseISO(updated_at),
  };
};

export const operacoes = operacoes => {
  return operacoes.map(o => operacao(o));
};
