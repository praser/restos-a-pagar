import jwtDecode from 'jwt-decode';
import { capitalize, join, split } from 'lodash';
import { parseISO } from 'date-fns';
import { useContext } from 'react';
import { Context } from '~/components/Store';
import { getToken } from '~/utils/jwt';

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

const getUser = token => {
  if (!token) return null;
  const { user } = jwtDecode(token);
  return format(user);
};

const useCurrentUser = () => {
  const [context] = useContext(Context);
  const token = context.jwt || getToken();
  return getUser(token);
};

export default useCurrentUser;
