import React from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';

// Import de API
// TODO.

// Import de CSS.
import '../login/login.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const RegisterComponent = (props) => {
  return (
    <form action="" id="registerForm" className={`${(props.showCad === false) ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`}>
        <h3 className="text-center noselect">Cadastro</h3>
        <div className="input-group mb-3 form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="Usuário" aria-label="Usuário" />
          <label htmlFor="floatingInput">Usuário</label>
        </div>
        <div className="input-group mb-3 form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="Email" aria-label="Email" />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="input-group mb-3 form-floating">
          <input type="password" className="form-control" id="floatingInput" placeholder="Senha" aria-label="Senha" />
          <label htmlFor="floatingInput">Senha</label>
        </div>
        <div className="input-group mb-3 form-floating">
          <input type="password" className="form-control" id="floatingInput" placeholder="Confirme a senha" aria-label="Senha" />
          <label htmlFor="floatingInput">Confirme a senha</label>
        </div>
        <div className="input-group mb-3 form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="Nome" aria-label="Nome" />
          <label htmlFor="floatingInput">Nome completo</label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={console.log("Fazer a API de cadastro depois!")} id="btnSubmit">Registrar-se</button>
        </div>
      </form>
  );
}
export default RegisterComponent;