import api from '@/services';
const users = {
  state: () => ({
    listAdditionalReq: []
  }),
  mutations: {
    setListAdditionalReq(state, payload) {
      state.listAdditionalReq = [...payload];
    }
  },
  actions: {
    async getListUsers({ commit }) {
      const res = await api.internal.getListAdditionalReq({
        pagination: false
      });
      if (!res) {
        // commit('toast/getError', this.sysLanguage.snackbar.getUsersFail);
        return;
      }
      try {
        if (res.status && res.status >= 400) {
          // commit('toast/getError', res.data.message);
          return;
        }
        commit('setListAdditionalReq', res.data.data.additional_requirements);
      } catch (error) {
        // commit('toast/getError', `${error}`);
      }
    }
  }
};
export default users;
