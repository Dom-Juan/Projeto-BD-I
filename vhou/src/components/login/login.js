import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Import de API
import api from '../../pages/api';
import { login, loginError } from '../../pages/auth';

// Import de CSS.
import './login.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const LoginComponent = (props) => {
  const [informacoes, setInformacoes] = useState({});
  const [erro, setErro] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [count, setCount] = useState(6);

  const setInformacoesForm = (event) => {
    event.persist();
    setInformacoes(informacoes => ({
      ...informacoes,
      [event.target.name]: event.target.value,
    }));
  };

  const getCountTimeout = () => {
    setTimeout(() => {
      setCount(count - 1);
    }, 2000);
  };

  let history = useHistory();
  const location = useLocation();

  async function auth(email, password) {
    try {
      if(email === undefined) {
        setErro("Preencha campo do email.");
        return;
      }

      if(password === undefined) {
        setErro("Preencha o campo da sua senha.");
        return;
      }
      
      if(location.pathname === '/login' || location.pathname === '/') {
        await api.post("/session", {
          email: email,
          senha: password,
          nivel: "aluno"
        }, { timeout: 4000 }).then((response) => {
          console.log(response.status, response.statusText);
          setLoginStatus(true);
          if (response.status === 200) {
            login(response.data.token);
            history.push("/menu");
          }
        })
      } else if(location.pathname === '/admin') {
        await api.post("/session", {
          email: email,
          senha: password,
          nivel: "coordenador"
        }, { timeout: 4000 }).then((response) => {
          console.log(response.status, response.statusText);
          setLoginStatus(true);
          if (response.status === 200) {
            login(response.data.token);
            history.push("/menuAdmin");
          }
        })
      } else {
        alert("Como você chegou aqui ?");
      }
    } catch (error) {
      console.error(error);
      setLoginStatus(false);
      loginError(null);
      if (error.response.status === 400) {
        setLoginStatus(false);
        setErro("Erro de request no sistema, digitou os dados corretos ?");
      } else if (error.response.status === 404) {
        setLoginStatus(false);
        setErro("Não foi encontrado nos sistemas!");
      } else if (error.response.status === 401) {
        setLoginStatus(false);
        setErro("Requisição HTTPS não aceita.");
      } else if (error.response.status === 405) {
        setLoginStatus(false);
        setErro("Método não permitido...");
      } else if (error.response.status === 406) {
        setLoginStatus(false);
        setErro("Not Acceptable");
      } else if (error.response.status === 408) {
        setLoginStatus(false);
        setErro("Conexão com o server caiu... timeout");
      } else if (error.response.status === 413) {
        setLoginStatus(false);
        setErro("Informações adicionadas são excedem a carga do servidor.");
      } else if (error.response.status === 429) {
        setLoginStatus(false);
        setErro("Muitas tentativas de login realizadas em um periodo curto de tempo, espere um pouco e tente novamente...");
      } else {
        setLoginStatus(false);
        setErro("Erro genérico.");
      }
      setLoginStatus(false);
      loginError(null);
    }
  }

  function HandleSubmit(event) {
    event.preventDefault();
    auth(informacoes.email, informacoes.password);
  }

  return (
    <form action="" id="loginForm" className={`${(props.showLogin === false) ? "nodisplay" : "showdisplay animadoCimaParaBaixo"}`} onSubmit={HandleSubmit}>
      <h3 className="text-center noselect">Login</h3>
      <div className="input-group mb-3 form-floating">
        <input type="email" className="form-control" id="floatingInput" placeholder="Email" aria-label="Email" name="email" onChange={setInformacoesForm} />
        <label htmlFor="floatingInput">Email</label>
      </div>
      <div className="input-group mb-3 form-floating text-center">
        <input type="password" className="form-control" id="floatingInput" placeholder="Senha" aria-label="Senha" name="password" onChange={setInformacoesForm} />
        <label htmlFor="floatingInput">Senha</label>
      </div>
      <div className="btn-group">
        <button type="submit" className="btn" id="btnSubmit" onClick={getCountTimeout()}>Login</button>
      </div>
      <div id="text-forgot-panel">
        <p className="text-center">
          {loginStatus === true
            ? `Logado, redirecionando em ` + count
            : loginStatus === false
              ? erro
              : ``}
        </p>
      </div>
    </form>
  );
}
export default LoginComponent;
