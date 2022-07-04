import axios from 'axios';
import user from './user';
import users from './users';
import order from './order';
import internal from './internal';
import noti from './noti';
// const axiosInstance = axios.create()
// console.log(axiosInstance.defaults.headers.common)

const services = ((axios) => {
  return {
    user: user(axios),
    users: users(axios),
    order: order(axios),
    internal: internal(axios),
    noti: noti(axios)
  };
})(axios);
export default services;
