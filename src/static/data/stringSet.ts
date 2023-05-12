import { BoardMenuType } from "@src/static/types/BoardMenuType";
export const BoardMenu: BoardMenuType[] = [
  "Board One",
  "Board Two",
  "Board Three",
  "Board Four",
];
// export const HeaderMiddleMenu: HeaderMiddleMenuType[] = [
//   "만남의 광장",
//   "방송인 모임",
//   "합방 계획 및 참가",
//   "합방 결과 공유",
// ];

export const HeaderRightMenu = {
  alert: "alert",
  login: "login",
  logout: "logout",
} as const;

export const KeySet = {
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  Enter: "Enter",
  Backspace: "Backspace",
} as const;

export const OneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const sizes = "(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw";

export const titlesOnIndexPage = {
  MostViewed: "Most Viewed",
  MostLiked: "Most Liked",
  Recently: "Recently",
};
