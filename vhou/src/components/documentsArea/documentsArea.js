import React, { useState } from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Import de API
//import api from '../../pages/api';

// Import de CSS.
import './documents.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const DocumentsSent = (props) => {
  const isCord = useState(props.isCord === true ? true : false);

  return (
    <div id="main-document">
      <div className="container">
        {
          props.vetor.map((element, index) => (
            <div className="card-doc card text-center" id="card" key={index}>
              <h3 className="card-header document-bkg noselect" style={{ background: 'var(--primary)' }}>Atividade Extracurricular</h3>
              <div className="card-body">
                <div className="row">
                  <div className="col text-center noselect">
                    {element.nome_atividade}
                  </div>
                  <hr />
                </div>
                <div className="row">
                  <div className="col">
                    <h3><p className="noselect">Informações do Aluno:</p></h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col noselect">RA</th>
                          <th scope="col noselect">HORAS COMPLEMENTARES</th>
                          <th scope="col noselect">TIPO</th>
                          <th scope="col noselect">DATA DE INÍCIO</th>
                          <th scope="col noselect">DATA DE FIM</th>
                          <th scope="col noselect">ARQUIVO</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{element.ra_aluno_atividade}</th>
                          <td>{element.horas_atividade}</td>
                          <td>{element.tipo_atividade}</td>
                          <td>{element.data_ini_atividade}</td>
                          <td>{element.data_fim_atividade}</td>
                          <td>{element.url_atividade}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {(isCord[0]) ?
                  <div className="buttonsEdit">
                    <div className="container">
                      <div className="row">
                        <div className="col btnDoc">
                          <button type="button" className="btn btnSubmitApprove" id="toggleBtn">Aprovar</button>
                        </div>
                        <div className="col btnDoc">
                          <button type="button" className="btn btnSubmitClose" id="toggleBtn">Reprovar</button>
                        </div>
                        <div className="col btnDoc">
                          <button type="button" className="btn btnSubmit2" id="toggleBtn">Download</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ''
                }

              </div>
              <div className='card-footer text-muted bg-warning noselect'>
                <p className="text-center" style={{ color: 'white' }}>{element.status_atividade}</p>
              </div>
            </div>

          ))
        }
      </div>
    </div>
  );
}

const DocumentsApproved = (props) => {
  const isCord = useState(props.isCord === true ? true : false);

  return (
    <div id="main-document">
      <div className="container">
      {
          props.vetor.map((element, index) => (
            <div className="card-doc card text-center" id="card" key={index}>
              <h3 className="card-header document-bkg noselect" style={{ background: 'var(--primary)' }}>Atividade Extracurricular</h3>
              <div className="card-body">
                <div className="row">
                  <div className="col text-center noselect">
                    {element.nome_atividade}
                  </div>
                  <hr />
                </div>
                <div className="row">
                  <div className="col">
                    <h3><p className="noselect">Informações do Aluno:</p></h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col noselect">RA</th>
                          <th scope="col noselect">HORAS COMPLEMENTARES</th>
                          <th scope="col noselect">TIPO</th>
                          <th scope="col noselect">DATA DE INÍCIO</th>
                          <th scope="col noselect">DATA DE FIM</th>
                          <th scope="col noselect">ARQUIVO</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{element.ra_aluno_atividade}</th>
                          <td>{element.horas_atividade}</td>
                          <td>{element.tipo_atividade}</td>
                          <td>{element.data_ini_atividade}</td>
                          <td>{element.data_fim_atividade}</td>
                          <td>{element.url_atividade}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {(isCord[0]) ?
                  <div className="buttonsEdit">
                    <div className="container">
                      <div className="row">
                        <div className="col btnDoc">
                          <button type="button" className="btn btnSubmit2" id="toggleBtn">Download Arquivo</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ''
                }

              </div>
              <div className='card-footer text-muted bg-warning noselect'>
                <p className="text-center" style={{ color: 'white' }}>{element.status_atividade}</p>
              </div>
            </div>

          ))
        }
      </div>
    </div>
  );
}

const DocumentsPending = (props) => {
  const [isCord] = useState(props.isCord === true ? true : false);

  return (
    <div id="main-document">
      <div className="container">
      {
          props.vetor.map((element, index) => (
            <div className="card-doc card text-center" id="card" key={index}>
              <h3 className="card-header document-bkg noselect" style={{ background: 'var(--primary)' }}>Atividade Extracurricular</h3>
              <div className="card-body">
                <div className="row">
                  <div className="col text-center noselect">
                    {element.nome_atividade}
                  </div>
                  <hr />
                </div>
                <div className="row">
                  <div className="col">
                    <h3><p className="noselect">Informações do Aluno:</p></h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col noselect">RA</th>
                          <th scope="col noselect">HORAS COMPLEMENTARES</th>
                          <th scope="col noselect">TIPO</th>
                          <th scope="col noselect">DATA DE INÍCIO</th>
                          <th scope="col noselect">DATA DE FIM</th>
                          <th scope="col noselect">ARQUIVO</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{element.ra_aluno_atividade}</th>
                          <td>{element.horas_atividade}</td>
                          <td>{element.tipo_atividade}</td>
                          <td>{element.data_ini_atividade}</td>
                          <td>{element.data_fim_atividade}</td>
                          <td>{element.url_atividade}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {(isCord[0]) ?
                  <div className="buttonsEdit">
                    <div className="container">
                      <div className="row">
                        <div className="col btnDoc">
                          <button type="button" className="btn btnSubmitApprove" id="toggleBtn">Aprovar</button>
                        </div>
                        <div className="col btnDoc">
                          <button type="button" className="btn btnSubmitClose" id="toggleBtn">Reprovar</button>
                        </div>
                        <div className="col btnDoc">
                          <button type="button" className="btn btnSubmit2" id="toggleBtn">Download Arquivo</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ''
                }

              </div>
              <div className='card-footer text-muted bg-warning noselect'>
                <p className="text-center" style={{ color: 'white' }}>{element.status_atividade}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
export { DocumentsSent, DocumentsApproved, DocumentsPending };