import React from "react";

const TextInput = ({
  input,
  width,
  type,
  className,
  disabled,
  placeholder,
  label,
  meta: { touched, error }
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={className + " control"}>
        <input
          {...input}
          className={touched && !!error ? "is-6 input is-danger is-size-6" : "input is-size-6"}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
      {touched && error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default TextInput;
