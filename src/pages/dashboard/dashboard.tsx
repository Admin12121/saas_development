import  { createContext, useContext, useEffect } from 'react';
import { getToken } from '@/api/service/localStorageServices';
import { useGetLoggedUserQuery } from '@/api/service/user_Auth_Api';
import { Outlet } from 'react-router-dom';
import { getSubdomain } from '@/lib/subdomain';
import Cookies from 'js-cookie';

const DashboardDataContext = createContext<any>(null);
export const useDashboardData = () => useContext(DashboardDataContext);
import { MainLayout } from './components/main-layout';

const Dashboard = () => {
   const { access_token } = getToken();
   const { data } = useGetLoggedUserQuery({access_token});
   const subdomain = getSubdomain();

   const userData = data;

   useEffect(() => {
    if (data && data.subdomain && subdomain !== data.subdomain) {
      window.location.href = `https://${data.subdomain}.${window.location.host}`;
    }
  }, [data, subdomain]);

  const layout = Cookies.get("react-resizable-panels:layout:mail")
  const collapsed = Cookies.get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined

  return (
    <>
    <MainLayout       
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
      data={data}
      >
      <section className="main_container">
        <div className="main_dashboard_wrapper" >
          <DashboardDataContext.Provider value={{ userData }}>
            <Outlet/>
          </DashboardDataContext.Provider>
        </div>
      </section>
    </MainLayout>
    </>
  )
}

export default Dashboard
