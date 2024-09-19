
import { getSubdomain } from "@/lib/subdomain";
import UserLogin from "./components/dynamic-login/userlogin";
import AdminLogin from "./components/dynamic-login/admin";

export default function LoginPage() {
  const { subdomain } = getSubdomain(); 
  return (
  <>
    {subdomain ? <UserLogin /> : <AdminLogin />}
  </>
  );
}
