import axios from 'axios';
import { push } from 'connected-react-router';

import { DOMAIN, isProduction } from '../utils/utilities';
import { ROUTE_USER_LOGIN, ROUTE_USER_LOGIN_TOTP } from '../consts/routes';
import { actions as notifier } from '../molecules/Notifier/Notifier.ducks';
import { getStore } from './store';

const instance = axios.create({
  baseURL: DOMAIN !== 'localhost'
    ? `https://api.${DOMAIN}/api/`
    : '/api/',
  timeout: 1000 * 20,
  withCredentials: true,
});

instance.interceptors.response.use(res => res, (error) => {
  const requestUrl = error.response.request.responseURL;
  if (error.response) {
    switch (error.response.status) {
      case 401: {
        // 401 - Invalid authentication
        if (
          !requestUrl.includes('/user/logout')
          && !['/', ROUTE_USER_LOGIN, ROUTE_USER_LOGIN_TOTP].includes(window.location.pathname)
        ) {
          // Don't redirect if I am on a login page
          getStore().dispatch(push(ROUTE_USER_LOGIN));
          getStore().dispatch(notifier.error('Your session expired. Please login again'));
        }
        break;
      }
      case 500: {
        // 500 - Invalid authentication
        getStore().dispatch(notifier.error('Internal Server Error'));
        break;
      }
      case 422: // 422 - Failed from validation
      default:
        break;
    }
  }
  return Promise.reject(error);
});

const request = opt => instance(opt);
export default request;
