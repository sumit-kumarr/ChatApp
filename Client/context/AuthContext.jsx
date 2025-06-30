import React from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [socket, setSocket] = useState(null);

    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check");
            if (data && data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            } else {
                // If the response is not successful, clear auth state
                setAuthUser(null);
                setToken(null);
                localStorage.removeItem("token");
                axios.defaults.headers.common["token"] = null;
            }
        } catch (error) {
            // Handle 404 or 401 errors gracefully
            if (error.response) {
                if (error.response.status === 404 || error.response.status === 401) {
                    setAuthUser(null);
                    setToken(null);
                    localStorage.removeItem("token");
                    axios.defaults.headers.common["token"] = null;
                    // Optionally, show a specific message for not authenticated
                    toast.error("Session expired or user not found. Please login again.");
                } else {
                    toast.error(error.response.data?.message || error.message);
                }
            } else {
                toast.error(error.message);
            }
            // Optionally log error for debugging
            console.error("Check auth error:", error);
        }
    };

    // login function 
    const login = async (state, Credential) => {
        try {
            const { data } = await axios.post(`/api/auth/${state}`, Credential);
            if (data.success) {
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token", data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // logout
    const logout = async () => {
        localStorage.removeItem("token");
        setAuthUser(null);
        setOnlineUser([]);
        setToken(null);
        axios.defaults.headers.common["token"] = null;
        toast.success("Logout Successful");
        if (socket) {
            socket.disconnect();
        }
    };

    // update profile
    const updateProfile = async (body) => {
        try {
            const { data } = await axios.post("/api/auth/update-profile", body);
            if (data.success) {
                setAuthUser(data.user);
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.error("Update profile error:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // connect socket
    const connectSocket = (userData) => {
        if (!userData || socket?.connected) return;
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUser(userIds);
        });
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
        // eslint-disable-next-line
    }, []);

    const value = {
        axios, authUser, onlineUser, socket, login, logout, updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;