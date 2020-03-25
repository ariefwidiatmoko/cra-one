import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Navbar from "../menu/navbar/Navbar";
import Login from "../menu/login/Login";
import Dashboard from "../menu/dashboard/Dashboard";
import Profile from "../menu/profile/Profile";
import Testarea from "../menu/testarea/TestareaComponent";
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        {/* <ModalManager /> */}
        <Fragment>
          <Navbar />
          <Switch key={this.props.location.key}>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/testarea" component={Testarea} />
          </Switch>
        </Fragment>
      </Fragment>
    );
  }
}

export default withRouter(App);
