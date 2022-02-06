import React, { useState, useEffect } from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { customAlphabet } from 'nanoid';

// Import de API
import api from '../../pages/api';

import Navbar from '../../components/navbar/navbar';

// Import de CSS.
import './cadCurso.css';
import '../../misc/animations.css';
import '../../misc/misc.css';
import { getUser } from '../auth';

const nanoid = customAlphabet('1234567890', 3);

const CadCurso = () => {
  // Variáveis declaradas.
  const [info, setInfo] = useState({});
  // Gets do banco.
  const [cursosPegos, setCursosPegos] = useState([]);
  const [coordenadoresPegos, setCoordenadoresPegas] = useState([]);
  // Sets para variáveis e usar na interface.
  const [selectedCoordenador, setSelectedCoordenador] = useState();
  const [selectedCurso,   setSelectedCurso] = useState();
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

  const setCoordenador = (e) => {
    e.persist(e);
    setSelectedCoordenador(e.target.value);
  }

  const setCurso = (e) => {
    e.persist(e);
    setSelectedCurso(e.target.value);
  }

  useEffect(() => {
    getCursos();
    getCoordenadores();
  }, []);

  async function getCursos() {
    await api.get(`/curso/todos`).then(response => {
      setCursosPegos(response.data.cursos);
    });
  }

  async function getCoordenadores() {
    await api.get(`/coordenadores/`).then(response => {
      console.log(response.data.coordenadores);
      setCoordenadoresPegas(response.data.coordenadores);
    });
  }

  // Enviar o formulário para o servidor.
  async function HandleSubmit(e) {
    e.preventDefault();

    // Info do curso
    if (typeof info.nome_curso === 'undefined' || typeof info.ano_curso === 'undefined' || typeof selectedCoordenador === 'undefined') {
      setText("Preença as informações antes");
      return;
    }

    let nome_curso = info.nome_curso;
    let ano_curso = info.ano_curso;
    let coordenador_curso = selectedCoordenador;
    let tipo_curso = info.tipo_curso;
    let nome_responsavel = "Sistema";
    console.table({ nome_curso, ano_curso, coordenador_curso, tipo_curso, nome_responsavel });
    try {
      console.log("Registrando usuário...");

      api.post(`/curso/cadastrar`, {
        nome_curso, ano_curso, coordenador_curso, tipo_curso, nome_responsavel
      }).then(response => {
        console.log(response.status, response.statusText);
        getCursos();
      }).catch(err => {
        console.log(err);
      });
      setText("Cadastro realizado!!");
    } catch (error) {
      console.error(error);
    }
  }

  // Enviar o formulário para o servidor.
  async function HandleSubmitEdit(e) {
    e.preventDefault();

    // Info do curso
    if (typeof info.nome_curso === 'undefined' || typeof info.ano_curso === 'undefined' || typeof selectedCoordenador === 'undefined') {
      setText("Preença as informações antes");
      return;
    }
    let nome_curso_antigo = selectedCurso;
    let nome_curso = info.nome_curso;
    let ano_curso = info.ano_curso;
    let coordenador_curso = selectedCoordenador;
    let tipo_curso = info.tipo_curso;
    let nome_responsavel = "Sistema";
    console.table({ nome_curso_antigo, nome_curso, ano_curso, coordenador_curso, tipo_curso, nome_responsavel });
    try {
      console.log("Registrando usuário...");

      api.put(`/curso/editar`, {
        nome_curso_antigo, nome_curso, ano_curso, coordenador_curso, tipo_curso, nome_responsavel
      }).then(response => {
        console.log(response.status, response.statusText);
        getCursos();
      }).catch(err => {
        console.log(err);
      });
      setText("Dados alterados!");
    } catch (error) {
      console.error(error);
    }
  }

  async function HandleSubmitDelete(e) {
    e.preventDefault();

    // Info de usuário.
    let nome_curso = selectedCurso;
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

    try {
      console.log("Deletando curso...");
      console.log(nome_curso, nome_responsavel);

      let obj = {
        nome_curso: nome_curso,
        nome_responsavel: nome_responsavel
      }

      api.delete('/curso/deletar',
      {
        data: obj
      }).then(response => {
        console.log(response.status, response.statusText);
        setText("Curso deletado!!");
        getCursos();
        getCoordenadores();
      }).catch(err => {
        console.log(err);
        setText("Erro ao deletar");
      });
    } catch (error) {
      console.error(error.message);
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
                <h3 className="text-center noselect">Cadastro de Cursos</h3>
                <div className="showdisplay animadoDireitaParaEsquerda">
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="show_curso">
                      <option value={undefined}>Ver cursos existentes</option>
                      {
                        cursosPegos.map((element, index) => {
                          return (<option value={element.nome_curso} key={index}>{element.nome_curso}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Nome do curso" aria-label="Usuário" name="nome_curso" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Nome do curso</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="date" className="form-control" id="floatingInput" placeholder="Ano de criação do curso." aria-label="Ano de criação do curso." name="ano_curso" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Ano do curso</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Tipo curso" aria-label="Tipo curso" name="tipo_curso" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Tipo curso</label>
                  </div>
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="coordenador_curso" onChange={setCoordenador}>
                      <option value={undefined}>Escolha um coordenador</option>
                      {
                        coordenadoresPegos.map((element, index) => {
                          return (<option value={element.nome_coord} key={index}>{element.nome_coord}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="btn-group">
                    <button type="submit" className="btnSubmitApprove input-margin" onClick={HandleSubmit} data-bs-toggle="modal" data-bs-target="#msgModal2">Registrar Curso</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className={`${(showEditar === false) ? "nodisplay" : "showdisplay cad-curso-register-wrapper animadoCimaParaBaixo"}`}>
            <div className="form-group">
              <form action="" id="registerForm" className="showdisplay animadoCimaParaBaixo">
                <h3 className="text-center noselect">Editar Curso</h3>
                <div className="showdisplay animadoDireitaParaEsquerda">
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="nome_curso" onChange={setCurso}>
                      <option value={undefined}>Selecione um curso para editar!</option>
                      {
                        cursosPegos.map((element, index) => {
                          return (<option value={element.nome_curso} key={index}>{element.nome_curso}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Nome do curso" aria-label="Usuário" name="nome_curso" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Nome do curso</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="date" className="form-control" id="floatingInput" placeholder="Ano de criação do curso." aria-label="Ano de criação do curso." name="ano_curso" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Ano do curso</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Tipo curso" aria-label="Tipo curso" name="tipo_curso" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Tipo curso</label>
                  </div>
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="coordenador_curso" onChange={setCoordenador}>
                      <option value={undefined}>Escolha um coordenador</option>
                      {
                        coordenadoresPegos.map((element, index) => {
                          return (<option value={element.nome_coord} key={index}>{element.nome_coord}</option>);
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
                <h3 className="text-center noselect">Deletar Curso</h3>
                <div className="showdisplay animadoDireitaParaEsquerda">
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="nome_curso" onChange={setCurso}>
                      <option value={undefined}>Selecione um curso para deletar!</option>
                      {
                        cursosPegos.map((element, index) => {
                          return (<option value={element.nome_curso} key={element.nome_curso}>{element.nome_curso}</option>);
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
};
export default CadCurso;