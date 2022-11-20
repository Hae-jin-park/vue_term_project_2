<template>
  <div class="p-8">
    <!--getPostDetail로 읽은 포스팅 데이터를 뿌리는 작업 {{ post.[속성] }}을 이용 -->
    <h1 class="font-medium leading-tight text-5xl mt-0 mb-2">{{ title }}</h1>
    <div class="infoArea">
      <span>{{ writer }}</span> ||
      <span>{{ email }}</span>
    </div>
    <div class="createdDate">
      <span>{{ toWriteTime(new Date(createdDate)) }}</span>
    </div>
    <div class="main_content">
      <Viewer ref="viewer" height="500px"></Viewer>
    </div>
    <button
      @click="$router.push(`/post.do/${bno}`)"
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

      글 수정
    </button>
  </div>
</template>

<script>
import { getPostDetail } from "@/service/blog";
import { Viewer } from "@toast-ui/vue-editor";
import date from "@/mixins/date";
export default {
  mixins: [date],
  data() {
    return {
      title: "",
      createdDate: "",
      contents: "",
      writer: "",
      email: "",
    };
  },
  methods: {
    async callGetBoard() {
      try {
        const post = await getPostDetail(this.bno);
        // this.post = post.data.result; //data가 아닌 다른 변수일 수 있는데 십중팔구로 data일 것같다.
        var resultData = post.data.result[0];

        this.title = resultData.title;
        this.createdDate = resultData.createdDate;
        this.setContent(resultData.contents);
        this.writer = resultData.writer;
        this.email = resultData.email;
        console.log(this.title);
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },
    setContent(content) {
      this.$refs.viewer.invoke("setMarkdown", content);
    },
  },
  computed: {
    bno() {
      return this.$route.params.bno;
    },
  },
  created() {
    this.callGetBoard();
  },
  components: {
    Viewer,
  },
};
</script>

<style scoped></style>
