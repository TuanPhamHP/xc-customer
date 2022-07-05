<template>
  <div class="coordinate-block rounded-lg fixed-border-app">
    <v-row class="white block-inputs px-2 py-2 mx-0 my-0 rounded-lg">
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
            Biển số xe Trung Quốc
          </span>
          <div
            class="fk-input text--body-2 d-flex align-center white--text px-3 py-2"
            :style="`background-color: ${'#006838'}`"
          >
            1
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
            Biển số xe Việt Nam
          </span>
          <div
            class="fk-input text--body-2 d-flex align-center white--text px-3 py-2"
            :style="`background-color: ${'#006838'}`"
          >
            1
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
            Tổ đội bốc xếp
          </span>
          <div
            class="fk-input neutral_color_sub4 text--body-2 d-flex align-center px-3 py-2"
          >
            1
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
            Phụ thu (VNĐ)
          </span>
          <div
            class="fk-input neutral_color_sub4 text--body-2 d-flex align-center px-3 py-2"
          >
            1
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
            Thành tiền
          </span>
          <div
            class="fk-input neutral_color_sub4 text--body-2 d-flex align-center px-3 py-2"
          >
            1
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'coordinate-tab',
  props: {
    detailData: {
      type: Object,
      default() {}
    }
  }
};
</script>

<style lang="scss" scoped>
.coordinate-block {
  .fk-input {
    width: 100%;
    height: 38px;
    border: 1px solid #d5d5d5;
    border-color: #d5d5d5 !important;
    border-radius: 4px;
  }
}
</style>
