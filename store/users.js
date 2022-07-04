import api from '@/services';
const users = {
  state: () => ({
    usersStatus: [
      {
        id: 1,
        name: 'Đang hoạt động'
      },
      {
        id: 2,
        name: 'Ngừng hoạt động'
      }
    ],

    selectedDetailUser: {}
  }),
  mutations: {
    setSelectedDetailUser(state, payload) {
      state.selectedDetailUser = payload;
    }
  },
  actions: {
    async getListUsers({ commit }) {
      const res = await api.users.getListUsers({ pagination: false });
      if (!res) {
        // commit('toast/getError', this.sysLanguage.snackbar.getUsersFail);
        return;
      }
      try {
        if (res.status && res.status >= 400) {
          // commit('toast/getError', res.data.message);
          return;
        }
        commit('users/setListUsers', res.data.data.users);
      } catch (error) {
        // commit('toast/getError', `${error}`);
      }
    }
  }
};
export default users;
