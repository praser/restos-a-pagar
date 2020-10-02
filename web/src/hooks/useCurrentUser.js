import jwtDecode from 'jwt-decode';
import { capitalize, join, split } from 'lodash';
import { parseISO } from 'date-fns';
import { getToken } from '../utils/jwt';

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
  const token = getToken();
  if (!token) return null;

  const { user } = jwtDecode(token);
  return format(user);
};

const useCurrentUser = () => {
  return getUser();
};

export default useCurrentUser;
