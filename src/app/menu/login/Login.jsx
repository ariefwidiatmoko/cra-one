import React, { Component, Fragment } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  combineValidators,
  isRequired,
  composeValidators,
  createValidator
} from "revalidate";
import { reduxForm, Field } from "redux-form";
import CustomTextInput from "../../common/form/CustomTextInput";
import LoginPicture from "../../../images/meteor.png";
import { postAuthLogin } from "../../api/authApi";
import { bindActionCreators } from "redux";
// MapStatetoProps
const mapState = state => ({
  auth: state.auth,
  loading: state.async.loading
});
// MapDispatchtoProps
const actions = dispatch =>
  bindActionCreators(
    {
      authLogin: postAuthLogin
    },
    dispatch
  );
// *** end ***
// Validation
const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  "Invalid email address"
);

const validate = combineValidators({
  email: composeValidators(
    isRequired({ message: "Email is required" }),
    isValidEmail
  )(),
  password: isRequired({ message: "Password is required" })
});
// *** end ***
class Login extends Component {
  handleLogin = async authData => {
    await this.props.authLogin(authData);
  };
  render() {
    const { handleSubmit, auth, error, loading } = this.props;
    if (auth.isAuth === true) return <Redirect to="/dashboard" />;
    return (
      <Fragment>
        <section className="hero is-fullheight" style={{ marginTop: -52 }}>
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-one-quarter-tablet is-one-quarter-desktop is-one-third-widescreen is-one-third-fullhd"></div>
                <div className="column is-full-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd is-centered">
                  <div className="box">
                    <div className="media">
                      <div className="media-left">
                        <figure
                          className="image is-128x128"
                          style={{ marginTop: "2.4em" }}
                        >
                          <img src={LoginPicture} alt="Login" />
                        </figure>
                      </div>
                      <div className="media-content">
                        <div className="content">
                          <div className="title">Login</div>
                          <form
                            onSubmit={handleSubmit(this.handleLogin)}
                            autoComplete="off"
                          >
                            <Field
                              name="email"
                              type="text"
                              component={CustomTextInput}
                              placeholder="Insert email"
                              autoComplete="new-password"
                              label="Email"
                              icon="envelope"
                            />
                            <Field
                              name="password"
                              type="password"
                              autoComplete="new-password"
                              component={CustomTextInput}
                              placeholder="Your password"
                              label="Password"
                              icon="lock"
                            />
                            <div className="field" style={{ marginTop: 25 }}>
                              {error && (
                                <p className="help is-danger">{error}</p>
                              )}
                              <button
                                type="submit"
                                disabled={loading}
                                style={{ marginRight: 10 }}
                                className={
                                  loading
                                    ? "button is-link is-small is-rounded is-outlined is-loading"
                                    : "button is-link is-small is-rounded is-outlined"
                                }
                              >
                                Submit
                              </button>
                              <Link
                                to="/signup"
                                disabled={loading}
                                className="button is-text is-small is-rounded is-outlined has-text-link"
                                style={{
                                  textDecoration: "none",
                                  marginLeft: 15
                                }}
                              >
                                Sign Up
                              </Link>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(mapState, actions)(reduxForm({ form: "formLogin", validate })(Login))
);
