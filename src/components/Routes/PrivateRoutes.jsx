import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import swal from "sweetalert";

const PrivateRoutes = () => {
  const isLoggedin = !!localStorage.getItem("Authorization");

  useEffect(() => {
    if (!isLoggedin) {
      swal({
        title: "로그인 후 이용 가능한 서비스입니다!",
      });
    }
  }, [isLoggedin]);

  return isLoggedin ? <Outlet /> : <Navigate to={`/login`} />;
};

export default PrivateRoutes;
