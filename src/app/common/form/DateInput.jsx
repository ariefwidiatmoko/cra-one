import React from "react";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.min.css";

const DateInput = ({
  input: { value, onChange, onBlur },
  width,
  minDate,
  label,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <DatePicker
          {...rest}
          className="input"
          placeholderText={placeholder}
          minDate={minDate}
          selected={
            value
              ? Object.prototype.toString.call(value) !== "[object Date]"
                ? parseISO(value)
                : value
              : new Date()
          }
          onChange={value => onChange(value)}
          onBlur={(e, val) => onBlur(val)}
          onChangeRaw={e => e.preventDefault()}
        />
      </div>
      {touched && error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default DateInput;
