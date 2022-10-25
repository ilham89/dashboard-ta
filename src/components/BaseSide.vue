<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <div>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </div>

    <el-menu-item
      @click="handleCollapse()"
      index="4"
      :class="!isCollapse && 'icon'"
    >
      <el-icon
        ><DArrowRight v-if="isCollapse" />
        <div v-else><DArrowLeft /></div>
      </el-icon>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { ref } from "vue";

export default {
  name: "BaseSide",

  setup() {
    const isCollapse = ref(true);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath, "open");
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath, "close");
    };
    const handleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    return {
      isCollapse,
      handleOpen,
      handleClose,
      handleCollapse,
    };
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-vertical-demo {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.icon {
  display: flex;
  justify-content: end;
}
</style>
