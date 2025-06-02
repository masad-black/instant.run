import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  function handleClick() {
    loginWithPopup();
  }

  return (
    <button
      className="px-6 py-2 bg-blue-400 text-white font-medium rounded-lg hover:cursor-pointer hover:bg-blue-500"
      onClick={handleClick}
    >
      Login
    </button>
  );
};

export default LoginButton;
