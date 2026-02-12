import React, { useContext, useState } from "react";
import { loginUser } from "../../services/auth.services.js";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext.jsx";
const Login = () => {
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault(e);
    let response = await loginUser(credentials);
    login(response.data)
    console.log("response", response);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-liner-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-xl shadow-2xl p-10 border border-gray-200">
        <div>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 text-sm">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Username/Email Field */}
          <div className="field-group">
            <label className="field-label">Username or Email</label>
            <input
              type="text"
              name="emailOrUsername"
              value={credentials.emailOrUsername}
              onChange={handleInputChange}
              className="field-input"
              placeholder="Enter username or email"
              //   disabled={isLoading}
              required
            />
          </div>

          {/* Password Field */}
          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="field-input"
              placeholder="Enter your password"
              //   disabled={isLoading}
              required
            />
          </div>

          {/* Error Message */}
          {/* {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )} */}

          {/* Login Button */}
          <button type="submit" className="login-button">
            Login
          </button>

          {/* Signup Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/"
                className="font-semibold text-[#004953] hover:text-[#004953] transition-colors duration-200"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
