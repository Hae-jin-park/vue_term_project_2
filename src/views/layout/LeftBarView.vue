<template>
  <div id="leftBar">
    <!--Sidebar-->

    <!-- drawer init and show -->

    <!-- drawer component -->
    <div
      id="drawer-navigation"
      class="fixed z-40 h-full p-4 overflow-y-auto bg-white w-64 dark:bg-gray-800"
      tabindex="-1"
      aria-labelledby="drawer-navigation-label"
    >
      <div class="flex justify-end px-4 pt-4"></div>
      <div class="flex flex-col items-center pb-10">
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          :src="thumbnail"
          alt="Bonnie image"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {{ name }}
        </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400"
          >Email : {{ email }}</span
        >
      </div>

      <h5
        id="drawer-navigation-label"
        class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Menu
      </h5>
      <div class="py-4 overflow-y-auto">
        <ul class="space-y-2">
          <li>
            <router-link
              :to="{ name: 'main' }"
              class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
              >
                <path
                  d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"
                />
                <path
                  d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"
                />
              </svg>

              <span class="ml-3"> Home </span>
            </router-link>
          </li>

          <li>
            <router-link
              :to="{ name: 'newPost' }"
              class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                />
                <path
                  d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                />
              </svg>

              <span class="flex-1 ml-3 whitespace-nowrap"
                >New Post</span
              ></router-link
            >
          </li>

          <li>
            <button
              type="button"
              @click="showLower = !showLower"
              class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="flex-1 ml-3 text-left whitespace-nowrap"
                >Categories</span
              >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <ul id="dropdown-example" class="py-2 space-y-2" v-if="showLower">
              <li v-for="item in category" :key="item.cat_id">
                <a
                  href="#"
                  class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >{{ item.cat_name }}</a
                >
              </li>
            </ul>
          </li>

          <li>
            <button
              type="button"
              @click="showLower = !showLower"
              class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <span class="flex-1 ml-3 text-left whitespace-nowrap"
                >Search By</span
              >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <ul id="dropdown-example" class="py-2 space-y-2" v-if="showLower">
              <li>
                <router-link :to="{ name: 'map' }">
                  <a
                    href="#"
                    class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Map Marker</a
                  ></router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCat } from "@/service/category";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showLower: false,
      category: [],
    };
  },
  methods: {
    goToNewPost() {
      this.$router.push("/newPost.do");
    },
    async getCategory() {
      try {
        const response = await getCat();
        this.category = response.data.result;
        console.log(this.category);
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },
  },
  created() {
    this.getCategory();
  },
  computed: {
    ...mapGetters({
      name: "user/name",
      email: "user/email",
      thumbnail: "user/thumbnail",
    }),
  },
};
</script>

<style scoped></style>
