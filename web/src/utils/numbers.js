import numeral from 'numeral';
import 'numeral/locales';

numeral.locale('pt-br');

const decimal = '0.00';

export const parseNumber = number => numeral(number).value();
export const formatDecimal = number => numeral(number).format(decimal);
