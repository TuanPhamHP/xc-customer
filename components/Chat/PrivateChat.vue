<template>
  <div
    class="w-100 d-flex each-private-chat pointer"
    :class="
      data._id === $route.params.id ? 'is-active-sidebar primary_light_o1' : ''
    "
    @click="showChat"
  >
    <RegularAvatar
      :size="48"
      :abbrName="'Tester'"
      :imageUrl="''"
      :ext-class="'mx-auto'"
    />
    <div class="private-chat-detail">
      <div class="private-chat_name-n-time d-flex w-100 align-center">
        <span
          class="private-chat-name neutral--text"
          :class="idx % 2 ? 'font-weight-500' : ''"
          >{{
            data.partner && data.partner.name ? data.partner.name : "---"
          }}</span
        >
        <span class="private-chat-time neutral_color_sub2--text ml-auto">
          <v-icon v-show="!(idx % 2)" color="neutral_color_sub3" size="14px"
            >mdi-bell-off-outline</v-icon
          >
          {{ getLmMsg(data.lm) }}</span
        >
      </div>
      <div class="private-chat_lm-n-count d-flex w-100 align-center">
        <span class="private-chat-lm neutral--text"
          >{{ getUserLm(data.lastMessage) }}
          {{ data.lastMessage ? data.lastMessage.msg : "" }}</span
        >
        <span class="private-chat-count neutral_color_sub2--text ml-auto">
          <v-icon
            color="neutral_color_sub3"
            size="16px"
            class="mr-1"
            style="transform: rotateZ(45deg)"
            >mdi-pin</v-icon
          >
          <span
            class="counter-badge white--text"
            :class="idx % 2 ? 'semantic_error' : 'neutral_color_sub3'"
          >
            {{ "5+" }}
          </span></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import { getLmMsg } from "@/utils"
import UserMix from "@/mixins/UserMix.js"
export default {
  mixins: [UserMix],
  props: {
    data: {
      type: Object,
      default() {},
    },
    idx: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState({
      prefixUserName: (state) => state.prefixUserName,
      disableChangeRoom: (state) => state.disableChangeRoom,
    }),

    ...mapGetters({
      userFromAuth: "userFromAuth",
    }),
  },
  methods: {
    showChat() {
      if (this.disableChangeRoom) {
        return
      }
      this.$router.push(`/chat/${this.data._id}`)
    },
    getLmMsg(_lm) {
      return getLmMsg(_lm)
    },
    getUserLm(lm) {
      if (!lm || !lm.u || !lm.u.username) {
        return " - :"
      }
      const isMe =
        lm.u.username === `${this.prefixUserName}${this.userFromAuth.id}`
      if (isMe) {
        return "Bạn: "
      }
      const user = this.userById(lm.u.username)
      return user && user.id
        ? `${user.name}: `
        : `${lm.u.name || lm.u.username}: `
    },
  },
}
</script>

<style lang="scss" scoped>
.each-private-chat {
  gap: 8px;
  padding: 8px 12px;
  transition: 0.3 ease;
  &:hover {
    background: #cce2eb;
  }
  .private-chat-detail {
    width: calc(100% - 48px - 8px);
  }
}
.private-chat_name-n-time {
  .private-chat-name {
    letter-spacing: 0.005em;
    line-height: 24px;
    min-height: 24px;
  }
  .private-chat-time {
    text-align: right;
    letter-spacing: 0.004em;
    font-size: 12px;
    line-height: 14px;
  }
}
.private-chat_lm-n-count {
  .private-chat-lm {
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.004em;
    max-width: 80%;
    height: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .private-chat-count {
    text-align: right;
    letter-spacing: 0.004em;
    font-size: 12px;
    line-height: 14px;
    .counter-badge {
      font-size: 11px;
      display: inline-block;
      width: 17px;
      height: 17px;
      line-height: 17px;
      /* background: #d11313; */
      border-radius: 27px;
    }
  }
}
</style>
