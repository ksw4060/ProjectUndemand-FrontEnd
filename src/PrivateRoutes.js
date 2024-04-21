import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes({ isLoggedin }) {
  // 로그인이 되어있는 유저만 접근 가능한 경로들 관리를 위해 작성중인 로직입니다.
  // 아직 미완성입니다.
  return isLoggedin ? <Outlet /> : <Navigate to="/login" />;
}

export { PrivateRoutes };
