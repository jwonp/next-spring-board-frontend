const HeaderMiddleMenu = {
  Menu1: "만남의 광장",
  Menu2: "방송인 모임",
  Menu3: "합방 계획 및 참가",
  Menu4: "합방 결과 공유",
} as const;

export type HeaderMiddleMenuType =
  typeof HeaderMiddleMenu[keyof typeof HeaderMiddleMenu];

const HeaderRightMenu = {
  alert: "alert",
  login: "Login",
  logout: "Logout",
} as const;
export type HeaderRightMenuType =
  typeof HeaderRightMenu[keyof typeof HeaderRightMenu];
