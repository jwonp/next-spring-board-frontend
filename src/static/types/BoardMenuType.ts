const BoardMenus = {
  Menu1: "Board One",
  Menu2: "Board Two",
  Menu3: "Board Three",
  Menu4: "Board Four",
} as const;

export type BoardMenu = (typeof BoardMenus)[keyof typeof BoardMenus];

const HeaderRightMenus = {
  alert: "alert",
  login: "Login",
  logout: "Logout",
} as const;
export type HeaderRightMenu =
  (typeof HeaderRightMenus)[keyof typeof HeaderRightMenus];
