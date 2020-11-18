import numeral from 'numeral';
import 'numeral/locales';

numeral.register('locale', 'custom-pt-br', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'mil',
    million: 'milhões',
    billion: 'bilhões',
    trillion: 'trilhões',
  },
  ordinal() {
    return 'º';
  },
  currency: {
    symbol: 'R$',
  },
});

numeral.locale('custom-pt-br');

const decimal = '0,0.00';
const integer = '0,0';
const currency = '$ 0,0.00';
const currencyShort = '$ 0.00 a';
const percent = '0.00 %';

export const parseNumber = number => numeral(number).value();
export const formatDecimal = number => numeral(number).format(decimal);
export const formatInteger = number => numeral(number).format(integer);
export const formatCurrency = number => numeral(number).format(currency);
export const formatCurrencyShort = number =>
  numeral(number).format(currencyShort);
export const formatPercent = number => {
  return numeral(number / 100).format(percent);
};
export const formatProposta = proposta => {
  let stuffed = `0000000000${proposta}`;
  stuffed = stuffed.substring(stuffed.length - 10, stuffed.length);
  return [stuffed.slice(0, 6), stuffed.slice(6)].join('/');
};
