import { getSubdomain } from "@/lib/subdomain";
// import UserRegistration from "./components/dynamic-registration/user-registrations";
import AdminRegistration from "./components/dynamic-registration/admin-registration";
import { useNavigate } from "react-router-dom";

export default function AuthenticationPage() {
  const navigate = useNavigate()
  const { subdomain } = getSubdomain(); 
  if(subdomain){
    navigate("/home/reistraion")
  }
  return (
    <>
      <AdminRegistration />
    </>
  );
}