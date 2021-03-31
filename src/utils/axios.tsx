import axios from 'axios';
import { API_BASE_URL } from './api';

//change to an environment url eventually
const instance: any = axios.create({
  baseURL: API_BASE_URL,
});

instance.origin = axios;
export default instance;
