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
      :options="options"
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
import axios from "axios";
export default {
  data() {
    // 이미지 툴바 버튼 생성
    let imageToolBar = () => {
      // javascript 코드를 통해 File Input을 생성한다.
      const file = document.createElement("input");
      file.setAttribute("type", "file");
      file.style.display = "none";
      file.accept = "image/png, image/gif, image/jpeg";

      // 파일 업로드시 진행 되는 이벤트 이다.
      file.addEventListener("change", async (value) => {
        let file = value.target.files[0];
        this.handleImage(file);
        console.log(file);
        // console.log(data);
        // if (files.length > 0) {
        //   await this.fileUpload(files);
        //   console.log(files);
        // }
      });

      // 버튼을 생성한다.
      const button = document.createElement("button");

      button.className = "toastui-editor-toolbar-icons";
      button.setAttribute("type", "button");
      button.style.backgroundImage = "none";
      button.style.margin = "0";
      // 버튼 코드는 Icon을 사용하기 위해 그냥 간단한 코드로 작성하였다.
      button.innerHTML = `<i aria-hidden="true" file="v-icon/usage" class="v-icon notranslate mdi mdi-file-image theme--light"></i>`;
      // 버튼 안에 File Input을 넣습니다.
      button.appendChild(file);
      // 버튼을 클릭하면 file (상단의 const file입니다.)
      // input:type=file 인 input이 클릭 되는 이벤트를 설정합니다.
      // button click 은 input:type=file click 이벤트와 같다.
      button.addEventListener("click", () => {
        file.click();
      });
      // 이후에 element를 Return한다.
      return {
        el: button,
        tooltip: "Image Upload",
      };
    };
    return {
      title: "",
      contents: "",
      category: 0,
      cat_list: [],
      image: "",
      originalImgName: "",
      options: {
        minHeight: "1500px",
        hideModeSwitch: true,
        toolbarItems: [
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "link"],
          ["code", "codeblock"],
          // Custom한 Image Tool Bar를 추가한다.
          [imageToolBar()],
        ],
      },
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

    handleImage(fileName) {
      const file = fileName;
      const reader = new FileReader();
      console.log(file);
      var rawImg;
      reader.onloadend = () => {
        console.log("reader : ", reader);
        rawImg = reader.result;
        //console.log(rawImg);
        this.image = rawImg;
        this.originalImgName = file.name.split(".")[0];
        this.uploadImg();
      };
      reader.readAsDataURL(file);
    },
    uploadImg() {
      const { image, originalImgName } = this;
      axios
        .post("http://118.42.241.204:3000/upload", { image, originalImgName })
        .then((response) => {
          console.log(response.data);
          this.remoteUrl = response.data.url;
        })
        .catch((err) => {
          return new Error(err.message);
        });
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
    // 파일을 실질적인 API를 통하여 전송한다.
    async fileUpload(file) {
      if (!file) {
        alert("File Is Null");
        return;
      }

      let formData = new FormData();
      formData.set("img", file);
      console.log(formData);
      // await uploadFile(formData)
      //   .then((data) => {
      //     console.log(data);
      //     // image tag를 구성하여
      //     let img = `<img src="${data.path}" alt="${data.name}"/>`;
      //     // Editor에 Invoke 하면 이미지가 HTML 코드로 생성 됩니다.
      //     this.$refs.editor.invoke("insertText", img);
      //   })
      //   .catch((error) => {
      //     alert("Error : " + error);
      //   });
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
