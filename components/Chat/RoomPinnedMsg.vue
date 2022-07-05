<template>
  <div class="pinned-msg d-flex align-center app_bg--text">
    <div class="type-of-msg">
      <v-icon color="primary">mdi-chat-processing</v-icon>
    </div>
    <div class="msg-content">
      <p class="mb-0 neutral--text">Tin nhắn</p>
      <p class="mb-0 neutral--text">
        {{ pinnedMsg.u.name }}: {{ pinnedMsg.msg }}
      </p>
    </div>
    <div class="unpin-icon">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attr }">
          <v-icon
            v-on="on"
            v-bind="attr"
            color="neutral_color_sub3"
            class="pointer"
            >mdi-trash-can-outline</v-icon
          >
        </template>
        <span>Bỏ ghim tin nhắn</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { splitMessages } from '@/utils';
import { convertTimeRv, formatDateDMY } from '@/helpers/dateFormater.js';
import MsgMix from '@/mixins/MsgMix.js';
import MsgConvert from '@/mixins/MsgConvert.js';
export default {
  mixins: [MsgMix, MsgConvert],
  props: {
    listPinned: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    ...mapState({
      userChat: (state) => state.userChat
    }),
    listPinnedComputed() {
      const arr =
        this.listPinned && this.listPinned.length ? [...this.listPinned] : [];
      const currentRoomCp = [...arr];
      const result = splitMessages(currentRoomCp);
      result.forEach((o) => {
        o.refKey = Math.random() * 1000 + Math.random() * 1000;
        o.isMeBlock = this.isMyMsg(o);
        o.lastTs = o.breaking_day
          ? o.breaking_day
          : o.messages && Array.isArray(o.messages)
          ? o.messages[o.messages.length - 1].ts
          : '---';
        if (o.messages) {
          o.messages.forEach((k) => {
            k.msgType = this.checkTypeOfMsg(k);
          });
          if (o.messages.some((k) => k.msgType === 'videoPath')) {
            o.refKey = '1';
          }
        }
      });
      return result;
    },
    pinnedMsg() {
      return this.listPinnedComputed[0].messages[0];
    }
  },
  methods: {
    convertTimeRv(time) {
      return convertTimeRv(time);
    },
    formatDateDMY(time) {
      return formatDateDMY(time);
    },
    isMyMsg(msg) {
      if (!msg || !msg.u || !this.userChat || !this.userChat.userId) {
        return false;
      }
      return msg.u._id === this.userChat.userId;
    }
  }
};
</script>

<style lang="scss" scoped>
.pinned-msg {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 3;
  gap: 8px;
  padding: 6px 16px;
  border-top: 1px solid;
  background: #fff;
  .msg-content {
    flex-grow: 1;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.004em;
  }
}
</style>
