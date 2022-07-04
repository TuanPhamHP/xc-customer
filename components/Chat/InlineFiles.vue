<template>
  <div class="list-file-inline d-flex">
    <div
      v-for="(file, idx) in listData"
      :key="idx"
      class="each-inline-file semantic_info--text rounded-lg"
    >
      <span class="semantic_info--text"> {{ file.short_name }}</span>
      <v-icon
        class="remove-icon pointer"
        @click="onRemoveFile(file)"
        color="red"
        size="18"
      >
        mdi-close-circle
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default() {
        return []
      },
    },
    onRemoveFile: {
      type: Function,
      default() {},
    },
  },
}
</script>

<style lang="scss" scoped>
.list-file-inline {
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  flex-wrap: wrap;
}
.each-inline-file {
  position: relative;
  padding: 12px 16px;
  border: 1px solid;
  .remove-icon {
    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 2;
  }
  .fit-img {
    width: 109px;
    height: 109px;
    object-fit: cover;
    border-radius: 8px;
  }
}
</style>
