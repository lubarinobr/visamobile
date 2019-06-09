import api from '../services/api';

export const getUserByEmail = async (email) => {
    let response = await api.get(`/users/email/${email}`);
    return response.data;
}