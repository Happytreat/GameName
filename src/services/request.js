import axios from 'axios';

//const API_URL = 'http://159.65.9.106:80';
// TODO: Update when in production
//const API_URL = 'http://localhost:8010/proxy';
//const API_URL = 'http://localhost:8000';
const API_URL = 'https://game-name-api.herokuapp.com';

// export const isProduction = (process.env.NODE_ENV === 'production');
//
// export const DOMAIN = isProduction
//   ? window.location.hostname.split('.').slice(-2).join('.')
//   : 'DEV_API_URL';

export const postRequest = ({ url, data }) => axios.post(`${API_URL}/${url}`, data, {
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'crossdomain': true,
  }});
