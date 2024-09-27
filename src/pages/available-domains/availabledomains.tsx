import { useEffect } from "react";
import { useErrorHandler } from "@/hooks/ErrorBoundary/useErrorHandler";
import ErrorMessage from "@/hooks/ErrorBoundary/errormessage";

import Layout from "@/components/layout/layout";
import { getSubdomain } from "@/lib/subdomain";
import { Navigate } from "react-router-dom";
import { useGetavailableDomainQuery } from "@/api/service/user_Auth_Api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Loader from "@/components/global/loader";

const Availabledomains = () => {
  const { data, isLoading, error } = useGetavailableDomainQuery({});
  const { subdomain, originalDomain } = getSubdomain();
  const { error: errorMessage, handleError } = useErrorHandler();
  if (subdomain) {
    return <Navigate to="/" />;
  }
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
  return (
    <Layout login={false}>
      <div className="flex items-center justify-center p-5 pt-28 h-screen w-screen">
        <Loader disable={!isLoading} type="spinner">
          <ErrorMessage message={errorMessage}>
            <div className="flex flex-wrap gap-5 w-full h-full p-10 overflow-y-auto justify-center">
              {data &&
                data.results.map((domain: any) => (
                  <div className="w-96 h-40 dark:bg-zinc-800 bg-zinc-200 rounded-lg flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center h-full gap-5">
                      <h1 className="text-2xl font-semibold">
                        {domain.organization_name}
                      </h1>
                      <Button asChild>
                        <Link
                          to={`http://${domain.subdomain}.${originalDomain}:5173/login`}
                        >
                          Login
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </ErrorMessage>
        </Loader>
      </div>
    </Layout>
  );
};

export default Availabledomains;
