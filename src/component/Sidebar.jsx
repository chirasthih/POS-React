import React from "react";
import { Link } from "react-router-dom";
import ApiService from "../service/ApiService";

const logout = () => {
  ApiService.logout();
};

const Sidebar = () => {
  const isAuth = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();

  return (
    <div className="sidebar">
      <h1 className="ims">IMS</h1>
      <ul className="nav-links">
        {isAuth && (
          <li>
            <Link to="/stock">Stock Management</Link>
          </li>
        )}

  

        {isAdmin && (
          <li>
            <Link to="/itemcategory">Item Category</Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link to="/item">Item</Link>
          </li>
        )}

       

        {isAuth && (
          <li>
            <Link onClick={logout} to="/login">
              Logout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
