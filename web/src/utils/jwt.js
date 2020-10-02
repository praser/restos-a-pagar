const TOKEN_KEY = 'jwt';

export const setToken = token => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};
