import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import SelectInput from "../../common/form/SelectInput";
import TextArea from "../../common/form/TextArea";
import MultiSelectInput from "../../common/form/MultiSelectInput";
import TextInput from "../../common/form/TextInput";

const validate = combineValidators({
  about: composeValidators(
    isRequired({ message: "Please fill in" }),
    hasLengthGreaterThan(10)({
      message: "Please fill in more than 10 characters"
    })
  )()
});

const status = [
  { key: 1, text: "Single", value: "single" },
  { key: 2, text: "Married", value: "married" },
  { key: 3, text: "Divorced", value: "divorced" }
];

const hobbies = ["Sport", "Music", "Movie", "Gaming", "Vacation", "Reading", "Adventure"];

class ProfileFormBasic extends Component {
  render() {
    const {
      pristine,
      submitting,
      updateProfile,
      handleSubmit,
      loading
    } = this.props;
    return (
      <form onSubmit={handleSubmit(updateProfile)} autoComplete="off">
        <Field
          name="about"
          type="text"
          component={TextArea}
          placeholder="Tell me more about you"
          label="About"
        />
        <Field
          label="Status"
          name="status"
          type="text"
          component={SelectInput}
          placeholder="Select Status"
          options={status}
        />
        <Field
          label="Occupation"
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="Occupation"
        />
        <Field
          label="Hobbies"
          name="hobbies"
          placeholder="Select Hobbies"
          component={MultiSelectInput}
          data={hobbies}
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
  form: "profileAbout",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(ProfileFormBasic);
