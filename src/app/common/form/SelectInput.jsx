import React from "react";

const SelectInput = ({
  input,
  label,
  type,
  placeholder,
  multiple,
  options,
  meta: { touched, error }
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={touched && !!error ? "control is-danger" : "control"}>
        <div className="select">
          <select value={input.value} onChange={input.onChange} placeholder={placeholder} multiple={multiple} >
            <option value="">Select {label}</option>
            {options &&
              options.map(item => (
                <option key={item.key} value={item.value}>{item.text}</option>
              ))}
          </select>
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export default SelectInput;
