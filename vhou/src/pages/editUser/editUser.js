import React, { useState, useEffect } from 'react';

// Import de libs de react
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Import de componentes
import Navbar from '../../components/navbar/navbar';

// Import de API
import api from '../../pages/api';
import { getUser } from '../../pages/auth';

// Import de CSS.
import '../../misc/misc.css';
import './editUser.css';
import '../../misc/animations.css';

const EditUser = (props) => {
  const [showEditUser, setEditUser] = useState(true);
  const [showEditPSW, setEditPSW] = useState(false);
  const [showEditName, setEditName] = useState(false);

  useEffect(() => {
    getUser();
    getAluno();
  }, []);

  async function getUser() {
    //todo.
  }

  async function getAluno() {
    //todo.
  }

  function setShowEditUser() {
    if (showEditUser === false) {
      setEditUser(true);
      setEditPSW(false);
      setEditName(false);
    } else {
      setEditUser(false);
      setEditPSW(false);
      setEditName(false);
    }
  }

  function setShowEditPSW() {
    if (showEditPSW === false) {
      setEditUser(false);
      setEditPSW(true);
      setEditName(false);
    } else {
      setEditUser(false);
      setEditPSW(false);
      setEditName(false);
    }
  }

  function setShowEditName() {
    if (showEditPSW === false) {
      setEditUser(false);
      setEditPSW(false);
      setEditName(true);
    } else {
      setEditUser(false);
      setEditPSW(false);
      setEditName(false);
    }
  }

  return (
    <div>
      <div id="main-edit">
        <Navbar></Navbar>
        <div className="container">
          <div className='row'>
            <div className="col-md-4 list-menu-options">
              <div className="list-menu list-group" id="list-tab" role="tablist">
                <h3>Olá Pessoa</h3>
                <button className="list-menu-item list-group-item list-group-item-action noselect" onClick={() => setShowEditUser()} data-bs-toggle="list" href="#profile" role="tab" aria-controls="Editar o perfil">Editar o perfil</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" onClick={() => setShowEditPSW()} data-bs-toggle="list" href="#password" role="tab" aria-controls="Trocar a senha">Trocar a senha</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" onClick={() => setShowEditName()} data-bs-toggle="list" href="#password" role="tab" aria-controls="Trocar a senha">Trocar o email ou nome de usuário</button>
              </div>
            </div>
          </div>
          <div className="row space">
            <div className={`${(showEditUser === false) ? "nodisplay" : "showdisplay animadoCimaParaBaixo"}`}>
              <form className="edit-contain">
                <h2 id="edit-title" className='noselect'>Editar usuário</h2>
                <hr />
                <div className="wrapper container">
                  <div className="row">
                    <div className="col input-group mb-3">
                      <label>RA Aluno</label>
                      <input className="editInput" type="text" name="ra_aluno"></input>
                    </div>
                    <div className="col input-group mb-3">
                      <label>Nome da entidade academina</label>
                      <input className="editInput" type="text" name="nome_ent_acad_aluno"></input>
                    </div>
                  </div>
                </div>
                <div className='wrapper container'>
                  <div className='row'>
                    <div className="col input-group mb-3">
                      <label>Nome</label>
                      <input className="editInput" type="text" name="nome_aluno"></input>
                    </div>
                    <div className="col input-group mb-3">
                      <label>Data de nascimento</label>
                      <input className="editInput" type="date" name="ano_nascimento_aluno"></input>
                    </div>
                  </div>
                </div>
                <div className="btn-area">
                  <button type="submit" className="btnSubmit">Salvar</button>
                </div>
              </form>
            </div>
            <div className={`${(showEditPSW === false) ? "nodisplay" : "showdisplay animadoCimaParaBaixo"}`}>
              <form className="edit-contain">
                <h2 id="edit-title" className='noselect'>Resetar senha</h2>
                <hr />
                <div className="wrapper container">
                  <div className="row">
                    <div className="col-md input-group mb-3">
                      <label>Senha</label>
                      <input className="editInput" type="password" name="senha"></input>
                    </div>
                    <div className="col-md input-group mb-3">
                      <label>Confirme a senha</label>
                      <input className="editInput" type="password" name="confirme_senha"></input>
                    </div>
                  </div>
                </div>
                <div className="btn-area">
                  <button type="submit" className="btnSubmit">Salvar</button>
                </div>
              </form>
            </div>

            <div className={`${(showEditName === false) ? "nodisplay" : "showdisplay animadoCimaParaBaixo"}`}>
              <form className="edit-contain">
                <h2 id="edit-title" className='noselect'>Trocar Nome de usuário ou Email</h2>
                <hr />
                <div className="wrapper container">
                  <div className="row">
                    <div className="col-md input-group mb-3">
                      <label>Nome do usuário</label>
                      <input className="editInput" type="password" name="nome_usuario"></input>
                    </div>
                    <div className="col-md input-group mb-3">
                      <label>Email</label>
                      <input className="editInput" type="password" name="email_usuario"></input>
                    </div>
                  </div>
                </div>
                <div className="btn-area">
                  <button type="submit" className="btnSubmit">Salvar</button>
                </div>
              </form>
            </div>
          </div>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default EditUser;