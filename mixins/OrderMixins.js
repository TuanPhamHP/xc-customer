import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      listServices: (state) => state.listServices
    })
  },
  methods: {
    getServiceNameFromId(_serviceId) {
      const rslt = this.listServices.find((o) => o.id === _serviceId);
      return rslt ? rslt.name : '---';
    }
  }
};
