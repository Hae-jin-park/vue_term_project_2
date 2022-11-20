<template>
  <div class="relative flex min-h-screen">
    <!--Sidebar-->
    <Transition>
      <div v-if="show" class="bg-cyan-600 text-cyan-100 w-64">
        <LeftBarView />
      </div>
    </Transition>
    <!--body part-->
    <div class="flex-1">
      <HeaderView :show="true" />

      <div id="app">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from "./HeaderView.vue";
import LeftBarView from "./LeftBarView.vue";

export default {
  data() {
    return {
      show: true,
    };
  },
  components: { HeaderView, LeftBarView },
};
</script>

<style scoped></style>
