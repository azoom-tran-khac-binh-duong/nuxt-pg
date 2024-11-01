<template>
  <div class="account-login">
    <PCard class="login-card">
      <template #title>
        <h1 class="login-title">Login</h1>
      </template>
      <template #content>
        <div class="login-field">
          <label for="email">Email</label>
          <PInputText id="email" v-model="form.email" fluid />
        </div>
        <div class="login-field">
          <label for="password">Password</label>
          <PPassword
            v-model="form.password"
            toggleMask
            :feedback="false"
            fluid
          />
        </div>
      </template>
      <template #footer>
        <div class="login-action">
          <PButton
            @click="handleLogin"
            :disabled="!isValidForm"
            label="Submit"
            class="button -submit"
            fluid
          />
        </div>
      </template>
    </PCard>
  </div>
</template>
<script setup lang="ts">
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
const form = reactive({
  email: "",
  password: "",
});

const isValidForm = computed(() => {
  return form.email && form.password;
});

const handleLogin = async () => {
  if (!isValidForm) {
    return;
  }
  
  const auth = getAuth();
  const route = useRoute();

  try {
    await signInWithEmailAndPassword(auth, form.email, form.password);
    return navigateTo((route.query.redirect as string) || "/");
  } catch (error) {
    console.error(error);
  }
};
</script>
<style scoped>
.account-login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-title {
  text-align: center;
}

.login-field {
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  gap: 4px;
}

@media screen and (max-width: 768px) {
  .login-field {
    width: 300px
  }
}
</style>