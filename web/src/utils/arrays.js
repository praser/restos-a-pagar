import { isEmpty, orderBy } from 'lodash';

const mostRecentParams = params =>
  orderBy(params, ['anoExecucao', 'anoOrcamentario'], ['desc', 'asc']);

export { isEmpty, mostRecentParams };
