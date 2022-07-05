<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card class="pb-4">
      <p
        class="d-flex align-center justify-between primary white--text text--h6 px-4 py-2"
      >
        Thông tin tài khoản

        <v-icon class="pointer ml-auto" color="white" @click="clearSelectedUser"
          >mdi-close</v-icon
        >
      </p>
      <div class="selectedDetailUser-infomation d-flex align-start px-4">
        <div class="upper-info d-flex flex-column">
          <input
            id="inputAvatar"
            type="file"
            accept="image/*"
            class="d-none"
            @change="handlerAvatar"
          />
          <label class="avatar-user-component pointer" for="inputAvatar">
            <RegularAvatar
              :size="120"
              :abbr-name="selectedDetailUser.name"
              :image-url="
                selectedDetailUser.avatar ? selectedDetailUser.avatar.url : ''
              "
              :ext-class="'mx-auto'"
            />
            <span class="camera-ico">
              <v-icon color="white">mdi-camera-outline</v-icon>
            </span>
          </label>
          <span
            class="group-name font-weight-500 neutral--text text-center pt-1"
            >{{ selectedDetailUser.name }}
          </span>
          <p class="user-id neutral_color_sub1--text text-center mb-0">
            ID: {{ selectedDetailUser.id || '---' }}
          </p>
        </div>
        <div class="inner-info-body w-100">
          <div class="each-inner-info px-0 py-2 d-flex align-center">
            <span class="black--text text--subtitle-1 fw-500 info-label">
              Họ và tên</span
            >
            <div class="w-100">
              <input
                v-model="localUser.name"
                type="text"
                class="white input-border-app px-2 w-100 text--body-2 neutral_color_sub1--text"
                :class="
                  flagSubmit && userInfoErrors.name ? 'error-border mb-1' : ''
                "
                readonly
                placeholder="Họ và tên"
              />
              <p
                v-if="flagSubmit && userInfoErrors.name"
                class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
              >
                {{ userInfoErrors.name }}
              </p>
            </div>
          </div>

          <!--  -->
          <div class="each-inner-info px-0 py-2 d-flex align-center">
            <span class="black--text text--subtitle-1 fw-500 info-label">
              Số điện thoại</span
            >
            <div class="w-100">
              <input
                v-model="localUser.phone"
                type="text"
                class="white input-border-app px-2 w-100 text--body-2 neutral_color_sub1--text"
                :class="
                  flagSubmit && userInfoErrors.phone ? 'error-border mb-1' : ''
                "
                readonly
                placeholder="Số điện thoại"
              />
              <p
                v-if="flagSubmit && userInfoErrors.phone"
                class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
              >
                {{ userInfoErrors.phone }}
              </p>
            </div>
          </div>
          <div class="each-inner-info px-0 py-2 d-flex align-center">
            <span class="black--text text--subtitle-1 fw-500 info-label">
              Email</span
            >
            <div class="w-100">
              <input
                v-model="localUser.email"
                type="text"
                class="white input-border-app px-2 w-100 text--body-2 neutral_color_sub1--text"
                :class="
                  flagSubmit && userInfoErrors.email ? 'error-border mb-1' : ''
                "
                readonly
                placeholder="Email"
              />
              <p
                v-if="flagSubmit && userInfoErrors.email"
                class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
              >
                {{ userInfoErrors.email }}
              </p>
            </div>
          </div>
          <!-- <div class="d-flex align-center mt-8">
            <v-btn
              width="120px"
              :color="'neutral_color_sub3'"
              class="rounded-md v-btn-normalize py-3 ml-auto white--text"
              depressed
              @click="clearSelectedUser"
            >
              Hủy
            </v-btn>
            <v-btn
              width="120px"
              :color="'primary'"
              class="rounded-md v-btn-normalize py-3 ml-1"
              depressed
              @click="onSubmit"
            >
              Cập nhật
            </v-btn>
          </div> -->
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { tStr } from 'validation_t/src';
import { mapGetters, mapState } from 'vuex';
import UserMix from '@/mixins/UserMix.js';
import api from '@/services';
export default {
  mixins: [UserMix],
  props: {},
  data() {
    return {
      dialog: false,
      loadingCreatePrivateChat: false,
      localUser: {},
      flagSubmit: false,
      loadingAvatar: false,
      userInfoErrors: {}
    };
  },
  computed: {
    ...mapState({
      prefixUserName: (state) => state.prefixUserName,
      selectedDetailUser: (state) => state.users.selectedDetailUser
    }),
    ...mapGetters({
      userFromAuth: 'userFromAuth',
      sysLanguage: 'sysLanguage'
    }),
    isMe() {
      return this.selectedDetailUser.id === this.userFromAuth.id;
    }
  },
  watch: {
    selectedDetailUser: {
      deep: true,
      handler() {
        if (this.selectedDetailUser && this.selectedDetailUser.id) {
          this.dialog = true;
          this.localUser = { ...this.selectedDetailUser };
        } else {
          this.flagSubmit = false;
          this.dialog = false;
          this.localUser = {};
        }
      }
    },
    localUser: {
      deep: true,
      handler() {
        if (this.flagSubmit) {
          const obj = {};
          if (!this.localUser.name || !String(this.localUser.name).trim()) {
            obj.name = 'Không được để trống trường này';
          } else {
            String(this.localUser.name).trim().length > 50
              ? (obj.name = 'Độ dài tên tối đa là 50 ký tự')
              : (() => {})();
          }
          if (!this.localUser.phone || !String(this.localUser.phone).trim()) {
            obj.phone = 'Không được để trống trường này';
          } else {
            const rx =
              /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/gi;
            if (!this.localUser.phone.match(rx)) {
              obj.phone = 'Số điện thoại không đúng định dạng';
            }
          }
          if (!this.localUser.email || !String(this.localUser.email).trim()) {
            obj.email = 'Không được để trống trường này';
          } else {
            const validEmail = tStr.isEmail(this.localUser.email);
            if (!validEmail) {
              obj.email = 'Email không đúng định dạng';
            }
          }

          this.userInfoErrors = obj;
        }
      }
    }
  },
  mounted() {},
  methods: {
    clearSelectedUser() {
      this.$store.commit('users/setSelectedDetailUser', {});
    },
    async onSubmit() {
      const obj = {};
      this.flagSubmit = true;
      if (!this.localUser.name || !String(this.localUser.name).trim()) {
        obj.name = 'Không được để trống trường này';
      } else {
        String(this.localUser.name).trim().length > 50
          ? (obj.name = 'Độ dài tên tối đa là 50 ký tự')
          : (() => {})();
      }
      if (!this.localUser.phone || !String(this.localUser.phone).trim()) {
        obj.phone = 'Không được để trống trường này';
      } else {
        const rx =
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/gi;
        if (!this.localUser.phone.match(rx)) {
          obj.phone = 'Số điện thoại không đúng định dạng';
        }
      }
      if (!this.localUser.email || !String(this.localUser.email).trim()) {
        obj.email = 'Không được để trống trường này';
      } else {
        const validEmail = tStr.isEmail(this.localUser.email);
        if (!validEmail) {
          obj.email = 'Email không đúng định dạng';
        }
      }

      this.userInfoErrors = obj;
      if (Object.keys(obj).length) {
        return;
      }
      const body = {
        ...this.form
      };
      body.name = body.name.trim();
      this.loadingBtn = true;
      const res = await api.user.register(body);
      this.loadingBtn = false;
      if (!res) {
        this.$store.commit(
          'toast/getError',
          this.sysLanguage.snackbar.registerFail
        );
        return;
      }
      try {
        if (res.status && res.status >= 400) {
          this.$store.commit('toast/getError', res.data.message);
          return;
        }
        this.$store.commit(
          'toast/getSuccess',
          this.sysLanguage.snackbar.registerSuccess
        );
        this.setFormLogin({
          login: body.email,
          password: body.password
        });
        this.$router.push('/login?xcOn=tab-login');
      } catch (error) {
        this.$store.commit('toast/getError', `${error}`);
      }
    },
    handlerAvatar(e) {
      const files = e.target.files;
      files.length
        ? (() => {
            this.createImage(files[0]);
          })()
        : (() => {})();
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result;
        if (base64) {
          const payload = new FormData();
          payload.append('avatar', file);
          this.loadingAvatar = true;
          const res = await api.user.updateAvatar(payload);
          this.loadingAvatar = false;
          if (!res) {
            this.$store.commit(
              'toast/getError',
              this.sysLanguage.snackbar.updateAvatarFail
            );

            return;
          }
          try {
            if (res.status && res.status >= 400) {
              this.$store.commit('toast/getError', res.data.message);

              return;
            }
            this.$store.commit(
              'toast/getSuccess',
              this.sysLanguage.snackbar.updateAvatarSuccess
            );
            this.$store.commit('users/setSelectedDetailUser', {
              ...res.data.data.customer
            });
            this.$store.commit('HOTSET_USER', { ...res.data.data.customer });
          } catch (error) {
            this.$store.commit('toast/getError', `${error}`);
          }
        } else {
          console.log('failed');
        }
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>
<style lang="scss" scoped>
.upper-info {
  padding: 0;
  position: relative;
}
.user-id {
  font-size: 14px;
}
.each-inner-info {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  .info-label {
    width: 130px;
    min-width: 130px;
  }
  .info-desc {
    font-weight: 400;
    /* font-size: 14px; */
    line-height: 28px;
    text-align: right;
    letter-spacing: 0.0025em;
  }
}
.selectedDetailUser-infomation {
  gap: 16px;
}
.input-border-app {
  &:focus {
    outline: none !important;
  }
  &::placeholder {
    color: #9e9e9eae;
    font-weight: light;
  }
  height: 40px;
  border: 1px solid #d5d5d5;
  border-color: #d5d5d5 !important;
  border-radius: 4px;
}
.avatar-user-component {
  width: 120px;
  height: 120px;
  border-radius: 100%;
  position: relative;
  overflow: hidden;
  .camera-ico {
    height: 40px;
    background: rgba(26, 26, 26, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
<style lang="scss">
.v-btn-confirm {
  padding-left: 16px !important ;
  padding-right: 16px !important ;

  letter-spacing: 0.0125em !important;
}
body {
  .v-dialog > .v-card > .v-card__title {
    &.dialog-confirm-title {
      font-weight: 500;
      letter-spacing: 0.001em;
    }
  }
  .message-text {
    font-size: 16px;
    line-height: 24px;
    /* or 150% */

    letter-spacing: 0.005em;
  }
}
</style>
