import { isBefore } from 'date-fns';

import { parseISO } from 'utils/dates';
import { joinPath, locksPath, possibleLocksPath } from 'utils/paths';

import IProps from './IProps';

const getLink = (props: IProps): string | null => {
  const { anoOrcamentario, dataBloqueio } = props;
  const today = new Date();

  if (isBefore(today, parseISO(dataBloqueio) || 0))
    return joinPath(possibleLocksPath, [anoOrcamentario]);

  return joinPath(locksPath, [anoOrcamentario]);
};

export { getLink };
