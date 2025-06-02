import { useAuth0 } from "@auth0/auth0-react";

import { Logo, Run, Dropdown } from "../components/ui";
import { LoginButton } from "../components";

const Header = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <header
      className="flex justify-between items-center h-14 px-4 md:px-6 bg-[#323232] text-white 
    backdrop-blur-md bg-opacity-80 sticky top-0 z-50 transition-colors duration-300"
    >
      <Logo />

      <div className="flex items-center gap-2">
        <Dropdown />
        <Run />
        <div className="flex items-center gap-1 ml-2">
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <div className="rounded-full w-8 h-8 overflow-hidden">
              <img
                src={user.picture}
                alt="user_img"
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
