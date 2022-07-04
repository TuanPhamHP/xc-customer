<template>
  <div class="chat-right-bar white" :class="isShowRightBar ? 'on-show' : ''">
    <!-- rightBarActive === 1 -->
    <RoomInfomationTab
      v-if="rightBarActive === 1"
      :data="data"
      :roomMembers="roomMembers"
      :toggleSideBar="toggleSideBar"
      :setRightBarActive="setRightBarActive"
      :isShowRightBar="isShowRightBar"
    />
    <!-- rightBarActive === 2 -->
    <RoomListSearchTab v-if="rightBarActive === 2" />
    <!-- rightBarActive === 3 -->
    <RoomListArchiveTab v-if="rightBarActive === 3" />
  </div>
</template>

<script>
import RoomInfomationTab from "./RoomInfomationTab.vue"
import RoomListArchiveTab from "./RoomListArchiveTab.vue"
import RoomListSearchTab from "./RoomListSearchTab.vue"
export default {
  components: { RoomInfomationTab, RoomListArchiveTab, RoomListSearchTab },
  props: {
    data: {
      type: Object,
      default() {},
    },

    roomMembers: {
      type: Array,
      default() {
        return []
      },
    },

    toggleSideBar: {
      type: Function,
      default() {},
    },
    setRightBarActive: {
      type: Function,
      default() {},
    },
    isShowRightBar: {
      type: Boolean,
      default: false,
    },
    rightBarActive: {
      type: Number,
      default: 0,
    },
  },
}
</script>
<style lang="scss">
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
.shadow-divider {
  height: 4px;
  background: #f5f6fa;
}
</style>
<style lang="scss" scoped>
.chat-right-bar {
  width: 0;
  height: 100vh;
  visibility: hidden;
  overflow: hidden;
  transition: 0.25s linear;
  &.on-show {
    width: 333px;
    min-width: 333px;
    visibility: visible;
  }
}
</style>
