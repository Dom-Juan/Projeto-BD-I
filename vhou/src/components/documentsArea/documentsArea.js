import React, { useState, useEffect, useRef, useCallback } from 'react';

// Import de libs de react
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import FileSaver from 'file-saver';
import fileDownload from 'js-file-download';
import { useForm } from "react-hook-form";

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
  // Setando os componentes.
  const [vetor, setVetor] = useState([]);
  const componentRef = useRef();
  const [filtro, setFiltro] = useState();
  // Variáveis de arquivos e informações.
  const [s, setAval] = useState();
  const [informacoes, setInformacoes] = useState({});
  const [text, setText] = useState();
  const [fileName, setFileName] = useState('Esperando um arquivo a ser enviado...');
  const { file, handleSubmit } = useForm();
  const [id, setId] = useState();

  // Variáveis para o fetch do banco de dados.
  const [cursosPegos, setCursosPegos] = useState([]);
  const [horasPegas, setHorasPegas] = useState([]);

  // Pegando informações do banco de dados.
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

  // Pegando informações do banco de dados.

  // Renderizando no componente as informações.
  useEffect(() => {
    getCursos();
    getHorasComplementares();
    setFiltro(props.filter);
    setVetor(props.vetor);
  }, [props.vetor, props.filter]);

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

  const AddID = (event, id_atividade) => {
    setId(id_atividade);
  }

  // Update de status.
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
      api.put(`/atividade/avaliar/`,
        {
          nome_atividade,
          id_coord_usuario,
          status_atividade
        }).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectFile(event) {
    event.preventDefault();
    if (event.target && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  }

  /* Edição de atividade */
  const onSubmit = (event) => {
    let dataParaOBanco = {};
    let dataForm = new FormData(event.currentTarget);
    event.preventDefault();
    console.log(fileName);
    for (let [key, value] of dataForm.entries()) {
      console.log(key, value);
      dataParaOBanco[key] = value;
    }
    console.log(dataParaOBanco);
    console.log(dataForm);

    try {
      console.log("Atualizando Atividade...");

      // Colocando na rota que cria um usuário primeiro e depois um aluno.
      api.put(`/atividade/editar`, dataForm).then(response => {
        console.log(response);
      });
      setText("Atividade atualizada!");
    } catch (error) {
      console.error(error);
    }
  }

  const HandleDelete = (event, id_atividade, nome_atividade) => {
    console.log(id_atividade, nome_atividade);
    let obj = {
      id_atividade: id_atividade,
      nome_atividade: nome_atividade
    }
    try {
      api.delete('/atividade/deletar',
        {
          data: obj
        }
      ).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      });
      setVetor(vetor.filter(item => item.id_atividade !== id_atividade));
      setText("Atividade deletada com sucesso!");
    } catch (error) {
      console.log(error);
      setText(error.msg);
    }
  }

  return (
    <div id="main-document">
      <div className="container">
        {
          vetor.filter((element) => {
            if(element === "")
              return element;
            else if(element.nome_atividade.toLowerCase().includes(filtro.toLowerCase())) {
              return element;
            }
          }).map((element, index) => (
            <div key={element.id_atividade}>
              {/* Mostrar apenas atividades pendentes abaixo */}
              {(element.status_atividade === "pendente") ? (
                <div className="card-doc card text-center" id="card" ref={componentRef}>
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
                      :
                      <div className="container">
                        <br></br>
                        <div className="row">
                          <div className="col-6">
                            <button className="btn btnSubmit2" onClick={(event) => AddID(event, element.id_atividade)}data-bs-toggle="modal" data-bs-target="#editModalAtividade">Editar</button>
                          </div>
                          <div className="col-6">
                            <button className="btn btnSubmitClose" onClick={(event) => HandleDelete(event, element.id_atividade, element.nome_atividade)} data-bs-toggle="modal" data-bs-target="#responseModal">Excluir</button>
                          </div>
                        </div>
                      </div>
                    }

                  </div>
                  <div className={`${(element.status_atividade === 'pendente' ? "card-footer text-muted noselect bg-warning" : element.status_atividade === 'reprovado' ? "card-footer text-muted noselect bg-danger" : "card-footer text-muted noselect bg-success")}`}>
                    <p className="text-center" style={{ color: 'white' }}>{element.status_atividade}</p>
                  </div>
                </div>
              ) : ""}
            </div>
          ))
        }
        <div className="modal fade" id="responseModal" tabIndex="-1" aria-labelledby="responseModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <h5 className="modal-title text-center" id="responseModalLabel">{text}</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btnSubmitClose" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="editModalAtividade" tabIndex="-1" aria-labelledby="editModalAtividade" aria-hidden="true">
        <div className="modal-dialog">
          <form id="documents-form" onSubmit={onSubmit} method="post" encType="multipart/form-data">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edição</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div id="main-document" className="modal-body">
                <div className="container">
                  <div className="col-auto input-group mb-3">
                    <label>Id Atividade</label>
                    <input id="modalInput" name="id_atividade" value={id}></input>
                    <p>Não altere esse valor.</p>
                  </div>
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
    </div>
  );
}

const DocumentsApproved = (props) => {
  const [vetor, setVetor] = useState(props.vetor);
  const [filtro, setFiltro] = useState("");
  const componentRef = useRef();

  const isCord = useState(props.isCord === true ? true : false);


  useEffect(() => {
    setVetor(props.vetor);
    setFiltro(props.filter);
  }, [props.vetor, props.filter]);

  return (
    <div id="main-document">
      <div className="container">
        {
          vetor.filter((element) => {
            if(element === "")
              return element;
            else if(element.nome_atividade.toLowerCase().includes(filtro.toLowerCase())) {
              return element;
            }
          }).map((element, index) => (
            <div key={index}>
              {(element.status_atividade !== "pendente" ?

                <div className="card-doc card text-center" id="card" key={index} ref={componentRef}>
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
                  <div className={`${(element.status_atividade === 'pendente' ? "card-footer text-muted noselect bg-warning" : element.status_atividade === 'reprovado' ? "card-footer text-muted noselect bg-danger" : "card-footer text-muted noselect bg-success")}`}>
                    <p className="text-center" style={{ color: 'white' }}>{element.status_atividade}</p>
                  </div>
                </div>
                :
                ''
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export { DocumentsSent, DocumentsApproved };