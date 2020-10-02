import { useContext } from 'react';
import { Context } from '~/Store';
import { defaultMessage } from '~/utils/messages';

const useXHR = () => {
  const [context, dispatch] = useContext(Context);

  const finallyAct = () => {
    setTimeout(
      () =>
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        }),
      500,
    );
  };
  const catchAct = alertProps => {
    const alert = alertProps || defaultMessage;
    dispatch({
      type: 'SET_ALERT',
      payload: {
        visible: true,
        ...alert,
      },
    });
  };

  const doAllXhrRequest = args => {
    const { alertProps, requests, success } = args;
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    setTimeout(() => {
      return Promise.all(requests)
        .then(res => success(res))
        .catch(error => {
          console.error(error);
          catchAct(alertProps);
        })
        .finally(() => finallyAct());
    }, 500);
  };

  return { doAllXhrRequest };
};

export default useXHR;
