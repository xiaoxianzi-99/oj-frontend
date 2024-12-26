<template>
  <div id="header">
    <a-row style="margin-bottom: 16px">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectKeys"
          @menu-item-click="doMenueClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div
              :style="{
                width: '80px',
                height: '30px',
                borderRadius: '2px',
                background: 'var(--color-fill-3)',
                cursor: 'text',
              }"
            />
          </a-menu-item>
          <a-menu-item v-for="item in routes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>auto</div>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const doMenueClick = (key: string) => {
  router.push({ path: key });
};

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectKeys.value = [to.path];
});

const selectKeys = ref(["/"]);
</script>
<style scoped></style>
