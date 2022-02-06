import React, { useState, useEffect } from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { customAlphabet } from 'nanoid';

// Import de API
import api from '../../pages/api';

import Navbar from '../../components/navbar/navbar';

// Import de CSS.
import '../cadCurso/cadCurso.css';
import '../../misc/animations.css';
import '../../misc/misc.css';
import { getUser } from '../auth';

const CadHoras = () => {
  // Variáveis declaradas.
  const [info, setInfo] = useState({});
  // Gets do banco.
  const [horasPegas, setHorasPegas] = useState([]);
  const [cursosPegos, setCursosPegos] = useState([]);
  const [coordenadoresPegos, setCoordPegos] = useState([]);

  // Sets para variáveis e usar na interface.
  const [selectedHora, setSelectedHora] = useState();
  const [selectedCurso, setSelectedCurso] = useState();
  const [text, setText] = useState("");
  // Mostrar uma certa interface
  const [showCadastro, setShowCadastro] = useState(true);
  const [showDeletar, setShowDeletar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);

  function setCadasto() {
    if (showCadastro === false) {
      setShowCadastro(true);
      setShowDeletar(false);
      setShowEditar(false);
    } else {
      setShowCadastro(false);
      setShowDeletar(false);
      setShowEditar(false);
    }
  }

  function setDeletar() {
    if (showDeletar === false) {
      setShowCadastro(false);
      setShowDeletar(true);
      setShowEditar(false);
    } else {
      setShowCadastro(false);
      setShowDeletar(false);
      setShowEditar(false);
    }
  }

  function setEditar() {
    if (showEditar === false) {
      setShowCadastro(false);
      setShowDeletar(false);
      setShowEditar(true);
    } else {
      setShowCadastro(false);
      setShowDeletar(false);
      setShowEditar(false);
    }
  }

  // Troca as informações do cadastro conforme seus valores e info pegada do usuário.
  const setInformacoes = (e) => {
    e.persist(e);
    setInfo(info => ({
      ...info,
      [e.target.name]: e.target.value
    })
    );
  };

  const setHora = (e) => {
    e.persist(e);
    setSelectedHora(e.target.value);
  }

  const setCurso = (e) => {
    e.persist(e);
    setSelectedCurso(e.target.value);
  }

  useEffect(() => {
    getCursos();
    getHoras();
    getCoordenadores();
  }, []);

  async function getCursos() {
    await api.get(`/curso/todos`).then(response => {
      setCursosPegos(response.data.cursos);
    });
  }

  async function getHoras() {
    await api.get(`/horas/todas`).then(response => {
      setHorasPegas(response.data.horas_complementares);
    });
  }

  async function getCoordenadores() {
    await api.get(`/coordenadores/`).then(response => {
      setCoordPegos(response.data.coordenadores);
    });
  }

  // Enviar o formulário para o servidor.
  async function HandleSubmit(e) {
    e.preventDefault();

    // Info do curso
    if (typeof info.nome_hora === 'undefined' || typeof info.carga_hora === 'undefined' || typeof selectedCurso === 'undefined') {
      setText("Preença as informações antes");
      return;
    }

    let nome_hora = info.nome_hora;
    let carga_hora = info.carga_hora;
    let limite_hora = info.limite_hora;
    let procentagem_hora = info.procentagem_hora;
    let nome_curso_hora = selectedCurso;
    let nome_r = "Sistema";

    console.table({ nome_hora, carga_hora, limite_hora, procentagem_hora, nome_curso_hora, nome_r });
    try {
      console.log("Registrando hora complementar...");

      api.post(`/horas/cadastrar`, {
        nome_hora, carga_hora, limite_hora, procentagem_hora, nome_curso_hora, nome_r
      }).then(response => {
        console.log(response.status, response.statusText);
        getCursos();
        getHoras();
        setText("Cadastro realizado!!");
      }).catch(err => {
        console.log(err);
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Enviar o formulário para o servidor.
  async function HandleSubmitEdit(e) {
    e.preventDefault();

    // Info do curso
    if (typeof info.nome_hora === 'undefined' || typeof info.carga_hora === 'undefined' || typeof selectedHora === 'undefined') {
      setText("Preença as informações antes");
      return;
    }
    let nome_hora_antiga = selectedHora;
    let nome_hora = info.nome_hora;
    let carga_hora = info.carga_hora;
    let limite_hora = info.limite_hora;
    let procentagem_hora = info.procentagem_hora;
    let nome_curso_hora = selectedCurso;
    let nome_r = "Sistema";

    console.table({nome_hora_antiga, nome_hora, carga_hora, limite_hora, procentagem_hora, nome_curso_hora, nome_r});

    try {
      console.log("Modificando hora complementar...");

      api.put(`/horas/editar`, {
        nome_hora_antiga, nome_hora, carga_hora, limite_hora, procentagem_hora, nome_curso_hora, nome_r
      }).then(response => {
        console.log(response.status, response.statusText);
        getCursos();
        getHoras();
        setText("Edição realizada!");
      }).catch(err => {
        console.log(err);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function HandleSubmitDelete(e) {
    e.preventDefault();

    // Info do usuário.
    if (typeof selectedHora === 'undefined' || selectedHora === '') {
      setText("Preença as informações antes");
      return;
    }
    // Info de usuário.
    let nome_hora = selectedHora;

    try {
      console.log("Registrando usuário...");
      let id_ = '';
      let nome_responsavel = '';
      let id_usuario = getUser();
      for (let value in coordenadoresPegos) {
        if (value.id_usuario_coord === id_usuario) {
          nome_responsavel = value.nome_coord;
          break;
        }
      }
  
      if(nome_responsavel === '' || nome_responsavel === undefined)
        nome_responsavel = 'Sistema';

      let obj = {
        nome_hora: nome_hora,
        nome_responsavel: nome_responsavel
      }
      console.table(obj);
      api.delete('/horas/deletar', {
        data: obj
      }).then(response => {
        console.log(response.status, response.statusText);
        setText("Hora complementar deletada!");
        getCursos();
        getHoras();
      }).catch(err => {
        console.log(err);
      });

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar pathname={"/admin/"} isAdmin={true} />
      <div id="main">
        <br></br>
        <div id="contain" className="container">
          <div className="nav-buttons">
            <button type="button" className="btn" data-bs-toggle="button" aria-pressed="true" id="toggleBtn" onClick={setCadasto}>Cadastro</button>
            <button type="button" className="btn" data-bs-toggle="button" aria-pressed="false" id="toggleBtn" onClick={setEditar}>Editar</button>
            <button type="button" className="btn" data-bs-toggle="button" aria-pressed="false" id="toggleBtn" onClick={setDeletar}>Deletar</button>
          </div>
          <div className={`${(showCadastro === false) ? "nodisplay" : "showdisplay cad-curso-register-wrapper animadoCimaParaBaixo"}`}>
            <div className="form-group">
              <form action="" id="registerForm" className="showdisplay animadoCimaParaBaixo">
                <h3 className="text-center noselect">Cadastro de Horas Complementares</h3>
                <div className="showdisplay animadoDireitaParaEsquerda">
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Descrição da hora complementar" aria-label="Descrição da hora complementar" name="nome_hora" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Descrição da hora complementar</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Carga horária" aria-label="Carga horária" name="carga_hora" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Carga horária</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Quantidade de alunos" aria-label="Limite de horas" name="limite_hora" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Limite de horas</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Porcentagem de horas a ser contada" aria-label="Porcentagem de horas a ser contada" name="procentagem_hora" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Porcentagem de horas a ser contada</label>
                  </div>
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="nome_curso_hora" onChange={setCurso}>
                      <option value={undefined}>Escolha um curso</option>
                      {
                        cursosPegos.map((element, index) => {
                          return (<option value={element.nome_curso} key={index}>{element.nome_curso}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="btn-group">
                    <button type="submit" className="btnSubmitApprove input-margin" onClick={HandleSubmit} data-bs-toggle="modal" data-bs-target="#msgModal2">Registrar Hora Complementar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={`${(showEditar === false) ? "nodisplay" : "showdisplay cad-curso-register-wrapper animadoCimaParaBaixo"}`}>
            <div className="form-group">
              <form action="" id="registerForm" className="showdisplay animadoCimaParaBaixo">
                <h3 className="text-center noselect">Editar Horas Complementares</h3>
                <div className="showdisplay animadoDireitaParaEsquerda">
                <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="nome_curso" onChange={setHora}>
                      <option value={undefined}>Selecione uma hora para Editar!</option>
                      {
                        horasPegas.map((element, index) => {
                          return (<option value={element.nome_hora} key={element.id_horas}>{element.nome_hora}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Descrição da hora complementar" aria-label="Descrição da hora complementar" name="nome_hora" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Descrição da hora complementar</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Carga horária" aria-label="Carga horária" name="carga_hora" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Carga horária</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Quantidade de alunos" aria-label="Limite de horas" name="limite_hora" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Limite de horas</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Porcentagem de horas a ser contada" aria-label="Porcentagem de horas a ser contada" name="procentagem_hora" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Porcentagem de horas a ser contada</label>
                  </div>
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="nome_curso_hora" onChange={setCurso}>
                      <option value={undefined}>Escolha um curso</option>
                      {
                        cursosPegos.map((element, index) => {
                          return (<option value={element.nome_curso} key={index}>{element.nome_curso}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="btn-group">
                    <button type="submit" className="btnSubmit input-margin" onClick={HandleSubmitEdit} data-bs-toggle="modal" data-bs-target="#msgModal2">Salvar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={`${(showDeletar === false) ? "nodisplay" : "showdisplay cad-curso-register-wrapper animadoCimaParaBaixo"}`}>
            <div className="form-group">
              <form action="" id="registerForm" className="showdisplay animadoCimaParaBaixo">
                <h3 className="text-center noselect">Deletar Horas Complementares</h3>
                <div className="showdisplay animadoDireitaParaEsquerda">
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="nome_hora" onChange={setHora}>
                      <option value={undefined}>Selecione uma hora complementar para deletar!</option>
                      {
                        horasPegas.map((element, index) => {
                          return (<option value={element.nome_hora} key={element.nome_hora}>{element.nome_hora}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="btn-group">
                    <button type="submit" className="btnSubmitClose input-margin" onClick={HandleSubmitDelete} data-bs-toggle="modal" data-bs-target="#msgModal2">Deletar</button>
                  </div>
                </div>

              </form>
            </div>
          </div>

        </div>
        <div className="modal fade" id="msgModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">CACIC - V.H.O.U.</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                {text}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btnSubmitClose" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CadHoras;