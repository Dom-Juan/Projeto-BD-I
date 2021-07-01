import React from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';

// Import de API
// TODO.

// Import de CSS.
import './login.css';
import '../../misc/animations.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showLogin: true,
      showCad: false,
    }

    this.addLogin = this.addLogin.bind(this);
    this.addRegister = this.addRegister.bind(this);
  }

  addLogin() {
    if(this.state.showLogin === true) {
      if(this.state.showCad === false){
        this.setState({showLogin: true});
      } else {
        this.setState({showLogin: false});
      }
    } else {
      this.setState({showLogin: true});
      this.setState({showCad: false});
    }
  }

  addRegister() {
    if(this.state.showCad === true) {
      if(this.state.showLogin === false) {
        this.setState({showCad: true});
      } else {
        this.setState({showCad: false});
      }
    } else {
      this.setState({showCad: true});
      this.setState({showLogin: false});
    }
  }

  render() {
    return (
      <>
        <div id="main">
          <div className="blur-section">a</div>
          <h1 className="text-center login-title noselect">Visualizador de horas online universitário Cacic</h1>
          <div id="contain" className="container">
            <div className="login-register-wrapper animadoCimaParaBaixo">
              <div className="nav-buttons">
                <button type="button" className="btn" onClick={this.addLogin} id="toggleBtn">Login</button>
                <button type="button" className="btn" onClick={this.addRegister} id="toggleBtn">Cadastro</button>
              </div>
              <div className="form-group">
                <form action="" id="loginForm" className={`${(this.state.showLogin === false) ? "nodisplay" : "showdisplay"}`}>
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
                    <button type="button" className="btn" id="btnSubmit">Login</button>
                  </div>
                </form>
                <form action="" id="registerForm animadoDireitaParaEsquerda" className={`${(this.state.showCad === false) ? "nodisplay" : "showdisplay"}`}>
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
                    <button type="button" className="btn" id="btnSubmit">Registrar-se</button>
                  </div>
                </form>
              </div>
              <div id="forgot-panel">

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default Login;
