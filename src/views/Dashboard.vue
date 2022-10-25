<template>
  <div class="header">
    <h4>Category</h4>
    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="Create Category"
    :width="isLargeScreen ? '30%' : '75%'"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="250px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="Name" prop="name">
        <el-input
          v-model="ruleForm.name"
          type="text"
          autocomplete="off"
          placeholder="Name"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button
          :loading="submitLoading"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-table
    v-loading="isLoading"
    border
    v-if="data"
    :data="data.data"
    style="width: 100%"
  >
    <el-table-column label="Name" prop="name" />
    <el-table-column :align="'right'">
      <template #header>
        <el-input
          class="w-50 m-2"
          v-model="search"
          placeholder="Type to search"
          clearable
        >
          <template #prefix>
            <el-icon><search /></el-icon>
          </template>
        </el-input>
      </template>
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      v-if="data"
      :total="data.meta.pagination.total"
      @prev-click="console.log('pppp')"
      @next-click="console.log('qqq')"
    />
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "vue-query";
import { WEB_SERVICES } from "../services";
import { useMediaQuery } from "@vueuse/core";

export default {
  name: "Dashboard",
  setup() {
    const search = ref("");
    const queryClient = useQueryClient();
    const isLargeScreen = useMediaQuery("(min-width: 769px)");
    const { mutate: deleteCategory } = useMutation(
      (id) => WEB_SERVICES.AspirationCategories.deleteAspirationCategories(id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("aspiration-categories");
        },
      }
    );
    const handleDelete = (_index, row) => {
      deleteCategory(row.id);
    };

    const useAspirationCategoryQuery = () => {
      return useQuery("aspiration-categories", () =>
        WEB_SERVICES.AspirationCategories.getAspirationCategories()
      );
    };
    const { isLoading, data } = useAspirationCategoryQuery();
    const dialogVisible = ref(false);
    const ruleFormRef = ref();
    const ruleForm = reactive({
      name: "",
    });
    const rules = reactive({
      name: [{ required: true, message: "Please input name", trigger: "blur" }],
    });
    const { mutate, isLoading: submitLoading } = useMutation(
      (data) =>
        WEB_SERVICES.AspirationCategories.createAspirationCategories(data),
      {
        onSuccess: () => {
          dialogVisible.value = false;
          queryClient.invalidateQueries("aspiration-categories");
          ruleForm.name = "";
        },
      }
    );
    const submitForm = (formEl) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          mutate(ruleForm);
        } else {
          return false;
        }
      });
    };
    return {
      search,
      handleDelete,
      isLoading,
      data,
      dialogVisible,
      isLargeScreen,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      submitLoading,
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  margin: 16px 0px;
  display: flex;
  justify-content: flex-end;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>