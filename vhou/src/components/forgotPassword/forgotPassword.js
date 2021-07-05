import React from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';

// Import de API
// TODO.

// Import de CSS.
import '../login/login.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const ForgotPsdComponent = (props) => {
  return (
    <form action="" id="forgotForm" className={`${(props.showForgot === false) ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`}>
      <h3 className="text-center noselect">Esqueceu a senha</h3>
      <div className="input-group mb-3 form-floating">
        <input type="email" className="form-control" id="floatingInput" placeholder="Email" aria-label="Email" />
        <label htmlFor="floatingInput">Digite seu email</label>
      </div>
      <div className="btn-group">
        <button type="button" className="btnSubmit" onClick={console.log("Fazer a API de cadastro depois!")} id="btnSubmit">Enviar Email</button>
      </div>
    </form>
  );
}
export default ForgotPsdComponent;