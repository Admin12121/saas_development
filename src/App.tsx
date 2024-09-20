import { useMemo, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { getToken } from "@/api/service/localStorageServices";

import AuthenticationPage from "@/pages/auth/register";
import Pagenotfound from "@/pages/empty/pagenotfound";
import Dashboard from "@/pages/dashboard/dashboard";
import { Toaster } from "sonner";
import Spinner from "@/components/ui/spinner";
import LoginPage from "./pages/auth/login";
import Home from "@/pages/home/home";
import { useSubdomainValidation } from "@/lib/subdomain"; 
import ActiveAccount from "@/pages/auth/activeaccount";
import UserData from "@/pages/users/user";

import AdminPanal from "@/pages/dashboard/admin-panal";
import TwoFaOtp from "./pages/auth/twofa";
import Availabledomains from "./pages/available-domains/availabledomains";

function App() {
  const { access_token } = getToken();
  const location = useLocation();
  const {isValidSubdomain, originalDomain, organization} = useSubdomainValidation(); 
  const showHome = isValidSubdomain || originalDomain;

  useEffect(() => {
    if (location.pathname === '/superadmin') {
      console.log('User is on the special path');
    }
  }, [location]);

  const routes = useMemo(
    () => (
      <Routes>
        <Route index element={access_token ? <Navigate to="/dashboard" /> :<Home showHome={showHome}/>} />
        <Route path="register" element={access_token ? <Navigate to="/dashboard" /> : <AuthenticationPage organization={organization}/>} />
        <Route path="login" element={access_token ? <Navigate to="/dashboard" /> : <LoginPage organization={organization}/>} />
        <Route path="login/:username" element={access_token ? <Navigate to="/dashboard" /> : <TwoFaOtp/>} />
        <Route path="available-domains" element={<Availabledomains/>} />
        <Route path="active-account/:username" element={access_token ? <Navigate to="/dashboard" /> : <ActiveAccount/>} />
        <Route path="dashboard" element={access_token ? <Dashboard /> : <Navigate to="/" />} >
          <Route index element={<AdminPanal/>} />
          <Route path="users" element={<UserData/>} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    ),
    [isValidSubdomain]
  );

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            height: "50px",
            padding: "10px",
          },
        }}
        icons={{ loading: <Spinner /> }}
        invert={true}
        pauseWhenPageIsHidden={true}
        theme="system"
        position="top-right"
      />
      {routes}
    </>
  );
}

export default App;
