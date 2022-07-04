<template>
  <v-row class="login-app">
    <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="login-right-side">
      <!-- <v-btn color="primary" @click="onChangeTheme"> random prim color </v-btn> -->
      <!-- <img
        src="@/assets/images/login-logo.jpg"
        alt="logo-login"
        loading="lazy"
      /> -->
      <div class="white login-w-wr box-shadow--mod">
        <img
          src="@/assets/images/login-logo.svg"
          alt="logo-login"
          class="login-logo-svg"
          loading="lazy"
        />

        <v-tabs-items v-model="tab" class="white w-100">
          <v-tab-item :value="`tab-login`">
            <p class="primary--text text--h5 mb-0 text-center">
              Chào mừng bạn quay trở lại
            </p>
            <p
              class="neutral_color_sub1--text mb-0 text--body-1 mb-8 text-center"
            >
              Vui lòng đăng nhập để tiếp tục
            </p>
            <div class="tab-login__wr w-100">
              <span
                class="text--subtitle-1 neutral--text mb-1 d-block font-weight-500"
                >Số điện thoại hoặc Email</span
              >
              <v-text-field
                v-model="form.login"
                autofocus
                autocomplete="off"
                label=""
                placeholder="Nhập số điện thoại hoặc email"
                color="primary"
                outlined
                dense
                :class="loginFormErrors.email ? 'error-border' : ''"
                class="v-text-field_n_details login-input font-size-14 mb-0 input-text-fieldset-normalize"
                @keypress.enter="focusPassword"
              ></v-text-field>
              <p
                v-if="loginFormErrors.email"
                class="semantic_error--text error-msg-small mb-0 text--overline"
              >
                {{ loginFormErrors.email }}
              </p>
              <span
                class="text--subtitle-1 neutral--text mb-1 d-block font-weight-500"
                >Mật khẩu</span
              >
              <v-text-field
                id="formPassword"
                v-model="form.password"
                autocomplete="off"
                label=""
                placeholder="Nhập mật khẩu"
                color="primary"
                :type="showPassword ? 'text' : 'password'"
                outlined
                dense
                :class="loginFormErrors.password ? 'error-border' : ''"
                class="v-text-field_n_details login-input font-size-14 mb-0 input-text-fieldset-normalize"
                @keypress.enter="handleLogin"
              >
                <template #append>
                  <v-icon
                    v-if="showPassword"
                    color="neutral"
                    class="mt-1"
                    @click="showPassword = !showPassword"
                    >mdi-eye-outline</v-icon
                  >
                  <v-icon
                    v-else
                    color="neutral"
                    class="mt-1"
                    @click="showPassword = !showPassword"
                    >mdi-eye-off-outline</v-icon
                  >
                </template>
              </v-text-field>
              <p
                v-if="loginFormErrors.password"
                class="semantic_error--text error-msg-small mb-0 text--overline"
              >
                {{ loginFormErrors.password }}
              </p>
              <div class="pb-3 d-flex align-center">
                <div class="local-account d-flex align-items-center">
                  <input
                    id="isSaveAccount"
                    type="checkbox"
                    v-model="saveAccount"
                  />
                  <label
                    for="isSaveAccount"
                    class="text--body-2 pl-2 neutral_color_sub1--text pointer"
                    >Lưu mật khẩu</label
                  >
                </div>
                <span
                  class="text--button primary--text font-weight-500 ml-auto pointer"
                  @click="$router.push('/login?xcOn=tab-forgot-password')"
                  >Quên mật khẩu?</span
                >
              </div>
              <v-btn
                depressed
                color="primary"
                class="w-100 text-capitalize btn-login v-btn_n_ls"
                :loading="loadingLogin"
                @click="handleLogin"
              >
                Đăng nhập
              </v-btn>
              <p class="text-center text--body-2 mb-0 mt-8">
                Chưa có tài khoản?
                <span
                  class="primary--text pointer text--button font-weight-500"
                  @click="$router.push('/login?xcOn=tab-on-regis')"
                  >Đăng ký ngay</span
                >
              </p>
              <p
                v-if="loadingPermissionCheck"
                class="primary_lighter--text font-weight-medium my-3 text-center my-5"
              >
                Đang kiểm tra quyền của tài khoản. Vui lòng đợi trong giây lát
                ...
              </p>
            </div>
          </v-tab-item>
          <v-tab-item :value="`tab-forgot-password`">
            <ForgotPasswordTab :tab="tab" />
          </v-tab-item>
          <v-tab-item :value="`tab-on-regis`">
            <RegisterTab :set-form-login="setFormLogin" :tab="tab" />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-col>
  </v-row>
</template>

<script>
// import QrcodeVue from 'qrcode.vue';
import { mapGetters } from 'vuex';
import api from '@/services';
import RegisterTab from '@/components/Tabs/RegisterTab.vue';
import ForgotPasswordTab from '@/components/Tabs/ForgotPasswordTab.vue';
import { getCookie, setCookie, deleteCookie } from '@/helpers/customizeCookie';
export default {
  name: 'login-app',
  components: {
    RegisterTab,
    ForgotPasswordTab
  },
  data() {
    return {
      qrCode: '',
      tab: 'tab-login',
      isDev: process.env.VUE_APP_ENVIRONMENT === 'DEV',
      LOGOUT_URL: process.env.VUE_APP_LOGOUT_URL,
      loadingLogin: false,
      loadingPermissionCheck: false,
      showPassword: false,
      saveAccount: false,
      errorLoginResponse: '',
      form: {
        email: '',
        password: ''
      },
      loginFormErrors: {},
      qrCodeMsg: 'Đang khởi tạo QR code. Vui lòng đợi trong giây lát ...'
    };
  },
  head: {
    title: 'Đăng nhập',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Đăng nhập'
      }
    ]
  },
  computed: {
    ...mapGetters({
      userFromAuth: 'userFromAuth',
      isAuth: 'isAuth'
    }),
    logoURL() {
      return process.env.VUE_APP_LOGIN_LOGO;
    }
  },
  watch: {
    isAuth: {
      deep: true,
      handler() {
        if (this.isAuth) {
          const query = this.$route.query;
          console.log(query);
          if (query.c && !query.c.includes('login')) {
            this.$router.push(`${query.c}`);
          } else {
            this.$router.push('/');
          }
        }
      }
    },
    $route() {
      if (this.$route.query.xcOn) {
        if (
          ['tab-login', 'tab-forgot-password', 'tab-on-regis'].includes(
            this.$route.query.xcOn
          )
        ) {
          this.tab = this.$route.query.xcOn;
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.xcOn) {
      if (
        ['tab-login', 'tab-forgot-password', 'tab-on-regis'].includes(
          this.$route.query.xcOn
        )
      ) {
        this.tab = this.$route.query.xcOn;
      }
    }
    this.checkCookie();
    const userAccount = getCookie('userAccount');
    const userPassword = getCookie('userPassword');
    const userSaved = getCookie('userSaved');
    if (userAccount && userPassword && userSaved) {
      this.form.login = userAccount;
      this.form.password = userPassword;
      this.saveAccount = userSaved;
    }
    // this.initQr();
    if (this.isAuth) {
      const query = this.$route.query;
      console.log(query);
      if (query.c && !query.c.includes('login')) {
        this.$router.push(`${query.c}`);
      } else {
        this.$router.push('/');
      }
    }
  },

  created() {},

  methods: {
    setFormLogin(_data) {
      this.form.login = _data.login;
      this.form.password = _data.password;
      this.saveAccount = true;
    },
    focusPassword() {
      try {
        document.querySelector('#formPassword').focus();
      } catch (error) {
        console.log(error);
      }
    },
    onChangeTheme() {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      this.$vuetify.theme.themes.light.primary = `#${randomColor}`;
    },
    loginFormValidate() {
      return new Promise((resolve) => {
        this.loginFormErrors = {};
        if (!this.form.login || !String(this.form.login).trim()) {
          this.loginFormErrors = {
            ...this.loginFormErrors,
            email: 'Đăng nhập thất bại. Không được để trống tên đăng nhập'
          };
          resolve(false);
          return;
        }
        if (!this.form.password || !String(this.form.password).trim()) {
          this.loginFormErrors = {
            ...this.loginFormErrors,
            password: 'Đăng nhập thất bại. Không được để trống mật khẩu'
          };
          resolve(false);
          return;
        }
        resolve(true);
      });
    },
    async getGroupChat() {},
    async handleLogin() {
      const valid = await this.loginFormValidate();
      if (!valid) {
        return;
      }
      this.errorLoginResponse = '';
      this.loadingLogin = true;
      this.loadingPermissionCheck = true;
      const body = {
        ...this.form
      };
      const res = await api.user.loginUser(body);
      this.loadingLogin = false;

      if (!res) {
        this.$store.commit(
          'toast/getError',
          'Đăng nhập thất bại. Liên hệ IT để được hỗ trợ. Code 01'
        );
      }
      try {
        if (res.status && res.status > 199 && res.status < 400) {
          const resMe = await api.user.getUserInfo(res.data.data.token);
          this.loadingPermissionCheck = false;
          if (resMe.status && resMe.status > 199 && resMe.status < 400) {
            const authSet = {
              isAuth: true,
              user: resMe.data.data.customer,
              token: `Bearer ${res.data.data.token}`
            };
            this.$store.commit('SET_USER_LOGGEDIN', authSet);

            if (this.saveAccount) {
              setCookie('userAccount', this.form.login);
              setCookie('userPassword', this.form.password);
              setCookie('userSaved', this.saveAccount);
            } else {
              deleteCookie('userAccount');
              deleteCookie('userPassword');
              deleteCookie('userSaved');
            }
            setCookie(
              'auth.user.permission',
              res.data.data.application_access_permissions
            );
            setCookie('token', res.data.data.token);
          } else {
            deleteCookie('auth.user.permission');
            deleteCookie('token');
            const msg =
              'Đăng nhập thất bại: ' +
              (resMe.data.message || String(resMe)) +
              ' Code 02';
            console.log(this.$store);
            this.$store.commit('toast/getError', msg);
          }
          // this.$router.push('/');
        } else {
          deleteCookie('auth.user.permission');
          deleteCookie('token');
          const msg =
            'Đăng nhập thất bại: ' +
            (res.data.message || String(res)) +
            ' Code 02';
          console.log(this.$store);
          this.$store.commit('toast/getError', msg);
        }
      } catch (error) {
        console.log(error);
        const msg = 'Đăng nhập thất bại: ' + String(error) + ' Code 03';
        console.log(msg);
        this.$store.commit('toast/getError', msg);
      }
    },
    async checkCookie() {
      const currentCookies = document.cookie;
      const cookiesArray = currentCookies.split(';').map((o) => {
        const ar = o.split('=');
        return {
          key: ar[0],
          val: ar[1]
        };
      });
      const f = cookiesArray.filter((o) => {
        return o.key === 'token' || o.key === ' token';
      });

      if (
        cookiesArray.some((o) => {
          return o.key === 'token' || o.key === ' token';
        }) &&
        f.some((o) => {
          return o.val === 'removed';
        })
      ) {
        document.cookie =
          'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        const currentUrl = window.location.origin;
        if (!this.isDev) {
          window.location = this.LOGOUT_URL + `?continue=${currentUrl}`;
        }
        return;
      }
      if (
        cookiesArray.some((o) => {
          return o.key === 'token' || o.key === ' token';
        })
      ) {
        const token = cookiesArray.filter((o) => {
          return o.key === 'token' || o.key === ' token';
        })[0];
        setCookie('token', token.val);

        const res = await api.user.getUserInfo(token.val);

        if (!res) {
          localStorage.removeItem('token');
          deleteCookie('token');
          return;
        }
        try {
          if (res.status && res.status > 199 && res.status < 400) {
            const localCToken = getCookie('token');
            const authSet = {
              isAuth: true,
              user: res.data.data.user,
              token: `${localCToken}`
            };
            this.$store.commit('SET_USER_LOGGEDIN', authSet);
            const query = this.$route.query;
            console.log(query);
            if (query.c && !query.c.includes('login')) {
              this.$router.push(`${query.c}`);
            } else {
              this.$router.push('/');
            }
          } else {
            const msg =
              'Đăng nhập thất bại: ' +
              (res.data.message || String(res) || ' Try again');
            this.$store.commit('toast/getError', msg);
            localStorage.removeItem('token');
            deleteCookie('token');
            return;
          }
        } catch (error) {
          const msg = 'Đăng nhập thất bại: ' + String(error);
          this.$store.commit('toast/getError', msg);
        }
      } else {
        const currentUrl = window.location.origin;
        if (!this.isDev) {
          window.location = this.LOGOUT_URL + `?continue=${currentUrl}`;
        }
      }
    },
    async initQr() {
      // const _this = this
      const res = await api.user.qrCreate();
      if (!res) {
        this.qrCodeMsg = 'Khởi tạo QR code thất bại. Vui lòng thử lại.';
        // this.$store.commit(
        //   'toast/getError',
        //   'Khởi tạo QR code thất bại. Lỗi đường truyền, vui lòng thử lại.'
        // );
        return;
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.qrCode = JSON.stringify(res.data.data);
          // console.log(this.socket, 'this socket');
          // this.$socket.emit('subscribe', {
          //   channel: res.data.data.channel
          // });
          // this.sockets.subscribe('QrLoginEvent', (_channel, data) => {
          //   console.log('qr code thành công', data);
          // });
          // channel.on('QrLoginEvent', async function (_channel, data) {
          //   console.log('qr code thành công', data);
          //   await _this.$auth.setUserToken(data.token);
          //   await _this.$auth.setUser(data.user);
          //   _this.tryLog();
          //   channel.emit('unsubscribe', {
          //     channel: res.data.data.channel
          //   });
          // });
          // channel.on('qrloginevent', async function (_channel, data) {
          //   console.log('qr code thành công', data);
          //   await _this.$auth.setUserToken(data.token);
          //   await _this.$auth.setUser(data.user);
          //   localStorage.setItem('remember_me', true);
          //   _this.tryLog();
          //   channel.emit('unsubscribe', {
          //     channel: res.data.data.channel
          //   });
          // });
          return;
        }
        const msg =
          'Khởi tạo QR code thất bại. ' +
          (res.data.message || String(res) || 'Vui lòng thử lại');
        this.$store.commit('toast/getError', msg);
        this.qrCodeMsg = 'Khởi tạo QR code thất bại. Vui lòng thử lại.';
      } catch (error) {
        this.$store.commit(
          'toast/getError',
          'Khởi tạo QR code thất bại. Lỗi xử lí dữ liệu, vui lòng thử lại.'
        );
      }
    },
    getQrSize() {
      if (window.innerHeight >= 1240) {
        return 280;
      } else {
        return 210;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-left-side {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    z-index: 2;
  }
}
.login-right-side {
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  .logo-txt {
    font-size: 24px !important;
  }
  .login-tab-controls {
    max-width: 300px;
    margin-top: 12px;
    max-height: 70px;
  }
  .v-tab {
    font-weight: 700;
    font-size: 18px;
    text-transform: none;
    letter-spacing: 0 !important;
    line-height: 2.5;
  }
  .tab-login__wr {
    padding: 12px 0 0;
    width: 100%;
    .login-input {
      height: 60px !important;
    }
  }
  .btn-login {
    width: 100%;
    display: block;
    height: 44px !important;
    font-size: 16px;
  }
}
.login-w-wr {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 16px 46px;
  border-radius: 8px;
  max-width: 550px;
  width: 98vw;
  margin: auto;
}
.login-logo-svg {
  margin-top: 24px;
  margin-bottom: 16px;
  width: 160px;
  height: 160px;
  aspect-ratio: 1;
}
.cr-switch {
  display: block;
  margin: 16px 0px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
}
</style>
<style lang="scss">
.v-text-field_n_details {
  .v-text-field__details {
    display: none;
  }
}
.v-text-field_n_minheight {
  .v-input__slot {
    min-height: 32px !important;
  }
}
.v-btn_n_ls {
  .v-btn__content {
    letter-spacing: 0;
  }
}
.login-input {
  .v-input__slot {
    height: 48px !important;
  }
}
</style>
