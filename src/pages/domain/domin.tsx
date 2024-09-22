import { useState, useEffect } from "react";
import Overlay from "@/components/global/overlay";
import Spinner from "@/components/ui/spinner";
import { useUserDataQuery } from "@/api/service/user_Auth_Api";
import AdvancedTable from "@/components/global/table";

import {
  DropdownMenu as DropdownMenuNext,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from "@nextui-org/user";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

const Domain = () => {
  const breadcrumbs = [
    { title: "Home", href: "/dashboard" },
    { title: "Users" }
  ];

  const [search, setSearch] = useState<string>("");
  const [rowsperpage, setRowsPerPage] = useState<number | null>(10);
  const [page, setPage] = useState<number>(1);
  const [exclude_by, SetExcludeBy] = useState<string[]>([]); // Change to array of strings
  const { data, isLoading, refetch } = useUserDataQuery({
    search,
    page_size: rowsperpage,
    page,
    exclude_by: exclude_by.join(','), // Convert array to comma-separated string
  });

  useEffect(() => {
    refetch();
  }, [search, rowsperpage]);

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "User", uid: "user", sortable: true },
    { name: "Organization", uid: "organization", sortable: true },
    { name: "Subdomain", uid: "subdomain", sortable: true },
    { name: "Domain Status", uid: "domain_status", sortable: true },
    { name: "Phone", uid: "phone", sortable: true },
    { name: "Address", uid: "address", sortable: true },
    { name: "Date Joined", uid: "date_joined", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Inactive", uid: "inactive" },
  ];

  const actionButtons = [
    {
      label: "Edit",
      onClick: (item: any) => {
        console.log("Edit", item);
      },
    },
    {
      label: "Delete",
      onClick: (item: any) => {
        console.log("Delete", item);
      },
    },
  ];

  const customRenderers = {
    user: (item: any, columnKey: React.Key) => (
      <User
        avatarProps={{
          radius: "full",
          size: "sm",
          src: item?.profile as string,
          name: `${item?.first_name?.slice(0, 1).toUpperCase()}${item?.last_name?.slice(0, 1).toUpperCase()}`,
          classNames: {
            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] cursor-pointer",
            icon: "text-black/80",
          },
        }}
        classNames={{
          description: "text-default-500",
          name: "cursor-pointer",
        }}
        description={item?.email}
        name={`${item?.user_name}`}
      >
        {item?.email}
      </User>
    ),
    actions: (item: any, columnKey: React.Key) => (
      <div className="relative flex items-center justify-center gap-2">
        <DropdownMenuNext>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {actionButtons.map((button) => (
              <DropdownMenuItem key={button.label} className="cursor-pointer" onClick={() => button.onClick(item)}>
                {button.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenuNext>
      </div>
    ),
  };

  return (
    <Overlay breadcrumbs={breadcrumbs}>
      <div className="max-w-[95rem] mx-auto w-full flex flex-col gap-4 h-[90vh] m-0 pt-5 px-1 overflow-y-auto scroll">
        <div className="max-w-[95rem] h-[75vh] mx-auto w-full">
          {isLoading ? (
            <span className="flex justify-center items-center h-[100vh] w-full">
              <Spinner color="default" />
            </span>
          ) : (
            <AdvancedTable
              columns={columns}
              data={data}
              statusOptions={statusOptions}
              actionButtons={actionButtons}
              SetExcludeBy={SetExcludeBy}
              setSearch={setSearch}
              isLoading={isLoading}
              dataperpage={setRowsPerPage}
              refetch={refetch}
              page={page}
              setPage={setPage}
              exclude_by={exclude_by.join(',')} // Convert array to comma-separated string
              initialVisibleColumns={["user", "organization", "subdomain", "domain_status", "phone", "actions"]}
              customRenderers={customRenderers}
            />
          )}
        </div>
      </div>
    </Overlay>
  );
};

export default Domain;