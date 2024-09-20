import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";

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
  const {isValidSubdomain, originalDomain, organization} = useSubdomainValidation(); 
  const showHome = isValidSubdomain || originalDomain;

  const routes = useMemo(
    () => (
      <Routes>
        <Route index element={<Home showHome={showHome}/>} />
        <Route path="register" element={ <AuthenticationPage organization={organization}/>} />
        <Route path="login" element={<LoginPage organization={organization}/>} />
        <Route path="login/:username" element={ <TwoFaOtp/>} />
        <Route path="available-domains" element={<Availabledomains/>} />
        <Route path="active-account/:username" element={ <ActiveAccount/>} />
        <Route path="dashboard" element={ <Dashboard /> } >
          <Route index element={<AdminPanal/>} />
          <Route path="users" element={<UserData/>} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    ),
    [isValidSubdomain, access_token]
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
