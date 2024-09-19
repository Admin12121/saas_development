import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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

function App() {
  const { access_token } = getToken();
  
  const {isValidSubdomain, originalDomain} = useSubdomainValidation(); 

  const routes = useMemo(
    () => (
      <Routes>
        <Route index element={<Home isValidSubdomain={isValidSubdomain} originalDomain={originalDomain}/>} />
        <Route path="register" element={<AuthenticationPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="active-account/:username" element={<ActiveAccount/>} />
        <Route
          path="dashboard"
          element={!access_token ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route index element={<></>} />
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
