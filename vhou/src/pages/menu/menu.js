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
  const [showPending, setActPending] = useState(false);

  const [fileName, setFileName] = useState('Esperando um arquivo a ser enviado...');

  // Texto monstrando a resposta para o usuário.
  const [text, setText] = useState("");

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
        if(String(element.id_aluno_atividade) === String(getUser())){
          arrayDocumentosUsuario.push(element);
          arrayGraficoAtividade.push(element.nome_atividade);
          arrayGraficoHora.push(element.horas_atividade);
        }
      });
      setDocument(arrayDocumentosUsuario);
      setAtividades(arrayGraficoAtividade);
      setHoras(arrayGraficoHora);
    });
  }

  function setShowActSent() {
    if (showActivitiesSent === false) {
      setActSent(true);
      setActApproved(false);
      setActPending(false);
    } else {
      setActSent(false);
      setActApproved(false);
      setActPending(false);
    }
  }

  function setShowActAproved() {
    if (showActivitiesApproved === false) {
      setActSent(false);
      setActApproved(true);
      setActPending(false);
    } else {
      setActSent(false);
      setActApproved(false);
      setActPending(false);
    }
  }

  function setShowPending() {
    if (showPending === false) {
      setActSent(false);
      setActApproved(false);
      setActPending(true);
    } else {
      setActSent(false);
      setActApproved(false);
      setActPending(false);
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
    console.log(fileName);
    for (let [key, value] of dataForm.entries()) {
      console.log(key, value);
      dataParaOBanco[key] = value;
    }
    //console.log(dataParaOBanco);

    try {
      console.log("Registrando Atividade...");

      // Colocando na rota que cria um usuário primeiro e depois um aluno.
      api.post(`/atividade/enviar`, dataForm).then(response => {
        console.log(response);
      });
      setText("Atividade enviada!!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div id="main-menu">
      <Navbar pathname={"/dashboard/"}/>
        <div className="container info">
          <div className="row">
            <div className="col-md-4 list-menu-options">
              <div className="list-menu list-group" id="list-tab" role="tablist">
                <button className="list-menu-item list-group-item list-group-item-action noselect" id="document" href="#list-document" data-bs-toggle="modal" data-bs-target="#modalAtividade" role="tab" aria-controls="enviar documento de uma atividade extra">Enviar Formulário de Atividade Extras</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-approved" onClick={() => setShowActSent()} data-bs-toggle="list" href="#list-act-approved" role="tab" aria-controls="atividades extras enviadas aprovadas">Atividades Extras Enviadas</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-pending" onClick={() => setShowActAproved()} data-bs-toggle="list" href="#list-act-pending" role="tab" aria-controls="atividades extras aprovadas">Atividades Extras Avaliadas</button>
                <button className="list-menu-item list-group-item list-group-item-action noselect" id="cord-contact" onClick={() => setShowPending()} data-bs-toggle="list" href="#list-cord-pending" role="tab" aria-controls="atividades extras pendentes">Atividades Extras Pendentes</button>
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
              <div className="modal fade" id="modalAtividade" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <DocumentsSent id_usuario={getUser()} vetor={documents} isCord={false}></DocumentsSent>
              </div>
              <div className={`${(showActivitiesApproved === false) ? "nodisplay" : "showdisplay"}`}>
                <DocumentsApproved id_usuario={getUser()} vetor={documents} isCord={false}></DocumentsApproved>
              </div>
              <div className={`${(showPending === false) ? "nodisplay" : "showdisplay"}`}>
                <DocumentsPending id_usuario={getUser()} vetor={documents} isCord={false}></DocumentsPending>
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

/*
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showActivitiesSent: true,
      showActivitiesApproved: false,
      showPending: false,
      fileName: 'Esperando um arquivo a ser enviado...',
      filesElement: null,
    }
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  showActSent() {
    this.state.showActivitiesSent === false ?
      this.setState({ showActivitiesSent: true, showActivitiesApproved: false, showPending: false }) :
      this.setState({ showActivitiesSent: false, showActivitiesApproved: false, showPending: false });
  }

  showActAproved() {
    this.state.showActivitiesApproved === false ?
      this.setState({ showActivitiesSent: false, showActivitiesApproved: true, showPending: false }) :
      this.setState({ showActivitiesSent: false, showActivitiesApproved: false, showPending: false });
  }

  showPending() {
    this.state.showPending === false ?
      this.setState({ showActivitiesSent: false, showActivitiesApproved: false, showPending: true }) :
      this.setState({ showActivitiesSent: false, showActivitiesApproved: false, showPending: false });
  }

  handleSelectFile = (event) => {
    event.preventDefault();
    console.log(event.target.files[0].name);
    this.setState({ fileName: event.target.files[0].name });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    const dataForm = new FormData();
    for(const file of this.filesElement.current.files) {
      dataForm.append('file', file);
    }
  }

  render() {
    return (
      <>
        <div id="main-menu">
          <Navbar pathname={"/login/"}/>
          <div className="container info">
            <div className="row">
              <div className="col-md-4 list-menu-options">
                <div className="list-menu list-group" id="list-tab" role="tablist">
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="document" href="#list-document" data-bs-toggle="modal" data-bs-target="#modalAtividade" role="tab" aria-controls="enviar documento de uma atividade extra">Enviar Formulário de Atividade Extras</button>
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-approved" onClick={() => this.showActSent()} data-bs-toggle="list" href="#list-act-approved" role="tab" aria-controls="atividades extras enviadas aprovadas">Atividades Extras Enviadas</button>
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-pending" onClick={() => this.showActAproved()} data-bs-toggle="list" href="#list-act-pending" role="tab" aria-controls="atividades extras aprovadas">Atividades Extras Aprovadas</button>
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="cord-contact" onClick={() => this.showPending()} data-bs-toggle="list" href="#list-cord-pending" role="tab" aria-controls="atividades extras pendentes">Atividades Extras Pendentes</button>
                </div>
              </div>
              <div className="col-md-8 hours">
                <div id="imprime">
                  <BarChart BarTitles={["Monitoria A", "Secomp", "Monitoria B", "Projeto", "Monitoria C", "Bateria", "Tempo no Cacic", "Ajuda assitencial ao governo",]} ActivityName={['A']} data={[6, 5, 8, 1, 6, 5, 4,]}></BarChart>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col list-menu-content">
                <div className="modal fade" id="modalAtividade" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <form id="documents-form" onSubmit={this.handleSubmitForm}>
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Formulário de comprovante de atividade extra</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="main-document" className="modal-body">
                          <div className="container">
                            <div className="col-auto input-group mb-3">
                              <label>Registro do Aluno (RA)</label>
                              <input id="modalInput"></input>
                            </div>
                            <div className="col-auto input-group mb-3">
                              <label>Nome atividade</label>
                              <input id="modalInput"></input>
                            </div>
                            <div className="col-auto input-group mb-3">
                              <label>Data da atividade</label>
                              <input id="modalInput" type="date"></input>
                            </div>
                            <div className="col-auto input-group mb-3">
                              <label>Horas realizadas</label>
                              <input id="modalInput"></input>
                            </div>
                            <div className="col-auto input-group mb-3">
                              <label>Tipo de atividade feita</label>
                              <label className="visually-hidden" htmlFor="autoSizingSelect">Tipo Atividade</label>
                              <select className="form-select" id="autoSizingSelect">
                                <option defaultValue>Escolha...</option>
                                <option defaultValue="1">Monitoria</option>
                                <option defaultValue="2">Ativida extracurricular</option>
                                <option defaultValue="3">Evento</option>
                              </select>
                            </div>
                            <div className="col-auto mb-3">
                              <span className="btnSubmit2" htmlFor="fileInput">Selecione Comprovante <input type="file" id="fileInput" onChange={this.handleSelectFile}></input></span>
                              <p id="addedFile" className="text-center text-input">{this.state.fileName}</p>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer btn-group">
                          <div className="container">
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
                <div className={`${(this.state.showActivitiesSent === false) ? "nodisplay" : "showdisplay"}`}>
                  <DocumentsSent></DocumentsSent>
                </div>
                <div className={`${(this.state.showActivitiesApproved === false) ? "nodisplay" : "showdisplay"}`}>
                  <DocumentsApproved></DocumentsApproved>
                </div>
                <div className={`${(this.state.showPending === false) ? "nodisplay" : "showdisplay"}`}>
                  <DocumentsPending></DocumentsPending>
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
}
*/
export default Menu;