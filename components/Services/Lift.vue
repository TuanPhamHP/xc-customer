<template>
  <v-row
    :key="forceUpdateKey"
    class="white block-inputs px-2 py-2 mx-0 my-0 rounded-lg"
  >
    <v-col cols="6" class="each-block-input py-0 px-2">
      <div class="block-item mb-3">
        <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
          Biển số xe Trung Quốc<span class="semantic_error--text">*</span>
        </span>
      </div>
      <!--  -->
    </v-col>
    <v-col cols="6" class="each-block-input py-0 px-2">
      <div class="block-item mb-3">
        <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
          Biển số xe Việt Nam<span class="semantic_error--text">*</span>
        </span>
      </div>
      <!--  -->
    </v-col>
    <v-row v-for="(plate, idx) in plates" :key="idx" class="mx-0 my-0 w-100">
      <v-col cols="6" class="each-block-input py-0 px-2">
        <div class="block-item mb-3">
          <input
            :id="`cn-plate-idx-${idx}`"
            type="text"
            class="white input-border-app text-uppercase px-2 w-100 text--body-2 neutral_color_sub1--text"
            :class="
              flagSubmit && !plate.cnPlates.length ? 'error-border mb-1' : ''
            "
            placeholder="Nhập biển số xe..."
            @keydown.exact.enter="onEnterKeyCn(idx)"
          />
          <div
            v-if="plate.cnPlates && plate.cnPlates.length"
            class="list-vnplate d-flex align-center flex-wrap mt-2"
          >
            <span
              v-for="(pl, idxe) in plate.cnPlates"
              :key="idxe + pl"
              class="text--body-2 each-vnplate px-2 py-1 neutral--text"
              >{{ pl }}
              <v-icon
                size="18"
                color="semantic_error"
                class="ml-1"
                tabindex="-1"
                @click="removeCnPlate(idx, pl)"
                >mdi-close</v-icon
              >
            </span>
          </div>
          <p
            v-if="
              flagSubmit && !plate.cnPlates.length && !plate.vnPlates.length
            "
            class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
          >
            Không được để trống trường này
          </p>
        </div>
        <!--  -->
      </v-col>
      <v-col cols="6" class="each-block-input py-0 px-2">
        <div class="block-item mb-3">
          <div class="d-flex align-center">
            <input
              :id="`vn-plate-idx-${idx}`"
              type="text"
              class="white input-border-app text-uppercase px-2 w-100 text--body-2 neutral_color_sub1--text"
              :class="
                flagSubmit && !plate.vnPlates.length ? 'error-border' : ''
              "
              placeholder="Nhập biển số xe..."
              @keydown.exact.enter="onEnterKey(idx)"
            />
            <v-btn icon :disabled="plates.length === 1">
              <v-icon
                color="semantic_error"
                class="ml-1"
                tabindex="-1"
                @click="removePlate(idx)"
                >mdi-delete-forever-outline</v-icon
              >
            </v-btn>
          </div>
          <div
            v-if="plate.vnPlates && plate.vnPlates.length"
            class="list-vnplate d-flex align-center flex-wrap mt-2"
          >
            <span
              v-for="(pl, idxe) in plate.vnPlates"
              :key="idxe + pl"
              class="text--body-2 each-vnplate px-2 py-1 neutral--text"
              >{{ pl }}
              <v-icon
                size="18"
                color="semantic_error"
                class="ml-1"
                tabindex="-1"
                @click="removeVnPlate(idx, pl)"
                >mdi-close</v-icon
              >
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-col cols="12" class="px-2 py-0 mb-5">
      <v-btn
        color="primary"
        class="v-btn-normalize no-box-shadow py-3 text--btn rounded-md"
        @click="addNewPlate"
        >Thêm biển số xe</v-btn
      >
    </v-col>
    <v-col cols="6" class="each-block-input py-0 px-2">
      <div class="block-item mb-3">
        <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
          Loại hàng<span class="semantic_error--text">*</span>
        </span>
        <TextFieldAutocomplete
          :key="+detailData.id"
          :tabindex="1"
          :default-value="goods_type"
          :text-field-class="'v-text-field-text--body-2'"
          :placeholder="'Loại hàng'"
          :able-show-error="flagSubmit"
          :able-show-item="false"
          :rules="['required']"
          @change-input="(data) => (goods_type = data)"
        />
      </div>
      <!--  -->
      <div class="block-item mb-3">
        <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
          Khối lượng hàng(Tấn)<span class="semantic_error--text">*</span>
        </span>
        <TextFieldAutocomplete
          :key="+detailData.id"
          :tabindex="3"
          :default-value="goods_weight"
          :text-field-class="'v-text-field-text--body-2'"
          :placeholder="'Khối lượng hàng'"
          :able-show-error="flagSubmit"
          :able-show-item="false"
          :rules="['required']"
          :type="'number'"
          @change-input="(data) => (goods_weight = data)"
        />
      </div>
      <!--  -->
      <div class="block-item mb-3">
        <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
          Ngày sử dụng dịch vụ<span class="semantic_error--text">*</span>
        </span>
        <DatePicker
          :key="+detailData.id"
          :single-date-picker="true"
          :show-ranges="false"
          :icon-prepend="false"
          :picked-date="pickedDate"
          :placeholder-class="'text--body-2'"
          :placeholder-wr-class="
            flagSubmit && !fromDate ? 'error-border mb-1' : ''
          "
          :placeholder-picker="'Ngày'"
          :format-default-date="'dmy'"
          :default-date="
            fromDate && toDate
              ? {
                  startDate: fromDate,
                  endDate: toDate
                }
              : {}
          "
          :picker-class="'page-filter-date-range'"
        />
        <p
          v-if="flagSubmit && !fromDate"
          class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
        >
          Không được để trống trường này
        </p>
      </div>
      <!--  -->
    </v-col>
    <v-col cols="6" class="each-block-input py-0 px-2 mb-3">
      <div class="block-item mb-3">
        <span class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1">
          Loại Xe (Tấn)
        </span>
        <TextFieldAutocomplete
          :key="+detailData.id"
          :tabindex="2"
          :default-value="vehicleType"
          :text-field-class="'v-text-field-text--body-2'"
          :placeholder="'Loại xe'"
          :able-show-error="flagSubmit"
          :able-show-item="false"
          :type="'number'"
          :rules="[]"
          @change-input="(data) => (vehicleType = data)"
        />
      </div>
      <!--  -->
      <div class="block-item mb-3">
        <span
          id="additionalChoice"
          class="text--subtitle-1 fw-500 white-space-nowrap d-block mb-1"
        >
          Yêu cầu bổ sung
        </span>
        <div>
          <div class="d-flex align-start" style="gap: 8px">
            <v-btn
              color="primary"
              class="v-btn-normalize no-box-shadow py-1 px-2 btn-no-mw text--btn rounded-md"
              @click="openAddOn"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
            <div class="d-flex flex-wrap align-start" style="gap: 8px">
              <div
                v-for="(sv, idx) in addOnServicesUpdated"
                :key="sv.id"
                class="text--body-2 d-flex align-start choice-span px-2 py-1 neutral--text"
              >
                <pre class="text--body-2 neutral--text">{{
                  sv.name ? formatStringLength(sv.name, 50) : ''
                }}</pre>
                <v-icon
                  size="18"
                  color="semantic_error"
                  class="ml-1 pointer"
                  tabindex="-1"
                  @click="removeChoice(idx)"
                  >mdi-close</v-icon
                >
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="showListAddon"
          v-click-outside="closeAddOn"
          class="list-additional-choices mt-2"
        >
          <div :style="boundStyle" class="list-items white">
            <div
              class="primary list-header py-1 px-2 text--subtitle-2 white--text d-flex align-center justify-space-between"
            >
              Yêu cầu bổ sung
              <v-icon color="white" @click="showListAddon = false"
                >mdi-close</v-icon
              >
            </div>
            <div class="list-body px-1 py-1">
              <v-row class="mx-0 my-0">
                <v-col
                  v-for="choice in listAdditionalReq"
                  :key="choice.id"
                  cols="6"
                  class="each-choices py-1 px-1"
                >
                  <v-checkbox
                    v-model="addOnServices"
                    :label="choice.name"
                    :value="choice.id"
                    class="mt-0 v-checkbox-text--caption font-size-4"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
              <textarea
                v-if="addOnServices.includes(99)"
                v-model="otherService"
                type="text"
                class="white input-border-app px-2 mt-3 py-2 w-100 text--body-2 neutral_color_sub1--text"
                :class="
                  triggerValid && !otherService.trim() ? 'error-border' : ''
                "
                placeholder="Nhập yêu cầu bổ sung khác"
                rows="3"
              >
              </textarea>
              <span v-if="addOnServices.includes(99)" class="counter-span"
                >{{ this.otherService.length }}/{{ this.limitNote }}</span
              >
              <p
                v-if="
                  triggerValid &&
                  addOnServices.includes(99) &&
                  !otherService.trim()
                "
                class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
              >
                Không được để trống trường này
              </p>
            </div>
            <div class="list-footer py-2 px-2 d-flex">
              <v-btn
                width="90px"
                height="32px"
                color="neutral_color_sub3"
                class="v-btn-normalize no-box-shadow py-2 ml-auto text--btn rounded-md white--text"
                @click="showListAddon = false"
                >Hủy</v-btn
              >
              <v-btn
                width="90px"
                height="32px"
                color="primary"
                class="v-btn-normalize no-box-shadow py-2 ml-2 text--btn rounded-md"
                @click="updateService"
                >Thêm</v-btn
              >
            </div>
          </div>
        </div>
      </div>
      <!--  -->
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import TextFieldAutocomplete from '@/components/Layout/TextFieldAutocomplete.vue';
import DatePicker from '@/components/Layout/DatePicker.vue';
import objHandlerMixins from '@/mixins/objHandlerMixins';
import { formatDateDMY } from '@/helpers/dateFormater.js';
const today = `${new Date().getDate()}-${
  new Date().getMonth() + 1
}-${new Date().getFullYear()}`;
export default {
  name: 'Services-Lift',
  components: { TextFieldAutocomplete, DatePicker },
  mixins: [objHandlerMixins],
  props: {
    detailData: {
      type: Object,
      default() {}
    },
    flagSubmit: {
      type: Boolean,
      default: false
    },
    triggerChild: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showListAddon: false,
      addOnServices: [],
      addOnServicesUpdated: [],
      otherService: '',
      fromDate: today,
      toDate: today,
      goods_weight: '',
      vehicleType: '',
      goods_type: '',
      triggerValid: false,
      forceUpdateKey: 0,
      boundStyle: '',
      plates: [
        {
          vnPlates: [],
          cnPlates: []
        }
      ],
      limitNote: 50
    };
  },
  computed: {
    ...mapState({
      listAdditionalReq: (state) => state.internal.listAdditionalReq
    })
  },
  watch: {
    otherService() {
      if (this.otherService.length > this.limitNote) {
        this.otherService = this.otherService.slice(0, this.limitNote);
      }
    },
    showListAddon() {
      this.triggerValid = false;
      const target = document.querySelector('#additionalChoice');
      if (target) {
        const wHeight = window.innerHeight;
        const viewportOffset = target.getBoundingClientRect();
        const gap = wHeight - viewportOffset.top;
        console.log(gap);
        if (gap < 420) {
          this.boundStyle = 'transform: translateY(-100%);';
        } else {
          this.boundStyle = '';
        }
      }
    },
    triggerChild() {
      this.onResolveData();
    },
    detailData: {
      deep: true,
      handler() {
        this.syncDetail();
      }
    }
  },
  mounted() {
    this.syncDetail();
  },
  methods: {
    syncDetail() {
      console.log(this.detailData);
      if (!this.detailData || !this.detailData.id || !this.detailData.service) {
        return;
      }
      this.forceUpdateKey += 1;
      const service = { ...this.detailData.service };
      this.goods_type = service.goods_type;
      this.goods_weight = service.goods_weight;
      this.vehicleType = service.truck_category;
      this.addOnServicesUpdated = service.additional_requirements || [];
      if (service.service_jobs && service.service_jobs.length) {
        this.plates = service.service_jobs.map((o) => ({
          id: o.id,
          vnPlates: o.destination_plate_numbers,
          cnPlates: o.origin_plate_numbers
        }));
      }

      this.fromDate = service.service_date
        ? formatDateDMY(service.service_date).replaceAll('/', '-')
        : '';
      this.toDate = service.service_date
        ? formatDateDMY(service.service_date).replaceAll('/', '-')
        : '';
      const rs = service.additional_requirements
        ? service.additional_requirements.find((o) => {
            if (o.id === 99) {
              o.name = o.note;
              return true;
            }
            return false;
          })
        : null;
      if (rs) {
        this.otherService = rs.note;
      }
    },
    openAddOn() {
      this.showListAddon = true;
      this.addOnServices = this.addOnServicesUpdated.map((o) => o.id);
      const rslt = this.addOnServicesUpdated.find((k) => k.id === 99);
      this.otherService = rslt ? rslt.name : '';
    },
    closeAddOn() {
      this.showListAddon = false;
    },
    updateService() {
      this.triggerValid = true;
      if (this.addOnServices.includes(99) && !this.otherService.trim()) {
        return;
      }
      const newServices = this.addOnServices.map((o) => {
        const rslt = this.listAdditionalReq.find((k) => k.id === o);
        if (!rslt) {
          return { id: o };
        }
        const obj = { ...rslt };
        if (rslt.id === 99) {
          obj.name = this.otherService.trim();
        }
        return obj;
      });
      this.addOnServicesUpdated = newServices;
      this.closeAddOn();
    },
    addNewPlate() {
      this.plates.push({
        vnPlates: [],
        cnPlates: []
      });
    },
    pickedDate(_dateObj) {
      this.fromDate = _dateObj.value.startDate ? _dateObj.value.startDate : '';
      this.toDate = _dateObj.value.startDate ? _dateObj.value.startDate : '';
    },
    removePlate(idx) {
      this.plates.splice(idx, 1);
    },
    removeChoice(idx) {
      this.addOnServicesUpdated.splice(idx, 1);
    },
    onEnterKey(idx) {
      if (this.plates[idx].vnPlates.length > 9) {
        return;
      }
      const target = document.querySelector(`#vn-plate-idx-${idx}`);
      if (target) {
        if (!this.checkPlateRegex(target.value)) {
          return;
        }
        const obj = { ...this.plates[idx] };

        obj.vnPlates.push(target.value);
        this.plates.splice(idx, 1, obj);
        this.$nextTick(() => {
          target.value = '';
        });
      }
    },
    onEnterKeyCn(idx) {
      const target = document.querySelector(`#cn-plate-idx-${idx}`);

      if (target) {
        // if (!this.checkPlateRegex(target.value)) {
        //   return;
        // }
        if (!target.value.trim()) {
          return;
        }
        const obj = { ...this.plates[idx] };

        obj.cnPlates.push(target.value);
        this.plates.splice(idx, 1, obj);
        this.$nextTick(() => {
          target.value = '';
        });
      }
    },
    removeVnPlate(idx, pl) {
      this.plates[idx].vnPlates = this.plates[idx].vnPlates.filter(
        (o) => o !== pl
      );
      const target = document.querySelector(`#vn-plate-idx-${idx}`);
      if (target) {
        target.value = '';
      }
    },
    removeCnPlate(idx, pl) {
      this.plates[idx].cnPlates = this.plates[idx].cnPlates.filter(
        (o) => o !== pl
      );
      const target = document.querySelector(`#cn-plate-idx-${idx}`);
      if (target) {
        target.value = '';
      }
    },
    checkPlateRegex(_str) {
      const regex = /^[a-zA-z0-9]{3}-[a-zA-z0-9]{5}$/gi;
      return _str.match(regex);
    },
    onResolveData() {
      return new Promise((resolve) => {
        const serviceJobs = this.plates
          .filter((o) => o.cnPlates.length && o.vnPlates.length)
          .map((o) => ({
            id: o.id || 0,
            origin_plate_numbers: o.cnPlates,
            destination_plate_numbers: o.vnPlates
          }));
        const obj = {
          goods_type: this.goods_type,
          goods_weight: this.goods_weight,
          service_date: this.fromDate,
          truck_category: this.vehicleType,
          additional_requirement_ids: this.addOnServicesUpdated.map(
            (o) => o.id
          ),
          additional_requirement_note: this.otherService,
          service_jobs: serviceJobs
        };
        this.$emit('resolve-data', obj);
        resolve(obj);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-vnplate {
  gap: 6px;
  .each-vnplate {
    border: 1px solid;
    border-color: #d5d5d5 !important;
    border-radius: 18px;
  }
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
textarea.input-border-app {
  height: auto;
  resize: none;
}
.choice-span {
  border: 1px solid;
  border-color: #d5d5d5 !important;
  border-radius: 4px;
  min-height: 32px;
}
.list-additional-choices {
  position: relative;
  height: 0;
  .list-items {
    position: absolute;
    width: 310px;
    top: 0;
    left: 0;
    border-radius: 4px;
  }
  .list-items {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
  .list-header {
    border-radius: 4px 4px 0 0;
  }
  .list-footer {
    border-radius: 0 0 4px 4px;
  }
}
.counter-span {
  display: block;
  text-align: right;
  font-size: 12px;
  color: #808080;
}
</style>
