import { authenticate } from './apis/authApi';

const TOKEN_KEY = 'jwt';

export const isLoggedIn = () => {
  return !!sessionStorage.getItem(TOKEN_KEY);
};

export const login = async (username, password) => {
  try {
    const res = await authenticate(username, password);
    sessionStorage.setItem(TOKEN_KEY, res.data.token);
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};
