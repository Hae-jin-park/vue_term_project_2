export default {
  namespaced: true,

  state: {
    token: sessionStorage.getItem("access-token"),
    user: {
      id: sessionStorage.getItem("user-id"),
      name: sessionStorage.getItem("user-name"),
      email: sessionStorage.getItem("user-email"),
      thumbnail: sessionStorage.getItem("user-thumbnail"),
    },
  },

  getters: {
    id(state) {
      return state.user.id;
    },

    name(state) {
      return state.user.name;
    },

    token(state) {
      return state.token;
    },

    email(state) {
      return state.user.email;
    },

    thumbnail(state) {
      return state.user.thumbnail;
    },

    hasToken(state) {
      return !!state.token;
    },
  },

  mutations: {
    setName(state, name) {
      state.user.name = name;
      sessionStorage.setItem("user-name", name);
    },

    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem("access-token", token);
    },

    setId(state, id) {
      state.user.id = id;
      sessionStorage.setItem("user-id", id);
    },

    setEmail(state, email) {
      state.user.email = email;
      sessionStorage.setItem("user-email", email);
    },

    setThumbnail(state, thumbnail) {
      state.user.thumbnail = thumbnail;
      sessionStorage.setItem("user-thumbnail", thumbnail);
    },
  },

  actions: {
    setName({ commit }, name) {
      commit("setName", name);
    },

    setId({ commit }, id) {
      commit("setId", id);
    },

    setToken({ commit }, token) {
      commit("setToken", token);
    },

    setEmail({ commit }, email) {
      commit("setEmail", email);
    },

    setThumbnail({ commit }, thumbnail) {
      commit("setThumbnail", thumbnail);
    },

    initUser({ commit }) {
      commit("setId", "");
      commit("setName", "");
      commit("setEmail", "");
      commit("setToken", "");
      commit("setThumbnail", "");
    },
  },
};
