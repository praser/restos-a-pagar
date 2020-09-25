export const dashboardPath = '/dashboard';
export const homePath = '/';
export const loginPath = '/login';
export const logouPath = '/logout';
export const PossibleBlocksPath = '/safras/:budgetYear/previa-bloqueio';
export const blockedPath = '/safras/:budgetYear/bloqueios';
export const canceledPath = '/safras/:budgetYear/cancelamentos';
export const ugPath = '/ugs';
export const createUgPath = '/ugs/novo';
export const createCommitmentPath = '/notas-empenho/saldo/novo';

const replaceParams = (path, from, to) => {
  let result = path.repeat(1);
  from.map((value, i) => {
    result = result.replaceAll(value, to[i]);
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
