import axios from 'axios';

const api = axios.create({
    baseURL: 'http://visaconsulting.herokuapp.com'
});

export default api;