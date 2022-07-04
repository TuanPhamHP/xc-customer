<template>
  <div class="px-4 my-0 mx-0 w-100 page-view-container">
    <div
      class="page-view-table--header mb-3 d-flex align-center justify-space-between"
    >
      <div class="rs d-flex align-items-center">
        <p class="table-name text--h5 mb-0">Danh sách dịch vụ</p>
        <div
          class="filter-input outer-border white rounded-lg ml-3"
          style="width: 400px"
        >
          <v-icon color="neutral" size="20">mdi-magnify</v-icon>
          <input
            v-model="contactSearchQuery"
            type="text"
            placeholder="Tìm kiếm"
            class="input-no-focus font-size-14"
          />
        </div>
      </div>
      <div class="ls">
        <!-- <v-btn
          text
          color="primary"
          outlined
          class="v-btn-text-normalize v-btn-outlined-primary-white text--btn px-3 mr-4"
        >
          <v-icon size="18" class="mr-1">mdi-filter</v-icon>
          Bộ lọc
        </v-btn> -->
        <v-btn
          depressed
          color="primary"
          class="v-btn-text-normalize v-btn-outlined-primary-white text--btn ml-auto px-3"
          :loading="loadingInit"
          @click="initOrder"
        >
          <v-icon size="18" class="mr-1">mdi-plus</v-icon>
          Đăng ký DV
        </v-btn>
      </div>
    </div>
    <div class="">
      <ServiceTable
        :list-data="listData"
        :set-data-remove="setDataRemove"
        :first-loading="firstLoading"
        :is-search="isSearch"
      />
      <Pagination
        v-if="listData && listData.length"
        :loading="loadingSearch"
        class="mt-0"
        :pagination-sync="pagination"
        @handlePageSizeChange="pagePaginationChange"
        @handlePageChange="pagePaginationChange"
      />
    </div>
    <DialogConfirm
      :is-visible="visibleRemoveDialog"
      :cancel-action="cancelRemove"
      :confirm-action="confirmRemove"
      :cancel-btn-text="sysLanguage.confirmDialog.cancelBtnTextNo"
      :cancel-btn-color="'neutral_color_sub3'"
      :confirm-btn-text="sysLanguage.confirmDialog.confirmBtnRemoveOrder"
      :title="sysLanguage.confirmDialog.removeOrder"
      :message="removeMsg"
      :loading-confirm-btn="loadingRemove"
      :confirm-btn-class="'rounded-md white--text v-btn-text-normalize  py-2 fixed-confirm-btn-w'"
      :cancel-btn-class="'rounded-md white--text v-btn-text-normalize  py-2 fixed-confirm-btn-w'"
      :confirm-btn-color="'semantic_error'"
      :raw-html="true"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ServiceTable from '@/components/Table/ServiceTable.vue';
import DialogConfirm from '@/components/Dialog/DialogConfirm.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import objHandlerMixins from '@/mixins/objHandlerMixins.js';
import api from '@/services';
export default {
  name: 'ServicesPage',
  components: { ServiceTable, Pagination, DialogConfirm },
  mixins: [objHandlerMixins],
  data() {
    return {
      contactSearchQuery: '',
      loadingInit: false,
      loadingSearch: false,
      firstSync: true,
      loadingRemove: false,
      firstLoading: true,
      selectedDataToRemove: null,
      listData: [],
      refIntersect: 0,
      pagination: {
        total: 1,
        total_pages: 1,
        per_page: 15,
        page: 1
      }
    };
  },
  head: {
    title: 'Bảng dịch vụ',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Bảng dịch vụ'
      }
    ]
  },
  computed: {
    ...mapState({
      listServices: (state) => state.listServices
    }),
    isSearch() {
      const obj = { ...this.$route.query };
      delete obj.size;
      delete obj.page;
      return !!Object.keys(obj).length;
    },
    ...mapGetters({
      sysLanguage: 'sysLanguage'
    }),
    visibleRemoveDialog() {
      return !!(this.selectedDataToRemove && this.selectedDataToRemove.id);
    },
    removeMsg() {
      return `Bạn có chắc chắn muốn xoá phiếu dịch vụ ${
        this.selectedDataToRemove
          ? this.getFirstFieldFromArray(
              this.listServices,
              'id',
              this.selectedDataToRemove.service_type,
              'name'
            )
          : ''
      }: <b>${
        this.selectedDataToRemove ? this.selectedDataToRemove.code : ''
      }</b> không?`;
    }
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.getListData();
      }
    },
    pagination: {
      deep: true,
      handler() {
        this.syncUrl();
      }
    },
    contactSearchQuery() {
      if (this.firstSync) {
        return;
      }
      clearTimeout(this.refIntersect);
      this.refIntersect = setTimeout(() => {
        this.pagination = {
          ...this.pagination,
          page: 1
        };
      }, 700);
    }
  },
  mounted() {
    this.$store.commit('setListCrumb', [
      {
        name: 'Trang chủ',
        icon: 'mdi-home-outline',
        link: '/'
      },
      {
        name: 'Dịch vụ',
        icon: '',
        link: '/services'
      }
    ]);

    this.bindUrl();
    this.getListData();
  },
  methods: {
    cancelRemove() {
      this.selectedDataToRemove = null;
    },
    async confirmRemove() {
      this.loadingRemove = true;
      const res = await api.order.delete(this.selectedDataToRemove.id);
      this.loadingRemove = false;
      if (!res) {
        this.$store.commit(
          'toast/getError',
          this.sysLanguage.snackbar.removeOrderFail
        );

        return;
      }
      try {
        if (res.status && res.status >= 400) {
          this.$store.commit(
            'toast/getError',
            res.data.message || res.data.error
          );
          return;
        }
        this.$store.commit(
          'toast/getSuccess',
          this.sysLanguage.snackbar.removeOrderSuccess
        );
        await this.getListData();
        this.$nextTick(() => {
          this.selectedDataToRemove = null;
        });
      } catch (error) {
        this.$store.commit('toast/getError', `${error}`);
      }
    },
    setDataRemove(_data) {
      this.selectedDataToRemove = { ..._data };
    },
    syncUrl() {
      const query = {
        size: this.pagination.per_page,
        page: this.pagination.page
      };
      if (this.contactSearchQuery) {
        query.search = this.contactSearchQuery;
      }

      this.$router.replace({ query }).catch(() => {});
    },
    bindUrl() {
      const query = this.$route.query;
      if (query.search) {
        this.contactSearchQuery = query.search;
      }
      if (+query.size) {
        this.pagination = { ...this.pagination, per_page: +query.size };
      }
      if (+query.page) {
        this.pagination = { ...this.pagination, page: +query.page };
      }
    },
    pagePaginationChange(_val) {
      this.pagination = {
        ...this.pagination,
        per_page: _val.per_page,
        page: _val.page
      };
    },
    async initOrder() {
      this.loadingInit = true;
      const res = await api.order.init();
      this.loadingInit = false;
      if (!res) {
        this.$store.commit(
          'toast/getError',
          this.sysLanguage.snackbar.initOrdersFail
        );
        return;
      }
      try {
        if (res.status && res.status >= 400) {
          this.$store.commit(
            'toast/getError',
            res.data.message || res.data.error
          );
          return;
        }

        this.$router.push(`/services/register/${res.data.data.order.id}`);
      } catch (error) {
        this.$store.commit('toast/getError', `${error}`);
      }
    },
    async getListData() {
      this.loadingSearch = true;
      const query = { ...this.$route.query };
      const payload = { ...query };
      const res = await api.order.getListData(payload);
      this.firstLoading = false;
      this.firstSync = false;
      this.loadingSearch = false;
      if (!res) {
        this.$store.commit(
          'toast/getError',
          this.sysLanguage.snackbar.getOrdersFail
        );

        return;
      }
      try {
        if (res.status && res.status >= 400) {
          this.$store.commit(
            'toast/getError',
            res.data.message || res.data.error
          );
          return;
        }
        const dataObj = res.data.data;
        console.log(dataObj);
        this.listData = dataObj.orders;
        this.pagination = {
          total: dataObj.meta.pagination.total,
          total_pages: dataObj.meta.pagination.total_pages,
          per_page: dataObj.meta.pagination.per_page,
          page: dataObj.meta.pagination.current_page
        };
      } catch (error) {
        this.$store.commit('toast/getError', `${error}`);
      }
    }
  }
};
</script>
