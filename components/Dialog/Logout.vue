<template>
  <v-dialog v-model="dialog" persistent max-width="420">
    <v-card>
      <v-card-title class="text--h6"> Đăng xuất tài khoản </v-card-title>
      <v-card-text class="text--body-1 neutral_color_sub1--text"
        >Bạn có chắc chắn muốn đăng xuất tài khoản ra khỏi hệ thống không
        ?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="neutral_color_sub3"
          depressed
          width="120px"
          class="rounded-md v-btn-confirm v-btn-text-normalize py-3 white--text"
          @click="cancelLogout"
        >
          {{ sysLanguage.logout.cancelBtn }}
        </v-btn>
        <v-btn
          color="semantic_error"
          depressed
          width="120px"
          class="rounded-md v-btn-confirm v-btn-text-normalize py-3 white--text"
          @click="handleLogout"
        >
          Đăng xuất
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { deleteCookie } from '@/helpers/customizeCookie';
export default {
  name: 'app-logout',
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapState({
      showLogoutPopup: (state) => state.showLogoutPopup
    }),
    ...mapGetters({
      sysLanguage: 'sysLanguage'
    })
  },
  watch: {
    showLogoutPopup() {
      this.dialog = this.showLogoutPopup;
    }
  },
  mounted() {},
  methods: {
    cancelLogout() {
      this.$store.commit('SET_LOGOUT_POPUP', false);
    },
    handleLogout() {
      deleteCookie('token');
      this.$store.commit('SET_LOGOUT_USER');
      this.$store.commit('SET_LOGOUT_POPUP', false);
      this.$router.push('/login');
    }
  }
};
</script>

<style></style>
