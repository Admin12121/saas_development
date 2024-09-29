import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserRound, Settings, Home } from "lucide-react";
import { useHandleLogout } from "@/lib/actions";
import "./style.navigation.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ModeToggle } from "../toogle-mode";
import { Button } from "@/components/ui/button";
import { getSubdomain } from "@/lib/subdomain";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetLoggedUserQuery } from "@/api/service/user_Auth_Api";
import { getToken } from "@/api/service/localStorageServices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FlipLink } from "@/components/global/link";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  isLoading,
  position = false,
  organization,
  login,
}: {
  isLoading: boolean;
  position?: boolean;
  organization: string | null;
  showHome?: string | null;
  login?: boolean;
}) => {
  const { access_token } = getToken();
  const {
    data,
    isLoading: userProfileLoading,
    refetch,
  } = useGetLoggedUserQuery({ access_token }, { skip: !access_token });
  const [toggle, setToggle] = useState(false);
  const { subdomain } = getSubdomain();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: any) => {
    for (const card of document.getElementsByClassName("nav")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <>
      <motion.div
        className="Nav_wrapper"
        style={{ position: position ? "absolute" : "fixed" }}
      >
        <div className="nav" onMouseMove={handleMouseMove}>
          <motion.div
            initial={{ height: 54 }}
            animate={{ height: toggle ? "24rem" : 54 }}
            transition={{ duration: 0.3 }}
            className="nav_wrap flex"
          >
            <span className="nav_wrap flex justify-between items-center h-[52px]">
              <span className="flex gap-2 items-center justify-center cursor-pointer">
                <Skeleton className="h-11 w-11 rounded-md" disable={!isLoading}>
                  <div className="logo">
                    <Link to="/">
                      <span>
                        <img
                          src="/images/logo.png"
                          className="p-1"
                          alt="logo"
                        />
                      </span>
                    </Link>
                  </div>
                </Skeleton>
                <Skeleton className="h-11 w-48 rounded-md" disable={!isLoading}>
                  <h1 className="text-2xl font-semibold">
                    {organization ? organization : "Kantipur Portal"}
                  </h1>
                </Skeleton>
              </span>
              <Skeleton
                className="h-11 w-24 md:w-56 rounded-md"
                disable={!isLoading || userProfileLoading}
              >
                <span className="hidden md:flex gap-5 ">
                  <FlipLink
                    to="/"
                    className="font-semibold text-base dark:text-default-500 dark:hover:text-default-900 transition-colors duration-200"
                  >
                    Home
                  </FlipLink>
                  {data && subdomain && (
                    <FlipLink
                      to="/membership"
                      className="font-semibold text-default-500 dark:hover:text-default-900 transition-colors duration-200"
                    >
                      Membership
                    </FlipLink>
                  )}
                  <FlipLink
                    to="/events"
                    className="font-semibold dark:text-default-500 dark:hover:text-default-900 transition-colors duration-200"
                  >
                    Events
                  </FlipLink>
                  <FlipLink
                    to="/about"
                    className="font-semibold dark:text-default-500 dark:hover:text-default-900 transition-colors duration-200"
                  >
                    About
                  </FlipLink>
                </span>
              </Skeleton>
              <span className="hidden md:flex gap-2 items-center justify-center">
                <ModeToggle />
                {login && (
                  <Skeleton
                    className="h-11 w-24 rounded-md"
                    disable={!isLoading || userProfileLoading}
                  >
                    {access_token ? (
                      <UserNav data={data} refetch={refetch} />
                    ) : (
                      <Button asChild className="h-11 px-5 rounded-[8px]">
                        {subdomain ? (
                          <Link to="/auth">Login</Link>
                        ) : (
                          <Link to="/register">Sign Up</Link>
                        )}
                      </Button>
                    )}
                  </Skeleton>
                )}
              </span>
              <span className="flex md:hidden">
                <Button
                  className="h-11 w-11 p-0 rounded-[8px]"
                  onClick={() => setToggle((prev) => !prev)}
                >
                  <Menu className="w-7 h-7" />
                </Button>
              </span>
            </span>
            <span className="bg-[#202224] w-full h-[calc(100%-56px)] top-14 flex justify-between items-center relative rounded-md"></span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;

interface AccountSwitcherProps {
  isCollapsed?: boolean;
  data: any;
  refetch: any;
}

export function UserNav({ isCollapsed, data, refetch }: AccountSwitcherProps) {
  const handleLogout = useHandleLogout();
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className={cn(
            "relative h-11 w-full p-1 rounded-md flex items-center justify-start",
            isCollapsed && "h-9 w-9 p-0 justify-center"
          )}
        >
          <div className="flex items-center space-x-4">
            <Avatar
              className={cn(
                "h-9 w-9 rounded-md bg-blue-500",
                isCollapsed && "h-8 w-8 p-0"
              )}
            >
              <AvatarImage src="/logo.png" />
              <AvatarFallback className="bg-transparent">OM</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "flex items-start justify-start flex-col",
                isCollapsed && "hidden"
              )}
            >
              <p className="text-sm font-medium text-muted-foreground leading-none">
                {data?.user_name}
              </p>
              <p className="text-xs text-zinc-600">{data?.email}</p>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-56 dark:bg-muted border-0 outline-0",
          isCollapsed && "left-4 relative"
        )}
        align="end"
        forceMount
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 hover:dark:!bg-neutral-900" onClick={()=>{navigate('/dashboard')}}>
            <Home className="w-4 h-4" />
            Dashboard
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 hover:dark:!bg-neutral-900">
            <UserRound className="w-4 h-4" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 hover:dark:!bg-neutral-900">
            <Settings className="w-4 h-4" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 hover:!bg-destructive/15 hover:!text-red-500 cursor-pointer"
            onClick={() => {
              handleLogout();
              refetch();
            }}
          >
            <LogOut className="w-4 h-4" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
