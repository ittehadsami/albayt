"use client";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/plugins/axios";

const AdminAuth = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  useLayoutEffect(() => {
    axios
      .get("/admin")
      .then((res) => {
        console.log("auth: ", res);
        setIsAuth(true);
      })
      .catch((e) => {
        console.log(e);
        setIsAuth(false);
        console.log(
          ";alksjdgkljaskdgjlkasjdglkjaskdgjasjhdglahsdgiouasdguiosd"
        );

        router.push("/admin-login");
      });
  }, [router]);

  return isAuth ? <>{children} </> : null;
};
export default AdminAuth;
