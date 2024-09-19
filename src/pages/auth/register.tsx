import { getSubdomain } from "@/lib/subdomain";
import UserRegistration from "./components/dynamic-registration/user-registrations";
import AdminRegistration from "./components/dynamic-registration/admin-registration";

export default function AuthenticationPage() {
  const { subdomain } = getSubdomain(); 
  return (
    <>
      {subdomain ? <UserRegistration /> : <AdminRegistration />}
    </>
  );
}
