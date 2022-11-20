import { callApi } from "@/plugins/axios";

export const getPosts = () => {
  return callApi("/blogApi/blogList", {
    method: "GET",
  });
};

export const insertPost = (data) => {
  return callApi(`/blogApi/insertPost`, {
    method: "POST",
    data,
  });
};

export const updatePost = (data) => {
  return callApi(`/blogApi/updatePost`, {
    method: "PATCH",
    data,
  });
};

export const deletePost = (bno) => {
  return callApi(`/blogApi/deletePost/${bno}`, {
    method: "DELETE",
    bno,
  });
};

export const getPostDetail = (bno) => {
  return callApi(`/blogApi/readPost/${bno}`, {
    method: "GET",
  });
};

//아래는 댓글 관련 로직으로 차차 개발할 예정. Coding must go on...
export const getBoardComment = (bno) => {
  return callApi(`/api/board/comment/${bno}`, {
    method: "GET",
  });
};

export const postBoardComment = (bno) => {
  return callApi(`/api/board/comment/${bno}`, {
    method: "POST",
  });
};

export const getComments = (bno) => {
  return callApi(`/api/board/comment/${bno}`, {
    method: "GET",
  });
};

export const postComment = (bno, data) => {
  return callApi(`/api/board/comment/${bno}`, {
    method: "POST",
    data,
  });
};

export const deleteBoard = (bno) => {
  return callApi(`/api/board/${bno}`, {
    method: "DELETE",
  });
};

export const deleteComment = (commentId) => {
  return callApi(`/api/board/comment/${commentId}`, {
    method: "DELETE",
  });
};

export const getEmotion = (bno) => {
  return callApi(`/api/board/emotion/${bno}`, {
    method: "GET",
  });
};

export const postEmotion = (bno, data) => {
  return callApi(`/api/board/emotion/${bno}`, {
    method: "POST",
    data,
  });
};
