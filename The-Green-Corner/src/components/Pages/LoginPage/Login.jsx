import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../AppContext/Context";
import leafImg from "../../../assets/leaf.jpg";
import { FaUserAlt, FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const { users, setAdminStatus, setLoggedInUser } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(null);
  const [emailCondition, setEmailCondition] = useState(false); // State for email validation

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !role) {
      setError("Please select a role and enter your credentials.");
      return;
    }

    if (!emailCondition) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    const foundUser = users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());

    if (!foundUser) {
      setError("User not found.");
      setIsLoading(false);
      return;
    }

    if (foundUser.password !== password) {
      setError("Incorrect password.");
      setIsLoading(false);
      return;
    }

    if ((role === "admin" && foundUser.isAdmin) || (role === "user" && !foundUser.isAdmin)) {
      setAdminStatus(foundUser.isAdmin);
      setLoggedInUser(foundUser);
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

      const loadingToast = toast.loading("🔄 Logging in...");

      setTimeout(() => {
        toast.dismiss(loadingToast);

        toast.success(
          `${role === "admin" ? "🚀 Welcome, Admin!" : "🌱 Welcome back, Plant Lover!"}`,
          {
            icon: "🎉",
            position: "top-right",
            duration: 5000,
            style: {
              margin: "30px",
              background: role === "admin" ? "#1E293B" : "#3A5B22",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              padding: "12px",
              borderRadius: "10px",
            }
          }
        );

        navigate(role === "admin" ? "/" : "/");
      }, 2000);
    } else {
      setError("Invalid role selection for this account.");
      toast.error("⚠️ Invalid role selection. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
    }

    setIsLoading(false);
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailCondition(emailRegex.test(email));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 px-4">
      <div className="flex flex-row bg-white rounded-3xl shadow-lg w-full max-w-4xl h-[85vh] overflow-hidden">
        <div className="w-1/2 flex flex-col justify-center px-8">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>

          <div className="flex justify-around mt-4">
            {["user", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex items-center px-4 py-2 rounded-lg transition ${role === r ? "bg-[#3A5B22] text-white" : "bg-gray-200 text-gray-700"}`}
              >
                {r === "user" ? <FaUserAlt className="mr-2" /> : <FaUserShield className="mr-2" />}
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="w-full mt-4 space-y-4">
            <div className="w-full">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value); // Validate email on change
                }}
                placeholder="Email"
                className="w-full px-4 py-3 border-2 rounded-xl text-gray-800"
                required
                aria-label="Email address"
              />
              {/* Display email validation message */}
              {!emailCondition && email && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
              )}
            </div>

            <div className="w-full relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border-2 rounded-xl text-gray-800 pr-10"
                required
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-3 animate-pulse">{error}</p>}

            <button
              type="submit"
              className="w-full mt-6 bg-[#3A5B22] text-white py-3 px-4 rounded-lg transform hover:scale-105 transition duration-300"
              disabled={isLoading || !emailCondition} // Disable if email is invalid
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-600 mt-3">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-700 font-normal hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </p>
          </form>
        </div>

        <div className="w-1/2 flex justify-center items-center overflow-hidden">
          <img src={leafImg} alt="Leaf" className="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Login;
