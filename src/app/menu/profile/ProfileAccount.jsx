import React, { Component, Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  hasLengthGreaterThan,
  matchesField,
  isRequired
} from "revalidate";
import TextInput from "../../common/form/TextInput";

const validate = combineValidators({
  newPassword1: composeValidators(
    isRequired({ message: "Please enter a password" }),
    hasLengthGreaterThan(5)({
      message: "Password needs to be at least 6 characters"
    })
  )(),
  newPassword2: composeValidators(
    isRequired({ message: "Please confirm your new password" }),
    matchesField("newPassword1")({ message: "Password do not match" })
  )()
});

class ProfileAccount extends Component {
  render() {
    const {
      error,
      pristine,
      invalid,
      submitting,
      handleSubmit,
      profile,
      updatePassword
    } = this.props;

    return (
      <Fragment>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <div className="custom-input">{profile.email || "Email"}</div>
          </div>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit(updatePassword)}>
          <div className="field is-horizontal">
            <div className="field-body">
              <Field
                label="New Password"
                name="newPassword1"
                type="password"
                component={TextInput}
                placeholder="New Password"
                className="is-expanded"
              />
              <Field
                label="Confirm Password"
                name="newPassword2"
                type="password"
                component={TextInput}
                placeholder="Confirm Password"
                className="is-expanded"
              />
            </div>
          </div>
          {error && <p className="help is-danger">{error}</p>}
          <div
            className="field is-grouped"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            <div className="control">
              <button
                type="submit"
                disabled={submitting || invalid || pristine}
                className={
                  submitting
                    ? "button is-primary is-small is-rounded is-outlined is-loading"
                    : "button is-primary is-small is-rounded is-outlined"
                }
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default reduxForm({
  form: "profileAccount",
  validate
})(ProfileAccount);
