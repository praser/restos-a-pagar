import { replaceAll } from './string';

export const locksPath = '/safras/:budgetYear/bloqueios';
export const cancellationsPath = '/safras/:budgetYear/cancelamentos';
export const createUgPath = '/ugs/novo';
export const dashboardPath = '/dashboard';
export const homePath = '/';
export const loginPath = '/login';
export const logouPath = '/logout';
export const possibleLocksPath = '/safras/:budgetYear/previa-bloqueio';
export const ugPath = '/ugs';
export const updateCommitmentPath = '/notas-empenho/saldo/novo';
export const updateUgPath = '/ugs/editar/:id';
export const unlockPath = '/safras/:budgetYear/desbloqueios';
export const createUnlockPath = '/safras/:budgetYear/desbloqueios/novo';
export const showUnlockPath = '/safras/:budgetYear/desbloqueios/:id';
export const createJudicialInjunction = '/liminares-judiciais/novo';
export const listJudicialInjunction = '/liminares-judiciais';

const replaceParams = (path, from, to) => {
  let result = path.repeat(1);
  from.map((value, i) => {
    result = replaceAll(result, value, to[i]);
    return result;
  });
  return result;
};

const validateParamsToReplace = (from, to) => {
  if (from.length === to.length) return true;

  throw new Error(
    `Wrong amoun of elements in params array. Expected ${from.length} and received ${to.length}`,
  );
};

export const joinPath = (path, params) => {
  const re = /:\w*/gm;
  const matches = path.match(re);
  validateParamsToReplace(matches, params);
  return replaceParams(path, matches, params);
};
