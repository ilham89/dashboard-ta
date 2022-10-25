<template>
  <div class="header">
    <h4>Aspiration</h4>
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
        <el-button type="primary" @click="submitForm(ruleFormRef)"
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
    <el-table-column label="Category" prop="aspiration_category" />
    <el-table-column label="Title" prop="title" />
    <el-table-column label="Vote" prop="vote" />
    <el-table-column
      label="Status"
      prop="status"
      :filters="[
        { text: 'Pending', value: 'pending' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' },
      ]"
      :filter-method="filterStatus"
      filter-placement="bottom-end"
      class="wkwk"
    />
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
          type="success"
          @click="handleApprove(scope.$index, scope.row)"
          >Approve</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleReject(scope.$index, scope.row)"
          >Reject</el-button
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
      @current-change="change"
      :current-page="page"
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
    const change = (newPage) => {
      page.value = newPage;
    };
    const page = ref(1);
    const isLargeScreen = useMediaQuery("(min-width: 769px)");
    const { mutate: approveAspiration } = useMutation(
      (id) => WEB_SERVICES.Aspiration.approveAspiration(id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("aspirations");
        },
      }
    );
    const handleApprove = (_index, row) => {
      approveAspiration(row.id);
    };

    const { mutate: rejectAspiration } = useMutation(
      (id) => WEB_SERVICES.Aspiration.rejectAspiration(id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("aspirations");
        },
      }
    );
    const handleReject = (_index, row) => {
      rejectAspiration(row.id);
    };

    const useAspirationQuery = () => {
      return useQuery(["aspirations", page], () =>
        WEB_SERVICES.Aspiration.getAspirations(page.value)
      );
    };
    const { isLoading, data } = useAspirationQuery();
    const dialogVisible = ref(false);
    const ruleFormRef = ref();
    const ruleForm = reactive({
      name: "",
    });
    const rules = reactive({
      name: [{ required: true, message: "Please input name", trigger: "blur" }],
    });

    const submitForm = (formEl) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("valid");
        } else {
          return false;
        }
      });
    };
    const filterStatus = (value, row) => {
      return row.tag === value;
    };

    return {
      search,
      handleApprove,
      handleReject,
      isLoading,
      data,
      dialogVisible,
      isLargeScreen,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      change,
      page,
      filterStatus,
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
span .el-table__column-filter-trigger {
  margin-left: 16px !important;
}
/* .wkwk > div > span {
  background-color: red !important;
  margin-left: 16px !important;
}
.el-table tr:nth-child(odd) {
  background-color: #cb0d0d;
} */
</style>