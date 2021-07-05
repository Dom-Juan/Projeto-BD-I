import React from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';

// Import de API
// TODO.

// Import de CSS.
import './documents.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const DocumentsSent = () => {
  return (
    <div id="main-document">
      <div className="container">
        Atividades extras Enviadas
      </div>
    </div>
  );
}

const DocumentsApproved = () => {
  return (
    <div id="main-document">
      <div className="container">
        Atividades extras aprovadas.
      </div>
    </div>
  );
}
const DocumentsPending = () => {
  return (
    <div id="main-document">
      <div className="container">
        Atividades extras pendentes.
      </div>
    </div>
  );
}
export { DocumentsSent, DocumentsApproved, DocumentsPending };