// import Axios from 'axios';

const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL;
const roleRepo = (axios) => {
  return {
    getListData(payload) {
      return axios
        .get(`${VUE_APP_BASE_URL}/api/internal/yeu-cau-them`, {
          params: { ...payload }
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    create(payload = {}) {
      return axios
        .post(`${VUE_APP_BASE_URL}/api/roles?include=permissions`, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },

    delete(_id) {
      return axios({
        method: 'DELETE',
        url: `api/roles/${_id}`
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },

    register(payload) {
      return axios
        .post(`${VUE_APP_BASE_URL}/api/customer/register`, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    resetPassword(payload) {
      return axios
        .post(`${VUE_APP_BASE_URL}/api/customer/reset-password`, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    update(payload, id) {
      return axios
        .post(
          `${VUE_APP_BASE_URL}/api/roles/${id}?include=permissions`,
          payload
        )
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
