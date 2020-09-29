import { defaultMessage } from '~/utils/messages';

const finallyAct = setLoading => setTimeout(() => setLoading(false), 500);

const catchAct = (setAlert, alertProps) => {
  const message = alertProps ? alertProps : defaultMessage;
  setAlert(prev => ({
    ...prev,
    ...message,
    ...alertProps,
    visible: true,
  }));
};

export const doAllXhrRequest = args => {
  const { requests, setLoading, setAlert, alertProps, success } = args;
  setLoading(true);
  return Promise.all(requests)
    .then(res => success(res))
    .catch(() => catchAct(setAlert, alertProps))
    .finally(() => finallyAct(setLoading));
};
