import NextAuth from "next-auth";
declare module "*module.scss" {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string | null;
    };
    expires: ISODateString;
  }
}
//   interface User {
//     id: string;
//     provider?: string | null;
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//   }
// }
