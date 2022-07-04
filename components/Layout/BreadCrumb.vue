<template>
  <div
    v-if="listCrumb && listCrumb.length"
    class="app-breadcrumb d-flex align-center px-3"
  >
    <div
      v-for="(crumb, idx) in listCrumb"
      :key="idx"
      class="each-crumb px-1 d-flex align-center"
    >
      <nuxt-link
        v-if="idx < listCrumb.length - 1"
        :to="crumb.link"
        class="nuxt-link-crumb text--body-1 neutral--text d-flex align-center"
      >
        <v-icon v-if="crumb.icon" class="mr-2" size="20">{{
          crumb.icon
        }}</v-icon>
        {{ crumb.name }}
      </nuxt-link>
      <span v-else class="text--body-1 neutral_color_sub2--text">
        <v-icon v-if="crumb.icon">{{ crumb.icon }}</v-icon>
        {{ crumb.name }}
      </span>
      <v-icon v-if="idx < listCrumb.length - 1" class="pl-2" size="20"
        >mdi-chevron-right</v-icon
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'app-breadcrumb',
  computed: {
    ...mapState({
      listCrumb: (state) => state.listCrumb
    })
  }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  padding-top: 22px;
  padding-bottom: 20px;
  a {
    text-decoration: none !important;
  }
  .each-crumb {
    .nuxt-link-crumb {
    }
  }
}
</style>
