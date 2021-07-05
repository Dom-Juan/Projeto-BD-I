import React from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';

// Import de Componentes
import Navbar from '../../components/navbar/navbar';
import SendDocuments from '../../components/sendDocument/sendDocument';
import {DocumentsSent, DocumentsApproved, DocumentsPending} from '../../components/documentsArea/documentsArea';

// Import de API
// TODO.

// Import de CSS.
import './menu.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDocuments: true,
      showActivitiesSent:false,
      showActivitiesApproved:false,
      showPending: false,
    }
  }

  showDocuments() {
    this.state.showDocuments === false ? 
    this.setState({showDocuments: true, showActivitiesSent: false, showActivitiesApproved: false, showPending: false}) : 
    this.setState({showDocuments: false, showActivitiesSent: false, showActivitiesApproved: false, showPending: false});
  }

  showActSent() {
    this.state.showActivitiesSent === false ? 
    this.setState({showDocuments: false, showActivitiesSent: true, showActivitiesApproved: false, showPending: false}) : 
    this.setState({showDocuments: false, showActivitiesSent: false, showActivitiesApproved: false, showPending: false});
  }

  showActAproved() {
    this.state.showActivitiesApproved === false ? 
    this.setState({showDocuments: false, showActivitiesSent: false, showActivitiesApproved: true, showPending: false}) : 
    this.setState({showDocuments: false, showActivitiesSent: false, showActivitiesApproved: false, showPending: false});
  }

  showPending() {
    this.state.showPending === false ? 
    this.setState({showDocuments: false, showActivitiesSent: false, showActivitiesApproved: false, showPending: true}) : 
    this.setState({showDocuments: false, showActivitiesSent: false, showActivitiesApproved: false, showPending: false});
  }

  render() {
    return (
      <>
        <div id="main-menu">
          <Navbar/>
          <div className="container info">
            <div className="row">
              <div className="col-md-4 list-menu-options">
                <div className="list-menu list-group" id="list-tab" role="tablist">
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="document" onClick={()=>this.showDocuments()} href="#list-document" role="tab" aria-controls="enviar documento de uma atividade extra">Enviar Documento</button>
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-approved" onClick={()=>this.showActSent()} href="#list-act-approved" role="tab" aria-controls="atividades extras enviadas aprovadas">Atividades Extras Enviadas</button>
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="act-pending" onClick={()=>this.showActAproved()} href="#list-act-pending" role="tab" aria-controls="atividades extras aprovadas">Atividades Extras Aprovadas</button>
                  <button className="list-menu-item list-group-item list-group-item-action noselect" id="cord-contact" onClick={()=>this.showPending()} href="#list-cord-pending" role="tab" aria-controls="atividades extras pendentes">Atividades Extras Pendentes</button>
                </div>
              </div>
              <div className="col-md-8 hours">
                <div>
                  Horas processadas aqui.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col list-menu-content">
                <div className={`${(this.state.showDocuments === false) ? "nodisplay" : "showdisplay"}`}>
                  <SendDocuments></SendDocuments>
                </div>
                <div className={`${(this.state.showActivitiesSent  === false) ? "nodisplay" : "showdisplay"}`}>
                  <DocumentsSent></DocumentsSent>
                </div>
                <div className={`${(this.state.showActivitiesApproved  === false) ? "nodisplay" : "showdisplay"}`}>
                  <DocumentsApproved></DocumentsApproved>
                </div>
                <div className={`${(this.state.showPending  === false) ? "nodisplay" : "showdisplay"}`}>
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