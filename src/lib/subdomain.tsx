import { useDomainVerifierMutation } from "@/api/service/user_Auth_Api";
import { useEffect, useState } from "react";

export const getSubdomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");
  let subdomain = null;
  let originalDomain = null;
  if (parts.length >= 2) {
    if (parts[0] !== 'localhost' && parts[0] !== '127') {
      subdomain = parts[0];
    }
  }else{
    originalDomain = hostname;
  }
  return { subdomain, originalDomain }; 
};

export const useSubdomainValidation = () => {
  const [isValidSubdomain, setIsValidSubdomain] = useState<string | null>(null);
  const [originalDomain, setOriginalDomain] = useState<string | null>(null);
  const [organization, setOrganization] = useState<string | null>(null);
  const [domainCheck, {isLoading}] = useDomainVerifierMutation();

  useEffect(() => {
    const validateSubdomain = async () => {
      const { subdomain, originalDomain } = getSubdomain(); 
      if (originalDomain) {
        setOriginalDomain(originalDomain);
      }
      if (subdomain) {
        try {
          const response = await domainCheck({ actualData: { subdomain: subdomain } });
          if(response.data.msg === "Subdomain is Registered"){
            setIsValidSubdomain(subdomain);
            setOrganization(response.data.organization);
          }else{
            setIsValidSubdomain('');
          }
        } catch (error) {
          setIsValidSubdomain('');
        }
      } else {
        setIsValidSubdomain(''); 
      }
    };
    validateSubdomain();
  }, [domainCheck]);

  return { isValidSubdomain, originalDomain , isLoading, organization};
};