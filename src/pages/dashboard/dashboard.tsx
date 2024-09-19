import  { createContext, useContext, useEffect } from 'react';
import { getToken } from '@/api/service/localStorageServices';
import { useGetLoggedUserQuery } from '@/api/service/user_Auth_Api';
import { Outlet } from 'react-router-dom';
import { getSubdomain } from '@/lib/subdomain';

const DashboardDataContext = createContext<any>(null);
export const useDashboardData = () => useContext(DashboardDataContext);

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

  return (
    <>
      <section className="main_container">
        <div className="main_dashboard_wrapper" >
          <DashboardDataContext.Provider value={{ userData }}>
            <Outlet/>
          </DashboardDataContext.Provider>
        </div>
      </section>
    </>
  )
}

export default Dashboard
