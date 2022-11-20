<template>
  <LayoutView v-if="hasToken" />
  <LoginView v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import LayoutView from "./views/layout/LayoutView.vue";
import LoginView from "./views/login/LoginView.vue";
import axios from "axios";
// import LoginView from "./views/LoginView.vue";
// import HomeView from "./views/HomeView.vue";
export default {
  data() {
    return {
      show: true,
    };
  },
  async created() {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.VUE_APP_KAKAO_JS_KEY);
      window.Kakao.isInitialized();
      console.log(this.hasToken);
      console.log("Kakao API is good to go");
    }
    if (!this.hasToken) {
      await this.getToken();
      await this.getUserInfo();
      this.$router.push("/main.do");
      this.$forceUpdate();
    }
  },
  methods: {
    ...mapActions({ initUser: "user/initUser" }),
    logout() {
      window.Kakao.Auth.logout();
      this.initUser();
    },
    ...mapActions("user", [
      "setToken",
      "setName",
      "setId",
      "setEmail",
      "setThumbnail",
    ]),
    async getToken() {
      const code = this.$route.query.code;
      const client_id = process.env.VUE_APP_KAKAO_REST_KEY;
      const redirect_uri = process.env.VUE_APP_KAKAO_REDIR;

      const response = await axios({
        url: "https://kauth.kakao.com/oauth/token",
        method: "POST",
        params: {
          grant_type: "authorization_code",
          client_id,
          redirect_uri,
          code,
        },
      });
      console.log(response);

      this.setToken(response.data.access_token);
      window.Kakao.Auth.setAccessToken(response.data.access_token);
    },

    async getUserInfo() {
      window.Kakao.API.request({
        url: "/v2/user/me",
      })
        .then((response) => {
          this.setName(response.properties.nickname);
          this.setId(response.id);
          this.setEmail(response.kakao_account.email);
          this.setThumbnail(response.properties.thumbnail_image);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      hasToken: "user/hasToken",
    }),
  },
  components: {
    LayoutView,
    LoginView,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
