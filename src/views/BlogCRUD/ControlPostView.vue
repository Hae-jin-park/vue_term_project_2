<template>
  <div>
    <div
      class="grid md:grid-cols-2 md:gap-6 bg-white rounded-md my-4 border-2 border-emerald-600"
    >
      <div class="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="floating_first_name"
          id="floating_first_name"
          v-model="title"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_first_name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >제목</label
        >
      </div>
      <div class="flex justify-center">
        <div class="mb-3 xl:w-96">
          <select
            class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            v-model="category"
          >
            >
            <option
              v-for="item in cat_list"
              :key="item.cat_id"
              :value="item.cat_id"
            >
              {{ item.cat_name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <Editor
      ref="toastEditor"
      initialEditType="wysiwyg"
      :style="{ width: '100%' }"
      height="500px"
      class="bg-white rounded-md border-2 border-emerald-600 my-4"
      previewStyle="vertical"
    ></Editor>
    <button
      @click="execPostBlog"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
          clip-rule="evenodd"
        />
        <path
          d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"
        />
      </svg>
      <span v-if="bno">수정</span>
      <span v-else>새 글 등록</span>
    </button>
    <button
      v-if="bno"
      @click="deletePostAction"
      class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
          clip-rule="evenodd"
        />
        <path
          d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"
        />
      </svg>

      삭제
    </button>
  </div>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";
import {
  insertPost,
  getPostDetail,
  updatePost,
  deletePost,
} from "@/service/blog";
import { getCat } from "@/service/category";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      contents: "",
      category: 0,
      cat_list: [],
    };
  },
  components: {
    // FroalaEditor,
    Editor,
  },
  methods: {
    getData() {
      const data = {
        title: this.title,
        contents: this.getContent(),
        category: this.category,
        bno: this.$route.params.id,
        writer: this.name,
        email: this.email,
      };
      const { title, contents, category } = data;
      if (!title) {
        alert("제목은 필수입니다.");
        return;
      }
      if (!contents) {
        alert("내용은 필수입니다.");
        return;
      }
      if (!category) {
        alert("카테고리 항목은 필수입니다.");
        return;
      }
      return data;
    },
    getContent() {
      return this.$refs.toastEditor.invoke("getMarkdown");
    },

    setContent(content) {
      this.$refs.toastEditor.invoke("setMarkdown", content);
    },
    async getDetail() {
      try {
        const post = await getPostDetail(this.bno);
        // this.post = post.data.result; //data가 아닌 다른 변수일 수 있는데 십중팔구로 data일 것같다.

        var resultData = post.data.result[0];

        this.title = resultData.title;
        this.createdDate = resultData.createdDate;
        this.category = resultData.category;
        this.setContent(resultData.contents);
        console.log(this.title);
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },
    async execPostBlog() {
      const data = this.getData();
      console.log(data);
      if (!data) return;
      try {
        if (this.$route.params.id) {
          // alert("수정작업을 시작합니다.");
          const response = await updatePost(data);
          this.$router.push("/main.do");
          console.log(response);
        } else {
          const response = await insertPost(data);
          this.$router.push("/main.do");
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deletePostAction() {
      try {
        if (confirm("Are you sure you want to delete?")) {
          const response = await deletePost(this.bno);
          this.$router.push("/main.do");
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    bno() {
      return this.$route.params.id;
    },
    ...mapGetters({
      name: "user/name",
      email: "user/email",
    }),
  },
  async created() {
    this.bno = this.$route.params.id;
    var categories = await getCat();
    this.cat_list = categories.data.result;
    console.log(this.cat_list);
    if (this.bno) {
      this.getDetail();
    }
  },
};
</script>

<style scoped></style>
