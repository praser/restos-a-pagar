import {
  differenceInDays,
  format,
  isValid,
  parseISO as dParseISO,
  startOfYear,
  parse,
  getYear as getYearDateFns,
  isWithinInterval as isWithinIntervalDateFns,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const dateFormat = 'dd/MM/yyyy';

const parseISO = isoDate => {
  const date = dParseISO(isoDate);
  return isValid(date) ? date : null;
};

const formatDate = date => {
  if (!isValid(date)) return null;
  return format(date, dateFormat, { locale: ptBR });
};

const formatISO = isoDate => {
  const date = parseISO(isoDate);
  return formatDate(date);
};

const remainingDays = targetDate => {
  const days = differenceInDays(targetDate, new Date());
  return days > 0 ? days : 0;
};

const percentElapsedTime = (
  targetDate,
  startDate = startOfYear(targetDate),
) => {
  const daysBetween = differenceInDays(targetDate, startDate);
  const elapsedDays = differenceInDays(targetDate, new Date());
  return 100 - (elapsedDays / daysBetween) * 100;
};

const monthNameShort = date => {
  if (!isValid(date)) return null;
  return format(date, 'MMM', { locale: ptBR });
};

const parseDate = (dateString, formatStr = dateFormat) => {
  return parse(dateString, formatStr, new Date());
};

const getYear = date => getYearDateFns(date);

const formatAsISO = date => format(date, 'yyyy-MM-dd');

const isWithinInterval = (date, start, end) => {
  if (date && start && end) {
    const range = {
      start: parseISO(start),
      end: parseISO(end),
    };

    return isWithinIntervalDateFns(date, range);
  }
  return false;
};

export {
  parseISO,
  formatDate,
  formatISO,
  remainingDays,
  percentElapsedTime,
  monthNameShort,
  parseDate,
  getYear,
  formatAsISO,
  isWithinInterval,
};
