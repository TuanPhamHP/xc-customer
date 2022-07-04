// import repositories from "@/repositories/index.js"
import api from '@/services';
const rooms = {
  state: () => ({
    listCompaniesIdb: [] // type - 1
  }),
  mutations: {
    SET_LIST_COMPANIES_IDB(state, payload) {
      if (Array.isArray(payload)) {
        state.listCompaniesIdb = [...payload];
      }
    },
    ADD_COMPANY(state, payload) {
      if (payload) {
        this.$repositories.companies.add(payload);
        state.listCompaniesIdb.push(payload);
      }
    }
  },
  actions: {
    async setAllCompaniesFromIDB({ commit }) {
      const grs = await this.$repositories.companies.getAll();
      commit('SET_LIST_COMPANIES_IDB', grs);
    },
    // eslint-disable-next-line no-unused-vars
    async getAllRoomFromApi({ commit }) {
      const res = await api.chat.getListGroupChat();
      if (!res) {
        return;
      }
      try {
        const parsedGrs = res.data.groups.map((o) => ({ ...o, type: 1 }));
        commit('SET_LIST_COMPANIES_IDB', parsedGrs);
        // commit("SET_LIST_ROOMS", [])
        this._vm.$repositories.group_rooms.addArray(parsedGrs);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default rooms;
