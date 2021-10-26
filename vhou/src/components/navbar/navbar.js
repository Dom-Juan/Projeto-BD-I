import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';

// Import de API
import { logout } from '../../pages/auth';

// Import de CSS.
import './navbar.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const Navbar = (props) => {
  const [count, setCount] = useState(6);

  const handleLogout = () => {
    setTimeout(() => {
      setCount(count - 1);
      logout();
      history.push("/login");
    }, 6000);
  }

  let history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg nav-menu noselect">
      <a className="navbar-brand" href="#CACIC">Cacic</a>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link type="button" className="nav-link" to={{ pathname: props.pathname }} replace onClick={handleLogout} data-bs-toggle="modal" data-bs-target="#msgModal">Logout</Link>
        </li>
      </ul>
      <div className="modal fade" id="msgModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title dark-text" id="exampleModalLabel">CACIC - V.H.O.U.</h5>
            </div>
            <div className="modal-body text-center dark-text">
              Realizando logout...
            </div>
            <p className="dark-text text-center">Pode fechar esta janela.</p>
            <div className="modal-footer">
              <button type="button" className="btn btnSubmitClose" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;