<template>
  <div class="each-group-card mb-0 pointer" @click="showDetailInfo">
    <RegularAvatarVue
      :size="48"
      :abbrName="user.name"
      :imageUrl="user.avatar ? user.avatar.url : ''"
    />
    <div class="group-info-text">
      <p v-if="!user.hlName" class="user_full_name neutral--text">
        {{ user.name }}
      </p>
      <p
        v-if="user.hlName"
        class="user_full_name neutral--text"
        v-html="user.hlName"
      ></p>
      <p class="user_position neutral_color_sub2--text mb-0">
        {{ user.position ? user.position.name : " --- " }} -
        {{ user.company ? user.company.name : "" }}
      </p>
    </div>
    <div class="group-action"></div>
  </div>
</template>

<script>
import RegularAvatarVue from "../User/RegularAvatar.vue"
import DefaultGroupAvatar from "@/assets/images/group-avatar.svg"
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  components: { RegularAvatarVue },
  methods: {
    showDetailInfo() {
      this.$store.commit("setSelectedUserGroup", this.user)
      this.$store.commit("setCurrentRightSideActive", 3)
    },
    returnDf() {
      return DefaultGroupAvatar
    },
  },
}
</script>

<style lang="scss" scoped>
.each-group-card {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 4px 8px;
  &:hover {
    background-color: #f2f8fa;
  }
}
.group-info-text {
  padding-left: 8px;
  padding-right: 8px;
  .user_full_name {
    font-size: 16px;
    margin-bottom: 0px;
    line-height: 150%;
    letter-spacing: 0.005em;
    word-break: break-word;
    span {
      font-weight: 700 !important;
    }
  }
  .user_position {
    font-size: 400;
    font-size: 12px;
    line-height: 150%;
    margin-bottom: 0;
  }
}
.group-action {
  margin-left: auto;
}
</style>
