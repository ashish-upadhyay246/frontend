import { useEffect, useState } from "react";
import axios from "axios";
import GetAllUserData from "./GetAllUserData";

const Dashboard = () => {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalPayrollManagers, setTotalPayrollManagers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. User not authenticated.");
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        axios
            .get("http://localhost:9246/api/admin_total_employees", { headers })
            .then((res) => setTotalEmployees(res.data))
            .catch((err) => {
                console.error("Error fetching total employees:", err);
                if (err.response && err.response.status === 403) {
                    console.error("Access denied. Check your permissions or token.");
                }
            });

        axios
            .get("http://localhost:9246/api/admin_total_payroll_manager", { headers })
            .then((res) => setTotalPayrollManagers(res.data))
            .catch((err) => {
                console.error("Error fetching total payroll managers:", err);
                if (err.response && err.response.status === 403) {
                    console.error("Access denied. Check your permissions or token.");
                }
            });

        axios
            .get("http://localhost:9246/api/admin_total_admin", { headers })
            .then((res) => setTotalAdmins(res.data))
            .catch((err) => {
                console.error("Error fetching total admins:", err);
                if (err.response && err.response.status === 403) {
                    console.error("Access denied. Check your permissions or token.");
                }
            });
    }, []);

    return (
        <>

            <GetAllUserData />
        </>
    );
};

export default Dashboard;
