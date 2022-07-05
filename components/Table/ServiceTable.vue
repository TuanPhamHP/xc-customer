<template>
  <div class="white table-container neutral_color_sub4--text rounded-lg">
    <table class="w-100 rounded-lg stripe">
      <thead>
        <tr class="neutral_color_sub4">
          <th class="neutral--text fw-500">Trạng thái</th>
          <th class="neutral--text fw-500">Mã dịch vụ</th>
          <th class="neutral--text fw-500">Loại dịch vụ</th>
          <th class="neutral--text fw-500">Biển số xe</th>
          <th class="neutral--text fw-500">Ngày tạo</th>
          <th class="neutral--text fw-500">Loại hàng</th>
          <th class="neutral--text fw-500">Giá dịch vụ (VNĐ)</th>
          <th style="width: 60px; min-width: 60px"></th>
        </tr>
      </thead>
      <tbody v-if="!firstLoading">
        <tr
          v-for="(order, idx) in listData"
          :key="order.id"
          :class="idx % 2 ? 'neutral_color_sub5' : ''"
        >
          <td
            class="text-center text--subtitle-1 fw-500"
            :style="`color:${order.status ? order.status.color : ''}`"
          >
            {{ order.status ? order.status.name : '' }}
          </td>
          <td
            class="text-center text--subtitle-1 primary--text pointer hover-underline"
            @click="handleRedirect(order)"
          >
            {{ order.code || '---' }}
          </td>
          <td class="text-center text--subtitle-1 neutral--text">
            {{
              order.service
                ? getFirstFieldFromArray(
                    listServices,
                    'id',
                    order.service_type,
                    'name'
                  )
                : '---'
            }}
          </td>
          <td class="text-center text--subtitle-1 primary--text">
            <v-menu open-on-hover bottom offset-y content-class="no-box-shadow">
              <template v-slot:activator="{ on, attrs }">
                <p
                  class="mb-0 text-center text--subtitle-1 primary--text"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{
                    order.service ? order.service.service_jobs.length : '---'
                  }}
                </p>
              </template>

              <div
                v-if="order.service && order.service.service_jobs"
                class="license-plates-dropdown"
              >
                <div class="inner-dropdown white">
                  <div class="d-header d-flex align-center">
                    <div
                      class="mb-0 plate-item w-50 white--text primary text-center text--subtitle-1"
                    >
                      Biển số xe Trung Quốc
                    </div>
                    <div
                      class="mb-0 plate-item w-50 white--text primary text-center text--subtitle-1"
                    >
                      Biển số xe Việt Nam
                    </div>
                  </div>
                  <div class="d-body">
                    <div
                      v-for="item in order.service.service_jobs"
                      :key="item.id"
                      class="each-row d-flex"
                    >
                      <div
                        class="mb-0 plate-item w-50 neutral--text text-center text--subtitle-1"
                      >
                        <span
                          v-for="(pl, idx) in item.origin_plate_numbers"
                          :key="idx"
                          class="span-plate px-1 rounded-lg neutral_color_sub5 mx-1 my-1"
                          >{{ pl }}</span
                        >
                      </div>
                      <div
                        class="mb-0 plate-item w-50 neutral--text text-center text--subtitle-1"
                      >
                        <span
                          v-for="(pl, idx) in item.destination_plate_numbers"
                          :key="idx"
                          class="span-plate px-1 rounded-lg neutral_color_sub5 mx-1 my-1"
                          >{{ pl }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-menu>
          </td>
          <td class="text-center text--subtitle-1 neutral--text">
            {{ order.created_at ? formatDateHMDMY(order.created_at) : '---' }}
          </td>
          <td class="text-center text--subtitle-1 neutral--text">
            {{ order.service ? order.service.goods_type : '---' }}
          </td>
          <td class="text-center text--subtitle-1 neutral--text">
            {{ order.paid_amount }}
          </td>
          <td>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="neutral"
                  class="d-block mx-auto"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  icon
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <div class="white px-2 py-2 table-menu-actions">
                <p
                  class="item d-flex align-center m-0 pointer text--body-1 neutral_color_sub1--text py-1 mb-1"
                  @click="handleRedirect(order)"
                >
                  <v-icon color="primary" class="mr-2">mdi-information</v-icon>
                  Chi tiết phiếu
                </p>
                <p
                  class="item d-flex align-center m-0 pointer text--body-1 neutral_color_sub1--text py-1 mb-1"
                  @click="setDataRemove(order)"
                >
                  <v-icon color="semantic_error" class="mr-2"
                    >mdi-delete-forever</v-icon
                  >
                  Huỷ phiếu
                </p>
                <p
                  class="item d-flex align-center m-0 pointer text--body-1 neutral_color_sub1--text py-1 mb-0"
                  :class="idx % 2 ? 'disabled pointer-events-none' : ''"
                  @click="setDataFeedback(order)"
                >
                  <v-icon color="primary" class="mr-2"
                    >mdi-message-alert</v-icon
                  >
                  Feedback
                </p>
              </div>
            </v-menu>
          </td>
        </tr>
        <tr v-if="!firstLoading && (!listData || !listData.length)">
          <td
            v-if="isSearch"
            colspan="99"
            class="text-center neutral_color_sub3--text text--h5 py-9"
          >
            Không có dữ liệu phù hợp.
          </td>
          <td
            v-else
            colspan="99"
            class="text-center neutral_color_sub3--text text--h5 py-9"
          >
            Không có dữ liệu.
          </td>
        </tr>
      </tbody>
      <TableFirstLoading v-if="firstLoading" />
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TableFirstLoading from '../Loader/TableFirstLoading.vue';
import { formatDateHMDMY } from '@/helpers/dateFormater.js';
import objHandlerMixins from '@/mixins/objHandlerMixins.js';
export default {
  components: { TableFirstLoading },
  mixins: [objHandlerMixins],
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      }
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    firstLoading: {
      type: Boolean,
      default: true
    },
    setDataRemove: {
      type: Function,
      default() {}
    },
    setDataFeedback: {
      type: Function,
      default() {}
    }
  },
  computed: {
    ...mapState({
      listServices: (state) => state.listServices
    })
  },
  methods: {
    formatDateHMDMY(_date) {
      return formatDateHMDMY(_date);
    },
    handleRedirect(order) {
      if (order.service) {
        this.$router.push(`/services/detail/${order.id}`);
      } else {
        this.$router.push(`/services/register/${order.id}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  table {
    border: 1px solid;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid #d5d5d5;
    }
  }
}
.table-menu-actions {
  min-width: 175px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  .item:hover {
    background-color: #d5d5d53c;
  }
  .item.disabled {
    filter: grayscale(1);
    opacity: 0.7;
  }
}
.license-plates-dropdown {
  border-collapse: collapse;
  width: 520px;
  position: relative;
  padding: 10px;
  .inner-dropdown {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    overflow: hidden;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 30px;
    border-top: 8px solid#0D7042;
    border-left: 8px solid#0D7042;
    border-bottom: 8px solid#0d704200;
    border-right: 8px solid#0d704200;
    border-radius: 4px;
    transform: translateY(3px) rotateZ(45deg);
  }
  .d-header {
    .plate-item {
      padding: 6px;

      &:nth-child(1) {
        border-right: 1px solid #d5d5d5 !important;
      }
    }
  }
  .d-body {
    .each-row {
      border-top: 1px solid #d5d5d5 !important;
    }
    .plate-item {
      padding: 4px;
      display: flex;
      flex-wrap: wrap;
      /* height: 100%; */
      .span-plate {
        height: fit-content;
        padding-top: 2px;
        padding-bottom: 2px;
        font-size: 14px;
      }
      &:nth-child(n + 1) {
        border-right: 1px solid #d5d5d5 !important;
      }
    }
  }
}
</style>
