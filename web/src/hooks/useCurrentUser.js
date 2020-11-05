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
    ...user,
  };
};

const getRole = lotation => {
  const admin = [5385];
  const manager = [5916, 5469, 5382, 5054, 5669, 5381];
  const attendance = [
    6407,
    6408,
    6409,
    6410,
    6411,
    6412,
    6413,
    6414,
    6417,
    6420,
    6421,
    6423,
    6427,
    7121,
    7122,
    7123,
    7124,
    7125,
    7126,
    7127,
    7128,
    7129,
    7130,
    7131,
    7132,
    7133,
    7134,
    7135,
    7136,
    7137,
    7138,
    7139,
    7140,
    7141,
    7142,
    7143,
    7268,
    7689,
    7690,
    7691,
    7692,
    7693,
    7694,
    7695,
    7696,
    7697,
    7698,
    7701,
    7702,
    7703,
    7704,
    7705,
    7706,
    7707,
    7711,
    7712,
    7713,
    7714,
    7715,
    7716,
    7717,
    7718,
    7719,
    7720,
    7721,
    7728,
    7729,
    7730,
    7733,
    7734,
    7880,
    7881,
    7915,
  ];

  if (admin.includes(lotation)) return 'admin';
  if (manager.includes(lotation)) return 'manager';
  if (attendance.includes(lotation)) return 'attendance';
  return 'visitor';
};

const getUser = token => {
  if (!token) return null;
  const { user } = jwtDecode(token);
  const { physicalLotationId: lotation } = user;
  user.role = getRole(lotation);
  return format(user);
};

const useCurrentUser = () => {
  const [context] = useContext(Context);
  const token = context.jwt || getToken();
  return getUser(token);
};

export default useCurrentUser;
