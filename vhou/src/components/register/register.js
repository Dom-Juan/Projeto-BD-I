import React, { useState, useEffect } from 'react';

// Import de libs de react
import 'bootstrap/dist/css/bootstrap.min.css';
import { customAlphabet } from 'nanoid'

// Import de API
import api from '../../pages/api';

// Import de CSS.
import '../login/login.css';
import '../../misc/animations.css';
import '../../misc/misc.css';

const nanoid = customAlphabet('1234567890', 3);

const RegisterComponent = (props) => {
  // Variáveis declaradas.
  const [pagina, setPagina] = useState("0");
  const [info, setInfo] = useState({});
  const [g, setGrad] = useState(["bacharelado", "doutorado", "mestrado"]);
  const [cursosPegos, setCursosPegos] = useState([]);
  const [entidadesPegas, setEntidadesPegas] = useState([]);
  const [selectedGrad, setSelectedGrad] = useState("");
  const [selectedCurso, setSelectedCurso] = useState("");
  const [selectedEntidade, setSelectedEntidade] = useState("");
  const [text, setText] = useState("");

  // Troca o calor do graduação conforme o usuário digita.
  const setGraduacaoAluno = (e) => {
    e.persist(e);
    setSelectedGrad(g[e.target.value]);
    console.log(selectedGrad);
  }

  // Troca o calor do curso conforme o usuário digita.
  const setCursoAluno = (e) => {
    e.persist(e);
    setSelectedCurso(e.target.value);
    console.log(selectedCurso);
  }

  const setEntidadeAluno = (e) => {
    e.persist(e);
    setSelectedEntidade(e.target.value);
    console.log(selectedEntidade);
  }


  // Troca as informações do cadastro conforme seus valores e info pegada do usuário.
  const setInformacoes = (e) => {
    e.persist(e);
    setInfo(info => ({
      ...info,
      [e.target.name]: e.target.value
    })
    );
  };

  useEffect(() => {
    getCursos();
    getEntidades();
  }, []);

  async function getCursos() {
    await api.get(`/curso/todos`).then(response => {
      setCursosPegos(response.data.cursos);
    });
  }

  async function getEntidades() {
    await api.get(`entidade/todas`).then(response => {
      setEntidadesPegas(response.data.entidades);
    });
  }

  // Enviar o formulário para o servidor.
  async function HandleSubmit(e) {
    e.preventDefault();

    // Info do usuário.
    if (typeof info.nome_usuario === 'undefined' || typeof selectedCurso === 'undefined' || typeof selectedEntidade === 'undefined') {
      setText("Preença as informações antes");
      return;
    }

    let id_usuario = nanoid(3);
    let nome_usuario = info.nome_usuario;
    let curso = selectedCurso;
    let tipo_usuario = "aluno";
    let email_usuario = info.email_usuario;
    let senha = info.senha;
    // Info do aluno.
    let ra_aluno = info.ra_aluno;
    let nome_aluno = info.nome_aluno;
    let nome_ent_acad_aluno = selectedEntidade;
    let ano_nascimento_aluno = info.ano_nascimento_aluno;
    let curso_aluno = selectedCurso;
    let tipo_usuario_aluno = "1";
    let tipo_grad_aluno = selectedGrad;

    // Verifica se houve algum erro na senha.
    if (info.senha === info.confirme_senha) {
      try {
        console.log("Registrando usuário...");

        // Colocando na rota que cria um usuário primeiro e depois um aluno.
        api.post(`/user/cadastro`, { // post enviando um pedido de post para o server.
          id_usuario,
          nome_usuario,
          curso,
          tipo_usuario,
          email_usuario,
          senha,
          ra_aluno,
          nome_aluno,
          nome_ent_acad_aluno,
          ano_nascimento_aluno,
          curso_aluno,
          tipo_usuario_aluno,
          tipo_grad_aluno
        }).then(response => {
          console.log(response);
        });
        setText("Cadastro realizado!!");
      } catch (error) {
        console.error(error);
      }
    } else {
      setText("As senhas não são iguais.");
    }
  }

  // HTML e CSS renderizado.
  return (
    <form action="" id="registerForm" className={`${(props.showCad === false) ? "nodisplay" : "showdisplay animadoCimaParaBaixo"}`}>
      <h3 className="text-center noselect">Cadastro</h3>
      <div className={`${(pagina === "1") ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`}>
        <div className="input-group mb-3 form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="Usuário" aria-label="Usuário" name="nome_usuario" onChange={setInformacoes} />
          <label htmlFor="floatingInput">Usuário</label>
        </div>
        <div className="input-group mb-3 form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="Email" aria-label="Email" name="email_usuario" onChange={setInformacoes} />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="input-group mb-3 form-floating">
          <input type="password" className="form-control" id="floatingInput" placeholder="Senha" aria-label="Senha" name="senha" onChange={setInformacoes} />
          <label htmlFor="floatingInput">Senha</label>
        </div>
        <div className="input-group mb-3 form-floating">
          <input type="password" className="form-control" id="floatingInput" placeholder="Confirme a senha" aria-label="Senha" name="confirme_senha" onChange={setInformacoes} />
          <label htmlFor="floatingInput">Confirme a senha</label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={() => setPagina("1")} id="btnSubmit" value="1">Próximo</button>
        </div>
      </div>
      <div className={`${(pagina === "0") ? "nodisplay" : "showdisplay animadoDireitaParaEsquerda"}`}>
        <div className="input-group mb-3 form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="registro do aluno" aria-label="registro do aluno" name="ra_aluno" onChange={setInformacoes} />
          <label htmlFor="floatingInput">Insira seu RA</label>
        </div>
        <div className="input-group mb-3 form-floating">
          <input type="text" className="form-control" id="floatingInput" placeholder="Nome" aria-label="Nome" name="nome_aluno" onChange={setInformacoes} />
          <label htmlFor="floatingInput">Nome</label>
        </div>
        <div className="input-group mb-3 form-floating">
          <input type="date" className="form-control" id="floatingInput" aria-label="dada nascimento" name="ano_nascimento_aluno" onChange={setInformacoes} />
          <label htmlFor="floatingInput">Data de nascimento</label>
        </div>
        <div className="input-group mb-3">
          <select className="form-select c-input" aria-label="Escolha a sua graduação" name="tipo_grad_aluno" onChange={setGraduacaoAluno}>
            <option value={undefined}>Escolha uma graduação... </option>
            <option value={0}>Bacharelado</option>
            <option value={1}>Doutorado</option>
            <option value={2}>Mestrado</option>
          </select>
        </div>
        <div className="input-group mb-3">
          <select className="form-select c-input" aria-label="Escolha o seu curso" name="curso_aluno" onChange={setCursoAluno}>
            <option value={undefined}>Escolha seu curso...</option>
            {
              cursosPegos.map((element, index) => {
                return (<option value={element.nome_curso} key={index}>{element.nome_curso}</option>);
              })
            }
          </select>
        </div>
        <div className="input-group mb-3">
          <select className="form-select c-input" aria-label="Escolha o seu curso" name="curso_aluno" onChange={setEntidadeAluno}>
            <option value={undefined}>Escolha sua entidade acadêmica...</option>
            {
              entidadesPegas.map((element, index) => {
                return (<option value={element.nome_ent_acad} key={index}>{element.nome_ent_acad}</option>);
              })
            }
          </select>
        </div>
        <div className="btn-group">
          <button type="button" className="btnSubmit2 input-margin" onClick={() => setPagina("0")}>Voltar</button>
          <button type="submit" className="btnSubmitApprove input-margin" onClick={HandleSubmit} data-bs-toggle="modal" data-bs-target="#msgModal">Registrar-se</button>
        </div>
      </div>
      <div className="modal fade" id="msgModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">CACIC - V.H.O.U.</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              {text}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btnSubmitClose" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default RegisterComponent;