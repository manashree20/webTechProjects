import React, { useState, useContext, useEffect, useRef } from "react";
import { IoCartOutline, IoSearchSharp, IoHeartOutline, IoRemoveSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { MdAddIcCall } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "./AppContext/Context"; 
import { PiPottedPlantFill } from "react-icons/pi";


const Navbar = () => {
  const { cart, wishlistData, loggedInUser, setLoggedInUser } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const navlinks = [
    { path: "/", text: "Home" },
    { path: "/products", text: "Products" },
    { path: "/about", text: "About" },
    { path: "/contact", text: "Contact" },
  ];

  if (loggedInUser && loggedInUser.isAdmin === true) {
    navlinks.push({ path: "/admin", text: "Admin Dashboard" });
  }
   const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove user from local storage
    setLoggedInUser(null);
    navigate("/");
  };
  // console.log(loggedInUser.isAdmin);

  return (
    <header className="w-full px-4 md:px-8 py-1 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between py-1">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <PiPottedPlantFill className="text-green-800 text-3xl cursor-pointer" onClick={() => navigate("/")} />
          <h2
            className="text-xl font-semibold cursor-pointer hover:text-green-600 transition"
            onClick={() => navigate("/")}
            style={{
              fontFamily: 'Pacifico, cursive', // Custom font family
              backgroundImage: 'linear-gradient(to right, #64D399,  #059679, #10B981)', // Adding a third green color to the gradient for depth
              WebkitBackgroundClip: 'text', // Apply gradient only to text
              color: 'transparent', // Make the text transparent to show the gradient
              letterSpacing: '2px', // Add some space between letters for a clean look
              
            }}
          >
            The Green Corner
          </h2>

        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex gap-6">
          {navlinks.map(({ path, text }) => (
            <Link
              key={text}
              to={path}
              className={`relative text-lg font-medium transition hover:text-green-600 ${location.pathname === path ? "border-b-2 border-green-600" : ""}`}
            >
              {text}
            </Link>
          ))}
        </nav>

        {/* Icons Section */}
        <div className="relative flex items-center gap-4">
          {/* Wishlist Icon */}
          <div className="relative">
            <IoHeartOutline
              onClick={() => navigate("/wishlist")}
              className="cursor-pointer text-2xl hover:text-red-500 transition"
            />
            {loggedInUser && wishlistData.length > 0 && (
              <span onClick={() => navigate("/wishlist")}
               className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistData.length}
              </span>
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative">
            <IoCartOutline
              onClick={() => navigate("/cart")}
              className="cursor-pointer text-2xl hover:text-blue-600 transition"
            />
            {loggedInUser && cart.length > 0 && (
            <span onClick={() => navigate("/cart")}
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          {/* User Account & Logout */}
          {loggedInUser ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                Welcome, {loggedInUser.username}
              </span>
              <FaSignOutAlt
                onClick={handleLogout}
                className="cursor-pointer text-sm text-red-600 hover:text-red-800 transition"
              />
            </div>
          ) : (
            <FaUserCircle onClick={() => navigate("/login")} className="cursor-pointer text-2xl text-gray-800 hover:text-gray-600 transition" />
          )}

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RxCross2 className="text-2xl" /> : <LuMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        ref={menuRef}
        className={`lg:hidden flex-col absolute top-14 left-0 w-full bg-white shadow-md transition-transform ${isOpen ? "flex" : "hidden"}`}
      >
        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <input
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
              type="search"
              placeholder="Search..."
            />
            <IoSearchSharp className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Mobile Links */}
        <ul className="w-full flex flex-col text-center py-3">
          {navlinks.map(({ path, text }) => (
            <Link key={text} to={path} onClick={() => setIsOpen(false)}>
              <li className={`py-2.5 text-lg font-medium transition hover:text-green-600 ${location.pathname === path ? "border-b-2 border-green-600" : ""}`}>
                {text}
              </li>
            </Link>
          ))}
        </ul>

        {/* Contact Info */}
        <div className="flex flex-col items-center py-3 text-gray-700">
          <p className="flex items-center gap-2">
            <MdAddIcCall className="text-xl text-green-600" /> +91 9067339470
          </p>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
