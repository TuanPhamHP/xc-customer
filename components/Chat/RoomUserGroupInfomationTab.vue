<template>
  <div class="room-tabs user-group-infomation-tab">
    <div class="room-tabs-header">
      <p
        class="d-flex align-center w-100 justify-center font-weight-medium header-tab-navigator mb-0 w-100 py-1 neutral_color_sub1--text"
      >
        <v-btn icon class="mb-0 btn-fall-back" color="neutral_color_sub1">
          <v-icon size="18px"> mdi-arrow-left </v-icon>
        </v-btn>
        <span class="">{{ sysLanguage.title.chatTabUsersTitle }}</span>
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

<style lang="scss" scoped>
.room-tabs-header {
  height: 64px;
  .header-tab-navigator {
    height: 64px;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    padding-left: 40px;
    padding-right: 40px;
    letter-spacing: 0.0015em;
    text-align: center;
    position: relative;
    .btn-fall-back {
      position: absolute;
      left: 6px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
