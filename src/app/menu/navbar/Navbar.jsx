import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SideMenu from "../sidemenu/SideMenu";
import { postAuthLogout } from "../../api/authApi";

const mapState = state => ({
  auth: state.auth,
  loading: state.async.loading,
  elementName: state.async.elementName
});

const actions = {
  authLogout: postAuthLogout
};

export class Navbar extends Component {
  state = {
    isTogglerActive: false,
    isNavTogglerActive: false
  };
  // Toggle Sidemenu
  handleToggler = () => {
    this.setState({
      isTogglerActive: !this.state.isTogglerActive
    });
    console.log(this.state.isTogglerActive);
  };
  // Toggle Navbar Menu
  handleNavToggler = prevState => {
    this.setState({
      isNavTogglerActive: !this.state.isNavTogglerActive
    });
    console.log(this.state.isNavTogglerActive);
  };

  render() {
    const { auth, location, history, authLogout, loading, elementName } = this.props;
    const { isTogglerActive, isNavTogglerActive } = this.state;
    return (
      <Fragment>
        <nav className="navbar is-fixed-top box-shadow-y">
          <div className="navbar-brand">
            <div onClick={this.handleToggler} className="navbar-burger toggler">
              <span />
              <span />
              <span />
            </div>
            <Link
              to="/"
              className="navbar-item is-size-6 has-text-info has-text-weight-semibold"
            >
              <i className="fas fa-meteor icon" /> Light Dashboard
            </Link>
            <div
              onClick={this.handleNavToggler}
              className="navbar-burger nav-toggler"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          {auth.isAuth === true && (
            <div
              className={
                isNavTogglerActive === true
                  ? "navbar-menu is-active has-background-white"
                  : "navbar-menu has-background-white"
              }
            >
              <div className="navbar-end">
                <div className="navbar-item has-dropdown is-hoverable">
                  <div href="/" className="navbar-item hand-pointer">
                    <i className="fas fa-bell icon" />
                  </div>
                  <div className="navbar-dropdown is-right">
                    <a href="/" className="navbar-item">
                      <span style={{ marginRight: 5 }}>Notifications</span>
                      <span className="badge-notification is-size-7">
                        4 New
                      </span>
                    </a>
                    <a href="/" className="navbar-item">
                      Messages{" "}
                      <i className="is-invisible fas fa-circle icon has-text-info" />
                    </a>
                  </div>
                </div>
                <div className="navbar-item has-dropdown is-hoverable">
                  <div to="/dashboard" className="navbar-item hand-pointer">
                    <i className="fas fa-user-circle icon" />
                    <span className="is-size-7 is-capitalized">
                      {auth.name}
                    </span>
                  </div>
                  <div className="navbar-dropdown is-right">
                    <Link
                      to={`/profile/${auth.userId}`}
                      className={
                        // this.handleActiveLink() === true
                        //   ? "navbar-item is-active"
                        //   :
                        "navbar-item"
                      }
                    >
                      Profile
                    </Link>
                    <a href="/" className="navbar-item">
                      Settings
                    </a>
                    <hr className="navbar-divider" />
                    {loading === true && elementName === "logoutNav" ? (
                      <button disabled="true" className="button is-loading is-text is-small">
                        Logout
                      </button>
                    ) : (
                      <Fragment>
                        <div
                          onClick={() => authLogout(auth.userId, "logoutNav")}
                          className="navbar-item hand-pointer"
                        >
                          Logout
                        </div>
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
        {auth.isAuth === true && (
          <SideMenu
            toggler={isTogglerActive}
            auth={auth}
            logout={authLogout}
            loading={loading}
            elementName={elementName}
            pathname={location.pathname}
            history={history}
          />
        )}
      </Fragment>
    );
  }
}

export default withRouter(connect(mapState, actions)(Navbar));
