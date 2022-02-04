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

const nanoid = customAlphabet('1234567890', 3);

const CadCurso = () => {
  // Variáveis declaradas.
  const [pagina, setPagina] = useState("0");
  const [info, setInfo] = useState({});
  const [cursosPegos, setCursosPegos] = useState([]);
  const [coordenadoresPegos, setCoordenadoresPegas] = useState([]);
  const [selectedCoordenador, setSelectedCoordenador] = useState();
  const [selectedCurso, setSelectedCurso] = useState();
  const [text, setText] = useState("");

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
    console.log(selectedCoordenador);
  }

  const setCurso = (e) => {
    e.persist(e);
    setSelectedCurso(e.target.value);
    console.log(selectedCurso);
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
      setCoordenadoresPegas(response.data.coordenadores);
    });
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
    console.table({nome_curso_antigo, nome_curso, ano_curso, coordenador_curso, tipo_curso, nome_responsavel});
    try {
      console.log("Registrando usuário...");

      // Colocando na rota que cria um usuário primeiro e depois um coordenador.
      api.put(`/curso/editar`, { // post enviando um pedido de post para o server.
        nome_curso_antigo, nome_curso, ano_curso, coordenador_curso, tipo_curso, nome_responsavel
      }).then(response => {
        console.log(response.status, response.statusText);
        getCursos();
      });
      setText("Dados alterados!");
    } catch (error) {
      console.error(error);
    }
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
    console.table({nome_curso, ano_curso, coordenador_curso, tipo_curso, nome_responsavel});
    try {
      console.log("Registrando usuário...");

      // Colocando na rota que cria um usuário primeiro e depois um coordenador.
      api.post(`/curso/cadastrar`, { // post enviando um pedido de post para o server.
        nome_curso, ano_curso, coordenador_curso, tipo_curso, nome_responsavel
      }).then(response => {
        console.log(response.status, response.statusText);
        getCursos();
      });
      setText("Cadastro realizado!!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar pathname={"/admin/"} isAdmin={true} />
      <div id="main">
        <div className="blur-section">a</div>
        <div id="contain" className="container">
          <div className="cad-curso-register-wrapper animadoCimaParaBaixo">
            <div className="form-group">
              <form action="" id="registerForm" className="showdisplay animadoCimaParaBaixo">
                <h3 className="text-center noselect">Cadastro de Cursos</h3>
                <div className={`${(pagina === "1") ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`}>
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
              </form>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="cad-curso-register-wrapper animadoCimaParaBaixo">
            <div className="form-group">
              <form action="" id="registerForm" className="showdisplay animadoCimaParaBaixo">
                <h3 className="text-center noselect">Editar</h3>
                <div className={`${(pagina === "1") ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`}>
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
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
export default CadCurso;