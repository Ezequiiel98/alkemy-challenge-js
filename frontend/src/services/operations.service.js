import api from './api';

export const getOperations = ({
  perPage = 10, page = 1, last = false, token,
}) => api.get(`/operations?per_page=${perPage}&page=${page}&last=${last}`, {
  headers: {
    'x-access-token': token,
  },
});

export const createOperation = (data, token) => api.post('/operations/operation', data, {
  headers: {
    'x-access-token': token,
  },
});
