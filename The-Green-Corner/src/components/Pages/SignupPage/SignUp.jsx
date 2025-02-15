import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../AppContext/Context";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons
import leafImg from "../../../assets/leaf.jpg";

const SignUp = () => {
  const { registerUser } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Show confirm password toggle
  const [error, setError] = useState("");
  const [emailCondition, setEmailCondition] = useState(false);
  const [contactCondition, setContactCondition] = useState(true); // Contact validation state
  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    numeric: false, // Add condition for numeric characters
  });
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(true); // Confirm password match state
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track password field focus

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Validate contact number
    if (name === "contact") {
      setContactCondition(/^\d{10}$/.test(value)); // Simple validation for 10-digit contact number
    }

    // Check if confirm password matches
    if (name === "confirmPassword") {
      setConfirmPasswordMatch(value === formData.password);
    }

    // Validate password conditions immediately
    if (name === "password" || name === "confirmPassword") {
      validatePassword(formData.password);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailCondition(emailRegex.test(email));
  };

  const validatePassword = (password) => {
    setPasswordConditions({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      numeric: /\d/.test(password), // Check if there is at least one numeric character
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, contact, password, confirmPassword, isAdmin } = formData;

    if (!username || !email || !contact || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!passwordConditions.length || !passwordConditions.uppercase || !passwordConditions.lowercase || !passwordConditions.specialChar || !passwordConditions.numeric) {
      setError("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.");
      return;
    }

    if (!emailCondition) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!contactCondition) {
      setError("Please enter a valid 10-digit contact number.");
      return;
    }

    if (!confirmPasswordMatch) {
      setError("Passwords do not match.");
      return;
    }

    const response = await registerUser({ username, email, contact, password, isAdmin });

    if (!response.success) {
      setError(response.message);
    } else {
      alert("Signup successful!");
      navigate(isAdmin ? "/admin" : "/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 px-4">
      <div className="flex flex-row bg-white rounded-3xl shadow-lg w-full max-w-4xl h-[85vh] overflow-hidden">
        <div className="w-1/2 flex flex-col justify-center px-8">
          <h1 className="text-3xl font-semibold text-gray-900">Create an account</h1>
          <p className="text-gray-600 mt-2">Enter your details to create your account</p>

          <form onSubmit={handleSubmit} className="w-full mt-4 space-y-4">
            {/* Username Field */}
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              required
            />

            {/* Email Field */}
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
                validateEmail(e.target.value);
              }}
              placeholder="Email"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              required
            />
            {!emailCondition && formData.email && (
              <p className="text-red-500 text-sm">Please enter a valid email address.</p>
            )}

            {/* Contact Field */}
            <input
              name="contact"
              type="text"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              required
            />
            {!contactCondition && formData.contact && (
              <p className="text-red-500 text-sm">Please enter a valid 10-digit contact number.</p>
            )}

            {/* Password Field */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  handleChange(e);
                  validatePassword(e.target.value);
                }}
                onFocus={() => setIsPasswordFocused(true)} // Set focus when password field is clicked
                onBlur={() => setIsPasswordFocused(false)} // Remove focus when password field is unfocused
                placeholder="Password"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Show Password Conditions if password is focused */}
            {isPasswordFocused && (
              <div className="text-sm text-red-700 mt-2">
                {!passwordConditions.length && <p>Password must be at least 8 characters long.</p>}
                {!passwordConditions.uppercase && <p>Must include one uppercase letter (A-Z).</p>}
                {!passwordConditions.lowercase && <p>Must include one lowercase letter (a-z).</p>}
                {!passwordConditions.specialChar && <p>Must include one special character (e.g., !@#$%^&*).</p>}
                {!passwordConditions.numeric && <p>Must include at least one numeric character.</p>}
              </div>
            )}

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {!confirmPasswordMatch && formData.confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Admin Checkbox */}
            <div className="flex items-center space-x-2">
              <label htmlFor="admin" className="text-sm text-gray-700">Are you admin?</label>
              <input
                type="checkbox"
                id="admin"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3A5B22] text-white py-2 rounded-lg"
              disabled={
                Object.values(passwordConditions).includes(false) || !emailCondition || !contactCondition || !confirmPasswordMatch
              }
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Leaf Image */}
        <div className="w-1/2 flex justify-center items-center overflow-hidden">
          <img
            src={leafImg}
            alt="Leaf"
            className="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
