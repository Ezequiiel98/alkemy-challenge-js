import api from './api';

export const getOperations = ({
  perPage = 10, page = 1, last = false, token,
}) => api.get(`/operations?per_page=${perPage}&page=${page}&last=${last}`, {
  headers: {
    'x-access-token': token,
  },
});

export const loginService = (data) => api.post('/auth/login', data);

export const signUpService = (data) => api.post('/auth/signup', data);

export const logoutService = (token) => api.delete(`/auth/logout/${token}`);

export const validateTokenService = (token) => api.get(`/auth/validate-token/${token}`);
