<template>
  <div class="register-tab">
    <p class="primary--text text--h5 mb-0 text-center">Đăng ký thành viên</p>

    <div class="tab-register__wr w-100">
      <span class="text--subtitle-1 neutral--text mb-1 d-block font-weight-500"
        >Họ và tên <span class="semantic_error--text">*</span></span
      >
      <v-text-field
        v-model="form.name"
        autofocus
        autocomplete="off"
        label=""
        placeholder="Vui lòng nhập tên của bạn"
        color="primary"
        outlined
        dense
        :class="loginFormErrors.name ? 'error-border' : ''"
        class="v-text-field_n_details login-input font-size-14 mb-0 input-text-fieldset-normalize"
        @keypress.enter="focusPassword"
      ></v-text-field>
      <p
        v-if="loginFormErrors.name"
        class="semantic_error--text error-msg-small mb-0 text--overline"
      >
        {{ loginFormErrors.name }}
      </p>
      <span class="text--subtitle-1 neutral--text mb-1 d-block font-weight-500"
        >Số điện thoại <span class="semantic_error--text">*</span></span
      >
      <v-text-field
        v-model="form.phone"
        autocomplete="off"
        label=""
        placeholder="Vui lòng nhập số điện thoại của bạn"
        color="primary"
        outlined
        dense
        :class="loginFormErrors.phone ? 'error-border' : ''"
        class="v-text-field_n_details login-input font-size-14 mb-0 input-text-fieldset-normalize"
      ></v-text-field>
      <p
        v-if="loginFormErrors.phone"
        class="semantic_error--text error-msg-small mb-0 text--overline"
      >
        {{ loginFormErrors.phone }}
      </p>
      <span class="text--subtitle-1 neutral--text mb-1 d-block font-weight-500"
        >Email <span class="semantic_error--text">*</span></span
      >
      <v-text-field
        v-model="form.email"
        autocomplete="off"
        label=""
        placeholder="Vui lòng nhập email của bạn"
        color="primary"
        outlined
        dense
        :class="loginFormErrors.email ? 'error-border' : ''"
        class="v-text-field_n_details login-input font-size-14 mb-0 input-text-fieldset-normalize"
      ></v-text-field>
      <p
        v-if="loginFormErrors.email"
        class="semantic_error--text error-msg-small mb-0 text--overline"
      >
        {{ loginFormErrors.email }}
      </p>
      <span class="text--subtitle-1 neutral--text mb-1 d-block font-weight-500"
        >Mật khẩu<span class="semantic_error--text">*</span></span
      >
      <v-text-field
        id="rformPassword"
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

      <span class="text--subtitle-1 neutral--text mb-1 d-block font-weight-500"
        >Nhập lại mật khẩu<span class="semantic_error--text">*</span></span
      >
      <v-text-field
        id="formpassword_confirmation"
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
        class="w-100 text-capitalize btn-login mt-8 v-btn_n_ls"
        :loading="loadingBtn"
        @click="handleRegister"
      >
        Đăng ký
      </v-btn>
      <p class="text-center text--body-2 mb-0 mt-8">
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
    setFormLogin: {
      type: Function,
      default() {}
    },
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
      triggerValid: false,
      loadingBtn: false
    };
  },
  computed: {
    ...mapGetters({
      sysLanguage: 'sysLanguage'
    })
  },
  watch: {
    form: {
      deep: true,
      handler() {
        if (this.triggerValid) {
          const obj = {};
          if (!this.form.name || !String(this.form.name).trim()) {
            obj.name = 'Không được để trống trường này';
          } else {
            String(this.form.name).trim().length > 50
              ? (obj.name = 'Độ dài tên tối đa là 50 ký tự')
              : (() => {})();
          }
          if (!this.form.phone || !String(this.form.phone).trim()) {
            obj.phone = 'Không được để trống trường này';
          } else {
            const rx =
              /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/gi;
            if (!this.form.phone.match(rx)) {
              obj.phone = 'Số điện thoại không đúng định dạng';
            }
          }
          if (!this.form.email || !String(this.form.email).trim()) {
            obj.email = 'Không được để trống trường này';
          } else {
            const validEmail = tStr.isEmail(this.form.email);
            if (!validEmail) {
              obj.email = 'Email không đúng định dạng';
            }
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
          this.loginFormErrors = obj;
        }
      }
    },
    tab() {
      this.resetForm();
    }
  },
  methods: {
    resetForm() {
      this.form = {};
      this.loginFormErrors = {};
      this.loadingBtn = false;
      this.triggerValid = false;
    },
    async handleRegister() {
      const obj = {};
      this.triggerValid = true;
      if (!this.form.name || !String(this.form.name).trim()) {
        obj.name = 'Không được để trống trường này';
      } else {
        String(this.form.name).trim().length > 50
          ? (obj.name = 'Độ dài tên tối đa là 50 ký tự')
          : (() => {})();
      }
      if (!this.form.phone || !String(this.form.phone).trim()) {
        obj.phone = 'Không được để trống trường này';
      } else {
        const rx =
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/gi;
        if (!this.form.phone.match(rx)) {
          obj.phone = 'Số điện thoại không đúng định dạng';
        }
      }
      if (!this.form.email || !String(this.form.email).trim()) {
        obj.email = 'Không được để trống trường này';
      } else {
        const validEmail = tStr.isEmail(this.form.email);
        if (!validEmail) {
          obj.email = 'Email không đúng định dạng';
        }
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
      this.loginFormErrors = obj;
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
    }
  }
};
</script>

<style></style>
