import React from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Import de Componentes
import Navbar from '../../components/navbar/navbar';
import BarChart from '../../components/Bars/barChart';
import { DocumentsSent, DocumentsApproved, DocumentsPending } from '../../components/documentsArea/documentsArea';

// Import de API
// TODO.

// Import de CSS.
import './menu.css';
import '../../components/sendDocument/sendDocument.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showActivitiesSent: true,
      showActivitiesApproved: false,
      showPending: false,
      fileName: 'Esperando um arquivo a ser enviado...',
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
    alert("Forms enviado...");
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
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-approved" onClick={() => this.showActSent()} href="#list-act-approved" role="tab" aria-controls="atividades extras enviadas aprovadas">Atividades Extras Enviadas</button>
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-pending" onClick={() => this.showActAproved()} href="#list-act-pending" role="tab" aria-controls="atividades extras aprovadas">Atividades Extras Aprovadas</button>
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="cord-contact" onClick={() => this.showPending()} href="#list-cord-pending" role="tab" aria-controls="atividades extras pendentes">Atividades Extras Pendentes</button>
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


} export default Menu;