<template>
  <div class="service-info-registered-block">
    <v-row
      v-if="detailData && detailData.service"
      class="white block-inputs px-2 py-2 mx-0 my-0 rounded-lg fixed-border-app"
    >
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        class="each-block-input py-0 px-2"
      >
        <div class="block-item mb-3">
          <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
            Loại dịch vụ
          </span>
          <div
            class="fk-input neutral_color_sub4 text--body-2 d-flex align-center px-3 py-2"
          >
            {{
              detailData.service_type
                ? getServiceNameFromId(detailData.service_type)
                : ''
            }}
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        class="each-block-input py-0 px-2"
      >
        <div class="block-item mb-3">
          <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
            Loại hàng
          </span>
          <div
            class="fk-input neutral_color_sub4 text--body-2 d-flex align-center px-3 py-2"
          >
            {{ detailData.service.goods_type }}
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        class="each-block-input py-0 px-2"
      >
        <div class="block-item mb-3">
          <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
            Loại xe (Tấn)
          </span>
          <div
            class="fk-input neutral_color_sub4 text--body-2 d-flex align-center px-3 py-2"
          >
            {{ detailData.service.truck_category }}
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        class="each-block-input py-0 px-2"
      >
        <div class="block-item mb-3">
          <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
            Khối lượng hàng (Tấn)
          </span>
          <div
            class="fk-input neutral_color_sub4 text--body-2 d-flex align-center px-3 py-2"
          >
            {{ detailData.service.goods_weight }}
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        class="each-block-input py-0 px-2"
      >
        <div class="block-item mb-3">
          <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
            Yêu cầu bổ sung
          </span>
          <div class="d-flex flex-wrap align-start" style="gap: 8px">
            <div
              v-for="sv in addOnServicesUpdated"
              :key="sv.id"
              class="text--body-2 d-flex align-start choice-span px-2 py-1 neutral--text"
            >
              <pre class="text--body-2 neutral--text">{{
                sv.name ? formatStringLength(sv.name, 50) : ''
              }}</pre>
            </div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        class="each-block-input py-0 px-2"
      >
        <div class="block-item mb-3">
          <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
            Ngày sử dụng dịch vụ
          </span>
          <div
            class="fk-input neutral_color_sub4 text--body-2 d-flex align-center px-3 py-2"
          >
            {{
              detailData.service.service_date
                ? formatDateDMY(detailData.service.service_date)
                : '---'
            }}
            <v-icon class="ml-auto" color="neutral_color_sub2"
              >mdi-calendar-month-outline</v-icon
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import OrderMixins from '@/mixins/OrderMixins';
import objHandlerMixins from '@/mixins/objHandlerMixins';
import { formatDateDMY } from '@/helpers/dateFormater.js';

export default {
  name: 'coordinate-tab',
  mixins: [OrderMixins, objHandlerMixins],
  props: {
    detailData: {
      type: Object,
      default() {}
    }
  },
  computed: {
    ...mapState({
      listServices: (state) => state.listServices
    }),
    addOnServicesUpdated() {
      if (
        !this.detailData ||
        !this.detailData.service ||
        !this.detailData.service.additional_requirements.length
      ) {
        return [];
      }
      return this.detailData.service.additional_requirements.map((o) => {
        const obj = { ...o };
        if (obj.id !== 99) {
          return obj;
        } else {
          obj.name = obj.note;
          return obj;
        }
      });
    }
  },
  methods: {
    formatDateDMY(_d) {
      return formatDateDMY(_d);
    }
  }
};
</script>

<style lang="scss" scoped>
.service-info-registered-block {
  .fk-input {
    width: 100%;
    height: 38px;
    border: 1px solid #d5d5d5;
    border-color: #d5d5d5 !important;
    border-radius: 4px;
  }
  .choice-span {
    border: 1px solid;
    border-color: #d5d5d5 !important;
    border-radius: 4px;
    min-height: 32px;
  }
}
</style>
