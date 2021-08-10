import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Import dos componentes.
import Login from "./pages/login/loginPage";
import LoginAdmin from "./pages/loginAdmin/loginAdmin";
import Menu from "./pages/menu/menu";
import MenuAdmin from './pages/menuAdmin/menuAdmin';

// Import da api.
//import PrivateRoute from './components/auth/privateRoutes';
//import { isAuthenticated } from './auth';

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

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={LoginAdmin} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/menuAdmin" component={MenuAdmin} />
            <Route exact path="/" component={Menu} />
            
            <Route path="*" component={() => <h1>Page not Found</h1>} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}
