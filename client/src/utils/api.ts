import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || undefined;

const api = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true, // This ensures cookies are sent with every request
});

export default api;
