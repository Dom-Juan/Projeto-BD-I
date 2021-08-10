import React from 'react';
import { Link } from "react-router-dom";

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';

// Import de API
// TODO.

// Import de CSS.
import './navbar.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg nav-menu noselect">
      <a className="navbar-brand" href="#">Cacic</a>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link type="button" className="nav-link" to={{pathname: props.pathname}} replace>Logout</Link>
        </li>
      </ul>
    </nav>
  );
} 
export default Navbar;