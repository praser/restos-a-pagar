import { login } from '~/utils/login';
import { homePath } from '~/utils/paths';
import { doAllXhrRequest, doXhrRequest } from '~/utils/xhr';
import { loginFail as alertProps } from '~/utils/messages';

export const handleUsernameChange = (event, setState) => {
  const username = event.target.value;
  setState(prev => ({ ...prev, username }));
};

export const handlePasswordChange = (event, setState) => {
  const password = event.target.value;
  setState(prev => ({ ...prev, password }));
};

export const handleGoToSudepClick = event => {
  event.preventDefault();
  window.location.href = process.env.REACT_APP_MAIN_PORTAL;
};

export const handleSubmit = async (event, args) => {
  event.preventDefault();
  const { apiAuth, history, setAlert, setLoading, state } = args;
  const { username, password } = state;

  return apiAuth.then(api => {
    const success = res => {
      login(res[0].data.token);
      history.push(homePath);
    };
    return doAllXhrRequest({
      alertProps,
      requests: [api.requests.postAuthenticate(username, password)],
      setAlert,
      setLoading,
      success,
    });
  });
};
