import { BoardMenu } from "@src/static/types/BoardMenuType";
export const getExceptionWarning = (count: number) => {
  return `잘못된 접근입니다. ${count} 초 후 로비로 돌아갑니다`;
};

export const HTML_HEAD_TITLE = "Collabo Board";

export const BoardMenuList: BoardMenu[] = [
  "Board One",
  "Board Two",
  "Board Three",
  "Board Four",
];

export const HeaderRightMenu = {
  alert: "Alert",
  myPage: "MyPage",
  login: "Login",
  logout: "Logout",
} as const;

export const KeySet = {
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  Enter: "Enter",
  Backspace: "Backspace",
} as const;

export const OneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const SIZES = "(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw";
export const sizes = "(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw";

export const titlesOnIndexPage = {
  MostViewed: "Most Viewed",
  MostLiked: "Most Liked",
  Recently: "Recently",
};

export const WRITE = "write";

export const inputType = {
  text: "text",
  submit: "submit",
};

export const contentMetaColumns = {
  author: "작성자",
  created: "작성일",
  views: "조회수",
  likes: "좋아요",
};

export const EMPTY_STRING = "";

export const NO_CONTENT = "No Content";

export const CONTENT_INPUT_PLACEHOLDER = "제목을 입력해주세요.";

export const SUBMIT = "submit";

export const NO_IMAGE = "No Image";


export const ADD_TYPE_MODAL = {
  text:"텍스트",
  image:"이미지"
}