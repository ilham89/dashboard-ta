<template>
  <div class="app">
    <BaseLayout v-if="!isLoginPage">
      <router-view />
    </BaseLayout>
    <router-view v-else />
  </div>
</template>

<script>
import { computed, onMounted } from "vue-demi";
import { useQueryProvider } from "vue-query";

export default {
  name: "App",
  setup() {
    onMounted(() => {
      useQueryProvider();
    });

    const isLoginPage = computed(() => {
      return window.location.pathname === "/login";
    });

    return {
      isLoginPage,
    };
  },
};
</script>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
