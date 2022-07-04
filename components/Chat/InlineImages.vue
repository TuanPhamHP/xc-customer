<template>
  <div class="list-img-inline d-flex">
    <div v-for="(img, idx) in listData" :key="idx" class="each-inline-img">
      <img :src="img.src" :alt="img.name" class="fit-img" />
      <v-icon
        class="remove-img-icon pointer"
        @click="onRemoveImg(img)"
        color="white"
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
    onRemoveImg: {
      type: Function,
      default() {},
    },
  },
}
</script>

<style lang="scss" scoped>
.list-img-inline {
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  flex-wrap: wrap;
}
.each-inline-img {
  position: relative;
  .remove-img-icon {
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
