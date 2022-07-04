<template>
  <div class="msg-actions-absolute">
    <v-menu top :offset-y="true">
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
                mdi-dots-horizontal
              </v-icon>
            </template>

            <span>Thêm</span>
          </v-tooltip>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>A</v-list-item-title>
          <v-list-item-title>B</v-list-item-title>
          <v-list-item-title>C</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.msg-actions-absolute {
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
</style>
