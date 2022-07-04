<template>
  <div class="px-4 my-0 mx-0 w-100 page-view-container">
    <div
      class="page-view-table--header mb-3 d-flex align-center justify-space-between"
    >
      <div class="rs d-flex align-items-center">
        <p class="table-name text--h5 mb-0">DASHBOARD</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      contactSearchQuery: ''
    };
  },
  mounted() {
    this.$store.commit('setListCrumb', []);
  }
};
</script>
