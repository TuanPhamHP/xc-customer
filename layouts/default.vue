<template>
  <v-app data-app>
    <div
      id="app"
      class="app-container p-maker"
      :class="routeName === 'login' ? 'primary login-app' : 'app_bg'"
    >
      <v-container fluid class="py-0">
        <v-row class="main-board my-0 no-wrap">
          <v-col cols="auto" v-if="isAuth" class="p-0 v-app__sidebar">
            <Sidebar />
          </v-col>
          <v-col
            :cols="!isAuth ? '12' : 'auto'"
            class="p-0 v-app__router-view"
            :class="isAuth ? '' : 'mw-100'"
          >
            <Header v-if="isAuth" />
            <BreadCrumb v-if="isAuth" />
            <Nuxt :key="$route.name" />
          </v-col>
          <!-- <v-col cols="3" v-if="isAuth" class="pt-0 v-app__sidebar pb-3">
            <RightBarSticky />
          </v-col> -->
        </v-row>
      </v-container>
    </div>
    <Logout />
    <DialogUserInfomation />
    <DialogUserPassword v-if="isAuth" />
    <ListUserReadOnly />
    <FullPageView :on-show="showFullPage" />
    <div class="list-toastMsg">
      <p
        v-for="tm in toastMsg"
        :key="tm.uuid"
        class="toastMsg"
        :class="`toast-msg__${tm.type} snack_${tm.type}`"
      >
        <img
          v-if="tm.type === 'success'"
          height="32px"
          src="@/assets/images/toast-success.svg"
          alt="toast-success"
          class="toast-img-success"
        />
        <img
          v-if="tm.type === 'info'"
          height="32px"
          src="@/assets/images/toast-info.svg"
          alt="toast-info"
          class="toast-img-info"
        />
        <img
          v-if="tm.type === 'warning'"
          height="32px"
          src="@/assets/images/toast-warning.svg"
          alt="toast-warning"
          class="toast-img-warning"
        />
        <img
          v-if="tm.type === 'error'"
          height="32px"
          src="@/assets/images/toast-error.svg"
          alt="toast-error"
          class="toast-img-error"
        />

        {{ tm.msg }}
      </p>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import Header from '@/components/Layout/Header';
import BreadCrumb from '@/components/Layout/BreadCrumb';
import Sidebar from '@/components/Layout/Sidebar.vue';
import FullPageView from '@/components/FullPageView.vue';
import Logout from '@/components/Dialog/Logout';
import ListUserReadOnly from '@/components/Dialog/ListUserReadOnly';
import DialogUserInfomation from '@/components/Dialog/DialogUserInfomation';
import DialogUserPassword from '@/components/Dialog/DialogUserPassword';
// eslint-disable-next-line no-unused-vars
import api from '@/services';
// import RightBarSticky from "./components/Layout/RightBarSticky.vue"
export default {
  name: 'DefaultLayout',
  components: {
    Header,
    BreadCrumb,
    Logout,
    ListUserReadOnly,
    DialogUserInfomation,
    DialogUserPassword,
    Sidebar,
    // RightBarSticky,
    FullPageView
  },

  data() {
    return {
      refContainerScroll: 1
    };
  },
  computed: {
    ...mapState({
      toastMsg: (state) => state.toast.messages,
      listImagePreview: (state) => state.listImagePreview,
      userChat: (state) => state.userChat
    }),
    showFullPage() {
      return !!(this.listImagePreview && this.listImagePreview.length);
    },
    ...mapGetters({
      isAuth: 'isAuth',
      token: 'token'
    }),
    routeName() {
      return this.$route.name;
    }
  },
  watch: {
    isAuth() {
      if (this.isAuth) {
        this.toggleLogin();
      }
    },
    userChat: {
      deep: true,
      handler() {
        if (this.userChat && this.userChat.userId) {
          this.toggleLoginChat();
        }
      }
    },
    toastMsg: {
      deep: true,
      handler() {
        setTimeout(() => {
          this.toastMsg.forEach((o) => {
            this.$store.commit('toast/remove', o);
          });
        }, 4000);
      }
    }
  },
  mounted() {
    if (window) {
      window.addEventListener('online', () => {
        this.$store.commit('toast/getSuccess', 'Back to online');
      });
      window.addEventListener('offline', () => {
        this.$store.commit(
          'toast/getError',
          'Your internet connection is offline now'
        );
      });
    }
    if (this.isAuth) {
      this.toggleLogin();
    }
    // setTimeout(() => {
    //   //  socket: io(),
    //   const token = this.token;
    //   const channel = this.$socket.emit('subscribe', {
    //     channel: `private-users-${1}`,
    //     auth: {
    //       headers: {
    //         Authorization: token
    //       }
    //     },
    //     token
    //   });
    //   console.log(channel);

    //   this.sockets.subscribe(
    //     'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
    //     (data) => {
    //       console.log(data);
    //     }
    //   );
    //   channel.on(
    //     'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
    //     (data) => {
    //       console.log(data);
    //     }
    //   );
    //   channel.on('message', (data) => {
    //     console.log(data);
    //   });
    //   this.$socket.on('message', (data) => {
    //     console.log(data);
    //   });
    // }, 5000);
    // this.$socket.emit("subscribe", {
    //   channel: `price-standard-gold-live`,
    // })
    // // Thay đổi giá vàng standard
    // this.sockets.subscribe("App\\Events\\PriceStandardGoldEvent", (data) => {
    //   console.log(data)
    // })
  },
  methods: {
    handleSyncTheme() {
      const iconURL1 = 'https://vn.tradingview.com/static/images/favicon.ico';
      return iconURL1;
    },
    toggleLoginChat() {
      // this.getPrivateIdb();
      // this.getGroupIdb();
      // this.$store.dispatch('room/getAllRoomFromApi');
      // this.$store.dispatch('room/getAllPrivateChatFromApi');
    },
    async getPrivateIdb() {
      const ims = await this.$repositories.ims_rooms.getAll();
      this.$store.commit('SET_LIST_PRIVATE_IDB', ims);
    },
    async getGroupIdb() {
      console.log(this.$repositories);
      const grs = await this.$repositories.group_rooms.getAll();
      this.$store.commit('SET_LIST_ROOMS_IDB', grs);
    },
    toggleLogin() {
      this.$store.dispatch('companies/setAllCompaniesFromIDB');
      this.$store.dispatch('internal/getListUsers');
      // const res = await api.user.loginChat();
      // if (!res) {
      //   this.$store.commit(
      //     'toast/getError',
      //     'Đăng nhập sv chat thất bại. Liên hệ IT để được hỗ trợ. Code 01'
      //   );
      // }
      // try {
      //   if (res.status && res.status > 199 && res.status < 400) {
      //     this.$store.commit('SET_USER_CHAT', res.data.data);
      //   } else {
      //     this.$store.commit(
      //       'toast/getError',
      //       'Đăng nhập sv chat thất bại. Liên hệ IT để được hỗ trợ. Code 01'
      //     );
      //     console.log(res);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
    refScroll(e) {
      clearTimeout(this.refContainerScroll);
      this.refContainerScroll = setTimeout(() => {
        if (['news'].includes(this.routeName)) {
          this.$store.commit('setPrvScroll', e.target.scrollTop);
        }
      }, 100);
    }
  }
};
</script>
<style lang="scss">
.v-app__router-view {
  max-width: calc(100vw - 240px);
}
</style>
