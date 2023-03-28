import styles from "@src/styles/admin/Admin.module.scss";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
const Admin = () => {
  const { data: session } = useSession();
  if (session) {
    return <div>어드민 페이지</div>;
  }
};

export default Admin;
