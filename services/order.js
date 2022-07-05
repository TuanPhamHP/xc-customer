// import Axios from 'axios';

const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL;
const roleRepo = (axios) => {
  return {
    getListData(payload) {
      return axios
        .get(`${VUE_APP_BASE_URL}/api/customer/orders`, {
          params: { ...payload }
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    getDetailData(id, payload) {
      return axios
        .get(`${VUE_APP_BASE_URL}/api/customer/orders/${id}`, {
          params: { ...payload }
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    init(payload) {
      return axios
        .post(`${VUE_APP_BASE_URL}/api/customer/orders/init`, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    review(id, payload = {}) {
      return axios
        .post(`${VUE_APP_BASE_URL}/api/customer/services/${id}/review`, payload)
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
        url: `${VUE_APP_BASE_URL}/api/customer/orders/${_id}`
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
    update(id, payload) {
      return axios
        .post(`${VUE_APP_BASE_URL}/api/customer/orders/${id}`, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    send(id, payload = {}) {
      return axios
        .post(`${VUE_APP_BASE_URL}/api/customer/orders/${id}/send`, payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    },
    draft(id, payload = {}) {
      return axios
        .post(`${VUE_APP_BASE_URL}/api/customer/orders/${id}/send`, payload)
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
