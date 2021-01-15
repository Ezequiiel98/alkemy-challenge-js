import api from './api';

export const getOperationsService = ({
  perPage = 10, page = 1, last = false, token,
}) => api.get(`/operations?per_page=${perPage}&page=${page}&last=${last}`, {
  headers: {
    'x-access-token': token,
  },
});

export const createOperationService = (data, token) => api.post('/operations/operation', data, {
  headers: {
    'x-access-token': token,
  },
});

export const deleteOperationService = (id, token) => api.delete(`/operations/operation/${id}`, {
  headers: {
    'x-access-token': token,
  },
});

export const getOperationByIdService = (id, token) => api.get(`/operations/operation/${id}`, {
  headers: {
    'x-access-token': token,
  },
});

export const updateOperationService = (id, data, token) => api.put(`/operations/operation/${id}`, data, {
  headers: {
    'x-access-token': token,
  },
});
