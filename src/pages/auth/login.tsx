import UserLogin from "./components/dynamic-login/userlogin";
// import AdminLogin from "./components/dynamic-login/admin";

export default function LoginPage({organization}:{organization:string | null}) {

  return (
  <>
    <UserLogin organization={organization}/> 
  </>
  );
}

{/* {subdomain ? <UserLogin organization={organization}/> : <AdminLogin />} */}