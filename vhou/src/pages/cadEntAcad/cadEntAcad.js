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

const CadEntAcad = () => {
  // Variáveis declaradas.
  const [info, setInfo] = useState({});
  // Gets do banco.
  const [entidadePegas, setEntidadePegas] = useState([]);
  const [cursosPegos, setCursosPegos] = useState([]);

  // Sets para variáveis e usar na interface.
  const [selectedEntAcad, setSelectedEntAcad] = useState();
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

  const setEntAcad = (e) => {
    e.persist(e);
    setSelectedEntAcad(e.target.value);
    console.log(selectedEntAcad);
  }

  const setCurso = (e) => {
    e.persist(e);
    setSelectedCurso(e.target.value);
    console.log(selectedCurso);
  }

  useEffect(() => {
    getCursos();
    getEntidades();
  }, []);

  async function getCursos() {
    await api.get(`/curso/todos`).then(response => {
      setCursosPegos(response.data.cursos);
    });
  }

  async function getEntidades() {
    await api.get(`/entidade/todas`).then(response => {
      setEntidadePegas(response.data.entidades);
    });
  }

  // Enviar o formulário para o servidor.
  async function HandleSubmit(e) {
    e.preventDefault();

    // Info do curso
    if (typeof info.nome_ent_acad === 'undefined' || typeof info.ano_abertura_acad === 'undefined' || typeof selectedCurso === 'undefined') {
      setText("Preença as informações antes");
      return;
    }

    let nome_ent_acad = info.nome_ent_acad;
    let ano_abertura_acad = info.ano_abertura_acad;
    let curso_ent_acad = selectedCurso;
    let quant_alunos_acad = info.quant_alunos_acad;
    let quant_horas_avaliar_acad = info.quant_horas_avaliar_acad;
    let nome_responsavel = "Sistema";
    console.table({ nome_responsavel, nome_ent_acad, ano_abertura_acad, curso_ent_acad, quant_alunos_acad, quant_horas_avaliar_acad });
    try {
      console.log("Registrando entidade academica...");

      // Colocando na rota que cria um usuário primeiro e depois um coordenador.
      api.post(`/entidade/cadastrar`, { // post enviando um pedido de post para o server.
        nome_ent_acad, ano_abertura_acad, curso_ent_acad, quant_alunos_acad, quant_horas_avaliar_acad, nome_responsavel
      }).then(response => {
        console.log(response.status, response.statusText);
        getCursos();
        getEntidades();
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
    if (typeof info.nome_ent_acad === 'undefined' || typeof info.ano_abertura_acad === 'undefined' || typeof selectedEntAcad === 'undefined') {
      setText("Preença as informações antes");
      return;
    }
    let nome_antigo_acad = selectedCurso;
    let nome_ent_acad = info.nome_ent_acad;
    let ano_abertura_acad = info.ano_abertura_acad;
    let curso_ent_acad = selectedCurso;
    let quant_alunos_acad = info.quant_alunos_acad;
    let quant_horas_avaliar_acad = info.quant_horas_avaliar_acad;
    let nome_responsavel = "Sistema";
    console.table({ nome_responsavel, nome_ent_acad, ano_abertura_acad, curso_ent_acad, quant_alunos_acad, quant_horas_avaliar_acad });
    try {
      console.log("Modificando entidade...");

      api.put(`/entidade/editar`, { // post enviando um pedido de post para o server.
        nome_responsavel, nome_ent_acad, ano_abertura_acad, curso_ent_acad, quant_alunos_acad, quant_horas_avaliar_acad, nome_antigo_acad
      }).then(response => {
        console.log(response.status, response.statusText);
        getCursos();
        getEntidades();
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
    if (typeof selectedEntAcad === 'undefined' || selectedEntAcad === '') {
      setText("Preença as informações antes");
      return;
    }
    // Info de usuário.
    let nome_ent_acad = selectedEntAcad;

    try {
      console.log("Registrando usuário...");

      // Colocando na rota que cria um usuário primeiro e depois um coordenador.

      let obj = {
        nome_ent_acad: nome_ent_acad,
      }

      api.delete('/entidade/deletar', {
        data: obj
      }).then(response => {
        console.log(response.status, response.statusText);
        setText("Entidade deletada!");
        getCursos();
        getEntidades();
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
                <h3 className="text-center noselect">Cadastro de Entidade Acadêmica</h3>
                <div className="showdisplay animadoDireitaParaEsquerda">
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="show_entidade">
                      <option value={undefined}>Ver entidades existentes</option>
                      {
                        entidadePegas.map((element, index) => {
                          return (<option value={element.nome_ent_acad} key={index}>{element.nome_ent_acad}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Nome do entidade" aria-label="Nome da entidade" name="nome_ent_acad" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Nome da entidade acadêmica</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="date" className="form-control" id="floatingInput" placeholder="Ano de criação do curso." aria-label="Ano de criação do curso." name="ano_abertura_acad" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Ano do curso</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Quantidade de alunos" aria-label="Quantidade de alunos" name="quant_alunos_acad" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Quantidade de alunos</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Quantidade de horas" aria-label="Quantidade de horas" name="quant_horas_avaliar_acad" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Quantidade de horas totais a ser feita por aluno</label>
                  </div>
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="curso_ent_acad" onChange={setCurso}>
                      <option value={undefined}>Escolha um curso</option>
                      {
                        cursosPegos.map((element, index) => {
                          return (<option value={element.nome_curso} key={index}>{element.nome_curso}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="btn-group">
                    <button type="submit" className="btnSubmitApprove input-margin" onClick={HandleSubmit} data-bs-toggle="modal" data-bs-target="#msgModal2">Registrar entidade</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={`${(showEditar === false) ? "nodisplay" : "showdisplay cad-curso-register-wrapper animadoCimaParaBaixo"}`}>
            <div className="form-group">
              <form action="" id="registerForm" className="showdisplay animadoCimaParaBaixo">
                <h3 className="text-center noselect">Editar Entidade Acadêmica</h3>
                <div className="showdisplay animadoDireitaParaEsquerda">
                  <select className="form-select c-input" aria-label="Escolha o seu curso" name="nome_curso" onChange={setEntAcad}>
                    <option value={undefined}>Selecione uma entidade para editar!</option>
                    {
                      entidadePegas.map((element, index) => {
                        return (<option value={element.nome_ent_acad} key={index}>{element.nome_ent_acad}</option>);
                      })
                    }
                  </select>
                </div>
                <div className="input-group mb-3 form-floating">
                  <input type="text" className="form-control" id="floatingInput" placeholder="Nome do entidade" aria-label="Nome da entidade" name="nome_ent_acad" onChange={setInformacoes} />
                  <label htmlFor="floatingInput">Nome da entidade acadêmica</label>
                </div>
                <div className="input-group mb-3 form-floating">
                  <input type="date" className="form-control" id="floatingInput" placeholder="Ano de criação do curso." aria-label="Ano de criação do curso." name="ano_abertura_acad" onChange={setInformacoes} />
                  <label htmlFor="floatingInput">Ano do curso</label>
                </div>
                <div className="input-group mb-3 form-floating">
                  <input type="text" className="form-control" id="floatingInput" placeholder="Quantidade de alunos" aria-label="Quantidade de alunos" name="quant_alunos_acad" onChange={setInformacoes} />
                  <label htmlFor="floatingInput">Quantidade de alunos</label>
                </div>
                <div className="input-group mb-3 form-floating">
                  <input type="text" className="form-control" id="floatingInput" placeholder="Quantidade de horas" aria-label="Quantidade de horas" name="quant_horas_avaliar_acad" onChange={setInformacoes} />
                  <label htmlFor="floatingInput">Quantidade de horas totais a ser feita por aluno</label>
                </div>
                <div className="input-group mb-3">
                  <select className="form-select c-input" aria-label="Escolha o seu curso" name="curso_ent_acad" onChange={setCurso}>
                    <option value={undefined}>Escolha um curso</option>
                    {
                      cursosPegos.map((element, index) => {
                        return (<option value={element.nome_curso} key={index}>{element.nome_curso}</option>);
                      })
                    }
                  </select>
                </div>
                <div className="btn-group">
                  <button type="submit" className="btnSubmitApprove input-margin" onClick={HandleSubmitEdit} data-bs-toggle="modal" data-bs-target="#msgModal2">Registrar entidade</button>
                </div>
              </form>
            </div>
          </div>
          <div className={`${(showDeletar === false) ? "nodisplay" : "showdisplay cad-curso-register-wrapper animadoCimaParaBaixo"}`}>
            <div className="form-group">
              <form action="" id="registerForm" className="showdisplay animadoCimaParaBaixo">
                <h3 className="text-center noselect">Deletar Entidade Acadêmica</h3>
                <div className="showdisplay animadoDireitaParaEsquerda">
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="nome_ent_acad" onChange={setEntAcad}>
                      <option value={undefined}>Selecione uma entidade para deletar!</option>
                      {
                        entidadePegas.map((element, index) => {
                          return (<option value={element.nome_ent_acad} key={element.nome_ent_acad}>{element.nome_ent_acad}</option>);
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

export default CadEntAcad;