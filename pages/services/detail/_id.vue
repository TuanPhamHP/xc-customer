<template>
  <div class="px-4 my-0 mx-0 w-100 page-view-container detail-order-page">
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
        <p class="table-name text--h5 mb-0">
          Dịch vụ:
          {{
            detailData.service_type
              ? getFirstFieldFromArray(
                  listServices,
                  'id',
                  detailData.service_type,
                  'name'
                )
              : '---'
          }}
          <span
            :style="`color: ${
              detailData.status ? detailData.status.color : 'inherit'
            }`"
            >{{ detailData.status ? `(${detailData.status.name})` : '' }}</span
          >
        </p>
      </div>
      <div class="ls">
        <v-btn
          v-if="isOnDraft"
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
          v-if="isOnDraft"
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
    <v-tabs
      v-model="tab"
      background-color="transparent"
      class="header-tab"
      color="primary"
    >
      <v-tab class="v-tab-normalize text--h6 px-5"> Thông tin chung </v-tab>
      <v-tab class="v-tab-normalize text--h6 px-5"> Thông tin dịch vụ </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="bg-transparent pt-4 tab-fit-h">
      <v-tab-item>
        <v-row>
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" class="ls-td">
            <p class="block-label primary--text fw-500 text--h6 mb-2">
              Thông tin chung
            </p>
            <v-row class="white block-inputs px-0 py-0 mx-0 my-0 rounded-lg">
              <v-col cols="12" class="py-3 px-4 get-bill-wr">
                <v-radio-group
                  v-model="isGetBill"
                  :column="false"
                  :readonly="!isOnDraft"
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
                <v-col
                  cols="6"
                  xl="4"
                  lg="4"
                  md="4"
                  sm="6"
                  class="each-block-input py-0 px-2"
                >
                  <div class="block-item mb-3">
                    <span
                      class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1"
                    >
                      Mã dịch vụ<span class="semantic_error--text">*</span>
                    </span>
                    <TextFieldAutocomplete
                      :key="detailData.id"
                      :default-value="detailData.code || '---'"
                      :readonly="true"
                      :text-field-class="'neutral_color_sub4 v-text-field-text--body-2 neutral_color_sub1--text field-set-border-app'"
                      :placeholder="'Mã dịch vụ'"
                    />
                  </div>
                  <!--  -->
                </v-col>
                <v-col
                  cols="6"
                  xl="4"
                  lg="4"
                  md="4"
                  sm="6"
                  class="each-block-input py-0 px-2"
                >
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
                <v-col
                  cols="6"
                  xl="4"
                  lg="4"
                  md="4"
                  sm="6"
                  class="each-block-input py-0 px-2"
                >
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
                  cols="6"
                  xl="4"
                  lg="4"
                  md="4"
                  sm="6"
                  class="each-block-input py-0 px-2"
                >
                  <div class="block-item mb-3">
                    <span
                      class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1"
                    >
                      Ngày tạo<span class="semantic_error--text">*</span>
                    </span>
                    <TextFieldAutocomplete
                      :key="detailData.id"
                      :default-value="
                        detailData.created_at
                          ? formatDateDMY(detailData.created_at)
                          : '---'
                      "
                      :readonly="true"
                      :text-field-class="'neutral_color_sub4 v-text-field-text--body-2 neutral_color_sub1--text field-set-border-app'"
                      :placeholder="'Ngày tạo'"
                      :able-show-error="flagSubmit"
                      :rules="['required']"
                    />
                  </div>
                  <!--  -->
                </v-col>
                <v-col
                  v-if="isGetBill === 1"
                  cols="4"
                  class="each-block-input py-0 px-2"
                >
                  <div class="block-item mb-3">
                    <span
                      class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1"
                    >
                      Công ty<span class="semantic_error--text">*</span>
                    </span>
                    <TextFieldAutocomplete
                      v-if="isOnDraft"
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
                      @change-input="
                        (data) => (form = { ...form, company: data })
                      "
                    />
                    <TextFieldAutocomplete
                      v-else
                      :key="detailData.id"
                      :default-value="form.company ? form.company : '---'"
                      :readonly="true"
                      :text-field-class="'neutral_color_sub4 v-text-field-text--body-2 neutral_color_sub1--text field-set-border-app'"
                      :placeholder="'Công ty'"
                      :able-show-error="flagSubmit"
                      :rules="['required']"
                    />
                  </div>
                </v-col>
                <v-col
                  v-if="isGetBill === 1"
                  cols="4"
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
                      :text-field-class="`v-text-field-text--body-2 ${
                        isOnDraft ? '' : 'neutral_color_sub4'
                      }`"
                      :placeholder="'Địa chỉ'"
                      :readonly="!isOnDraft"
                      :able-show-error="flagSubmit"
                      :rules="[]"
                      @change-input="
                        (data) => (form = { ...form, address: data })
                      "
                    />
                  </div>
                </v-col>
                <!--  -->
                <v-col
                  v-if="isGetBill === 1"
                  cols="4"
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
                      :text-field-class="`v-text-field-text--body-2 ${
                        isOnDraft ? '' : 'neutral_color_sub4'
                      }`"
                      :placeholder="'Mã số thuế'"
                      :readonly="!isOnDraft"
                      :able-show-error="flagSubmit"
                      :rules="[]"
                      @change-input="(data) => (form = { ...form, tax: data })"
                    />
                  </div>
                </v-col>
                <!--  -->
                <v-col
                  v-if="isGetBill === 1"
                  cols="4"
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
                      :text-field-class="`v-text-field-text--body-2 ${
                        isOnDraft ? '' : 'neutral_color_sub4'
                      }`"
                      :placeholder="'Email'"
                      :readonly="!isOnDraft"
                      :able-show-error="flagSubmit"
                      :rules="[]"
                      @change-input="
                        (data) => (form = { ...form, email: data })
                      "
                    />
                  </div>
                </v-col>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item eager>
        <v-row>
          <!--  -->
          <v-col
            :key="detailData.id"
            cols="12"
            xl="6"
            lg="6"
            md="12"
            sm="12"
            class="ls-td"
          >
            <p class="block-label primary--text fw-500 text--h6 mt-1 mb-2">
              Thông tin dịch vụ
            </p>
            <Lift
              v-if="isOnDraft"
              :flag-submit="flagSubmit"
              :trigger-child="triggerChild"
              :detail-data="detailData"
              @resolve-data="onSubmit"
            />
            <ServiceInfoRegistered
              v-if="detailData.status && detailData.status.id === 2"
              :detail-data="detailData"
            />
            <p
              v-if="!isOnDraft"
              class="block-label primary--text fw-500 text--h6 mb-2 mt-3"
            >
              Thông tin thanh toán
            </p>

            <ServicePriceRegistered
              v-if="detailData.status && detailData.status.id === 2"
              :detail-data="detailData"
            />
          </v-col>
          <v-col
            v-if="detailData.status && detailData.status.id !== 1"
            cols="12"
            xl="6"
            lg="6"
            md="12"
            sm="12"
            class="ls-td"
          >
            <div class="d-flex align-center justify-space-between">
              <p class="block-label primary--text fw-500 text--h6 mt-1 mb-2">
                Thông tin điều phối
              </p>
              <div class="list-color d-flex align-center">
                <div
                  v-for="cl in truckColors"
                  :key="cl.id"
                  class="each-cl d-flex align-center"
                >
                  <div
                    class="color-block"
                    :style="`background-color: ${cl.color}`"
                  ></div>
                  <span class="color-text" :style="`color: ${cl.color}`">{{
                    cl.text
                  }}</span>
                </div>
              </div>
            </div>
            <Coordinate :detail-data="detailData" />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import TextFieldAutocomplete from '@/components/Layout/TextFieldAutocomplete.vue';
import Coordinate from '@/components/Services/Coordinate.vue';
import Lift from '@/components/Services/Lift.vue';
import ServiceInfoRegistered from '~/components/Services/ServiceInfoRegistered.vue';
import ServicePriceRegistered from '~/components/Services/ServicePriceRegistered.vue';
import objHandlerMixins from '@/mixins/objHandlerMixins.js';
import { formatDateDMY } from '@/helpers/dateFormater';
import api from '@/services';
export default {
  name: 'Service-Detail-Page',
  components: {
    TextFieldAutocomplete,
    Coordinate,
    ServiceInfoRegistered,
    ServicePriceRegistered,
    Lift
  },
  mixins: [objHandlerMixins],
  data() {
    return {
      tab: null,
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
      truckColors: [
        {
          id: 1,
          color: '#4d4d4d',
          text: 'Xe chưa vào bãi'
        },
        {
          id: 2,
          color: '#006838',
          text: 'Xe vào bãi'
        },
        {
          id: 3,
          color: '#D4AF34',
          text: 'Xe ra bãi'
        }
      ],
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
    }),
    isOnDraft() {
      return this.detailData.status && this.detailData.status.id === 1;
    }
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
    formatDateDMY(d) {
      return formatDateDMY(d);
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
      childData.service_jobs.forEach((o, idx) => {
        o.origin_plate_numbers.forEach((k) => {
          formData.append(`service_jobs[${idx}][origin_plate_numbers][]`, k);
        });
        o.destination_plate_numbers.forEach((k) => {
          formData.append(
            `service_jobs[${idx}][destination_plate_numbers][]`,
            k
          );
        });
        if (o.id) {
          formData.append(`service_jobs[${idx}][id]`, o.id);
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
          this.detailData = res.data.data.order;
          // this.$router.push('/services');
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
.detail-order-page {
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
  .tab-fit-h {
    height: calc(100vh - 230px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0px;
    }

    &::-webkit-scrollbar-track {
      background: #e6e6e6;
      border-radius: 0px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 0px;
      background: rgb(96, 96, 96);
    }
  }
  .header-tab {
    border-bottom: 1px solid #d5d5d5;
  }
  .list-color {
    gap: 16px;
    .each-cl {
      gap: 8px;
      .color-block {
        width: 20px;
        height: 20px;
        border-radius: 2px;
      }
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
