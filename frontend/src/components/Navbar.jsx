import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";
import url from "../url";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setPopup, info }) => {
  const navigate = useNavigate();
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };
  const RemoveAuth = async () => {
    const token = Cookies.get("auth");
    try {
      await axios.post(url + "/logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Cookies.remove("auth");
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <nav className="border-b  sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-[#1e1e1e]/80 flex justify-center px-6 xl:px-4 py-3 transition-colors">
      <div className="w-full flex xl:max-w-screen-2xl  justify-between ">
        <div className=" flex justify-center items-center">
          <div className="mr-2 md:mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-[#4CAF50] dark:text-[#8BC34A]"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <p className="text-lg font-normal md:text-xl lg:text-2xl dark:text-white">
            Todo
          </p>
        </div>
        {info === "LandingPage" ? (
          <div className="flex items-center ">
            <button
              onClick={() => {
                setPopup((prev) => ({ ...prev, open: true, page: "Login" }));
              }}
              className="mx-2 md:mx-4  text-sm md:text-lg lg:text-xl font-normal dark:text-white"
            >
              Login
            </button>
            <button
              onClick={() => {
                setPopup((prev) => ({ ...prev, open: true, page: "Register" }));
              }}
              className="mx-2 md:mx-4  text-sm md:text-lg lg:text-xl font-normal text-white dark:text-black bg-[#8BC34A] lg:px-6 md:px-4 md:py-2 p-2  lg:rounded-lg rounded-md "
            >
              Sign Up
            </button>
            <button
              className="mx-2 md:mx-4   dark:text-white"
              onClick={() => toggleTheme()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </button>
          </div>
        ) : null}
        {info !== "LandingPage" ? (
          <div className="flex items-center">
            <button
              onClick={() => RemoveAuth()}
              className="mx-1.5 md:mx-4  text-sm md:text-lg  font-normal text-white dark:text-black bg-[#8BC34A] lg:px-6 md:px-4 md:py-2 p-2 lg:rounded-lg rounded-md "
            >
              Logout
            </button>
            <button
              className="mx-2 md:mx-4   dark:text-white"
              onClick={() => toggleTheme()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
