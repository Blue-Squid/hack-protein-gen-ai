// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-medium mb-4">Login</h2>
    <form @submit.prevent="submitLogin">
      <label class="block mb-2 font-bold" for="client-id">Client ID</label>
      <input class="w-full p-2 mb-4 border rounded" id="client-id" v-model="username" required>
      <label class="block mb-2 font-bold" for="password">Password</label>
      <input class="w-full p-2 mb-4 border rounded" id="password" v-model="password" type="password" required>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Login</button>
    </form>
  </div>
</template>


<script>
import auth from '@/services/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async submitLogin() {
      try {
        await auth.login(this.username, this.password);
        this.$router.push('/submit');
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    },
  },
};
</script>
