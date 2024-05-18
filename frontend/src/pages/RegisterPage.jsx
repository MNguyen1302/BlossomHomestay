import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import authApi from "../apis/modules/auth.api";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "avatar" ? files[0] : value,
    });
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData();

      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await authApi.register(formData);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex items-center text-center flex-col bg-background_register bg-cover">
      <div className="flex flex-col gap-[15px] w-[32%] p-10 bg-white rounded-3xl m-auto">
        <h1 className="text-3xl font-bold py-3">CREATE ACCOUNT</h1>
        <form
          className="flex flex-col items-center gap-[15px]"
          onSubmit={handleSubmit}
        >
          <input
            className="w-[100%] px-4 py-2 bg-transparent border-b border-gray-300 border-solid focus:outline-none focus:ring-0 focus:border-blue-300 focus:placeholder-slate-800"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="w-[100%] px-4 py-2 bg-transparent border-b border-gray-300 border-solid focus:outline-none focus:ring-0 focus:border-blue-300 focus:placeholder-slate-800"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            className="w-[100%] px-4 py-2 bg-transparent border-b border-gray-300 border-solid focus:outline-none focus:ring-0 focus:border-blue-300 focus:placeholder-slate-800"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-[100%] px-4 py-2 bg-transparent border-b border-gray-300 border-solid focus:outline-none focus:ring-0 focus:border-blue-300 focus:placeholder-slate-800"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className="w-[100%] px-4 py-2 bg-transparent border-b border-gray-300 border-solid focus:outline-none focus:ring-0 focus:border-blue-300 focus:placeholder-slate-800"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {!passwordMatch && (
            <p className="text-red-500">Passwords are not matched!</p>
          )}
          <input
            id="image"
            className="hidden"
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <label
            className="flex flex-col justify-center items-center gap-2 cursor-pointer text-gray-400 text-lg"
            htmlFor="image"
          >
            <FiUpload className="w-6" />
            <p>Upload Your Photo</p>
          </label>
          {formData.avatar && (
            <img
              src={URL.createObjectURL(formData.avatar)}
              alt="Profile Photo"
              className="max-w-20"
            />
          )}
          <button
            className="mt-4 bg-cyan-500 w-full p-3 text-white rounded-sm bg-gradient-to-r from-teal-400 to-blue-500"
            type="submit"
            disabled={!passwordMatch}
          >
            Register
          </button>
        </form>
        <a className="text-slate-800 mt-2" href="/login">
          Already have an account? Log In here
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
