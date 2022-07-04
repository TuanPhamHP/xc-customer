<template>
  <div class="px-4 my-0 mx-0 w-100 page-view-container">
    <div
      class="page-view-table--header mb-3 d-flex align-center justify-space-between"
    >
      <div class="rs d-flex align-items-center">
        <v-btn
          icon
          color="neutral_color_sub1"
          class="mr-3"
          @click="$router.push('/services')"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <p class="table-name text--h5 mb-0">Đăng ký dịch vụ</p>
      </div>
      <div class="ls">
        <v-btn
          text
          color="primary"
          outlined
          class="v-btn-text-normalize v-btn-outlined-primary-white text--btn px-3 mr-4"
          :loading="loadingSubmit && !isSend"
          :disabled="loadingSubmit && isSend"
          @click="startProccess(false)"
        >
          Lưu nháp
        </v-btn>
        <v-btn
          depressed
          color="primary"
          class="v-btn-text-normalize v-btn-outlined-primary-white text--btn px-3"
          :loading="loadingSubmit && isSend"
          :disabled="loadingSubmit && !isSend"
          @click="startProccess(true)"
        >
          Gửi phiếu
        </v-btn>
      </div>
    </div>
    <v-row>
      <v-col cols="6" xl="6" lg="6" md="12" sm="12" class="ls">
        <div class="d-flex align-center">
          <span class="text--subtitle-1 fw-500 white-space-nowrap mr-6">
            Mã dịch vụ <span class="semantic_error--text">*</span>
          </span>
          <v-text-field
            :value="detailData.code"
            class="neutral_color_sub4 field-set-border-app w-100"
            hide-details=""
            placeholder="Placeholder"
            outlined
            disabled
            readonly
            dense
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="6" xl="6" lg="6" md="12" sm="12" class="rs">
        <div class="d-flex align-center">
          <span class="text--subtitle-1 fw-500 white-space-nowrap mr-6">
            Loại dịch vụ <span class="semantic_error--text">*</span>
          </span>
          <div class="w-100">
            <v-autocomplete
              v-model="selectedService"
              :items="listServices"
              item-text="name"
              item-value="id"
              hide-details
              placeholder="Chọn dịch vụ"
              class="field-set-border-app w-100 v-autocomplete-no-box-shadow v-autocomplete-no-min-height v-autocomplete-formed"
              :class="flagSubmit && !selectedService ? 'error-border mb-1' : ''"
              solo
            ></v-autocomplete>
            <p
              v-if="flagSubmit && !selectedService"
              class="semantic_error--text error-msg-small err-mod mb-0 text--overline h-0"
            >
              Không được để trống trường này
            </p>
          </div>
        </div>
      </v-col>
      <v-col cols="6" xl="6" lg="6" md="12" sm="12" class="ls-td">
        <p
          class="block-label primary--text font-weight-bold text--subtitle-1 mb-2"
        >
          Thông tin chung
        </p>
        <v-row class="white block-inputs px-0 py-0 mx-0 my-0 rounded-lg">
          <v-col cols="12" class="py-3 px-4 get-bill-wr">
            <v-radio-group
              v-model="isGetBill"
              :column="false"
              hide-details
              class="mt-0"
            >
              <v-radio :value="1" class="ml-auto mr-8">
                <template #label>
                  <span
                    class="text--body-2"
                    :class="isGetBill === 1 ? 'primary--text' : ''"
                  >
                    Lấy hóa đơn</span
                  >
                </template>
              </v-radio>
              <v-radio :value="0">
                <template #label>
                  <span
                    class="text--body-2"
                    :class="isGetBill === 0 ? 'primary--text' : ''"
                  >
                    Không lấy hóa đơn</span
                  >
                </template>
              </v-radio>
            </v-radio-group>
          </v-col>
          <div class="d-flex w-100 flex-wrap mx-0 my-0 py-2 px-2">
            <v-col cols="6" class="each-block-input py-0 px-2">
              <div class="block-item mb-3">
                <span
                  class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1"
                >
                  Họ và tên<span class="semantic_error--text">*</span>
                </span>
                <TextFieldAutocomplete
                  :key="detailData.id"
                  :default-value="
                    detailData.customer ? detailData.customer.name : '---'
                  "
                  :readonly="true"
                  :text-field-class="'neutral_color_sub4 v-text-field-text--body-2 neutral_color_sub1--text field-set-border-app'"
                  :placeholder="'Họ và tên'"
                />
              </div>
              <!--  -->
            </v-col>
            <v-col cols="6" class="each-block-input py-0 px-2">
              <div class="block-item mb-3">
                <span
                  class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1"
                >
                  Điện thoại<span class="semantic_error--text">*</span>
                </span>
                <TextFieldAutocomplete
                  :key="detailData.id"
                  :default-value="
                    detailData.customer ? detailData.customer.phone : '---'
                  "
                  :readonly="true"
                  :text-field-class="'neutral_color_sub4 v-text-field-text--body-2 neutral_color_sub1--text field-set-border-app'"
                  :placeholder="'Số điện thoại'"
                  :able-show-error="flagSubmit"
                  :rules="['required']"
                />
              </div>
              <!--  -->
            </v-col>
            <v-col
              v-if="isGetBill === 1"
              cols="6"
              class="each-block-input py-0 px-2"
            >
              <div class="block-item mb-3">
                <span
                  class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1"
                >
                  Công ty<span class="semantic_error--text">*</span>
                </span>
                <TextFieldAutocomplete
                  :key="hotReload"
                  :default-value="form.company"
                  :text-field-class="'v-text-field-text--body-2'"
                  :placeholder="'Số điện thoại'"
                  :able-show-error="flagSubmit"
                  :list-items="listLocalCompany"
                  :item-key="'name'"
                  :item-text="'display_name'"
                  :select-on-focus="true"
                  :rules="['required']"
                  @select-data="selectedCompany"
                  @change-input="(data) => (form = { ...form, company: data })"
                />
              </div>
            </v-col>
            <v-col
              v-if="isGetBill === 1"
              cols="6"
              class="each-block-input py-0 px-2"
            >
              <!--  -->
              <div class="block-item mb-3">
                <span
                  class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1"
                >
                  Địa chỉ
                </span>
                <TextFieldAutocomplete
                  :key="hotReload"
                  :default-value="form.address"
                  :text-field-class="'v-text-field-text--body-2'"
                  :placeholder="'Địa chỉ'"
                  :able-show-error="flagSubmit"
                  :rules="[]"
                  @change-input="(data) => (form = { ...form, address: data })"
                />
              </div>
            </v-col>
            <!--  -->
            <v-col
              v-if="isGetBill === 1"
              cols="6"
              class="each-block-input py-0 px-2"
            >
              <div class="block-item mb-3">
                <span
                  class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1"
                >
                  Mã số thuế
                </span>
                <TextFieldAutocomplete
                  :key="hotReload"
                  :default-value="form.tax"
                  :text-field-class="'v-text-field-text--body-2'"
                  :placeholder="'Mã số thuế'"
                  :able-show-error="flagSubmit"
                  :rules="[]"
                  @change-input="(data) => (form = { ...form, tax: data })"
                />
              </div>
            </v-col>
            <!--  -->
            <v-col
              v-if="isGetBill === 1"
              cols="6"
              class="each-block-input py-0 px-2"
            >
              <div class="block-item mb-3">
                <span
                  class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1"
                >
                  Email
                </span>
                <TextFieldAutocomplete
                  :key="hotReload"
                  :default-value="form.email"
                  :text-field-class="'v-text-field-text--body-2'"
                  :placeholder="'Mã số thuế'"
                  :able-show-error="flagSubmit"
                  :rules="[]"
                  @change-input="(data) => (form = { ...form, email: data })"
                />
              </div>
            </v-col>
          </div>
        </v-row>
      </v-col>
      <!--  -->
      <v-col cols="6" xl="6" lg="6" md="12" sm="12" class="ls-td">
        <p
          class="block-label primary--text font-weight-bold text--subtitle-1 mb-2"
        >
          Thông tin dịch vụ
        </p>
        <Lift
          :flag-submit="flagSubmit"
          :trigger-child="triggerChild"
          :detail-data="detailData"
          @resolve-data="onSubmit"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import TextFieldAutocomplete from '@/components/Layout/TextFieldAutocomplete.vue';
import Lift from '@/components/Services/Lift.vue';
import api from '@/services';
export default {
  name: 'Service-Register-Page',

  components: { TextFieldAutocomplete, Lift },
  data() {
    return {
      contactSearchQuery: '',
      selectedService: null,
      form: {},
      isGetBill: 0,
      isSend: false,
      flagSubmit: false,
      loadingSubmit: false,
      loadingSend: false,
      loadingDraft: false,
      loadingDetail: false,
      detailData: {},
      listLocalCompany: [],
      triggerChild: 0,
      hotReload: 0
    };
  },
  head: {
    title: 'Chi tiết dịch vụ',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Chi tiết dịch vụ'
      }
    ]
  },
  computed: {
    ...mapState({
      listServices: (state) => state.listServices
    }),
    ...mapGetters({
      userFromAuth: 'userFromAuth',
      sysLanguage: 'sysLanguage'
    })
  },
  watch: {
    detailData: {
      deep: true,
      handler() {
        if (this.detailData.service_type) {
          this.selectedService = this.detailData.service_type;
        } else {
          this.selectedService = this.listServices[0].id;
        }
        this.isGetBill = +this.detailData.vat_invoice;
      }
    }
  },

  async mounted() {
    this.$store.commit('setListCrumb', [
      {
        name: 'Trang chủ',
        icon: 'mdi-home-outline',
        link: '/'
      },
      {
        name: 'Dịch vụ',
        icon: '',
        link: '/services'
      },
      {
        name: 'Đăng ký dịch vụ',
        icon: '',
        link: '/services'
      }
    ]);
    this.getDetailData();
    const localCompanies = await this.$repositories.companies.getAll();
    this.listLocalCompany = localCompanies;
  },
  methods: {
    dirtyWait(ms = 100) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, ms);
      });
    },
    saveLocalCompany() {
      const obj = {
        id: new Date().getTime(),
        name: this.form.company,
        address: this.form.address,
        tax_number: this.form.tax,
        email: this.form.email,
        display_name: `${this.form.company} - ${this.form.address} - ${this.form.tax} - ${this.form.email}`
      };
      this.$repositories.companies.add(obj);
    },
    async startProccess(isSend) {
      this.isSend = isSend;
      this.flagSubmit = true;
      await this.dirtyWait(100);
      const errCount = !!document.querySelectorAll('.error-border').length;
      if (errCount) {
        this.$store.commit(
          'toast/getError',
          'Vui lòng điền đủ thông tin trước khi tiếp tục'
        );
        return;
      }
      this.triggerChild += 1;
    },
    async onSubmit(childData) {
      this.flagSubmit = true;
      await this.dirtyWait(100);
      const errCount = !!document.querySelectorAll('.error-border').length;
      if (errCount) {
        this.$store.commit(
          'toast/getError',
          'Vui lòng điền đủ thông tin trước khi tiếp tục'
        );
        return;
      }
      const formData = new FormData();
      formData.append('vat_invoice', this.isGetBill);
      formData.append('service_type', this.selectedService);
      if (this.isGetBill) {
        formData.append('temp_contact[name]', this.form.company);
        formData.append('temp_contact[address]', this.form.address);
        formData.append('temp_contact[tax_number]', this.form.tax);
        formData.append('temp_contact[email]', this.form.email);
      }
      // child data
      formData.append('goods_type', childData.goods_type);
      formData.append('truck_category', childData.truck_category);
      formData.append('goods_weight', childData.goods_weight);
      formData.append('service_date', childData.service_date);
      childData.additional_requirement_ids.forEach((o) => {
        formData.append('additional_requirement_ids[]', o);
      });
      childData.temp_truck_pairs.forEach((o, idx) => {
        formData.append(
          `temp_truck_pairs[${idx}][origin_plate_number]`,
          o.origin_plate_number
        );
        formData.append(
          `temp_truck_pairs[${idx}][destination_plate_number]`,
          o.destination_plate_number
        );
        if (o.id) {
          formData.append(`temp_truck_pairs[${idx}][id]`, o.id);
        }
      });
      if (childData.additional_requirement_note) {
        formData.append(
          'additional_requirement_note',
          childData.additional_requirement_note
        );
      }

      this.loadingSubmit = true;
      const res = await api.order.update(this.$route.params.id, formData);

      this.loadingSubmit = false;
      if (!res) {
        this.$store.commit(
          'toast/getError',
          this.sysLanguage.snackbar.updateOrdersFail
        );
        return;
      }
      try {
        if (res.status && res.status >= 400) {
          this.$store.commit(
            'toast/getError',
            res.data.message || res.data.error
          );
          return;
        }
        // save company on local
        if (this.isGetBill) {
          this.saveLocalCompany();
        }
        //
        if (this.isSend) {
          const resSend = await api.order.send(this.$route.params.id);
          if (!resSend) {
            this.$store.commit(
              'toast/getError',
              this.sysLanguage.snackbar.sendOrdersFail
            );
            return;
          }
          if (res.status && res.status >= 400) {
            this.$store.commit(
              'toast/getError',
              res.data.message || res.data.error
            );
            return;
          }
          this.$store.commit(
            'toast/getSuccess',
            this.sysLanguage.snackbar.sendOrdersSuccess
          );
          this.$router.push('/services');
        } else {
          this.$store.commit(
            'toast/getSuccess',
            this.sysLanguage.snackbar.saveDraftOrdersSuccess
          );
          this.$router.push('/services');
        }
      } catch (error) {
        this.$store.commit('toast/getError', `${error}`);
      }
    },
    async getDetailData() {
      this.loadingDetail = true;

      const res = await api.order.getDetailData(this.$route.params.id);
      this.loadingDetail = false;
      if (!res) {
        this.$store.commit(
          'toast/getError',
          this.sysLanguage.snackbar.getOrdersFail
        );

        return;
      }
      try {
        if (res.status && res.status >= 400) {
          this.$store.commit(
            'toast/getError',
            res.data.message || res.data.error
          );
          return;
        }
        this.detailData = res.data.data.order;
        if (res.data.data.order.temp_contact) {
          const tempContact = res.data.data.order.temp_contact;
          this.form.company = tempContact.name;
          this.form.email = tempContact.email;
          this.form.tax = tempContact.tax_number;
          this.form.address = tempContact.address;
        }
      } catch (error) {
        this.$store.commit('toast/getError', `${error}`);
      }
    },
    selectedCompany(val) {
      this.hotReload += 1;
      this.form.company = val.name;
      this.form.email = val.email;
      this.form.tax = val.tax_number;
      this.form.address = val.address;
    }
  }
};
</script>

<style lang="scss" scoped>
.block-inputs {
  border: 1px solid;
  border-color: #d5d5d5 !important;
}
.get-bill-wr {
  border-bottom: 1px solid #d5d5d5;
  .v-input--radio-group__input {
    gap: 30px;
    justify-content: flex-end;
    .v-icon {
      font-size: 20px !important;
    }
  }
}
</style>
<style lang="scss">
.get-bill-wr {
  .v-input--radio-group__input {
    .v-icon {
      font-size: 20px !important;
    }
  }
}
</style>
