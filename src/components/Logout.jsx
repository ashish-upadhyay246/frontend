import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        sessionStorage.removeItem("flag");

        navigate("/login");
    };

    return (
        <div className="flex justify-start p-4">
            <button
                onClick={handleLogout}
                className={`px-8 py-3 hover:bg-gray-800 cursor-pointer flex items-center transition-colors duration-200 ease-in-out}`}
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;
