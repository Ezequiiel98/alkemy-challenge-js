import api from './api';

export const loginService = (data) => api.post('/auth/login', data);

export const signUpService = (data) => api.post('/auth/signup', data);

export const logoutService = (token) => api.delete(`/auth/logout/${token}`);
