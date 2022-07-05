<template>
  <v-dialog v-model="dialog" persistent max-width="580">
    <v-card class="pb-4">
      <p class="text-center primary--text text--h5 px-4 py-2">
        Đánh giá chất lượng dịch vụ
      </p>

      <div class="selectedDetailUser-infomation d-flex align-start px-4">
        <div class="inner-info-body w-100">
          <span class="text--body-1 d-block text-center">
            Cảm ơn quý khách đã sử dụng dịch vụ của
            <span class="primary--text">Xuân Cương</span>. Vui lòng cho chúng
            tôi biết ý kiến của bạn về chất lượng dịch vụ
          </span>
          <div class="list-star d-flex align-center">
            <div
              v-for="(star, idx) in listStar"
              :key="star.text"
              class="each-star d-flex flex-column pointer"
              @mouseover="starHoverIndex = idx"
              @mouseleave="starHoverIndex = -1"
              @click="starPickedIndex = idx"
            >
              <v-icon
                v-if="idx <= starHoverIndex || idx <= starPickedIndex"
                size="50"
                color="secondary"
                >mdi-star</v-icon
              >
              <v-icon v-else size="50">mdi-star-outline</v-icon>
              <span
                class="d-block white-space-nowrap text-center text--caption"
              >
                {{ star.text }}
              </span>
            </div>
          </div>
          <p
            v-if="flagSubmit && formErrors.rating"
            class="semantic_error--text text-center error-msg-small err-mod mb-0 pt-2 text--overline"
          >
            {{ formErrors.rating }}
          </p>
          <textarea
            v-model="note"
            type="text"
            class="white input-border-app px-2 mt-3 py-2 w-100 text--body-2 neutral_color_sub1--text"
            :class="flagSubmit && formErrors.note ? 'error-border mb-1' : ''"
            placeholder="Đánh giá của bạn ..."
            rows="3"
          >
          </textarea>
          <p
            v-if="flagSubmit && formErrors.note"
            class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
          >
            {{ formErrors.note }}
          </p>
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
              Đánh giá
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
// import { tStr } from 'validation_t/src';
import { mapGetters } from 'vuex';
import api from '@/services';
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    closeDialog: {
      type: Function,
      default() {}
    },
    selectedData: {
      type: Object,
      default() {}
    }
  },
  data() {
    return {
      dialog: false,
      loadingCreatePrivateChat: false,
      form: {},
      flagSubmit: false,
      loadingBtn: false,
      formErrors: {},
      note: '',
      listStar: [
        {
          text: 'Rất không hài lòng'
        },
        {
          text: 'Không hài lòng'
        },
        {
          text: 'Bình thường'
        },
        {
          text: 'Tốt'
        },
        {
          text: 'Rất tốt'
        }
      ],
      starHoverIndex: -1,
      starPickedIndex: -1
    };
  },
  computed: {
    ...mapGetters({
      sysLanguage: 'sysLanguage'
    }),
    isMe() {
      return true;
    }
  },
  watch: {
    isVisible: {
      deep: true,
      handler() {
        this.note = '';
        this.formErrors = {};
        this.flagSubmit = false;
        this.dialog = this.isVisible;
        this.starHoverIndex = -1;
        this.starPickedIndex = -1;
      }
    },
    note: {
      deep: true,
      handler() {
        if (this.flagSubmit) {
          const obj = {};
          if (this.starPickedIndex === -1) {
            obj.rating = 'Bạn chưa chọn mức đánh giá';
          }
          if (!this.note || !String(this.note).trim()) {
            obj.note = 'Không được để trống trường này';
          }

          this.formErrors = obj;
        }
      }
    }
  },
  mounted() {},
  methods: {
    async onSubmit() {
      const obj = {};
      this.flagSubmit = true;
      if (this.starPickedIndex === -1) {
        obj.rating = 'Bạn chưa chọn mức đánh giá';
      }
      if (!this.note || !String(this.note).trim()) {
        obj.note = 'Không được để trống trường này';
      }

      this.formErrors = obj;
      if (Object.keys(obj).length) {
        return;
      }
      const body = {
        rating: this.starPickedIndex + 1,
        note: this.note
      };
      this.loadingBtn = true;
      const res = await api.order.review(this.selectedData.service.id, body);
      this.loadingBtn = false;
      if (!res) {
        this.$store.commit(
          'toast/getError',
          this.sysLanguage.snackbar.reviewFail
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
          this.sysLanguage.snackbar.reviewSuccess
        );
        this.closeDialog();
      } catch (error) {
        this.$store.commit('toast/getError', `${error}`);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.selectedDetailUser-infomation {
  gap: 16px;
}
.list-star {
  gap: 4px;
}
.each-star {
  flex: 1 0 0;
  width: fit-content;
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
</style>
