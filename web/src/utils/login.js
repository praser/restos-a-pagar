const TOKEN_KEY = 'jwt';

export const isLoggedIn = () => {
  return !!sessionStorage.getItem(TOKEN_KEY);
};

export const login = token => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};
