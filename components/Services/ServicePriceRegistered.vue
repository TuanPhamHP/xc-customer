<template>
  <div class="service-info-registered-block">
    <v-row
      v-if="detailData && detailData.service"
      class="white block-inputs px-2 py-2 mx-0 my-0 rounded-lg fixed-border-app"
    >
      <v-col cols="12" class="each-block-input py-0 px-2">
        <div class="block-item mb-3">
          <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
            Giá dịch vụ (VNĐ)
          </span>
          <div
            class="fk-input neutral_color_sub4 text--body-2 d-flex align-center px-3 py-2"
          >
            {{ detailData.paid_amount }}
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import OrderMixins from '@/mixins/OrderMixins';
import { formatDateDMY } from '@/helpers/dateFormater.js';

export default {
  name: 'coordinate-tab',
  mixins: [OrderMixins],
  props: {
    detailData: {
      type: Object,
      default() {}
    }
  },
  computed: {
    ...mapState({
      listServices: (state) => state.listServices
    })
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
}
</style>
