import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const name = JSON.parse(auth);
  const onLogoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };
  console.log(name);
  return (
    <div>
      <ul className="list">
        <li>
          <Link to="/">Home</Link>
        </li>
        {auth && (
          <>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/add-product">Add Product</Link>
            </li>
            <li>
              <Link to="/update-product">Update Product</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}
        {auth && (
          <li>
            <Link onClick={onLogoutHandler} to="/signup">
              Logout ({name.name})
            </Link>
          </li>
        )}

        {!auth && (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
