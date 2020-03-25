import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { composeValidators, combineValidators, isRequired } from "revalidate";
import TextInput from "../../common/form/TextInput";
import SelectInput from "../../common/form/SelectInput";
import DateInput from "../../common/form/DateInput";

const validate = combineValidators({
  displayName: composeValidators(
    isRequired({ message: "Display Name is required" })
  )()
});

const gender = [
  { key: 1, text: "Male", value: "male" },
  { key: 2, text: "Female", value: "female" }
];

class ProfileBasic extends Component {
  render() {
    const {
      pristine,
      submitting,
      handleSubmit,
      updateProfile,
      loading
    } = this.props;

    return (
      <form autoComplete="off" onSubmit={handleSubmit(updateProfile)}>
        <div className="field is-horizontal">
          <div className="field-body">
            <Field
              label="Display Name"
              name="name"
              type="text"
              component={TextInput}
              placeholder="Display Name"
              className="is-expanded"
            />
            <Field
              label="Full Name"
              name="fullname"
              type="text"
              component={TextInput}
              placeholder="Full Name"
              className="is-expanded"
            />
          </div>
        </div>
        <Field
          label="Gender"
          name="gender"
          type="text"
          component={SelectInput}
          placeholder="Select Gender"
          options={gender}
        />
        <Field
          label="Date of Birth"
          name="dob"
          type="date"
          component={DateInput}
          placeholder="Select Date"
          showMonthDropdown
          showYearDropdown
        />
        <Field
          label="Address"
          name="address"
          type="text"
          component={TextInput}
          placeholder="Address"
        />
        <Field
          label="Phone Number"
          name="phone"
          type="tel"
          component={TextInput}
          placeholder="Phone Number"
        />
        <div
          className="field is-grouped"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <div className="control">
            <button
              type="submit"
              disabled={submitting || pristine}
              className={
                loading
                  ? "button is-primary is-small is-rounded is-outlined is-loading"
                  : "button is-primary is-small is-rounded is-outlined"
              }
            >
              Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "profileBasic",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(ProfileBasic);
