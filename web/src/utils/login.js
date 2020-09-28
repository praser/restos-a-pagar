const TOKEN_KEY = 'jwt';

export const login = token => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};
