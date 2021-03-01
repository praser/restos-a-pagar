import { isBefore } from 'date-fns';

import { isEmpty } from 'utils/arrays';
import { parseISO } from 'utils/dates';
import { joinPath, locksPath, possibleLocksPath } from 'utils/paths';

import IProps from './IProps';

const getLink = (props: IProps): string | null => {
  if (isEmpty(props)) return null;
  const { anoOrcamentario, dataBloqueio } = props;
  const today = new Date();

  if (isBefore(today, parseISO(dataBloqueio) || 0))
    return joinPath(possibleLocksPath, [anoOrcamentario]);

  return joinPath(locksPath, [anoOrcamentario]);
};

export { getLink };
