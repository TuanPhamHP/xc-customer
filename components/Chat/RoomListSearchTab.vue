<template>
  <div class="room-tabs search-tab">
    <div class="room-tabs-header">
      <p
        class="d-flex align-center w-100 justify-center font-weight-medium header-tab-navigator mb-0 w-100 py-1 neutral_color_sub1--text"
      >
        <v-btn icon class="mb-0 btn-fall-back" color="neutral_color_sub1">
          <v-icon size="18px"> mdi-arrow-left </v-icon>
        </v-btn>
        <span class="">{{ sysLanguage.title.chatTabSearchTitle }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedUser: {},
    }
  },
}
</script>

<style lang="scss" scoped></style>
