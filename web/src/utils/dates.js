import { format, isValid, parseISO as dParseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const dateFormat = 'dd/MM/yyyy';

export const parseISO = isoDate => {
  const date = dParseISO(isoDate);
  return isValid(date) ? date : null;
};

export const formatDate = date => {
  if (!isValid(date)) return null;
  return format(date, dateFormat, { locale: ptBR });
};

export const formatISO = isoDate => {
  const date = parseISO(isoDate);
  return formatDate(date);
};
