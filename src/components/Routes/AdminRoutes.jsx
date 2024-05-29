import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import swal from "sweetalert";

const AdminRoutes = () => {
  const memberRole = localStorage.getItem("memberRole");

  useEffect(() => {
    if (memberRole !== "ADMIN") {
      swal({
        title: "관리자 계정이 아닙니다!",
      });
    }
  }, [memberRole]);

  return memberRole === "ADMIN" ? <Outlet /> : <Navigate to={`/`} />;
};

export default AdminRoutes;
