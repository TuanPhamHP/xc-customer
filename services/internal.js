// import Axios from 'axios';

const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL;
const VUE_APP_X_API_KEY = process.env.VUE_APP_X_API_KEY;
const roleRepo = (axios) => {
  return {
    getListAdditionalReq(payload) {
      return axios
        .get(`${VUE_APP_BASE_URL}/api/internal/additional-requirements`, {
          headers: {
            'X-Api-Key': VUE_APP_X_API_KEY,
            'Content-Type': 'application/json'
          },
          params: { ...payload }
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    getListOrderStatuses(payload) {
      return axios
        .get(`${VUE_APP_BASE_URL}/api/internal/order-statuses`, {
          params: { ...payload }
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    getListLifter(payload) {
      return axios
        .get(`${VUE_APP_BASE_URL}/api/internal/boc-xep`, {
          params: { ...payload }
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    }
  };
};
export default roleRepo;
