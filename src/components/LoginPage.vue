// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        ID and password are needed to send your metadata to DataCite. None of this information is stored on this site.
      </p>
    </div>
    <form class="mt-8 space-y-6" action="#"  @submit.prevent="submitLogin">
      <label class="block mb-2 font-bold" for="client-id">Client ID</label>
      <input class="w-full p-2 mb-4 border rounded" id="client-id" v-model="username" required>
      <label class="block mb-2 font-bold" for="password">Password</label>
      <input class="w-full p-2 mb-4 border rounded" id="password" v-model="password" type="password" required>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Login</button>
    </form>
  </div>
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
