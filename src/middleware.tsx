import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from "@/api/service/localStorageServices";
import { publicRoutes, protectedRoutes, Default_Login_Redirect } from "@/routes";

const RouteProvider = ({ children }:{ children: React.ReactNode }) => {
  const { access_token } = getToken();
  const location = useLocation();

  const isProtectedRoute = protectedRoutes.some(route => new RegExp(route).test(location.pathname));
  const isPublicRoute = !isProtectedRoute && publicRoutes.some(route => new RegExp(route).test(location.pathname));

  if (isProtectedRoute && !access_token) {
    return <Navigate to="/" />;
  }

  if (isPublicRoute && access_token) {
    return <Navigate to={Default_Login_Redirect} />;
  }

  return children;
};

export default RouteProvider;