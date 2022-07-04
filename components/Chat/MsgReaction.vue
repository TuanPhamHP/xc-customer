<template>
  <div class="msg-reaction-absolute">
    <v-menu
      top
      :left="isMe"
      :offset-y="true"
      :content-class="`rounded-xl box-shadow--mod-v2 ${isMe ? 'mr-4' : 'ml-4'}`"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="primary" v-bind="attrs" v-on="on">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="primary"
                class="pointer"
                dark
                v-bind="attrs"
                v-on="on"
              >
                mdi-emoticon-happy-outline
              </v-icon>
            </template>

            <span>Cảm xúc</span>
          </v-tooltip>
        </v-btn>
      </template>

      <div class="px-4 py-2 rounded-xl white">
        <div class="d-flex list-reaction-item">
          <div class="reaction-item">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img
                  class="chat-icon-img pointer"
                  v-bind="attrs"
                  v-on="on"
                  src="../../assets/images/chat-icon-heart.svg"
                  alt="chat-icon-heart"
                  width="36px"
                  height="36px"
                />
              </template>
              <span>Thả tim</span>
            </v-tooltip>
          </div>
          <div class="reaction-item">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img
                  class="chat-icon-img pointer"
                  v-bind="attrs"
                  v-on="on"
                  src="../../assets/images/chat-icon-haha.svg"
                  alt="chat-icon-haha"
                  width="36px"
                  height="36px"
                />
              </template>
              <span>Haha</span>
            </v-tooltip>
          </div>
          <div class="reaction-item">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img
                  class="chat-icon-img pointer"
                  v-bind="attrs"
                  v-on="on"
                  src="../../assets/images/chat-icon-wow.svg"
                  alt="chat-icon-wow"
                  width="36px"
                  height="36px"
                />
              </template>
              <span>Wow</span>
            </v-tooltip>
          </div>
          <div class="reaction-item">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img
                  class="chat-icon-img pointer"
                  v-bind="attrs"
                  v-on="on"
                  src="../../assets/images/chat-icon-sad.svg"
                  alt="chat-icon-sad"
                  width="36px"
                  height="36px"
                />
              </template>
              <span>Buồn</span>
            </v-tooltip>
          </div>
          <div class="reaction-item">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img
                  class="chat-icon-img pointer"
                  v-bind="attrs"
                  v-on="on"
                  src="../../assets/images/chat-icon-angry.svg"
                  alt="chat-icon-angry"
                  width="36px"
                  height="36px"
                />
              </template>
              <span>Giận</span>
            </v-tooltip>
          </div>
          <div class="reaction-item">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img
                  class="chat-icon-img pointer"
                  v-bind="attrs"
                  v-on="on"
                  src="../../assets/images/chat-icon-like.svg"
                  alt="chat-icon-like"
                  width="36px"
                  height="36px"
                />
              </template>
              <span>Thích</span>
            </v-tooltip>
          </div>
        </div>
      </div>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    isMe: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.msg-reaction-absolute {
  width: fit-content;
  position: absolute;
  top: 16px;
  i {
    filter: grayscale(1);
  }
  &:hover {
    i {
      filter: none;
    }
  }
}
.reaction-item {
  height: 36px;
}
.list-reaction-item {
  gap: 8px;
}
</style>

<style lang="scss">
.chat-icon-img {
  border-radius: 100%;
  transition: 0.15s linear;
  &:hover {
    transform: translateY(-4px);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
}
.msg-reaction-absolute {
  .v-menu__content {
    border-radius: 16px !important;
  }
}
</style>
