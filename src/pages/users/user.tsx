import { useState, useEffect } from "react";

import Overlay from "@/components/global/overlay";
import Spinner from "@/components/ui/spinner";
import { useUserDataQuery } from "@/api/service/user_Auth_Api";
import NewAdvancedTable from "./components/table";

const UserData = () => {

  const breadcrumbs = [
    { title: "Home", href: "/dashboard" },
    { title: "Users" }
  ];

  const [search, setSearch] = useState<string>("");
  const [rowsperpage, setRowsPerPage] = useState<number | null>(10);
  const [page, setPage] = useState<number>(1);
  const [exclude_by, SetExcludeBy] = useState<string>("");
  const { data, isLoading, refetch } = useUserDataQuery({
    search,
    page_size:rowsperpage,
    page,
    exclude_by,
  });
  useEffect(() => {
    refetch();
  }, [search, rowsperpage]);
  return (
    <Overlay breadcrumbs={breadcrumbs}>
      <div className="max-w-[95rem] mx-auto w-full flex flex-col gap-4 h-[90vh] m-0 pt-5 px-1 overflow-y-auto scroll">
        <div className="max-w-[95rem] h-[75vh] mx-auto w-full">
          {isLoading ? (
            <span className="flex justify-center items-center h-[100vh] w-full">
              <Spinner color="default" />
            </span>
          ) : (
            <NewAdvancedTable SetExcludeBy={SetExcludeBy} exclude_by={exclude_by} page={page} isLoading={isLoading} setPage={setPage} data={data} setSearch={setSearch} dataperpage={setRowsPerPage} refetch={refetch}/>
          )}
        </div>
      </div>
    </Overlay>
  );
};
export default UserData;
