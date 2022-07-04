<template>
  <div class="list-private-chat w-100">
    <div v-for="(data, idx) in listRoomChatComputed" :key="data._id">
      <PrivateChat v-if="data.type === 2" :data="data" :idx="idx" />
      <GroupChat v-if="data.type === 1" :data="data" :idx="idx" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import PrivateChat from "./PrivateChat.vue"
import GroupChat from "./GroupChat.vue"
import UserMix from "@/mixins/UserMix.js"
import {
  sortGroupByLatestMessage,
  // getLmMsg,
  // getNameOfRoom,
  // getPartner,
  // convertHexToUTF8
} from "@/utils"
export default {
  components: { PrivateChat, GroupChat },
  mixins: [UserMix],
  props: {
    listData: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    ...mapState({
      prefixUserName: (state) => state.prefixUserName,
      listRoomChat: (state) => state.room.listRoomChat,
      listRoomChatIdb: (state) => state.room.listRoomChatIdb,
      listPrivateChat: (state) => state.room.listPrivateChat,
      listPrivateChatIdb: (state) => state.room.listPrivateChatIdb,
    }),
    ...mapGetters({
      userFromAuth: "userFromAuth",
    }),
    listRoomChatFromApi() {
      const arr = [...this.listRoomChat, ...this.listPrivateChat]
      return arr
    },
    listRoomChatFromIdb() {
      const arr = [...this.listRoomChatIdb, ...this.listPrivateChatIdb]
      return arr
    },
    listRoomChatComputed() {
      let arr = []
      if (this.listRoomChatFromApi && this.listRoomChatFromApi.length) {
        arr = [...this.listRoomChatFromApi]
      } else {
        arr = [...this.listRoomChatFromIdb]
      }
      const rslt = arr.map((o) => {
        if (o.type === 1) {
          o.decodeName = o.fname
        } else {
          const usersNotMe = o.usernames.filter(
            (o) => o !== `${this.prefixUserName}${this.userFromAuth.id}`,
          )
          const otherId = usersNotMe && usersNotMe.length ? usersNotMe[0] : ""
          o.partner = this.userById(otherId)
        }
        return o
      })
      return sortGroupByLatestMessage(rslt)
    },
  },
}
</script>

<style lang="scss" scoped></style>
