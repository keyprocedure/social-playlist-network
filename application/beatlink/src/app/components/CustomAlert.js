import React from "react";

export default function CustomAlert({ text, type, className = "" }) {
  return (
    <>
      <div className={`alert alert-${type} ${className}`} role="alert">
        {text}
      </div>
    </>
  );
}
