<template>
  <div class="container">
    <div style="width: 250px">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="250px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="Email" prop="email">
          <el-input
            v-model="ruleForm.email"
            type="text"
            autocomplete="off"
            placeholder="Email"
          />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="Password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isLoading"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >Submit</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useMutation } from "vue-query";
import { useRouter } from "vue-router";
import { WEB_SERVICES } from "../services";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const ruleFormRef = ref();
    const ruleForm = reactive({
      password: "",
      email: "",
    });
    const rules = reactive({
      password: [
        { required: true, message: "Please input password", trigger: "blur" },
        { min: 8, message: "Min length 8", trigger: "blur" },
      ],
      email: [
        {
          required: true,
          type: "email",
          message: "Please input valid email",
          trigger: "blur",
        },
      ],
    });
    const { mutate, isLoading } = useMutation(
      (data) => WEB_SERVICES.Auth.login(data),
      {
        onSuccess: (data) => {
          localStorage.setItem("user", JSON.stringify(data));
          router.push("/");
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
    const resetForm = (formEl) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    return {
      ruleForm,
      rules,
      submitForm,
      ruleFormRef,
      resetForm,
      isLoading,
    };
  },
};
</script>


<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>