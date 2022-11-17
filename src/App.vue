<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="!hasToken" to="/login.do">Login</router-link>
      <a v-if="hasToken" @click="logout">Logout</a>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.VUE_APP_KAKAO_JS_KEY);
      window.Kakao.isInitialized();
      console.log(this.hasToken);
      console.log("Kakao API is good to go");
    }
  },
  methods: {
    ...mapActions({ initUser: "user/initUser" }),
    logout() {
      window.Kakao.Auth.logout();
      this.initUser();
    },
  },
  computed: {
    ...mapGetters({ hasToken: "user/hasToken" }),
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
