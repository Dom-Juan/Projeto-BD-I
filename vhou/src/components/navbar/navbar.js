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
import MenuImg from '../../assets/navbar/menu.svg';

const Navbar = (props) => {
  const [count, setCount] = useState(6);

  const handleLogout = () => {
    setTimeout(() => {
      setCount(count - 1);
      logout();
      history.push("/login");
    }, 6000);
  }

  const handleGoToMenu = (e) => {
    history.push("/menuAdmin");
  }

  const handleGoToCadCoord = (e) => {
    history.push("/cadastro/coordenadores");
  }

  const handleGoToCadCurso = (e) => {
    history.push("/cadastro/curso");
  }

  const handleGoToCadEntAcad = (e) => {
    history.push("/cadastro/entidades-academicas");
  }

  const handleGoToCadHoraComp = (e) => {
    history.push("/cadastro/horas-complementares");
  }

  let history = useHistory();

  if (props.isAdmin === true) {
    return (
      <nav className="navbar navbar-expand-lg nav-menu noselect">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Ative a navegação.">
            <span className="menu-color"><img src={MenuImg} alt="" /></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <a className="navbar-brand text-center" href="#CACIC">Cacic</a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link type="button" className="nav-link" to={{ pathname: "/menuAdmin" }} onClick={handleGoToMenu}>Menu de Atividades</Link>
              </li>
              <li className="nav-item">
                <Link type="button" className="nav-link" to={{ pathname: "/cadastro/coordenadores" }} onClick={handleGoToCadCoord}>Cadastrar Coordenadores</Link>
              </li>
              <li className="nav-item">
                <Link type="button" className="nav-link" to={{ pathname: "/cadastro/curso" }} onClick={handleGoToCadCurso}>Cadastrar Curso</Link>
              </li>
              <li className="nav-item">
                <Link type="button" className="nav-link" to={{ pathname: "/cadastro/entidades-academicas" }} onClick={handleGoToCadEntAcad}>Cadastrar Entidades acadêmicas</Link>
              </li>
              <li className="nav-item">
                <Link type="button" className="nav-link" to={{ pathname: "/cadastro/horas-complementares" }} onClick={handleGoToCadHoraComp}>Cadastrar Horas Complementares</Link>
              </li>
              <li className="nav-item">
                <Link type="button" className="nav-link" to={{ pathname: props.pathname }} replace onClick={handleLogout} data-bs-toggle="modal" data-bs-target="#msgModal">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
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
  } else {
    return (
      <nav className="navbar navbar-expand-lg nav-menu noselect">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Ative a navegação.">
            <span className="menu-color"><img src={MenuImg} alt="" /></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <a className="navbar-brand text-center" href="#CACIC">Cacic</a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link type="button" className="nav-link" to={{ pathname: "/menu" }} onClick={handleGoToMenu}>Menu de Atividades</Link>
              </li>
              <li className="nav-item">
                <Link type="button" className="nav-link" to={{ pathname: props.pathname }} replace onClick={handleLogout} data-bs-toggle="modal" data-bs-target="#msgModal">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
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
}
export default Navbar;