const repo = (axios) => {
  return {
    getListContacts(payload) {
      return axios
        .get(`/api/admin/contacts`, {
          params: { ...payload },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListUsers(payload) {
      return axios
        .get(`/api/admin/users`, {
          params: { ...payload },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getDetailUser(id, payload) {
      return axios
        .get(`/api/admin/users/${id}`, {
          params: { ...payload },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListCompanies(payload) {
      return axios
        .get(`/api/admin/companies`, {
          params: { ...payload },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListDepartments(payload) {
      return axios
        .get(`/api/admin/departments`, {
          params: { ...payload },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListPositions(payload) {
      return axios
        .get(`/api/admin/positions`, {
          params: { ...payload },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    create(payload) {
      return axios
        .post(`/api/admin/users`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    update(id, payload) {
      return axios
        .put(`/api/admin/users/${id}`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    resetPassword(id, payload) {
      return axios
        .post(`/api/admin/users/${id}/reset-password`, payload)
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
