import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { User } from "../types/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface PropsType {
  user: User | null;
}

function Header({ user }: PropsType) {
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };
  return (
    <>
      <div className="fixed top-0 w-full bg-white z-10">
        <div className="flex items-center py-4 justify-between w-[95%] container mx-auto">
          <div>
            <Link to="/">
              <h1 className="font-bold leading-3 text-xl">
                HQ<span className="text-red-600">PENCILS</span>
              </h1>
            </Link>
            <span className="text-xs font-bold tracking-wider text-red-300">
              Sketches are love!
            </span>
          </div>
          <div>
            <ul className="flex items-center gap-10 max-lg:hidden text-sm font-semibold">
              <Link to="/">
                <li className="hover:text-red-600">HOME</li>
              </Link>
              <Link to="/products">
                <li className="hover:text-red-600">PRODUCTS</li>
              </Link>
              <Link to="/contact">
                <li className="hover:text-red-600">CONTACT</li>
              </Link>

              {user?._id ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user.photo} alt={user?.name.slice(0, 2).toUpperCase()} />
                        <AvatarFallback>
                          {user?.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        Hi, {user.name.split(" ")[0]}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to={"/profile"}>Profile</Link>
                      </DropdownMenuItem>
                      {user.role === "admin" && (
                        <DropdownMenuItem>
                          <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Link to={"/orders"}>Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          className="flex gap-2 items-center"
                          onClick={logoutHandler}
                        >
                          Logout <FaSignOutAlt />
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link to="/auth/login">LOGIN</Link>
                </>
              )}

              <Link to="/cart">
                <Button
                  size={"icon"}
                  className="text-lg rounded-full"
                  variant={"ghost"}
                >
                  <FiShoppingCart />
                </Button>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
