<template>
  <div class="forgot-password-tab">
    <div v-if="currentStep === 1" class="step1">
      <p class="primary--text text--h5 mb-2 text-center">Quên mật khẩu</p>
      <p class="black--text mb-0 text--body-1 mb-5 text-center">
        Vui lòng nhập email tài khoản của bạn. Chúng tôi sẽ gửi lại cho bạn mật
        khẩu đăng nhập ngẫu nhiên vào email của bạn.
      </p>
      <div class="tab-fwp__wr w-100">
        <v-text-field
          v-model="form.email"
          autofocus
          autocomplete="off"
          label=""
          placeholder="Vui lòng nhập email"
          color="primary"
          outlined
          dense
          :class="loginFormErrors.email ? 'error-border' : ''"
          class="v-text-field_n_details login-input font-size-14 mb-0 input-text-fieldset-normalize"
          @keyup.exact.enter="handleSendEmail"
        ></v-text-field>
        <p
          v-if="loginFormErrors.email"
          class="semantic_error--text error-msg-small mb-0 text--overline"
        >
          {{ loginFormErrors.email }}
        </p>

        <v-btn
          depressed
          color="primary"
          class="w-fit ml-auto d-block text-capitalize btn-login mt-4 v-btn_n_ls"
          :loading="loadingBtn"
          @click="handleSendEmail"
        >
          Tiếp tục
          <v-icon color="white" class="pl-2">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      <p class="text-center text--body-2 mb-0 mt-auto">
        Đã có tài khoản?
        <span
          class="primary--text pointer text--button font-weight-500"
          @click="$router.push('/login?xcOn=tab-login')"
          >Đăng nhập ngay</span
        >
      </p>
    </div>
    <div v-if="currentStep === 2" class="step2">
      <p class="primary--text text--h5 mb-2 text-center">Tạo mật khẩu mới</p>
      <p class="black--text mb-0 text--body-1 mb-5 text-center">
        Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
      </p>
      <!--  -->
      <span class="text--subtitle-1 neutral--text mb-1 d-block font-weight-500"
        >Mật khẩu mới<span class="semantic_error--text">*</span></span
      >
      <v-text-field
        id="fformPassword"
        v-model="form.password"
        autocomplete="off"
        label=""
        placeholder="Mật khẩu ít nhất có 8 - 20 ký tự bao gồm chữ và số"
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
            tabindex="-1"
            @click="showPassword = !showPassword"
            >mdi-eye-outline</v-icon
          >
          <v-icon
            v-else
            color="neutral"
            class="mt-1"
            tabindex="-1"
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

      <span class="text--subtitle-1 neutral--text mb-1 d-block font-weight-500"
        >Nhập lại mật khẩu mới<span class="semantic_error--text">*</span></span
      >
      <v-text-field
        id="fformpassword_confirmation"
        v-model="form.password_confirmation"
        autocomplete="off"
        label=""
        placeholder="Mật khẩu ít nhất có 8 - 20 ký tự bao gồm chữ và số"
        color="primary"
        :type="showPassword ? 'text' : 'password'"
        outlined
        dense
        :class="loginFormErrors.password_confirmation ? 'error-border' : ''"
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
        v-if="loginFormErrors.password_confirmation"
        class="semantic_error--text error-msg-small mb-0 text--overline"
      >
        {{ loginFormErrors.password_confirmation }}
      </p>

      <v-btn
        depressed
        color="primary"
        class="w-100 text-capitalize btn-login mt-6 v-btn_n_ls"
        :loading="loadingBtn"
        @click="handleResetPassword"
      >
        Hoàn thành
      </v-btn>
      <p class="text-center text--body-2 mb-0 mt-7">
        Đã có tài khoản?
        <span
          class="primary--text pointer text--button font-weight-500"
          @click="$router.push('/login?xcOn=tab-login')"
          >Đăng nhập ngay</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import { tStr } from 'validation_t/src';
import { mapGetters } from 'vuex';
import api from '@/services';
export default {
  props: {
    tab: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loginFormErrors: {},
      form: {},
      showPassword: false,
      loadingBtn: false,
      currentStep: 1,
      secCount: 0,
      refCount: 0,
      token: 'token-init'
    };
  },
  computed: {
    ...mapGetters({
      sysLanguage: 'sysLanguage'
    })
  },
  watch: {
    secCount() {
      if (!this.secCount) {
        clearInterval(this.refCount);
      }
    },
    tab() {
      this.resetForm();
    }
  },
  mounted() {
    this.resetForm();
  },
  methods: {
    resetForm() {
      this.currentStep = 1;
      this.loginFormErrors = {};
      this.form = {};
      this.showPassword = false;
      this.loadingBtn = false;
    },
    startCounDown() {
      this.secCount = 60;
      this.refCount = setInterval(() => {
        if (this.secCount) {
          this.secCount -= 1;
        }
      }, 1000);
    },
    async handleSendEmail() {
      const obj = {};
      if (!this.form.email || !String(this.form.email).trim()) {
        obj.email = 'Không được để trống trường này';
      } else {
        const validEmail = tStr.isEmail(this.form.email);
        if (!validEmail) {
          obj.email = 'Email không đúng định dạng';
        }
      }

      this.loginFormErrors = obj;
      if (Object.keys(obj).length) {
        return;
      }
      const body = {
        ...this.form
      };
      this.loadingBtn = true;
      const res = await api.user.resetPassword(body);
      this.loadingBtn = false;
      if (!res) {
        this.$store.commit(
          'toast/getError',
          this.sysLanguage.snackbar.resetPasswordFail
        );
        return;
      }
      try {
        if (res.status && res.status >= 400) {
          this.$store.commit('toast/getError', res.data.message);
          return;
        }

        this.currentStep = 2;
        this.$nextTick(() => {
          if (document.querySelector('#fformPassword')) {
            document.querySelector('#fformPassword').focus();
          }
        });
        this.token = '4b098299-2ef7-4109-9557-82f6004246a3';
        // this.$router.push('/login?xcOn=tab-login');
      } catch (error) {
        this.$store.commit('toast/getError', `${error}`);
      }
      // alert('pass');
    },
    async handleResetPassword() {
      const obj = {};
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
      this.loginFormErrors = obj;
      if (Object.keys(obj).length) {
        return;
      }
      const body = {
        password: this.form.password
      };
      this.loadingBtn = true;
      const res = await api.user.updatePassword(this.token, body);
      this.loadingBtn = false;
      if (!res) {
        this.$store.commit(
          'toast/getError',
          this.sysLanguage.snackbar.resetPasswordFail
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
          this.sysLanguage.snackbar.resetPasswordSuccess
        );
        this.$router.push('/login?xcOn=tab-login');
      } catch (error) {
        this.$store.commit('toast/getError', `${error}`);
      }
      // alert('pass');
    }
  }
};
</script>

<style lang="scss" scoped>
.forgot-password-tab {
  .tab-fwp__wr {
    min-height: 320px;
  }
  .step1 {
  }
}
</style>
