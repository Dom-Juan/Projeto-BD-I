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
  // Variáveis de controle de mostrar opções para o usuário.
  const [showEditUser, setEditUser] = useState(true);
  const [showEditPSW, setEditPSW] = useState(false);
  const [showEditName, setEditName] = useState(false);
  // Variáveis de manipulação do sistema.
  const [text, setText] = useState();
  const [user, setUser] = useState();
  const [aluno, setAluno] = useState();
  const [coord, setCoord] = useState();

  useEffect(() => {
    getUserEdit();
    getAluno();
  }, []);

  const formatYmd = date => date.toISOString().slice(0, 10);

  async function getUserEdit() {
    let id = getUser();
    await api.get('/user/id', {
      params: {
        id_usuario: id,
      }
    }).then(response => {
      setUser(response.data);
    }).catch(err => {
      console.log(err);
    });
  }

  async function getAluno() {
    let id = getUser();
    await api.get('/aluno/id', {
      params: {
        id_aluno_usuario: id,
      }
    }).then(response => {
      let obj = response.data;
      obj.ano_nascimento_aluno = formatYmd(new Date(obj.ano_nascimento_aluno));
      setAluno(obj);
    }).catch(err => {
      console.log(err);
    });
  }

  const onSubmitResetPSW = (event) => {
    let dataParaOBanco = {};
    let dataForm = new FormData(event.currentTarget);
    event.preventDefault();
    for (let [key, value] of dataForm.entries()) {
      dataParaOBanco[key] = value;
    }
    dataParaOBanco["id_usuario"] = user.id_usuario;
    dataParaOBanco["nome_usuario"] = user.nome_usuario;
    if (dataParaOBanco["senha"] !== '' && dataParaOBanco["confirme_senha"] !== '')
      if (dataParaOBanco["senha"] === dataParaOBanco["confirme_senha"]) {
        try {

          api.put('/user/trocar/senha',
            dataParaOBanco
          ).then(response => {
            console.log(response.status, response.statusText);
          }).catch(err => {
            console.log(err);
          });
          setText("Senha trocada com sucesso!");
        } catch (error) {
          console.error(error);
          setText(error.msg);
        }
      } else {
        setText("Verifique se as senhas coicidem!");
      }
    else setText("Preencha os dados nos campos necessários!");
  }

  const onSubmitChangeName = (event) => {
    event.preventDefault();
    let dataParaOBanco = {};
    let dataForm = new FormData(event.currentTarget);
    for (let [key, value] of dataForm.entries()) {
      dataParaOBanco[key] = value;
    }
    dataParaOBanco["id_usuario"] = user.id_usuario;
    if (dataParaOBanco["nome_usuario"] !== '' && dataParaOBanco["email_usuario"] !== '') {
      try {

        api.put('/user/trocar/email',
          dataParaOBanco
        ).then(response => {
          console.log(response.status, response.statusText);
        }).catch(err => {
          console.log(err);
        });
        setText("Email e nome trocado com sucesso!");
        getAluno();
        getUser();
      } catch (error) {
        console.error(error);
        setText(error.msg);
      }
    } else {
      setText("Preencha os dados nos campos necessários!");
    }
  }

  const onSubmitChangeUserConfig = (event) => {
    event.preventDefault();
    let dataParaOBanco = {};
    let dataForm = new FormData(event.currentTarget);
    for (let [key, value] of dataForm.entries()) {
      console.log(key, value);
      dataParaOBanco[key] = value;
    }
    dataParaOBanco["id_usuario"] = user.id_usuario;
    console.log(dataParaOBanco);

    if (dataParaOBanco["ra_aluno"] !== '' && dataParaOBanco["nome_aluno"] !== '' && dataParaOBanco["nome_ent_acad_aluno"] !== '' && dataParaOBanco["ano_nascimento_aluno"] !== '') {
      try {
        api.put('/aluno/editar',
          dataParaOBanco
        ).then(response => {
          console.log(response.status, response.statusText);
        }).catch(err => {
          console.log(err);
        });
        setText("Informações trocadas com sucesso trocadas com sucesso!");
        getAluno();
        getUser();
      } catch (error) {
        console.error(error);
        setText(error.msg);
      }
    } else {
      setText("Verifique se as informações foram preenchidas!");
    }
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
        <Navbar pathname={"/dashboard/"}></Navbar>
        <div className="container">
          <div className='row'>
            <div className="col-md-4 list-menu-options">
              <div className="list-menu list-group" id="list-tab" role="tablist">
                <h3>Olá { aluno === undefined ? "Usuário" : aluno.nome_aluno }</h3>
                <button className="list-menu-item list-group-item list-group-item-action noselect" onClick={() => setShowEditUser()} data-bs-toggle="list" href="#profile" role="tab" aria-controls="Editar o perfil">Editar o perfil</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" onClick={() => setShowEditPSW()} data-bs-toggle="list" href="#password" role="tab" aria-controls="Trocar a senha">Trocar a senha</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" onClick={() => setShowEditName()} data-bs-toggle="list" href="#password" role="tab" aria-controls="Trocar a senha">Trocar o email ou nome de usuário</button>
              </div>
            </div>
            <div className="col-md-4 list-menu-options">
              <ul className="list-group">
                <label>Aluno</label>
                <li className="list-group-item">RA: { aluno === undefined ? "" : aluno.ra_aluno }</li>
                <li className="list-group-item">Nome: { aluno === undefined ? "" : aluno.nome_aluno }</li>
                <li className="list-group-item">Data de nascimento: { aluno === undefined ? "" : aluno.ano_nascimento_aluno }</li>
                <li className="list-group-item">Entidade Acadêmica: { aluno === undefined ? "" : aluno.nome_ent_acad_aluno }</li>
              </ul>
            </div>
            <div className="col-md-4 list-menu-options">
              <ul className="list-group">
                <label>Usuário</label>
                <li className="list-group-item">Email: { user === undefined ? "" : user.email_usuario }</li>
                <li className="list-group-item">Usuário: { user === undefined ? "" : user.nome_usuario }</li>
                <li className="list-group-item">Curso: { user === undefined ? "" : user.curso }</li>
              </ul>
            </div>
          </div>
          <div className="row space">
            <div className={`${(showEditUser === false) ? "nodisplay" : "showdisplay animadoCimaParaBaixo"}`}>
              {
                (props.isCoord === true ?
                  <form className="edit-contain" onSubmit={onSubmitChangeUserConfig} method="post" encType="multipart/form-data">
                    <h2 id="edit-title" className='noselect'>Editar usuário - Coordenador</h2>
                    <hr />
                    <div className="wrapper container">
                      <div className="row">
                        <div className="col input-group mb-3">
                          <label>Nome do coordenador</label>
                          <input className="editInput" type="text" name="nome_coord"></input>
                        </div>
                        <div className="col input-group mb-3">
                          <label>Nome da entidade academina</label>
                          <input className="editInput" type="text" name="nome_ent_acad_coord"></input>
                        </div>
                      </div>
                    </div>
                    <div className='wrapper container'>
                      <div className='row'>
                        <div className="col input-group mb-3">
                          <label>Data como coordenador</label>
                          <input className="editInput" type="date" name="data_como_coord"></input>
                        </div>
                      </div>
                    </div>
                    <div className="btn-area">
                      <button type="submit" className="btnSubmit">Salvar</button>
                    </div>
                  </form>
                  :
                  <form className="edit-contain" onSubmit={onSubmitChangeUserConfig} method="post" encType="multipart/form-data">
                    <h2 id="edit-title" className='noselect'>Editar usuário - Aluno</h2>
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
                      <button type="submit" className="btnSubmit" data-bs-toggle="modal" data-bs-target="#responseModal">Salvar</button>
                    </div>
                  </form>)
              }
            </div>
            <div className={`${(showEditPSW === false) ? "nodisplay" : "showdisplay animadoCimaParaBaixo"}`}>
              <form className="edit-contain" onSubmit={onSubmitResetPSW} method="post" encType="multipart/form-data">
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
                  <button type="submit" className="btnSubmit" data-bs-toggle="modal" data-bs-target="#responseModal">Salvar</button>
                </div>
              </form>
            </div>

            <div className={`${(showEditName === false) ? "nodisplay" : "showdisplay animadoCimaParaBaixo"}`}>
              <form className="edit-contain" onSubmit={onSubmitChangeName} method="post" encType="multipart/form-data">
                <h2 id="edit-title" className='noselect'>Trocar Nome de usuário ou Email</h2>
                <hr />
                <div className="wrapper container">
                  <div className="row">
                    <div className="col-md input-group mb-3">
                      <label>Nome do usuário</label>
                      <input className="editInput" type="name" name="nome_usuario"></input>
                    </div>
                    <div className="col-md input-group mb-3">
                      <label>Email</label>
                      <input className="editInput" type="email" name="email_usuario"></input>
                    </div>
                  </div>
                </div>
                <div className="btn-area">
                  <button type="submit" className="btnSubmit" data-bs-toggle="modal" data-bs-target="#responseModal">Salvar</button>
                </div>
              </form>
            </div>
            <div className="modal fade" id="responseModal" tabIndex="-1" aria-labelledby="responseModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <h5 className="modal-title text-center" id="responseModalLabel">{text}</h5>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btnSubmitClose" data-bs-dismiss="modal">Fechar</button>
                  </div>
                </div>
              </div>
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