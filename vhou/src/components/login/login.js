import React from 'react';
import { Link } from "react-router-dom";

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';

// Import de API
// TODO.

// Import de CSS.
import './login.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const LoginComponent = (props) => {
  return (
    <form action="" id="loginForm" className={`${(props.showLogin === false) ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`}>
      <h3 className="text-center noselect">Login</h3>
      <div className="input-group mb-3 form-floating">
        <input type="email" className="form-control" id="floatingInput" placeholder="Email/RA" aria-label="Email/RA" />
        <label htmlFor="floatingInput">Email</label>
      </div>
      <div className="input-group mb-3 form-floating text-center">
        <input type="password" className="form-control" id="floatingInput" placeholder="Senha" aria-label="Senha" />
        <label htmlFor="floatingInput">Senha</label>
      </div>
      <div className="btn-group">
        <Link to={{ pathname: "/menu/" }} replace><button type="button" className="btn" id="btnSubmit">Login</button></Link>
      </div>
    </form>
  );
}
export default LoginComponent;
