import { parseISO } from 'date-fns';
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

export const operacao = opr => {
  const {
    created_at: createdAt,
    dataAIO,
    dataCumprimentoCriteriosDesbloqueio,
    dataSPA,
    dataVRPL,
    dataVigencia,
    updated_at: updatedAt,
  } = opr;

  return {
    ...opr,
    createdAt: parseISO(createdAt),
    dataAIO: parseISO(dataAIO),
    dataCumprimentoCriteriosDesbloqueio: parseISO(
      dataCumprimentoCriteriosDesbloqueio,
    ),
    dataSPA: parseISO(dataSPA),
    dataVRPL: parseISO(dataVRPL),
    dataVigencia: parseISO(dataVigencia),
    updatedAt: parseISO(updatedAt),
  };
};

export const operacoes = oprs => {
  return oprs.map(opr => operacao(opr));
};
