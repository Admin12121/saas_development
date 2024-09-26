import { createContext, useContext, useEffect } from "react";
import { getToken } from "@/api/service/localStorageServices";
import { useGetLoggedUserQuery } from "@/api/service/user_Auth_Api";
import { Outlet } from "react-router-dom";
import { getSubdomain } from "@/lib/subdomain";
import Cookies from "js-cookie";
import { useErrorHandler } from "@/hooks/ErrorBoundary/useErrorHandler";
import ErrorMessage from "@/hooks/ErrorBoundary/errormessage";
import Loader from "@/components/global/loader";

const DashboardDataContext = createContext<any>(null);
export const useDashboardData = () => useContext(DashboardDataContext);
import { MainLayout } from "./components/main-layout";

const Dashboard = () => {
  const { access_token } = getToken();
  const { data, error, isLoading } = useGetLoggedUserQuery({ access_token });
  const subdomain = getSubdomain();
  const { error: errorMessage, handleError } = useErrorHandler();
  const userData = data;

  useEffect(() => {
    if (data && data.subdomain) {
      const hostParts = window.location.host.split('.');
  
      let mainDomain;
      if (hostParts.length === 1) {
        mainDomain = hostParts[0];
      } else if (hostParts.length === 2) {
        mainDomain = hostParts.join('.');
      } else {
        mainDomain = hostParts.slice(-2).join('.');
      }
      const mainDomainParts = mainDomain.split('.');
      const NewDomain = mainDomainParts[mainDomainParts.length - 1]

      if (subdomain.subdomain !== data.subdomain) {
        const newSubdomain = `${data.subdomain}.${NewDomain}`;
        if (window.location.host !== newSubdomain) {
          const protocol = window.location.protocol;
          window.location.href = `${protocol}//${newSubdomain}`;
        }
      }
    }
  }, [data, subdomain]);
  

  useEffect(() => {
    if (error) {
      console.log(error);
      if ((error as any).status === 401) {
        handleError("TOKEN_EXPIRED");
      } else if ((error as any).status === "FETCH_ERROR") {
        handleError("NO_INTERNET");
      } else {
        handleError("SERVER_ERROR");
      }
    }
  }, [error, handleError]);

  const layout = Cookies.get("react-resizable-panels:layout:mail");
  const collapsed = Cookies.get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

  return (
    <>
      <MainLayout
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
        data={data}
      >
        <section className="main_container h-full w-full">
          <div className="main_dashboard_wrapper h-full w-full">
            <DashboardDataContext.Provider value={{ userData }}>
              <Loader disable={!isLoading} type="spinner">
                <ErrorMessage message={errorMessage}>
                  <Outlet />
                </ErrorMessage>
              </Loader>
            </DashboardDataContext.Provider>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Dashboard;
