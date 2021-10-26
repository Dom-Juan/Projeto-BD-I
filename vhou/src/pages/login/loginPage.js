import React, {Component } from 'react';

// Import de libs de react.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Import de Components.
import LoginComponent from '../../components/login/login';
import RegisterComponent from '../../components/register/register';
import ForgotPsdComponent from '../../components/forgotPassword/forgotPassword';

// Import de API.
// TODO.

// Import de CSS.
import '../../components/login/login.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showLogin: true,
      showCad: false,
      showForgot: false,
      loginStatus: false,
      erro: false,
    }

    this.addLogin = this.addLogin.bind(this);
    this.addRegister = this.addRegister.bind(this);
    this.addForgotPsd = this.addForgotPsd.bind(this);
  }

  addLogin() {
    if (this.state.showLogin === true) {
      this.state.showCad === false ? this.setState({ showLogin: true,}) : this.setState({  showForgot: false, showCad: false });
    } else {
      this.setState({ showLogin: true,  showForgot: false, showCad: false });
    }
  }

  addRegister() {
    if (this.state.showCad === true) {
      this.state.showLogin === false ? this.setState({ showCad: true }) : this.setState({ showLogin: false, showForgot: false });
    } else {
      this.setState({ showCad: true, showLogin: false, showForgot: false});
    }
  }

  addForgotPsd() {
    if (this.state.showForgot === true) {
      (this.state.showLogin === false || this.state.showCad === false) ? this.setState({ showForgot: true }) : this.setState({ showCad: false, showLogin: false });
    } else {
      this.setState({ showCad: false, showLogin: false, showForgot: true});
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
                <button type="button" className="btn" data-bs-toggle="button" aria-pressed="true" onClick={this.addLogin} id="toggleBtn">Login</button>
                <button type="button" className="btn" data-bs-toggle="button" aria-pressed="false" onClick={this.addRegister} id="toggleBtn">Cadastro</button>
              </div>
              <div className="form-group">
                <LoginComponent showLogin={this.state.showLogin} pathname={"/menu/"}></LoginComponent>
                <RegisterComponent showCad={this.state.showCad}></RegisterComponent>
                <ForgotPsdComponent showForgot={this.state.showForgot}></ForgotPsdComponent>
              </div>
              <div id="forgot-panel">
                <a className="forgot-password text-center noselect" onClick={this.addForgotPsd} href="#forgot">Já possui cadastro e esqueceu a senha ?</a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
