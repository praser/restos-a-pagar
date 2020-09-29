import { isFunction } from 'lodash';
import { defaultMessage } from '~/utils/messages';

const finallyAct = setLoading => {
  if (isFunction(setLoading)) setTimeout(() => setLoading(false), 500);
};

const catchAct = (setAlert, alertProps) => {
  const message = alertProps || defaultMessage;
  if (isFunction(setAlert)) {
    setAlert(prev => ({
      ...prev,
      ...message,
      ...alertProps,
      visible: true,
    }));
  }
};

export const doAllXhrRequest = args => {
  const { alertProps, requests, setAlert, setLoading, success } = args;
  if (isFunction(setLoading)) setLoading(true);
  return Promise.all(requests)
    .then(res => success(res))
    .catch(() => catchAct(setAlert, alertProps))
    .finally(() => finallyAct(setLoading));
};
