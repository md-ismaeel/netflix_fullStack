import axios from 'axios';
import { API_END_POINT } from './endPoints';

export const axiosInstance = axios.create({
    baseURL: `${API_END_POINT}`, // Replace with your backend URL
    withCredentials: true, // Send cookies with requests
});
