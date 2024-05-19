import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../apis/modules/auth.api";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state";

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authApi.login(data);

      if (response.status === 200) {
        dispatch(
          setLogin({
            user: response.user,
            token: response.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex items-center text-center flex-col bg-background_register bg-cover">
      <div className="flex flex-col gap-[15px] w-[32%] p-10 bg-white rounded-3xl m-auto">
        <h1 className="text-3xl font-bold py-3">LOGIN</h1>
        <form
          className="flex flex-col items-center gap-[15px]"
          onSubmit={handleSubmit}
        >
          <input
            className="w-[100%] px-4 py-2 bg-transparent border-b border-gray-300 border-solid focus:outline-none focus:ring-0 focus:border-blue-300 focus:placeholder-slate-800"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            className="w-[100%] px-4 py-2 bg-transparent border-b border-gray-300 border-solid focus:outline-none focus:ring-0 focus:border-blue-300 focus:placeholder-slate-800"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <button
            className="mt-4 bg-cyan-500 w-full p-3 text-white rounded-sm bg-gradient-to-r from-teal-400 to-blue-500"
            type="submit"
          >
            Login
          </button>
        </form>
        <a className="text-slate-800 mt-2" href="/register">
          Do not have an account? Register here
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
