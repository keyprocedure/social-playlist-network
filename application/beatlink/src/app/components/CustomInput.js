import React from "react";
import "./css/CustomInput.css";

export function CustomInput({
  placeholderText,
  type,
  name,
  className,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholderText}
      name={name}
      className={className}
      aria-label={placeholderText}
      aria-describedby={`${placeholderText}-input`}
      onChange={onChange}
    ></input>
  );
}
