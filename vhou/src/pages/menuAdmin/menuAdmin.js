import React, { useState, useEffect } from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Import de Componentes
import Navbar from '../../components/navbar/navbar';
// import BarChart from '../../components/Bars/barChart';
import { DocumentsSent, DocumentsApproved, DocumentsPending } from '../../components/documentsArea/documentsArea';

// Import de API
import api from '../api';
import { getUser } from '../auth';

// Import de CSS.
import '../menu/menu.css';
import '../../components/sendDocument/sendDocument.css';
import '../../components/documentsArea/documents.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const Menu = () => {
  // Variáveis para as ativiadades.
  const [showActivitiesSent, setActSent] = useState(true);
  const [showActivitiesApproved, setActApproved] = useState(false);

  // Texto monstrando a resposta para o usuário.
  const [text, setText] = useState("");
  const [termoDeBusca, setTermoDeBusca] = useState("");

  // Variáveis para o fetch do banco de dados.
  const [cursosPegos, setCursosPegos] = useState([]);
  const [horasPegas, setHorasPegas] = useState([]);
  const [documents, setDocument] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [horas, setHoras] = useState([]);

  useEffect(() => {
    getCursos();
    getHorasComplementares();
    getDocumentsAdmin();
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

  async function getDocumentsAdmin() {
    api.get(`/atividade/todas`).then(response => {
      let arrayDocumentosUsuario = [];
      let arrayGraficoAtividade = [];
      let arrayGraficoHora = [];
      response.data.atividades.forEach(element => {
        arrayDocumentosUsuario.push(element);
        arrayGraficoAtividade.push(element.nome_atividade);
        arrayGraficoHora.push(element.horas_atividade);
      });
      setDocument(arrayDocumentosUsuario);
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

    return (
      <>
        <div id="main-menu">
        <Navbar pathname={"/admin/"} isAdmin={true}/>
          <div className="container info">
            <div className="row">
              <div className="col list-menu-options">
                <div className="list-menu list-group" id="list-tab" role="tablist">
                  <div className="row" style={{margin: '0 1px'}}>
                    <div className='col-lg-6 col-md-8 col-sm-8'>
                      <label >
                        Filtrar:
                      </label>
                    </div>
                  </div>
                  <br></br>
                  <input className="form-control" name="inputPesquisar" id="inputPesquisar" type="text" placeholder="Pesquisar.." style={{margin: '0 7px'}} onChange={(event) => {setTermoDeBusca(event.target.value)}}/>
                  <div className="opt-group">
                    <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-approved" onClick={() => setShowActSent()} href="#list-act-approved" role="tab" aria-controls="atividades extras enviadas aprovadas">Atividades Extras Recebidas</button>
                    <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-pending" onClick={() => setShowActAproved()} href="#list-act-pending" role="tab" aria-controls="atividades extras aprovadas">Atividades Extras Avaliadas</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col list-menu-content">              
                <div className={`${(showActivitiesSent === false) ? "nodisplay" : "showdisplay"}`}>
                  <DocumentsSent vetor={documents} isCord={true} filter={termoDeBusca}></DocumentsSent>
                </div>
                <div className={`${(showActivitiesApproved === false) ? "nodisplay" : "showdisplay"}`}>
                  <DocumentsApproved vetor={documents} isCord={true} filter={termoDeBusca}></DocumentsApproved>
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
  <div className='col-lg-6 col-md-8 col-sm-8'>
                      <input type="radio" name="radioPesquisar" id="pesquisarNome" onChange={() => setAllowSearchInput()}/>&nbsp;&nbsp;
                      <label >
                        Nome
                      </label>&nbsp;&nbsp;
                      <input type="radio" name="radioPesquisar" id="pesquisarAno" onChange={() => setAllowSearchInput()}/>&nbsp;&nbsp;
                      <label >
                        Ano
                      </label>
                    </div>
  */

/*
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showActivitiesSent: true,
      showActivitiesApproved: false,
      showPending: false,
      allowSearch: false,
    }
  }

  allowSearch() {
    var elementos = document.getElementsByName('radioPesquisar');
    elementos.forEach(element => {
      if(element.checked === true){
        var x = document.getElementById("inputPesquisar");
        x.disabled = false;
        console.log(x);
      }
    });
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
  
  render() {
    return (
      <>
        <div id="main-menu">
        <Navbar pathname={"/admin/"} isAdmin={true}/>
          <div className="container info">
            <div className="row">
              <div className="col list-menu-options">
                <div className="list-menu list-group" id="list-tab" role="tablist">
                  <div className="row" style={{margin: '0 1px'}}>
                    <div className='col-lg-6 col-md-8 col-sm-8'>
                      <input type="radio" name="radioPesquisar" id="pesquisarNome" onChange={() => this.allowSearch()}/>&nbsp;&nbsp;
                      <label >
                        Nome
                      </label>&nbsp;&nbsp;
                      <input type="radio" name="radioPesquisar" id="pesquisarAno" onChange={() => this.allowSearch()}/>&nbsp;&nbsp;
                      <label >
                        Ano
                      </label>
                    </div>
                  </div>
                  <input className="form-control" name="inputPesquisar" id="inputPesquisar" type="text" placeholder="Pesquisar.." style={{margin: '0 7px'}} disabled/>
                  <div className="opt-group">
                    <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-approved" onClick={() => this.showActSent()} href="#list-act-approved" role="tab" aria-controls="atividades extras enviadas aprovadas">Atividades Extras Recebidas</button>
                    <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-pending" onClick={() => this.showActAproved()} href="#list-act-pending" role="tab" aria-controls="atividades extras aprovadas">Atividades Extras Aprovadas</button>
                    <button className="list-menu-item list-group-item list-group-item-action noselect" id="cord-contact" onClick={() => this.showPending()} href="#list-cord-pending" role="tab" aria-controls="atividades extras pendentes">Atividades Extras Pendentes</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col list-menu-content">              
                <div className={`${(this.state.showActivitiesSent === false) ? "nodisplay" : "showdisplay"}`}>
                  <DocumentsSent isCord={true}></DocumentsSent>
                </div>
                <div className={`${(this.state.showActivitiesApproved === false) ? "nodisplay" : "showdisplay"}`}>
                  <DocumentsApproved isCord={true}></DocumentsApproved>
                </div>
                <div className={`${(this.state.showPending === false) ? "nodisplay" : "showdisplay"}`}>
                  <DocumentsPending isCord={true}></DocumentsPending>
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
} */
export default Menu;