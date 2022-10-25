<template>
  <el-menu mode="horizontal" class="header">
    <div @click="toggleDark()" style="cursor: pointer">
      <el-icon :size="25"><Sunny v-if="isDark" /> <Moon v-else /></el-icon>
    </div>
  </el-menu>
</template>

<script>
import { useDark, useToggle } from "@vueuse/core";

export default {
  name: "BaseHeader",
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    return {
      toggleDark,
      isDark,
    };
  },
};
</script>
  
<style scoped>
.header {
  padding: 16px 0px;
  display: flex;
  justify-content: flex-end;
}
</style>