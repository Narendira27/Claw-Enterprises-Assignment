import { useState } from "react";
import { IoClose } from "react-icons/io5";
import url from "../url";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
const Authentication = ({ popup, setPopup }) => {
  return (
    <div className="bg-white max-w-sm dark:bg-[#1e1e1e] dark:text-white rounded-md  w-[90%] flex flex-col py-5 cursor-pointer   items-center ">
      <div
        onClick={() => {
          setPopup((prev) => ({ ...prev, open: false }));
        }}
        className="w-full flex justify-end px-10 py-2"
      >
        <IoClose />
      </div>

      {popup.page === "Login" ? (
        <LoginElement setPopup={setPopup} />
      ) : (
        <SignUpElement setPopup={setPopup} />
      )}
    </div>
  );
};

export default Authentication;

const LoadingSpinner = () => {
  return (
    <ThreeDots
      visible={true}
      height="30"
      width="30"
      color="white"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

const SignUpElement = ({ setPopup }) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const authSession = async () => {
    setLoading(true);
    try {
      const response = await axios.post(url + "/register", details);
      const token = response.data.jwt;
      Cookies.set("auth", token);
      navigate("/dashboard");
      setLoading(false);
    } catch (e) {
      setLoginError((prev) => ({
        ...prev,
        error: true,
        msg: e.response.data.error,
      }));
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full px-10 ">
      <h1 className="text-xl mb-2 font-bold text-center">Sign Up</h1>

      <div className="flex flex-col mb-4 mt-2">
        <p className="text-md font-semibold">Email</p>
        <input
          onChange={(e) => {
            setDetails((prev) => ({ ...prev, email: e.target.value }));
          }}
          className="border p-1 rounded-md  dark:text-black"
          placeholder="m@example.com"
        />
      </div>
      <div className="flex flex-col mb-4 mt-2">
        <p className="text-md font-semibold">Password</p>
        <input
          onChange={(e) => {
            setDetails((prev) => ({ ...prev, password: e.target.value }));
          }}
          className="border p-1 rounded-md dark:text-black "
          type="password"
        />
      </div>
      {loginError.error ? (
        <p className="text-sm md:text-md text-red-400">{loginError.msg}</p>
      ) : null}
      <button
        onClick={() => {
          authSession();
        }}
        className="text-white flex justify-center items-center dark:text-black bg-[#8BC34A] mb-4 mt-4 p-1.5 rounded-md"
      >
        {!loading ? "Sign Up" : <LoadingSpinner />}
      </button>

      <p className="mb-4 mt-4">
        Already have an account?{" "}
        <button
          onClick={() => {
            console.log("here");
            setPopup((prev) => ({ ...prev, open: true, page: "Login" }));
          }}
          className="underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

const LoginElement = ({ setPopup }) => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authSession = async () => {
    setLoading(true);
    try {
      const response = await axios.post(url + "/login", details);
      const token = response.data.jwt;
      Cookies.set("auth", token);
      navigate("/dashboard");
      setLoading(false);
    } catch (e) {
      setLoginError((prev) => ({
        ...prev,
        error: true,
        msg: e.response.data.error,
      }));
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full px-10 ">
      <h1 className="text-xl mb-2 font-bold text-center">Login</h1>

      <div className="flex flex-col mb-4 mt-2">
        <p className="text-md font-semibold">Email</p>
        <input
          onChange={(e) => {
            setDetails((prev) => ({ ...prev, email: e.target.value }));
          }}
          className="border p-1 rounded-md dark:text-black "
          placeholder="m@example.com"
        />
      </div>
      <div className="flex flex-col mb-4 mt-2">
        <p className="text-md font-semibold">Password</p>
        <input
          onChange={(e) => {
            setDetails((prev) => ({ ...prev, password: e.target.value }));
          }}
          className="border p-1 rounded-md dark:text-black"
          type="password"
        />
      </div>
      {loginError.error ? (
        <p className="text-sm md:text-md text-red-400">{loginError.msg}</p>
      ) : null}
      <button
        onClick={() => {
          authSession();
        }}
        className="text-white flex justify-center items-center dark:text-black bg-[#8BC34A] mb-4 mt-4 p-1.5 rounded-md"
      >
        {!loading ? "Sign Up" : <LoadingSpinner />}
      </button>
      <p className="mb-4 mt-4">
        Don't have an account{" "}
        <button
          onClick={() => {
            setPopup((prev) => ({ ...prev, open: true, page: "Register" }));
          }}
          className="underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};
