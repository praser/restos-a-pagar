import {
  differenceInDays,
  format,
  isValid,
  parseISO as dParseISO,
  startOfYear,
  parse,
  getYear as getYearDateFns,
} from 'date-fns';
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

export const remainingDays = targetDate => {
  const days = differenceInDays(targetDate, new Date());
  return days > 0 ? days : 0;
};

export const percentElapsedTime = (
  targetDate,
  startDate = startOfYear(targetDate),
) => {
  const daysBetween = differenceInDays(targetDate, startDate);
  const elapsedDays = differenceInDays(targetDate, new Date());
  return 100 - (elapsedDays / daysBetween) * 100;
};

export const monthNameShort = date => {
  if (!isValid(date)) return null;
  return format(date, 'MMM', { locale: ptBR });
};

export const parseDate = (dateString, format = dateFormat) => {
  return parse(dateString, format, new Date());
};

export const getYear = date => getYearDateFns(date);

export const formatAsISO = date => format(date, 'yyyy-MM-dd');
