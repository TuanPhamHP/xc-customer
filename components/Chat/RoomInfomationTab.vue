<template>
  <div class="room-tabs infomation-tab">
    <div class="room-tabs-header">
      <p
        class="d-flex align-center w-100 justify-center font-weight-medium header-tab-navigator mb-0 w-100 py-1 neutral_color_sub1--text"
      >
        <v-btn icon class="mb-0 btn-fall-back" color="neutral_color_sub1">
          <v-icon size="18px" @click="onCloseTab"> mdi-arrow-left </v-icon>
        </v-btn>
        <span class="">{{
          data && data.type === 1
            ? sysLanguage.title.chatTabGroupTitle
            : sysLanguage.title.chatTabPrivateTitle
        }}</span>
      </p>
    </div>
    <div class="infomation-tab-group">
      <div
        class="group-avatar-n-name d-flex flex-column align-center justify-center py-6"
      >
        <label for="room-group-avatar" class="pointer room-group-avatar-label">
          <RegularAvatar
            :size="84"
            :abbrName="roomAvatarAbbrName"
            :imageUrl="''"
            :ext-class="'mx-auto'"
          />
          <v-icon v-if="isGroup" color="white" size="32" style="opacity: 0.8"
            >mdi-camera</v-icon
          >
        </label>
        <span class="group-name d-flex align-center neutral--text"
          >{{ roomAvatarAbbrName }}
          <v-tooltip v-if="isGroup" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                text
                height="20px"
                max-width="20px"
                min-width="20px"
                v-bind="attrs"
                v-on="on"
                class="ml-2 primary_light primary_light-opacity low-letter-spacing rounded-circle btn-add-group font-weight-bold px-0"
              >
                <v-icon color="primary" size="14px" class="">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Sửa tên nhóm</span>
          </v-tooltip>
        </span>
        <input
          v-if="isGroup"
          type="file"
          id="room-group-avatar"
          class="d-none"
        />
        <p
          v-if="isPrivate"
          class="user-id neutral_color_sub1--text text-center mb-0"
        >
          ID: {{ partner.code || "---" }}
        </p>
      </div>
      <!-- GROUP USERS -->
      <div
        v-if="data && data.type === 1"
        class="group-members py-2 px-2 neutral_color_sub5--text"
      >
        <span class="group-members-title neutral--text font-weight-bold">
          Thành viên nhóm ({{ data.usersCount }})
        </span>
        <v-list dense class="px-0 py-1">
          <v-list-item
            v-for="user in roomMembers.slice(0, userLimit)"
            :key="user.id"
            class="px-0"
          >
            <UserGroupChat :user="user" />
          </v-list-item>
        </v-list>
        <span
          v-if="roomMembers && roomMembers.length > userLimit"
          style="font-size: 12px"
          class="btn-view-all pointer primary--text font-weight-bold text-center d-block"
          >Hiển thị tất cả</span
        >
      </div>
      <!-- PARTNER -->
      <div v-if="isPrivate" class="partner-infomation">
        <!-- v-if=" partner && partner.id" -->

        <div class="inner-info-body">
          <div class="each-inner-info px-2">
            <span class="neutral_color_sub2--text info-label">
              {{ sysLanguage.contact.detailCompany }}</span
            >
            <span class="neutral--text text-right">{{
              partner.company ? partner.company.name : "---"
            }}</span>
          </div>
          <div class="each-inner-info px-2">
            <span class="neutral_color_sub2--text info-label">
              {{ sysLanguage.contact.detailDepartment }}</span
            >
            <span class="neutral--text text-right">{{
              partner.position
                ? partner.position.department
                  ? partner.position.department.name
                  : "---"
                : "---"
            }}</span>
          </div>
          <div class="each-inner-info px-2">
            <span class="neutral_color_sub2--text info-label">
              {{ sysLanguage.contact.detailPosition }}</span
            >
            <span class="neutral--text text-right">{{
              partner.position ? partner.position.name : "---"
            }}</span>
          </div>
          <div class="each-inner-info px-2">
            <span class="neutral_color_sub2--text info-label">
              {{ sysLanguage.contact.detailEmail }}</span
            >
            <span class="neutral--text text-right">{{
              partner.email || "---"
            }}</span>
          </div>
          <div class="each-inner-info px-2">
            <span class="neutral_color_sub2--text info-label">
              {{ sysLanguage.contact.detailPhone }}</span
            >
            <span class="neutral--text text-right">{{
              partner.phone || "---"
            }}</span>
          </div>
        </div>
      </div>
      <div class="shadow-divider"></div>
      <!-- PHOTOS -->
      <div class="room-photos room-part">
        <v-expansion-panels accordion :value="0">
          <v-expansion-panel>
            <v-expansion-panel-header
              class="px-0 py-0"
              :expand-icon="'mdi-menu-down'"
            >
              <span class="room-part-title px-2"> Ảnh/Video </span>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="px-0 py-0">
              <v-row class="list-photos-n-videos my-0 mx-0 px-1">
                <v-col
                  cols="3"
                  class="px-1 py-1 pointer"
                  v-for="idx in 8"
                  :key="idx"
                >
                  <v-img
                    lazy-src="https://picsum.photos/id/237/200/300"
                    aspect-ratio="1"
                    width="100%"
                    class="rounded-lg"
                    src="https://picsum.photos/id/237/200/300"
                  ></v-img>
                </v-col>
              </v-row>
              <span
                style="font-size: 12px"
                class="btn-view-all pointer primary--text font-weight-bold text-center d-block py-2"
                >Xem tất cả</span
              >
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="shadow-divider"></div>
      </div>
      <!-- FILES -->
      <div class="room-files room-part">
        <v-expansion-panels accordion :value="0">
          <v-expansion-panel>
            <v-expansion-panel-header
              class="px-0 py-0"
              :expand-icon="'mdi-menu-down'"
            >
              <span class="room-part-title px-2"> Files </span>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="px-0 py-0">
              <v-row class="list-photos-n-videos my-0 mx-0 px-0">
                <v-col
                  cols="12"
                  class="px-2 py-2 pointer d-flex each-file"
                  v-for="idx in 3"
                  :key="idx"
                >
                  <img
                    src="@/assets/images/file-icon-doc.svg"
                    alt="file-icon-doc"
                  />
                  <div class="file-name-n-sizes d-flex flex-column">
                    <span class="file-name neutral--text font-weight-500"
                      >hd-so-022022-huong...pdf</span
                    >
                    <span class="file-sizes neutral_color_sub2--text"
                      >37.8MB</span
                    >
                  </div>
                  <div class="file-action ml-auto">
                    <v-icon
                      title="Chia sẻ"
                      size="20"
                      class="file-icon-action px-1 py-1 rounded-sm white pointer"
                      >mdi-redo-variant</v-icon
                    >
                    <v-icon
                      title="Tải xuống"
                      size="20"
                      class="file-icon-action px-1 py-1 rounded-sm white pointer"
                      >mdi-tray-arrow-down</v-icon
                    >
                  </div>
                </v-col>
              </v-row>
              <span
                style="font-size: 12px"
                class="btn-view-all pointer primary--text font-weight-bold text-center d-block py-2"
                >Xem tất cả</span
              >
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="shadow-divider"></div>
      </div>
      <!-- LINKS -->
      <div class="room-links room-part">
        <v-expansion-panels accordion :value="0">
          <v-expansion-panel>
            <v-expansion-panel-header
              class="px-0 py-0"
              :expand-icon="'mdi-menu-down'"
            >
              <span class="room-part-title px-2"> Links </span>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="px-0 py-0">
              <v-row class="list-photos-n-videos my-0 mx-0 px-0">
                <v-col
                  cols="12"
                  class="px-2 py-2 pointer d-flex each-link"
                  v-for="idx in 3"
                  :key="idx"
                >
                  <img
                    src="@/assets/images/file-icon-link.svg"
                    alt="file-icon-link"
                  />
                  <div class="file-name-n-sizes d-flex flex-column">
                    <span class="file-name neutral--text font-weight-500"
                      >hd-so-022022-huong-dan-su...</span
                    >
                    <span class="file-sizes semantic_info--text"
                      >http://www.google.drive .com/</span
                    >
                  </div>
                  <div class="file-action ml-auto">
                    <v-icon
                      title="Chia sẻ"
                      size="20"
                      class="file-icon-action px-1 py-1 rounded-sm white pointer"
                      >mdi-redo-variant</v-icon
                    >
                  </div>
                </v-col>
              </v-row>
              <span
                style="font-size: 12px"
                class="btn-view-all pointer primary--text font-weight-bold text-center d-block py-2"
                >Xem tất cả</span
              >
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="shadow-divider"></div>
      </div>
      <div class="py-2">
        <v-btn
          text
          color="semantic_error"
          class="v-btn-text-normalize justify-start mb-1 low-letter-spacing text-left d-block w-100"
        >
          <v-icon color="semantic_error" class="mr-2">mdi-logout</v-icon> Rời
          khỏi nhóm
        </v-btn>
        <v-btn
          text
          color="semantic_error"
          class="v-btn-text-normalize justify-start mb-1 low-letter-spacing text-left d-block w-100"
        >
          <v-icon color="semantic_error" class="mr-2">mdi-cancel</v-icon> Đóng
          hội thoại
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import UserGroupChat from "./UserGroupChat.vue"
export default {
  components: { UserGroupChat },
  props: {
    data: {
      type: Object,
      default() {},
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
    roomMembers: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      // partner: {},
      userLimit: 3,
      photosLimit: 8,
      filesLimit: 3,
      linksLimit: 3,
    }
  },
  computed: {
    isGroup() {
      return this.data && this.data.type === 1
    },
    isPrivate() {
      return this.data && this.data.type === 2
    },
    partner() {
      return this.isPrivate ? this.data.partner : {}
    },
    roomAvatarAbbrName() {
      if (!this.data) {
        return ""
      }
      if (this.data.type === 1) {
        return this.data.decodeName || this.data.fname
      } else {
        return this.data.partner ? this.data.partner.name : "Không rõ"
      }
    },
  },
  methods: {
    onCloseTab() {
      this.setRightBarActive(0)
      this.toggleSideBar(false)
    },
  },
}
</script>

<style lang="scss" scoped>
.room-group-avatar-label {
  position: relative;
  i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.group-name {
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
}
.group-members {
  border-top: 1px solid;
  &-title {
    font-size: 12px;
    line-height: 14px;
  }
}
.room-part-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
}
.each-file,
.each-link {
  gap: 8px;
  &:hover {
    background: #f2f2f2;
  }
  .file-name {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.0025em;
  }
  .file-sizes {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
  .file-action {
    width: 64px;
    min-width: 64px;
    display: flex;
    align-items: center;
    gap: 5px;
    opacity: 0;
    visibility: hidden;
    transition: 0.15s ease;
  }
  &:hover {
    .file-action {
      visibility: visible;
      opacity: 1;
    }
  }
}
.each-link {
  .file-action {
    width: 30px;
    min-width: 30px;
  }
}
.infomation-tab-group {
  max-height: calc(100vh - 64px);
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    position: absolute;
  }

  &::-webkit-scrollbar-track {
    background: #e6e6e600;
    border-radius: 0px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background: rgba(176, 176, 176, 0.526);
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      border-radius: 0px;
      background: rgb(96, 96, 96);
    }
  }
}
.user-id {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.004em;
}
.each-inner-info {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f2f2f2;
  .info-label {
    width: 130px;
    min-width: 130px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }
  .info-desc {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    letter-spacing: 0.0025em;
  }
}
</style>

<style lang="scss">
.room-part {
  .v-expansion-panel {
    &::before {
      display: none;
    }
  }
  .v-expansion-panel--active > .v-expansion-panel-header {
    min-height: 48px;
  }
  .v-expansion-panel-content__wrap {
    padding-left: 0px !important;
    padding-right: 0px !important;
    padding-bottom: 0px !important;
  }
}
</style>
