<template>
  <div>
    <div class="">
      <!-- Jumbotron -->
      <div
        class="p-12 text-center relative overflow-hidden bg-no-repeat bg-cover mb-2.5 rounded-lg"
        style="
          background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp');
          height: 400px;
        "
      >
        <div
          class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          style="background-color: rgba(0, 0, 0, 0.6)"
        >
          <div class="flex justify-center items-center h-full">
            <div class="text-white">
              <h2 class="font-semibold text-4xl mb-4">Welcome</h2>
              <h4 class="font-semibold text-xl mb-6">
                Just Another Vublog Site
              </h4>
              <a
                class="inline-block px-7 py-3 mb-1 border-2 border-gray-200 text-gray-200 font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                href="#!"
                role="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                >Call to action</a
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Jumbotron -->

      <!--Carousel-->
      <!--collapse
     font-size: 24px;
  line-height: 28px;
  border-bottom: 3px double #999;
  margin: 52px 0 15px 0;
  padding-bottom: 7px; -->
      <h1 class="text-3xl font-bold underline">RECENT ARTICLE</h1>
      <app-accordion class="mb-4 bg-white border rounded-lg border-gray-200">
        <template v-slot:title>
          <span class="font-semibold text-xl py-4 px-5">Accordian</span>
        </template>
        <template v-slot:content>
          <div
            class="grid justify-center xl:grid-cols-3 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1"
          >
            <div
              class="flex flex-col md:flex-row md:max-w-xl rounded-lg m-5 bg-white shadow-lg"
              v-for="(item, index) in posts"
              :key="index"
            >
              <img
                class="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                :src="item.image"
                alt=""
              />
              <div class="p-6 flex flex-col justify-start">
                <h5
                  class="text-gray-900 text-xl font-medium mb-2"
                  @click="$router.push(`/post/${item.bno}`)"
                >
                  {{ item.title }}
                </h5>
                <p class="text-gray-700 text-base mb-4">
                  {{ item.contents.slice(0, 50) }}
                </p>
                <p class="text-gray-600 text-xs">{{ item.createdDate }}</p>
              </div>
            </div>
          </div>
        </template>
      </app-accordion>
    </div>
  </div>
</template>

<script>
import AppAccordion from "@/components/AppAccordion.vue";
import { getPosts } from "@/service/blog";

export default {
  data() {
    return {
      posts: [],
      category: [],
    };
  },
  created() {
    this.callGetBoards();
  },
  methods: {
    async callGetBoards() {
      try {
        const response = await getPosts();
        this.posts = response.data.result;
        console.log(this.posts);
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },
  },
  components: {
    AppAccordion,
  },
};
</script>

<style scoped>
.toastui-editor-contents h1 {
  font-size: 24px;
  line-height: 28px;
  border-bottom: 3px double #999;
  margin: 52px 0 15px 0;
  padding-bottom: 7px;
}
</style>
