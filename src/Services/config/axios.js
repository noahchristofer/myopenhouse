import axios from 'axios';
import { CONSTANTS } from './constants';

const globalAPI = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

export default globalAPI;
