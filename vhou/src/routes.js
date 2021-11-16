import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Import dos componentes.
import Login from "./pages/login/loginPage";
import LoginAdmin from "./pages/loginAdmin/loginAdmin";
import Menu from "./pages/menu/menu";

// Componentes Admin.
import MenuAdmin from './pages/menuAdmin/menuAdmin';
import CadCoord from "./pages/cadCoordenador/cadCoord";
import CadCurso from "./pages/cadCurso/cadCurso";
import CadHoras from './pages/cadHoras/cadHoras';
import CadEntAcad from './pages/cadEntAcad/cadEntAcad';
//import FirstTimeLogin from "./pages/firstTimeLogin/firstTimeLogin";

// Import da api.
import { isAuthenticated } from './pages/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginToken: "",
      authed: "",
    };
  }

  //<PrivateRoute exact path="/adm" component={Adm} />
  //<Route exact path="/login/reset" component={Reset} />
  //<Route exact path="/login/first-time" component={FirstTimeLogin} />

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={LoginAdmin} />

            <PrivateRoute exact path="/menu" component={Menu} />
            <PrivateRoute exact path="/menuAdmin" component={MenuAdmin} />
            <PrivateRoute exact path="/cadastro/coordenadores" component={CadCoord} />
            <PrivateRoute exact path="/cadastro/curso" component={CadCurso} />
            <PrivateRoute exact path="/cadastro/entidades-academicas" component={CadEntAcad} />
            <PrivateRoute exact path="/cadastro/horas-complementares" component={CadHoras} />
            <PrivateRoute exact path="/" component={Menu} />
            
            <Route path="*" component={() => <h1>Page not Found</h1>} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}
