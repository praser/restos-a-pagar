import jwtDecode from 'jwt-decode';
import { capitalize, join, split } from 'lodash';
import { parseISO } from 'date-fns';
import { isLoggedIn, getToken } from './login';

const capitalizeFirstChar = name => split(name, ' ').map(n => capitalize(n));

const format = user => {
  const {
    birthday,
    cpf,
    id,
    name,
    physicalLotationId,
    physicalLotationAbbreviation,
  } = user;

  return {
    id,
    bithday: parseISO(birthday),
    cpf,
    firstName: capitalizeFirstChar(name)[0],
    fullName: join(capitalizeFirstChar(name), ' '),
    physicalLotationId,
    physicalLotationAbbreviation,
  };
};

const getUser = () => {
  const { user } = jwtDecode(getToken());
  return format(user);
};

export const useCurrentUser = () => {
  return isLoggedIn() ? getUser() : null;
};
