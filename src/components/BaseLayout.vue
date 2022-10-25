<template>
  <el-container class="common-layout">
    <BaseSide />
    <el-container>
      <el-header><BaseHeader /></el-header>
      <el-main>
        <el-scrollbar><slot /> </el-scrollbar
      ></el-main>
      <el-footer height="36px" class="footer"
        >SMK N 7 Semarang &copy; {{ new Date().getFullYear() }}</el-footer
      >
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "BaseLayout",
  setup() {},
};
</script>

<style scoped>
.common-layout {
  min-height: 100vh;
}
.footer {
  text-align: center;
  font-size: 12px;
  color: #409eff;
}
</style>
