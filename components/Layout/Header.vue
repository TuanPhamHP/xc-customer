<template>
  <v-app-bar color="app_bg_navbar" dense light class="app-navbar__wr">
    <v-container fluid>
      <v-row class="mx-0">
        <v-spacer></v-spacer>
        <Notification />

        <v-menu left bottom transition="slide-y-transition" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="v-btn-normalize v-btn-n-focus capitalize pr-0"
              color="neutral"
              text
              depressed
              v-bind="attrs"
              v-on="on"
            >
              <RegularAvatar
                :size="40"
                :abbr-name="userFromAuth.name"
                :image-url="userFromAuth.avatar ? userFromAuth.avatar.url : ''"
                :ext-class="'mr-2'"
              />
              {{ userFromAuth.name }}
              <v-icon class="ml-3" color="neutral_color_sub3"
                >mdi-chevron-down</v-icon
              >
            </v-btn>
          </template>

          <v-list class="pb-0">
            <v-list-item @click="showDetailMyInfo">
              <v-list-item-title color="neutral" class="font-weight-regular">
                <v-icon color="neutral" class="mr-2"
                  >mdi-account-circle-outline</v-icon
                >

                <span class="neutral--text">{{
                  sysLanguage.header.userAccount
                }}</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="showDialogPassword">
              <v-list-item-title color="neutral" class="font-weight-regular">
                <v-icon color="neutral" class="mr-2">mdi-lock-outline</v-icon>

                <span class="neutral--text">{{
                  sysLanguage.header.userPassword
                }}</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="() => {}">
              <v-list-item-title color="neutral" class="font-weight-regular">
                <v-icon color="neutral" class="mr-2"
                  >mdi-swap-horizontal</v-icon
                >
                <span class="neutral--text">{{
                  sysLanguage.header.syncData
                }}</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="() => {}">
              <v-list-item-title color="neutral" class="font-weight-regular">
                <v-icon color="neutral" class="mr-2">mdi-update</v-icon>
                <span class="neutral--text">{{
                  sysLanguage.header.update
                }}</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="onLogout">
              <v-list-item-title color="neutral" class="font-weight-regular">
                <v-icon color="semantic_error" class="mr-2">mdi-logout</v-icon>
                <span class="semantic_error--text">{{
                  sysLanguage.header.logout
                }}</span>
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="neutral">
              <v-list-item-title class="font-weight-regular">
                <span class="white--text"
                  >{{ sysLanguage.header.appVersion }}: 1.0.0</span
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import RegularAvatar from '@/components/User/RegularAvatar';
import Notification from '@/components/Layout/Notification';
export default {
  name: 'app-header',
  components: { RegularAvatar, Notification },

  data() {
    return {
      messages: '9+'
    };
  },
  computed: {
    ...mapState({
      sidebarMini: (state) => state.sideBarAppMini,
      sideBarContactMini: (state) => state.sideBarContactMini
    }),
    ...mapGetters({
      userFromAuth: 'userFromAuth',
      sysLanguage: 'sysLanguage'
    })
  },
  mounted() {},
  methods: {
    showDetailMyInfo() {
      this.$store.commit('users/setSelectedDetailUser', this.userFromAuth);
    },
    triggerSnackBar() {
      this.$store.commit('toast/getError', 'Your snackbar just triggered now');
      this.$store.commit('toast/getInfo', 'Your snackbar just triggered now');
      this.$store.commit(
        'toast/getSuccess',
        'Your snackbar just triggered now'
      );
      this.$store.commit(
        'toast/getWarning',
        'Your snackbar just triggered now'
      );
    },
    toggleSidebarApp() {
      this.$store.commit('setSidebarMini', !this.sidebarMini);
    },
    toggleSidebarContactApp() {
      this.$store.commit('setSidebarContactMini', !this.sideBarContactMini);
    },
    onLogout() {
      this.$store.commit('SET_LOGOUT_POPUP', true);
    },
    showDialogPassword() {
      this.$store.commit('SET_PASSWORD_POPUP', true);
    }
  }
};
</script>

<style lang="scss">
.app-navbar__wr {
  position: sticky !important;
  top: 0 !important;
  z-index: 5 !important;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  /* background-color: var(--v-theme-light-app_bg_navbar) !important; */
}
@media only screen and (min-width: 768px) {
  .app-navbar__wr {
    height: 56px !important;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08) !important;
    .v-toolbar__content {
      height: 56px !important;
      padding-left: 32px !important;
      padding-right: 32px !important;
    }
  }
}
</style>
