import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/services';
// import toast from './toast'
// import news from './news'
// import room from './room'
// import users from './users'
import {
  getCookie,
  deleteCookie,
  setCookie
} from '@/helpers/customizeCookie.js';

import en from '@/plugins/locales/en.json';
import vi from '@/plugins/locales/vi.json';
Vue.use(Vuex);

export const state = () => ({
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
    loggedInUser: {},
    isLogging: false,
    errorLogging: '',
    isReconnecting: false
  },
  auth: {
    isAuth: false,
    user: null,
    token: null
  },
  prefixUserName: 'user',
  userChat: {},
  showLogoutPopup: false,
  showPasswordPopup: false,
  sideBarAppMini: false,
  sideBarContactMini: false,
  listCrumb: [],
  listImagePreview: [],
  listUserReadOnly: [],
  listAddOnServices: [
    { id: -1, name: 'Khác' },
    { id: 1, name: 'Sang hàng sau 22h' }
  ],
  listServices: [
    {
      id: 'pallet',
      name: 'Pallet'
    },
    {
      id: 'craning',
      name: 'Cẩu'
    },
    {
      id: 'loading',
      name: 'Bốc xếp'
    },
    {
      id: 'roof',
      name: 'Mái che'
    }
  ],
  listUserReadOnlyName: '',
  selectedImgIndex: 0,
  currentRightSideActive: 1,
  currentRightSideTab: 0,
  selectedUser: {},
  selectedUserGroup: {},
  splitMark: '$#%8$H%',
  disableChangeRoom: false,
  currentLanguage: 'vi', // vi | en
  fileType: {
    image: [
      'jpg',
      'png',
      'jpeg',
      'gif',
      'webp',
      'JPG',
      'PNG',
      'JPEG',
      'GIF',
      'WEBP'
    ],
    files: [
      'xlsx',
      'pdf',
      'docx',
      'txt',
      'text',
      'xls',
      'XLSX',
      'PDF',
      'DOCX',
      'TXT',
      'TEXT',
      'bpmn',
      'BPMN',
      'rar',
      'RAR',
      'zip',
      'ZIP',
      'apk',
      'APK',
      'exe',
      'EXE',
      'dll',
      'DLL',
      'json',
      'JSON'
    ],
    pdf: ['pdf', 'PDF'],
    doc: ['docx', 'DOCX', 'doc'],
    xls: ['xls', 'xlsx', 'XLSX'],
    video: [
      'mp4',
      'MP4',
      'mpeg4',
      'MPEG4',
      'avi',
      'AVI',
      'mpg',
      'mpeg',
      'MPEG',
      'wmv',
      'WMV',
      'ogg',
      'Ogg',
      'OGG',
      'webm',
      'WebM',
      'WEBM',
      'mov',
      'MOV'
    ]
  }
});
export const mutations = {
  setDisableChangeRoom(state, payload) {
    state.disableChangeRoom = payload;
  },
  setListCrumb(state, payload) {
    state.listCrumb = payload;
  },
  setLang(state, payload) {
    state.currentLanguage = payload;
  },
  setCurrentRightSideTab(state, number) {
    state.currentRightSideTab = number;
  },
  setCurrentRightSideActive(state, number) {
    state.currentRightSideActive = number;
  },
  setSelectedUser(state, record) {
    state.selectedUser = record;
  },
  setSelectedUserGroup(state, record) {
    state.selectedUserGroup = record;
  },
  setListImagePreview(state, payload) {
    state.listImagePreview = payload;
  },
  setSelectedImgIndex(state, payload) {
    state.selectedImgIndex = payload;
  },
  SET_LIST_ADDONSERVICES(state, payload) {
    state.listAddOnServices = { ...payload };
  },
  SET_LIST_SERVICES(state, payload) {
    state.listServices = { ...payload };
  },
  SET_USER_CHAT(state, payload) {
    state.userChat = { ...payload };
  },
  SET_LISTUSER_READONLY_POPUP(state, payload) {
    state.listUserReadOnly = [...payload];
  },
  SET_LISTUSER_READONLY_POPUPNAME(state, payload) {
    state.listUserReadOnlyName = payload;
  },
  SET_USER_LOGGEDIN(state, payload) {
    state.auth = { ...payload };
  },
  HOTSET_USER(state, payload) {
    state.auth = { ...state.auth, user: payload };
  },
  SET_LOGOUT_USER(state) {
    deleteCookie('token');
    state.auth = { isAuth: false, user: null, token: null };
  },
  SET_LOGOUT_POPUP(state, payload) {
    state.showLogoutPopup = payload;
  },
  SET_PASSWORD_POPUP(state, payload) {
    state.showPasswordPopup = payload;
  },
  setCurrentToken(state, payload) {
    // localStorage.setItem("token", payload)
    setCookie('token', payload, 30);
    state.currentToken = payload;
  },
  setSidebarMini(state, payload) {
    state.sideBarAppMini = payload;
  },
  setSidebarContactMini(state, payload) {
    state.sideBarContactMini = payload;
  },
  // SOCKET HANDLER
  SOCKET_ONOPEN(state, event) {
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
    if (state.socket.isReconnecting) {
      state.socket.isReconnecting = false;
    }
    Vue.prototype.$socket.send(
      JSON.stringify({
        msg: 'connect',
        version: '1',
        support: ['1']
      })
    );
  },
  SOCKET_ONCLOSE(state) {
    state.socket.isConnected = false;
  },
  SOCKET_ONERROR(state, event) {
    console.error(state, event);
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE(state, message) {
    state.socket.message = message;
  },
  // mutations for reconnect methods
  SOCKET_RECONNECT(state, count) {
    state.socket.isReconnecting = true;
    console.info(state.socket, count, 'reconnect socket');
    if (count >= 3) {
      // window.location.href = '/';
    }
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true;
  }
  //
};
export const getters = {
  isAuth: (state) => {
    return state.auth.isAuth;
  },
  token: (state) => {
    return state.auth.token;
  },
  userFromAuth: (state) => {
    if (!state.auth.user) {
      return {};
    }
    return state.auth.user;
  },
  userPermissions: (state) => {
    if (!state.auth.user) {
      return [];
    }
    return state.auth.user.application_access_permissions || [];
  },
  sysLanguage: (state) => {
    // languageObj
    if (state.currentLanguage === 'en') {
      return en;
    }
    return vi;
  }
};
export const actions = {
  async loginByStore({ commit }) {
    const localCToken = getCookie('token');
    const res = await api.user.getUserInfo(localCToken);
    return new Promise((resolve) => {
      if (!res) {
        resolve(false);
        return;
      }
      try {
        const authSet = {
          isAuth: true,
          user: res.data.data.customer,
          token: `Bearer ${res.data.data.token}`
        };
        commit('SET_USER_LOGGEDIN', authSet);
        // commit("SET_LIST_PRIVATE", [])
        setTimeout(() => {
          resolve(true);
        }, 2000);
      } catch (error) {
        console.log(error);
        resolve(false);
      }
    });
  }
};
