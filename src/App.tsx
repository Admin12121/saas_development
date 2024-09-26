import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import { getToken } from "@/api/service/localStorageServices";

import AuthenticationPage from "@/pages/auth/register";
import Pagenotfound from "@/pages/empty/pagenotfound";
import Dashboard from "@/pages/dashboard/dashboard";
import { Toaster } from "sonner";
import Spinner from "@/components/ui/spinner";
import LoginPage from "@/pages/auth/login";
import Home from "@/pages/home/home";
import { useSubdomainValidation } from "@/lib/subdomain"; 
import ActiveAccount from "@/pages/auth/activeaccount";
import UserData from "@/pages/users/user";

import AdminPanal from "@/pages/dashboard/admin-panal";
import TwoFaOtp from "@/pages/auth/twofa";
import Availabledomains from "@/pages/available-domains/availabledomains";
import SiteManagement from "@/pages/site-management/site-management";
import ThemesPage from "@/pages/site-management/overlay";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BuilderPage } from "@/pages/site-management/app/formbuilder/page"
import DesignerContextProvider from "@/pages/site-management/app/formbuilder/components/context/DesignerContext";
import SubdominLogin from "@/pages/site-management/app/auth/login"
import SubdominRegistration from "@/pages/site-management/app/auth/registration"
// import Homepage from "@/pages/site-management/home-pages/homepage1/homepage";
// import Domain from "@/pages/domain/domin";

function App() {
  const { access_token } = getToken();
  const {isValidSubdomain, originalDomain, organization} = useSubdomainValidation(); 
  const showHome = isValidSubdomain || originalDomain;

  const siteconfig = () => (
      <Route path="home" element={ <ThemesPage /> } >
        <Route path="formbuilder/:form_type" element={<BuilderPage/>}/>
        <Route path="login" element={<BuilderPage/>}/>
      </Route>
  )

  const authconfig = () => (
      <Route path="auth" >
        <Route index element={<SubdominLogin organization={organization}/>}/>
        <Route path="registration" element={<SubdominRegistration type="registration"/>} />
      </Route>
  )

  const routes = useMemo(
    () => (
      <DndProvider backend={HTML5Backend}>
        <DesignerContextProvider>
        <Routes>
          <Route index element={<Home showHome={showHome}/>} />
          <Route path="register" element={ <AuthenticationPage organization={organization}/>} />
          <Route path="login" element={<LoginPage organization={organization}/>} />
          <Route path="login/:username" element={ <TwoFaOtp/>} />
          <Route path="available-domains" element={<Availabledomains/>} />
          <Route path="active-account/:username" element={ <ActiveAccount/>} />
          <Route path="dashboard" element={ <Dashboard /> } >
            <Route index element={<AdminPanal/>} />
            {/* <Route path="domain" element={<Domain/>}/> */}
            <Route path="site-management" element={<SiteManagement/>}/>
            <Route path="users" element={<UserData/>} />
          </Route>
          {siteconfig()}
          {authconfig()}
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
        </DesignerContextProvider>
      </DndProvider>
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
