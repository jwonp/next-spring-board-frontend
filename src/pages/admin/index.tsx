import styles from "@src/styles/admin/Admin.module.scss";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Admin = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.user?.id !== process.env.NEXT_PUBLIC_ADMIN_PROVIDER_ID) {
      router.push("/");
    }
  }, [session]);
  if (session?.user?.id === process.env.NEXT_PUBLIC_ADMIN_PROVIDER_ID) {
    return (
      <div>
        어드민 페이지
        <Link href={"/admin/experiment"}>실험실</Link>
      </div>
    );
  }
};

export default Admin;
