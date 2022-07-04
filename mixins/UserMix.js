import { mapState } from "vuex"
export default {
  computed: {
    ...mapState({
      listUsers: (state) => state.users.listUsers,
      prefixUserName: (state) => state.prefixUserName,
    }),
  },
  methods: {
    userById(_userId) {
      if (!_userId) {
        return {}
      }
      const result = this.listUsers.filter(
        (o) => String(_userId) === `${this.prefixUserName}${o.id}`,
      )
      // console.log(this.listUserGetter)
      return result && result.length
        ? result[0]
        : { name: _userId, username: _userId }
    },
    userByUsername(_username) {
      if (!_username) {
        return {}
      }
      const result = this.listUsers.filter(
        (o) => String(_username) === `${this.prefixUserName}${o.id}`,
      )
      // console.log(this.listUserGetter)
      return result && result.length ? result[0] : {}
    },
  },
}
