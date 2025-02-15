// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [user, setUser] = useState(null);
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [loginData, setLoginData] = useState(null);

//     const login = (email, password) => {
//         setIsLoading(true);
//         setError(""); // Clear any previous errors
//         setLoginData({ email, password });
//     };

//     // useEffect hook to handle login API call whenever loginData changes
//     useEffect(() => {
//         if (!loginData) return; // If no loginData, do nothing

//         const { email, password } = loginData;

//         const loginUser = async () => {
//             try {
//                 const response = await axios.post("http://116.75.62.44:8000/login", {
//                     email,
//                     password,
//                 });

//                 if (response.data) {
//                     setUser(response.data); // Set user data from response
//                     setIsLoggedIn(true);
//                     setError("");
//                 } else {
//                     setError("Invalid credentials");
//                     setIsLoggedIn(false);
//                 }
//             } catch (err) {
//                 setError("Error logging in. Please try again.");
//                 setIsLoggedIn(false);
//                 console.error("Login error:", err);
//             } finally {
//                 setIsLoading(false);
//                 setLoginData(null); // Reset loginData after login attempt
//             }
//         };

//         loginUser(); // Call the async function to login the user
//     }, [loginData]); // Dependency array with loginData

//     return (
//         <AuthContext.Provider
//             value={{ login, isLoggedIn, user, error, isLoading }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };
