import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

import { AuthContext } from '../../context/auth'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)

    const navBar = user ? (
      <div className="main-nav">
        <span>
          <Link to="/" className="main-logo">
            Coworking
          </Link>
        </span>
        <div className="action-buttons-wrapper">
          <div className="action-item">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/spaces"}
            >
              <span>Find a workspace</span>
            </Link>
          </div>
          <div className="action-item">
              <span onClick={logout} style={{ textDecoration: "none", color: "black" }}>Logout</span>
          </div>
        </div>
      </div>
    ) : (
      <div className="main-nav">
        <span>
          <Link to="/" className="main-logo">
            Coworking
          </Link>
        </span>
        <div className="action-buttons-wrapper">
          <div className="action-item">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/spaces"}
            >
              <span>Find a workspace</span>
            </Link>
          </div>
          <div className="action-item">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/login"}
            >
              <span>Login</span>
            </Link>
          </div>
          <div className="action-item">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/register"}
            >
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    );
    return navBar;
}

export default Navbar;

    // constructor(props) {
    //     super(props);

    // }

    // render() {
    //     if (isBrowser) {
    //         return (
    //         <div className="main-nav">
    //             <span>
    //                 <Link to="/" className="main-logo">
    //                 Coworking
    //                 </Link>
    //             </span>
    //             <div className="action-buttons-wrapper">
    //                 <div className="action-item">
    //                 <span>List a workspace</span>
    //                 </div>
    //                 <div className="action-item">
    //                 <Link
    //                     style={{ textDecoration: "none", color: "black" }}
    //                     to={"/spaces"}
    //                 >
    //                     <span>Find a workspace</span>
    //                 </Link>
    //                 </div>
    //                 <div className="action-item">
    //                 <span>Write a Review</span>
    //                 </div>
    //             </div>
    //         </div>
        
    //         );
    //     } else {
    //         return (
    //           <div className="main-nav-mobile">
    //             <div className="action-buttons-wrapper-mobile">
    //               <Link to="/" className="main-logo-mobile">
    //                 Coworking
    //               </Link>
    //               <Link className="action-item-mobile"
    //                   style={{ textDecoration: "none", color: "black" }}
    //                   to={"/spaces"}
    //               >
    //                   Find a workspace
    //               </Link>
    //             </div>
    //           </div>
    //         );
    //     }
    // }

