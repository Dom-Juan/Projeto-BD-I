import React, {useState} from 'react';

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

const DocumentsSent = (props) => {
  const [isCord, setIsCord] = useState(props.isCord == true ? true : false);
  return (
    <div id="main-document">
      <div className="container">
        {
          vetor_topper.map((element, index) => (
            <div id="card" className="card text-center">
              <h5 className="card-header" style={{background: 'var(--primary)'}}>Atividade Extracurricular</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col text-center">
                    {element.data}
                  </div>
                  <hr/>
                </div>
                <div className="row">
                  <p>Informações do Aluno:</p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">RA</th>
                        <th scope="col">HORAS COMPLEMENTARES</th>
                        <th scope="col">TIPO</th>
                        <th scope="col">ARQUIVO</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{element.RA}</th>
                        <td>{element.horas}</td>
                        <td>{element.tipo}</td>
                        <td>{element.arq}</td>
                      </tr>                    
                    </tbody>
                  </table>
                </div>
                {(isCord) ? 
                <div className="buttonsEdit">
                  <button type="button" className="btn btn-success" id="toggleBtn">Aprovar</button>
                  <button type="button" className="btn btn-danger" id="toggleBtn">Reprovar</button>
                  <button type="button" className="btn btn-info" id="toggleBtn">Download Arquivo</button>
                </div>
                : ''
                }
                
              </div>
              <div className='card-footer text-muted bg-warning'>
                <p className="text-center" style={{color: 'white'}}>{element.status}</p>
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