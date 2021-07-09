import React from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Import de API
// TODO.

// Import de CSS.
import './documents.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const vetor_topper = [
  {
    data: "data a",
    RA: "2",
    horas: "2",
    tipo: "tipo a",
    arq: "arquivo a",
    status: "status pendente",
  },
  {
    data: "data b",
    RA: "3",
    horas: "3",
    tipo: "tipo b",
    arq: "arquivo b",
    status: "status pendente",
  },
  {
    data: "data d",
    RA: "4",
    horas: "4",
    tipo: "arquivo d",
    arq: "arquivo d",
    status: "status pendente",
  },
  {
    data: "data c",
    RA: "5",
    horas: "5",
    tipo: "tipo c",
    arq: "arquiov c",
    status: "status pendente",
  },
];

const DocumentsSent = () => {
  return (
    <div id="main-document">
      <div className="container">
        {
          vetor_topper.map((element, index) => (
            <div id="card" className="container">
              <h1 className="text-center">Atividade Extracurricular</h1>
              <div className="container">
                <div className="row">
                  <div className="col text-center">
                    {element.data}
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    {element.RA}
                  </div>
                  <div className="col-8">
                    {element.horas}
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    {element.tipo}
                  </div>
                  <div className="col-8">
                    {element.arq}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-center">{element.status}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

const DocumentsApproved = () => {
  return (
    <div id="main-document">
      <div className="container">
        b
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