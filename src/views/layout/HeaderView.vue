<template>
  <div>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
      >
        <a href="https://flowbite.com" class="flex items-center">
          <img
            src="@/assets/logo.png"
            class="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >Powered by Tailwindcss and Flowbite</span
          >
        </a>
        <div class="flex items-center lg:order-2">
          <a
            href="#"
            @click="logout"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >Logout</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      logoutModal: false,
    };
  },
  methods: {
    ...mapActions({ initUser: "user/initUser" }),
    logout() {
      if (confirm("Are you sure you want to log out?")) {
        window.Kakao.Auth.logout();
        this.initUser();
      }
    },
  },
  components: {},
};
</script>

<style scoped></style>
