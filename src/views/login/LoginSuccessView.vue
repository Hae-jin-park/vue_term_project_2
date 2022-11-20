<template>
  <div>
    <p>
      <img :src="img" alt="프로필 사진 이미지" />
    </p>
    <p>닉네임 : {{ nickName }}</p>
    <button
      class="w-1/2 mx-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Go To Main Page
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      nickName: "",
      img: "",
    };
  },

  methods: {
    ...mapActions("user", ["setToken", "setName", "setId"]),
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
          console.log(response);
          this.nickName = response.properties.nickname;
          this.img = response.properties.profile_image;
          this.setName(response.properties.nickname);
          this.setId(response.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  async created() {
    await this.getToken();
    await this.getUserInfo();
    this.$router.push("/main.do");
  },
};
</script>

<style></style>
