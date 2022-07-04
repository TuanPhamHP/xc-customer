<template>
  <div class="w-100 d-flex each-group-chat pointer" @click="showChat">
    <RegularAvatar
      :size="48"
      :abbrName="'Tester'"
      :imageUrl="''"
      :ext-class="'mx-auto'"
    />
    <div class="group-chat-detail">
      <div class="group-chat_name-n-time d-flex w-100 align-center">
        <span
          class="group-chat-name neutral--text"
          :class="idx % 2 ? 'font-weight-500' : ''"
          >{{ data.decodeName ? data.decodeName : data.fname }}</span
        >
        <span class="group-chat-time neutral_color_sub2--text ml-auto">
          <v-icon v-show="!(idx % 2)" color="neutral_color_sub3" size="14px"
            >mdi-bell-off-outline</v-icon
          >
          {{ getLmMsg(data.lm) }}</span
        >
      </div>
      <div class="group-chat_lm-n-count d-flex w-100 align-center">
        <span class="group-chat-lm neutral--text">
          {{ getUserLm(data.lastMessage) }}
          {{ data.lastMessage ? data.lastMessage.msg : "" }}</span
        >
        <span class="group-chat-count neutral_color_sub2--text ml-auto">
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
.each-group-chat {
  gap: 8px;
  padding: 8px 12px;
  transition: 0.3 ease;
  &:hover {
    background: #cce2eb;
  }
  .group-chat-detail {
    width: calc(100% - 48px - 8px);
  }
}
.group-chat_name-n-time {
  .group-chat-name {
    letter-spacing: 0.005em;
    line-height: 24px;
  }
  .group-chat-time {
    text-align: right;
    letter-spacing: 0.004em;
    font-size: 12px;
    line-height: 14px;
  }
}
.group-chat_lm-n-count {
  .group-chat-lm {
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.004em;
    max-width: 80%;
    height: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .group-chat-count {
    text-align: right;
    letter-spacing: 0.004em;
    font-size: 12px;
    line-height: 14px;
    .counter-badge {
      font-size: 11px;
      display: inline-block;
      text-align: center;
      width: 17px;
      height: 17px;
      line-height: 17px;
      /* background: #d11313; */
      border-radius: 27px;
    }
  }
}
</style>
