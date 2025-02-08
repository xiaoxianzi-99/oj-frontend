<template>
  <div id="userRegisterView" class="register-container">
    <img src="@/assets/logo.png" alt="Logo" class="register-logo" />
    <h2 class="register-title">用户注册</h2>
    <a-form
      class="register-form"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="username" label="用户名">
        <a-input v-model="form.username" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item field="email" label="邮箱">
        <a-input v-model="form.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item field="password" tooltip="密码不少于 8 位" label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="register-button">
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const form = reactive({
  username: "",
  email: "",
  password: "",
} as UserRegisterRequest);

const router = useRouter();

const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    message.success("注册成功");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败，" + res.message);
  }
};
</script>

<style scoped>
.register-container {
  max-width: 480px;
  margin: 20vh auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.register-logo {
  display: block;
  margin: 0 auto 16px;
  max-width: 100px;
}

.register-title {
  margin-bottom: 16px;
  text-align: center;
  font-size: 24px;
  color: #333;
}

.register-form {
  width: 100%;
}

.register-button {
  width: 100%;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-button:hover {
  background-color: #38a169;
}
</style>
