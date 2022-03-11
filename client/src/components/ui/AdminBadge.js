import React, { useEffect, useState } from "react";
import "./Nav.css";

const AdminBadge = ({ isAdmin, setIsAdmin }) => {
  const [adminBadge, setAdminBadge] = useState(false);
  const getUserCredentials = async () => {
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { token: localStorage.token }
      });
      const parseRes = await response.json();
      if (parseRes.utype === "admin") {
        setAdminBadge(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUserCredentials();
  }, []);

  if (!adminBadge) {
    return null;
  }
  return <div className="admin-badge">ADMIN</div>;
};

export default AdminBadge;
