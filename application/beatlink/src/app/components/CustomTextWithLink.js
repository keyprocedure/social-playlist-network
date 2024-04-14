import React from "react";

export default function CustomTextWithLink({ labelText, href, linkText }) {
  return (
    <>
      <span>
        {labelText}
        <a href={href}>{linkText}</a>
      </span>
    </>
  );
}
