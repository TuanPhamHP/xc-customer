<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card class="pb-4">
      <p
        class="d-flex align-center justify-between primary white--text text--h6 px-4 py-2"
      >
        Thông tin tài khoản

        <v-icon class="pointer ml-auto" color="white" @click="closeDialog"
          >mdi-close</v-icon
        >
      </p>
      <div class="selectedDetailUser-infomation d-flex align-start px-4">
        <div class="inner-info-body w-100">
          <div class="each-inner-info px-0 py-2 d-flex flex-column">
            <span class="black--text text--subtitle-1 fw-500 info-label">
              Mật khẩu hiện tại<span class="semantic_error--text">*</span></span
            >
            <div class="w-100">
              <v-text-field
                id="rformPassword"
                v-model="form.c_password"
                autocomplete="off"
                label=""
                placeholder="Mật khẩu ít nhất có 8 - 20 ký tự bao gồm chữ và số"
                color="primary"
                :type="showPasswordA ? 'text' : 'password'"
                hide-details
                outlined
                dense
                :class="userInfoErrors.c_password ? 'error-border' : ''"
                class="v-text-field_n_details login-input font-size-14 mb-0 input-text-fieldset-normalize"
              >
                <template #append>
                  <v-icon
                    v-if="showPasswordA"
                    tabindex="-1"
                    color="neutral"
                    class="mt-1"
                    @click="showPasswordA = !showPasswordA"
                    >mdi-eye-outline</v-icon
                  >
                  <v-icon
                    v-else
                    tabindex="-1"
                    color="neutral"
                    class="mt-1"
                    @click="showPasswordA = !showPasswordA"
                    >mdi-eye-off-outline</v-icon
                  >
                </template>
              </v-text-field>
              <p
                v-if="flagSubmit && userInfoErrors.c_password"
                class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
              >
                {{ userInfoErrors.c_password }}
              </p>
            </div>
          </div>

          <!--  -->
          <div class="each-inner-info px-0 py-2 d-flex flex-column">
            <span class="black--text text--subtitle-1 fw-500 info-label">
              Mật khẩu mới<span class="semantic_error--text">*</span></span
            >
            <div class="w-100">
              <v-text-field
                id="rformPassword"
                v-model="form.password"
                autocomplete="off"
                label=""
                placeholder="Mật khẩu ít nhất có 8 - 20 ký tự bao gồm chữ và số"
                color="primary"
                :type="showPasswordC ? 'text' : 'password'"
                hide-details
                outlined
                dense
                :class="userInfoErrors.password ? 'error-border' : ''"
                class="v-text-field_n_details login-input font-size-14 mb-0 input-text-fieldset-normalize"
              >
                <template #append>
                  <v-icon
                    v-if="showPasswordC"
                    tabindex="-1"
                    color="neutral"
                    class="mt-1"
                    @click="showPasswordC = !showPasswordC"
                    >mdi-eye-outline</v-icon
                  >
                  <v-icon
                    v-else
                    tabindex="-1"
                    color="neutral"
                    class="mt-1"
                    @click="showPasswordC = !showPasswordC"
                    >mdi-eye-off-outline</v-icon
                  >
                </template>
              </v-text-field>
              <p
                v-if="flagSubmit && userInfoErrors.password"
                class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
              >
                {{ userInfoErrors.password }}
              </p>
            </div>
          </div>
          <div class="each-inner-info px-0 py-2 d-flex flex-column">
            <span class="black--text text--subtitle-1 fw-500 info-label">
              Nhập lại mật khẩu mới
              <span class="semantic_error--text">*</span></span
            >
            <div class="w-100">
              <v-text-field
                id="rformPassword"
                v-model="form.password_confirmation"
                autocomplete="off"
                label=""
                placeholder="Mật khẩu ít nhất có 8 - 20 ký tự bao gồm chữ và số"
                color="primary"
                :type="showPasswordC ? 'text' : 'password'"
                hide-details
                outlined
                dense
                :class="
                  userInfoErrors.password_confirmation ? 'error-border' : ''
                "
                class="v-text-field_n_details login-input font-size-14 mb-0 input-text-fieldset-normalize"
                @keyup.exact.enter="onSubmit"
              >
                <template #append>
                  <v-icon
                    v-if="showPasswordC"
                    tabindex="-1"
                    color="neutral"
                    class="mt-1"
                    @click="showPasswordC = !showPasswordC"
                    >mdi-eye-outline</v-icon
                  >
                  <v-icon
                    v-else
                    tabindex="-1"
                    color="neutral"
                    class="mt-1"
                    @click="showPasswordC = !showPasswordC"
                    >mdi-eye-off-outline</v-icon
                  >
                </template>
              </v-text-field>
              <p
                v-if="flagSubmit && userInfoErrors.password_confirmation"
                class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
              >
                {{ userInfoErrors.password_confirmation }}
              </p>
            </div>
          </div>
          <div class="d-flex align-center mt-8">
            <v-btn
              width="120px"
              :color="'neutral_color_sub3'"
              class="rounded-md v-btn-normalize py-3 ml-auto white--text"
              depressed
              :disabled="loadingBtn"
              @click="closeDialog"
            >
              Hủy
            </v-btn>
            <v-btn
              width="120px"
              :color="'primary'"
              class="rounded-md v-btn-normalize py-3 ml-1"
              depressed
              :loading="loadingBtn"
              @click="onSubmit"
            >
              Cập nhật
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
// import { tStr } from 'validation_t/src';
import { mapGetters, mapState } from 'vuex';
import UserMix from '@/mixins/UserMix.js';
import api from '@/services';
import { setCookie } from '@/helpers/customizeCookie';
export default {
  mixins: [UserMix],
  props: {},
  data() {
    return {
      dialog: false,
      loadingCreatePrivateChat: false,
      form: {},
      flagSubmit: false,
      loadingBtn: false,
      showPasswordA: false,
      showPasswordC: false,
      userInfoErrors: {}
    };
  },
  computed: {
    ...mapState({
      showPasswordPopup: (state) => state.showPasswordPopup
    }),
    ...mapGetters({
      userFromAuth: 'userFromAuth',
      sysLanguage: 'sysLanguage'
    }),
    isMe() {
      return true;
    }
  },
  watch: {
    showPasswordPopup: {
      deep: true,
      handler() {
        this.form = {};
        this.dialog = this.showPasswordPopup;
      }
    },
    form: {
      deep: true,
      handler() {
        if (this.flagSubmit) {
          const obj = {};
          if (!this.form.c_password || !String(this.form.c_password).trim()) {
            obj.c_password = 'Không được để trống trường này';
          }
          if (!this.form.password || !String(this.form.password).trim()) {
            obj.password = 'Không được để trống trường này';
          } else {
            const rx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/gi;
            if (!this.form.password.match(rx)) {
              obj.password =
                'Mật khẩu từ 8 - 20 ký tự phải bao gồm cả chữ và số, không chứa ký tự đặc biệt';
            }
          }

          if (this.form.password_confirmation !== this.form.password) {
            obj.password_confirmation = 'Mật khẩu bạn nhập không trùng nhau';
          }
          if (
            !this.form.password_confirmation ||
            !String(this.form.password_confirmation).trim()
          ) {
            obj.password_confirmation = 'Không được để trống trường này';
          }

          this.userInfoErrors = obj;
        }
      }
    }
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$store.commit('SET_PASSWORD_POPUP', false);
    },
    async onSubmit() {
      const obj = {};
      this.flagSubmit = true;
      if (!this.form.c_password || !String(this.form.c_password).trim()) {
        obj.c_password = 'Không được để trống trường này';
      }
      if (!this.form.password || !String(this.form.password).trim()) {
        obj.password = 'Không được để trống trường này';
      } else {
        const rx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/gi;
        if (!this.form.password.match(rx)) {
          obj.password =
            'Mật khẩu từ 8 - 20 ký tự phải bao gồm cả chữ và số, không chứa ký tự đặc biệt';
        }
      }

      if (this.form.password_confirmation !== this.form.password) {
        obj.password_confirmation = 'Mật khẩu bạn nhập không trùng nhau';
      }
      if (
        !this.form.password_confirmation ||
        !String(this.form.password_confirmation).trim()
      ) {
        obj.password_confirmation = 'Không được để trống trường này';
      }

      this.userInfoErrors = obj;
      if (Object.keys(obj).length) {
        return;
      }
      const body = {
        current_password: this.form.c_password,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation
      };
      this.loadingBtn = true;
      const res = await api.user.changePassword(body);
      this.loadingBtn = false;
      if (!res) {
        this.$store.commit(
          'toast/getError',
          this.sysLanguage.snackbar.updatePasswordFail
        );
        return;
      }
      try {
        if (res.status && res.status >= 400) {
          this.$store.commit('toast/getError', res.data.message);
          return;
        }
        setCookie('userPassword', this.form.password);
        this.$store.commit(
          'toast/getSuccess',
          this.sysLanguage.snackbar.updatePasswordSuccess
        );
        this.$store.commit('SET_PASSWORD_POPUP', false);
      } catch (error) {
        this.$store.commit('toast/getError', `${error}`);
      }
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
    width: 100%;
    min-width: 100%;
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
