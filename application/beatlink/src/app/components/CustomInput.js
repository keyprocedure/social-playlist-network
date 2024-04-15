import React from "react";
import "./css/CustomInput.css";

export function CustomInput({ placeholderText, type, className, onChange }) {
	return (
		<input
			type={type}
			placeholder={placeholderText}
			className={className}
			aria-label={placeholderText}
			aria-describedby={`${placeholderText}-input`}
			onChange={onChange}></input>
	);
}
