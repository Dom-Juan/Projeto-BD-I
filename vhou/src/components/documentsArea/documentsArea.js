import React, { useState } from 'react';

// Import de libs de react
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import FileSaver from 'file-saver';
import fileDownload from 'js-file-download';

// Import de API
import api from '../../pages/api';
import { getUser } from '../../pages/auth';

// Import de CSS.
import './documents.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const handleDownload = (filename) => {
  const URL = "http://localhost:3333/atividade/get-file/";
  console.log(URL);
  api.get(URL + filename, {
    responseType: 'blob',
  }).then((response) => {
    fileDownload(response.data, filename);
  });
}

const DocumentsSent = (props) => {
  const [s, setAval] = useState();
  const [informacoes, setInformacoes] = useState({});

  const setInformacoesForm = (event) => {
    event.persist();
    setInformacoes(informacoes => ({
      ...informacoes,
      [event.target.name]: event.target.value,
    }));
    console.log(informacoes);
  };

  const setAvaliacao = (event) => {
    let s1 = event.target.value;
    setAval(s1);
    console.log(s);
  }

  const HandleUpdate = (e) => {
    e.preventDefault();
    let status_atividade = informacoes.status_atividade;
    let id_coord_usuario = getUser();
    let nome_atividade = informacoes.nome_atividade;
    console.log(status_atividade, id_coord_usuario, nome_atividade);

    if (nome_atividade === undefined || id_coord_usuario === undefined || status_atividade === undefined) {
      alert("Preencha todos os valores antes de aprovar!!");
      return;
    }

    try {
      api.put(`/atividade/avaliar/`, { nome_atividade, id_coord_usuario, status_atividade }).then(response => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="main-document">
      <div className="container">
        {
          props.vetor.map((element, index) => (
            <div>
              {/* Mostrar apenas atividades pendentes abaixo */}
              {(element.status_atividade === "pendente") ? (
                <div className="card-doc card text-center" id="card" key={index}>
                  <h3 className="card-header document-bkg noselect" style={{ background: 'var(--primary)' }}>Atividade Extracurricular</h3>
                  <div className="card-body">
                    <div className="row">
                      <div className="col text-center noselect">
                        <p name="id_atividade" value={element.id_atividade}>{element.nome_atividade}</p>
                      </div>
                      <hr />
                    </div>
                    <div className="row">
                      <div className="col">
                        <h3><p className="noselect">Informações do Aluno:</p></h3>
                        <div className="table-responsive">
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
                    </div>
                    {(props.isCord === true) ?
                      <div className="buttonsEdit">
                        <div className="container">
                          <div className="row">
                            <form onSubmit={HandleUpdate}>
                              <div className="col">
                                <label>
                                  Digite o nome da atividade para confirmar:
                                </label>
                                <input className="docInput" name="nome_atividade" onChange={setInformacoesForm} />
                              </div>
                              <div className="col">
                                <li className="form-check">
                                  <input className="form-check-input" type="radio" name="status_atividade" id="bRadios1" value="aprovado" onChange={setInformacoesForm} />
                                  <label className="form-check-label" htmlFor="bRadios1">
                                    Aprovado
                                  </label>
                                </li>
                                <li className="form-check">
                                  <input className="form-check-input" type="radio" name="status_atividade" id="bRadios2" value="reprovado" onChange={setInformacoesForm} />
                                  <label className="form-check-label" htmlFor="bRadios2">
                                    Reprovado
                                  </label>
                                </li>
                              </div>
                              <div className="col btnDoc">
                                <button button type="submit" className="btn btnSubmitApprove" id="toggleBtn">Avaliar</button>
                              </div>
                            </form>
                          </div>
                          <div className="row">
                            <div className="col btnDoc">
                              <a type="button" className="btn btnSubmit2" id="toggleBtn" onClick={() => handleDownload(String(element.url_atividade))}>Download</a>
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
              ) : ""}
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
                    <div className="table-responsive">
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
                </div>
                {(props.isCord) ?
                  <div className="buttonsEdit">
                    <div className="container">
                      <div className="row">
                        <div className="col btnDoc">
                          <button type="button" className="btn btnSubmit2" id="toggleBtn" onClick={() => handleDownload(String(element.url_atividade))}>Download</button>
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
                    <div className="table-responsive">
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
                </div>
                {(props.isCord) ?
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
                          <button type="button" className="btn btnSubmit2" id="toggleBtn" onClick={() => handleDownload(String(element.url_atividade))}>Download</button>
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