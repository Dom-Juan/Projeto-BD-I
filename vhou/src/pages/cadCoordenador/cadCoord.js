import React, { useState, useEffect } from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { customAlphabet } from 'nanoid';

// Import de API
import api from '../../pages/api';

import Navbar from '../../components/navbar/navbar';

// Import de CSS.
import './cadCoord.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const nanoid = customAlphabet('1234567890', 3);

const CadCoord = () => {
  // Variáveis declaradas.
  const [pagina, setPagina] = useState("0");
  const [info, setInfo] = useState({});
  const [cursosPegos, setCursosPegos] = useState([]);
  const [entidadesPegas, setEntidadesPegas] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState("");
  const [selectedEntidade, setSelectedEntidade] = useState("");

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

  // Troca o calor do curso conforme o usuário digita.
  const setCursoCoord = (e) => {
    e.persist(e);
    setSelectedCurso(e.target.value);
    console.log(selectedCurso);
  }

  const setEntidadeCoord = (e) => {
    e.persist(e);
    setSelectedEntidade(e.target.value);
    console.log(selectedEntidade);
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
    await api.get(`entidade/todas`).then(response => {
      setEntidadesPegas(response.data.entidades);
    });
  }

  // Enviar o formulário para o servidor.
  async function HandleSubmit(e) {
    e.preventDefault();

    // Info do usuário.
    if (typeof info.nome_usuario === 'undefined' || typeof selectedCurso === 'undefined' || typeof selectedEntidade === 'undefined') {
      setText("Preença as informações antes");
      return;
    }
    // Info de usuário.
    let id_usuario = nanoid(3);
    let nome_usuario = info.nome_usuario;
    let curso = selectedCurso;
    let tipo_usuario = "coordenador";
    let email_usuario = info.email_usuario;
    let senha = info.senha;
    // Info do coordenador.
    let nome_coord = info.nome_coord;
    let nome_ent_acad_coord = selectedEntidade;
    let curso_coord = selectedCurso;
    let data_como_coord = info.data_como_coord;

    // Verifica se houve algum erro na senha.
    if (info.senha === info.confirme_senha) {
      try {
        console.log("Registrando usuário...");

        // Colocando na rota que cria um usuário primeiro e depois um coordenador.
        api.post(`/coordenador/cadastro`, { // post enviando um pedido de post para o server.
          id_usuario, 
          nome_usuario, 
          curso, 
          tipo_usuario, 
          email_usuario, 
          senha, 
          nome_coord, 
          nome_ent_acad_coord,
          tipo_usuario_coord: "coordenador",
          curso_coord, 
          data_como_coord, 
          nome_responsavel: "Sistema"
        }).then(response => {
          console.log(response);
        });
        setText("Cadastro realizado!!");
      } catch (error) {
        console.error(error);
      }
    } else {
      setText("As senhas não são iguais.");
    }
  }

  return (
    <>
      <Navbar pathname={"/admin/"} isAdmin={true} />
      <div id="main">
        <div className="blur-section">a</div>
        <div id="contain" className="container">
          <div className="cad-coord-register-wrapper animadoCimaParaBaixo">
            <div className="form-group">
              <form action="" id="registerForm" className="showdisplay animadoCimaParaBaixo">
                <h3 className="text-center noselect">Cadastro de Coordenadores</h3>
                <div className={`${(pagina === "1") ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`}>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Usuário" aria-label="Usuário" name="nome_usuario" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Usuário</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="Email" aria-label="Email" name="email_usuario" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Email</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="password" className="form-control" id="floatingInput" placeholder="Senha" aria-label="Senha" name="senha" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Senha</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="password" className="form-control" id="floatingInput" placeholder="Confirme a senha" aria-label="Senha" name="confirme_senha" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Confirme a senha</label>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="btn" onClick={() => setPagina("1")} id="btnSubmit" value="1">Próximo</button>
                  </div>
                </div>
                <div className={`${(pagina === "0") ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`}>
                  <div className="input-group mb-3 form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Nome" aria-label="Nome" name="nome_coord" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Nome</label>
                  </div>
                  <div className="input-group mb-3 form-floating">
                    <input type="date" className="form-control" id="floatingInput" aria-label="dada nascimento" name="data_como_coord" onChange={setInformacoes} />
                    <label htmlFor="floatingInput">Data como coordenador</label>
                  </div>
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="curso_coord" onChange={setCursoCoord}>
                      <option value={undefined}>Escolha seu curso...</option>
                      {
                        cursosPegos.map((element, index) => {
                          return (<option value={element.nome_curso} key={index}>{element.nome_curso}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <select className="form-select c-input" aria-label="Escolha o seu curso" name="nome_ent_acad_coord" onChange={setEntidadeCoord}>
                      <option value={undefined}>Escolha sua entidade acadêmica...</option>
                      {
                        entidadesPegas.map((element, index) => {
                          return (<option value={element.nome_ent_acad} key={index}>{element.nome_ent_acad}</option>);
                        })
                      }
                    </select>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="btnSubmit2 input-margin" onClick={() => setPagina("0")}>Voltar</button>
                    <button type="submit" className="btnSubmitApprove input-margin" onClick={HandleSubmit} data-bs-toggle="modal3" data-bs-target="#msgModal">Registrar Coordenador</button>
                  </div>
                </div>
                <div className="modal fade" id="msgModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
export default CadCoord;