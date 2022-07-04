const repo = (axios) => {
  return {
    getListData(payload) {
      return axios
        .get(`/api/notifications`, {
          params: { ...payload },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getDetailData(id, payload) {
      return axios
        .get(`/api/notifications/${id}`, {
          params: { ...payload },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    updateRead(_id, _params) {
      return axios
        .post(`/api/notifications/${_id}/read`, _params)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    updateReceived(_params = {}) {
      return axios
        .post(`/api/notifications/receive`, _params)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
  }
}
export default repo
