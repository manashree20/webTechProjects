import React, { createContext, useState, useEffect } from "react";
import { plants as initialplant } from "../../StaticData/PlantData";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create Context
export const Context = createContext({
    plants: [],
    users: [],
    wishlistData: [],
    cart: [],
    reviews: [],
    isAdmin: false,

    // Plant Management
    addNewPlant: () => {},

    // Wishlist
    addToWishlist: () => {},
    removeFromWishlist: () => {},

    // Cart
    addToCart: () => {},

    clearCart:() => { },
    removeFromCart: () => {},
    increaseQuantity: () => {},
    decreaseQuantity: () => {},

    // Reviews
    addReview: () => {},

    // User Management
    registerUser: () => {},
    fetchUsers: () => {},
    setAdminStatus: () => {}
});

export const PlantProvider = ({ children }) => {
    const [plants, setPlants] = useState(initialplant);
    const [users, setUsers] = useState([]);
    const [wishlistData, setWishlistData] = useState([]);
    const [cart, setCart] = useState([]);
    const [isAdmin, setAdminStatus] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);


    // ---------------------- Fetch Users from API ----------------------
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/userData");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    // Fetch users when component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // ---------------------- Wishlist Management ----------------------
    const addToWishlist = (plant) => {
        if (!loggedInUser) {
            toast.error("Please login to add to wishlist", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                style: {
                    margin: "30px"
                }
            });
            return;
        }

        setWishlistData((prevWishlist) => {
            if (!prevWishlist.some((item) => item.id === plant.id)) {
                const updatedWishlist = [...prevWishlist, plant];
                toast.success("🌱 Sprouted! Added to your wishlist!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                    style: {
                        margin: "30px"
                    }
                });
                return updatedWishlist;
            } else {
                toast.info("👀 Oops! This plant is already in your wishlist!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                    style: {
                        margin: "30px"
                    }
                });
            }
            return prevWishlist;
        });
    };

    const removeFromWishlist = (plantId) => {
        setWishlistData((prevWishlist) => {
            const updatedWishlist = prevWishlist.filter((item) => item.id !== plantId);
            return updatedWishlist;
        });
    };

    // ---------------------- Cart Management ----------------------
    const addToCart = (plant) => {
        if (!loggedInUser) {
            toast.error("Please login to add to cart", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                style: {
                    margin: "30px"
                }
            });
            return;
        }
        setCart((prevCart) => {
            if (!prevCart.some((item) => item.id === plant.id)) {
                const updatedCart = [...prevCart, { ...plant, quantity: 1 }];
                toast.success("🛒 Planted in your cart! Ready to check out?", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                    style :{
                        margin: "30px"
                    }
                });
                return updatedCart;
            } else {
                toast.info("🌵 This green buddy is already in your cart!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                    style: {
                        margin: "30px"
                    }
                });
            }
            return prevCart;
        });
    };
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


    const removeFromCart = (plantId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== plantId);
            return updatedCart;
        });
    };
    const clearCart = () => {
        setCart([]); // Assuming `setCart` updates the cart state
    };


    const increaseQuantity = (plantId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((plant) =>
                plant.id === plantId ? { ...plant, quantity: plant.quantity + 1 } : plant
            );
            return updatedCart;
        });
    };

    const decreaseQuantity = (plantId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((plant) =>
                plant.id === plantId && plant.quantity > 1
                    ? { ...plant, quantity: plant.quantity - 1 }
                    : plant
            );
            return updatedCart;
        });
    };

    // ---------------------- Reviews Management ----------------------
    const addReview = (plantId, review) => {
        setPlants((prevPlants) =>
            prevPlants.map((plant) =>
                plant.id === plantId
                    ? { ...plant, reviews: [...(plant.reviews || []), review] }
                    : plant
            )
        );
    };

    // ---------------------- User Registration ----------------------
    const registerUser = async (formData) => {
        try {
            // Check if user exists
            const checkResponse = await axios.get(
                `http://localhost:8000/userData?username=${formData.username}`
            );

            if (checkResponse.data.length > 0) {
                return { success: false, message: "Username already exists." };
            }

            // If user doesn't exist, create a new one
            const response = await axios.post("http://localhost:8000/userData", formData);

            return response.status === 201
                ? { success: true }
                : { success: false, message: "Signup failed. Try again." };
        } catch (error) {
            return { success: false, message: "Signup failed. Please try again." };
        }
    };

    // ---------------------- Restore Logged-In User from LocalStorage ----------------------
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setLoggedInUser(parsedUser);
            setAdminStatus(parsedUser?.isAdmin || false); // Ensure isAdmin is set correctly
        }
    }, []);


    return (
        <Context.Provider
            value={{
                plants,
                wishlistData,
                cart,
                totalPrice,
                users,
                isAdmin,
                setAdminStatus,
                loggedInUser,
                setLoggedInUser,

                // Wishlist
                addToWishlist,
                removeFromWishlist,

                // Cart
                addToCart,
                clearCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,

                // Reviews
                addReview,

                // User Management
                fetchUsers,
                registerUser
            }}
        >
            {children}
        </Context.Provider>
    );
};

