const BoardMenu = {
  Menu1: "Board One",
  Menu2: "Board Two",
  Menu3: "Board Three",
  Menu4: "Board Four",
} as const;

export type BoardMenuType = (typeof BoardMenu)[keyof typeof BoardMenu];

const HeaderRightMenu = {
  alert: "alert",
  login: "Login",
  logout: "Logout",
} as const;
export type HeaderRightMenuType =
  (typeof HeaderRightMenu)[keyof typeof HeaderRightMenu];
