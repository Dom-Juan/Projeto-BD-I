import React, { useState, useEffect } from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useForm } from "react-hook-form";

// Import de Componentes
import Navbar from '../../components/navbar/navbar';
import BarChart from '../../components/Bars/barChart';
import { DocumentsSent, DocumentsApproved, DocumentsPending } from '../../components/documentsArea/documentsArea';

// Import de API
import api from '../api';
import { getUser } from '../auth';

// Import de CSS.
import './menu.css';
import '../../components/sendDocument/sendDocument.css';
import '../../misc/animations.css';
import '../../misc/misc.css';


// React hooks pra facilitar a vida.
const Menu = () => {
  // Variáveis para as ativiadades.
  const [showActivitiesSent, setActSent] = useState(true);
  const [showActivitiesApproved, setActApproved] = useState(false);

  const [fileName, setFileName] = useState('Esperando um arquivo a ser enviado...');

  // Texto monstrando a resposta para o usuário.
  const [text, setText] = useState("");
  const [termoDeBusca, setTermoDeBusca] = useState("");

  // Variáveis para o fetch do banco de dados.
  const [cursosPegos, setCursosPegos] = useState([]);
  const [horasPegas, setHorasPegas] = useState([]);
  const [documents, setDocument] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [horas, setHoras] = useState([]);

  const { file, handleSubmit } = useForm();

  useEffect(() => {
    getCursos();
    getHorasComplementares();
    getDocuments();
  }, []);

  async function getCursos() {
    await api.get(`/curso/todos`).then(response => {
      setCursosPegos(response.data.cursos);
    });
  }

  async function getHorasComplementares() {
    await api.get(`/horas/todas`).then(response => {
      setHorasPegas(response.data.horas_complementares);
    });
  }

  async function getDocuments() {
    await api.get(`/atividade/todas`).then(response => {
      let arrayDocumentosUsuario = [];
      let arrayGraficoAtividade = [];
      let arrayGraficoHora = [];
      response.data.atividades.forEach(element => {
        if (String(element.id_aluno_atividade) === String(getUser())) {
          arrayDocumentosUsuario.push(element);
          arrayGraficoAtividade.push(element.nome_atividade);
          arrayGraficoHora.push(element.horas_atividade);
        }
      });
      setDocument(arrayDocumentosUsuario);
      setAtividades(arrayGraficoAtividade);
      setHoras(arrayGraficoHora);
    }).catch(err => {
      console.log(err);
    });
  }

  function setShowActSent() {
    if (showActivitiesSent === false) {
      setActSent(true);
      setActApproved(false);
    } else {
      setActSent(false);
      setActApproved(false);
    }
  }

  function setShowActAproved() {
    if (showActivitiesApproved === false) {
      setActSent(false);
      setActApproved(true);
    } else {
      setActSent(false);
      setActApproved(false);
    }
  }

  function handleSelectFile(event) {
    event.preventDefault();
    if (event.target && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  }

  const onSubmit = (event) => {
    let dataParaOBanco = {};
    let dataForm = new FormData(event.currentTarget);
    event.preventDefault();

    for (let [key, value] of dataForm.entries()) {

      dataParaOBanco[key] = value;
    }
    //console.log(dataParaOBanco);

    try {
      console.log("Registrando Atividade...");

      // Colocando na rota que cria um usuário primeiro e depois um aluno.
      api.post(`/atividade/enviar`, dataForm).then(response => {
        console.log(response.status, response.msg);
        getDocuments();
        setText("Atividade enviada!!");
      });
    } catch (error) {
      console.error(error);
      setText(error.msg);
    }
  }

  return (
    <>
      <div id="main-menu">
        <Navbar pathname={"/dashboard/"} />
        <div className="container info">
          <div className="row">
            <div className="col-md-4 list-menu-options">
              <div className="row" style={{ margin: '0 1px' }}>
                <div className='col-lg-6 col-md-8 col-sm-8'>
                  <label >
                    Filtrar:
                  </label>
                </div>
              </div>
              <br></br>
              <input className="form-control" name="inputPesquisar" id="inputPesquisar" type="text" placeholder="Pesquisar.." style={{ margin: '0 7px' }} onChange={(event) => { setTermoDeBusca(event.target.value) }} />
              <div className="list-menu list-group" id="list-tab" role="tablist">
                <button className="list-menu-item list-group-item list-group-item-action noselect" id="document" href="#list-document" data-bs-toggle="modal" data-bs-target="#modalAtividade" role="tab" aria-controls="enviar documento de uma atividade extra">Enviar Formulário de Atividade Extras</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-approved" onClick={() => setShowActSent()} data-bs-toggle="list" href="#list-act-approved" role="tab" aria-controls="atividades extras enviadas aprovadas">Atividades Extras Enviadas</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-pending" onClick={() => setShowActAproved()} data-bs-toggle="list" href="#list-act-pending" role="tab" aria-controls="atividades extras aprovadas">Atividades Extras Avaliadas</button>
              </div>
            </div>
            <div className="col-md-8 hours">
              <div id="imprime">
                <BarChart BarTitles={atividades} ActivityName={['A']} data={horas}></BarChart>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col list-menu-content">
              <div className="modal fade" id="modalAtividade" tabIndex="-1" aria-labelledby="modalAtividade" aria-hidden="true">
                <div className="modal-dialog">
                  <form id="documents-form" onSubmit={onSubmit} method="post" encType="multipart/form-data">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Formulário de comprovante de atividade extra</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div id="main-document" className="modal-body">
                        <div className="container">
                          <div className="col-auto input-group mb-3">
                            <label>Registro do Aluno (RA)</label>
                            <input id="modalInput" name="ra_aluno_atividade"></input>
                          </div>
                          <div className="col-auto input-group mb-3">
                            <label>Nome atividade</label>
                            <input id="modalInput" name="nome_atividade"></input>
                          </div>
                          <div className="col-auto input-group mb-3">
                            <label>Data de início da atividade</label>
                            <input id="modalInput" type="date" name="data_ini_atividade"></input>
                          </div>
                          <div className="col-auto input-group mb-3">
                            <label>Data do fim da atividade</label>
                            <input id="modalInput" type="date" name="data_fim_atividade"></input>
                          </div>
                          <div className="col-auto input-group mb-3">
                            <label>Horas realizadas</label>
                            <input id="modalInput" type="text" name="horas_atividade"></input>
                          </div>
                          <div className="col-auto input-group mb-3">
                            <label>Escolha seu curso</label>
                            <select className="form-select c-input" aria-label="Escolha o seu curso" name="tipo_curso_atividade">
                              <option value={undefined}>Escolha seu curso...</option>
                              {
                                cursosPegos.map((element, index) => {
                                  return (<option value={element.nome_curso} key={index}>{element.nome_curso}</option>);
                                })
                              }
                            </select>
                          </div>

                          <div className="col-auto input-group mb-3">
                            <label>Tipo de atividade feita</label>
                            <select className="form-select" id="autoSizingSelect" name="tipo_atividade">
                              <option value={undefined}>Escolha a sua atividade...</option>
                              {
                                horasPegas.map((element, index) => {
                                  return (<option value={element.id_hora} key={index}>{element.nome_hora}</option>);
                                })
                              }
                            </select>
                          </div>
                          <div className="col-auto mb-3">
                            <span className="btnSubmit2" htmlFor="fileInput">Selecione Comprovante <input id="fileInput" onChange={handleSelectFile} type="file" multiple ref={file} name="comprovante"></input></span>
                            <p id="addedFile" className="text-center text-input">{fileName}</p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer btn-group">
                        <div className="container">
                          <p className="text-center">{text}</p>
                          <div className="row">
                            <div className="col-6">
                              <button type="button" className="btn btnSubmitClose" data-bs-dismiss="modal">Fechar</button>
                            </div>
                            <div className="col-6">
                              <button type="submit" className="btn btnSubmit2" >Enviar</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className={`${(showActivitiesSent === false) ? "nodisplay" : "showdisplay"}`}>
                <DocumentsSent id_usuario={getUser()} vetor={documents} isCord={false} filter={termoDeBusca}></DocumentsSent>
              </div>
              <div className={`${(showActivitiesApproved === false) ? "nodisplay" : "showdisplay"}`}>
                <DocumentsApproved id_usuario={getUser()} vetor={documents} isCord={false} filter={termoDeBusca}></DocumentsApproved>
              </div>
            </div>
          </div>
        </div>
        <div className="container" id="about">
          <div className="row">
            <div className="col">
              <div><h2 className="text-center">Sobre</h2></div>
              <div>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit nisl vitae neque sodales placerat. Mauris leo lacus, ultricies sed egestas eget, gravida a magna. Quisque efficitur lectus a condimentum egestas. Curabitur erat sapien, tempus dictum orci ut, vulputate eleifend ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam sed varius mi, vitae suscipit orci. Nulla ante eros, blandit in ultricies sed, tincidunt et ligula. Cras blandit accumsan sem, ac eleifend purus ornare quis. Vestibulum eget sem eu leo vulputate placerat non sed justo. Maecenas lacinia dignissim mauris nec vulputate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;