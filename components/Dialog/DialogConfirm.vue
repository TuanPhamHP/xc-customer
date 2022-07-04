<template>
  <v-dialog v-model="dialog" persistent max-width="380">
    <v-card>
      <v-card-title class="text--h6 dialog-confirm-title pb-0 black--text">
        {{ title }}
      </v-card-title>
      <v-card-text
        v-if="!rawHtml"
        class="message-text neutral_color_sub1--text py-4"
        >{{ message }}
      </v-card-text>
      <v-card-text
        v-if="rawHtml"
        class="message-text neutral_color_sub1--text py-4"
      >
        <p class="mb-0" v-html="message"></p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="cancelBtnColor"
          class="v-btn-confirm"
          :class="cancelBtnClass"
          depressed
          :disabled="loadingConfirmBtn"
          @click="cancelAction"
        >
          {{ cancelBtnText }}
        </v-btn>
        <v-btn
          :color="confirmBtnColor"
          class="v-btn-confirm"
          :class="confirmBtnClass"
          depressed
          :loading="loadingConfirmBtn"
          :disabled="disabledConfirmBtn"
          @click="confirmAction"
        >
          {{ confirmBtnText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    disabledConfirmBtn: {
      type: Boolean,
      default: false
    },
    loadingConfirmBtn: {
      type: Boolean,
      default: false
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    rawHtml: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Title'
    },
    message: {
      type: String,
      default: 'Message'
    },
    cancelBtnText: {
      type: String,
      default: 'Cancel'
    },
    cancelBtnColor: {
      type: String,
      default: 'primary'
    },
    cancelBtnClass: {
      type: String,
      default: 'rounded-lg'
    },
    cancelAction: {
      type: Function,
      default() {}
    },

    confirmBtnText: {
      type: String,
      default: 'Confirm'
    },
    confirmBtnClass: {
      type: String,
      default: 'rounded-lg'
    },
    confirmBtnColor: {
      type: String,
      default: 'primary'
    },
    confirmAction: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {},
  watch: {
    isVisible() {
      this.dialog = this.isVisible;
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.v-btn-confirm {
  padding-left: 16px !important ;
  padding-right: 16px !important ;

  letter-spacing: 0.0125em !important;
}
body {
  .v-dialog > .v-card > .v-card__title {
    &.dialog-confirm-title {
      font-weight: 500;
      letter-spacing: 0.001em;
    }
  }
  .message-text {
    font-size: 16px;
    line-height: 24px;
    /* or 150% */

    letter-spacing: 0.005em;
  }
}
</style>
