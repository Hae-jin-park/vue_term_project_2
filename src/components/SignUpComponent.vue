<template>
  <div>
    <div
      class="popup-wrap bg-grey-lighter min-h-screen flex flex-col"
      v-if="on"
    >
      <div
        class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
      >
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
          />

          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />
          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            class="w-full text-center py-3 rounded bg-green-500 focus:outline-none my-1"
          >
            Create Account
          </button>

          <div class="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              class="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>
            and
            <a
              class="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
          <div class="text-grey-dark mt-6">
            Already have an account?
            <a
              class="no-underline border-b border-blue text-blue"
              @click="close"
            >
              Log in </a
            >.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    on: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.popup-wrap {
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  display: flex;
  padding: 15px;
}
</style>
