<template>
  <div class="text-field-autocomplete-wr" :class="wrapperClass">
    <v-text-field
      v-model="val"
      :label="label"
      :type="type"
      class="white field-set-border-app w-100"
      :class="[textFieldClass, errorMsg ? 'error-border' : '']"
      hide-details=""
      :placeholder="placeholder"
      outlined
      dense
      :tabindex="tabindex"
      :readonly="readonly"
      @focus="onFocusField"
      @blur="hideItem"
    ></v-text-field>
    <p
      v-if="errorMsg"
      class="semantic_error--text error-msg-small err-mod mb-0 text--overline"
    >
      {{ errorMsg }}
    </p>
    <div
      v-if="
        ableShowItem && showItem && listItemComputed && listItemComputed.length
      "
      class="list-items white w-100"
    >
      <div
        v-for="item in listItemComputed"
        :key="item.id"
        class="each-item px-2 py-1 pointer"
        :class="itemClass"
        @click="selectItem(item)"
      >
        {{ item[itemText] }}
      </div>
    </div>
  </div>
</template>

<script>
import { tStr } from 'validation_t/src';
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    tabindex: {
      type: Number,
      default: 1
    },
    placeholder: {
      type: String,
      default: ''
    },
    textFieldClass: {
      type: String,
      default: ''
    },
    itemClass: {
      type: String,
      default: ''
    },
    itemKey: {
      type: String,
      default: 'name'
    },
    itemText: {
      type: String,
      default: 'display_name'
    },
    wrapperClass: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showSuggest: {
      type: Boolean,
      default: true
    },
    ableShowError: {
      type: Boolean,
      default: false
    },
    ableShowItem: {
      type: Boolean,
      default: true
    },
    selectOnFocus: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: null,
      default: ''
    },
    rules: {
      type: Array,
      default() {
        return [];
      }
    },
    listItems: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      val: '',
      showItem: false,
      refInput: 0
    };
  },
  computed: {
    listItemComputed() {
      const arr = [...this.listItems];
      const query = tStr.removeAscent(this.val).replaceAll(' ', '');
      return this.val
        ? arr.filter((o) => {
            return tStr
              .removeAscent(o[this.itemKey])
              .replaceAll(' ', '')
              .includes(query);
          })
        : arr;
    },
    errorMsg() {
      if (
        !this.ableShowError ||
        !this.rules ||
        !Array.isArray(this.rules) ||
        !this.rules.length
      ) {
        return '';
      }
      if (this.rules.includes('required')) {
        return String(this.val).trim() ? '' : 'Không được để trống trường này';
      }
      return '';
    }
  },
  watch: {
    val() {
      clearTimeout(this.refInput);
      this.refInput = setTimeout(() => {
        this.$emit('change-input', this.val);
      }, 600);
    }
  },
  mounted() {
    if (this.defaultValue) {
      this.val = this.defaultValue;
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select-data', item);
    },
    hideItem() {
      setTimeout(() => {
        this.showItem = false;
      }, 200);
    },
    onFocusField(e) {
      this.showItem = true;
      if (this.selectOnFocus) {
        this.handleFocusTextQuery(e);
      }
    },
    handleFocusTextQuery(e) {
      e.target.select();
      e.target.setSelectionRange(0, 99999);
    }
  }
};
</script>

<style lang="scss" scoped>
.text-field-autocomplete-wr {
  position: relative;
  .list-items {
    position: absolute;
    left: 0;
    top: 100%;
    border: 1px solid #d5d5d53c !important;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    max-height: 300px;
    overflow-y: scroll;
    z-index: 2;
    .each-item {
      z-index: 3;
      font-size: 14px;
      &:not(:nth-last-of-type(1)) {
        border-bottom: 1px solid #d5d5d595;
      }
      &:hover {
        background-color: #d5d5d5;
      }
    }
  }
  .err-mod {
    transform: translateY(1px);
    height: 0px;
  }
}
</style>
