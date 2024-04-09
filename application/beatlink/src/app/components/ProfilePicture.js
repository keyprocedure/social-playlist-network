import React from "react";
import "./css/ProfilePicture.css";
import Image from "next/image";

export function ProfilePicture({ src, width, height, className }) {
  if (src) {
    return (
      <Image className={className} src={src} alt={"Profile Picture"} width={width} height={height} />
    );
  } else {
    return <DefaultProfilePicture width={width} height={height} />;
  }
}

function DefaultProfilePicture({ width, height }) {
  return (
    <svg
      className="default-profile-pic"
      width={width || "38px"}
      height={height || "39px"}
      viewBox="0 0 38 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.2597 31.4149C25.2303 29.0888 22.2817 27.625 19 27.625C15.7183 27.625 12.7695 29.0888 10.7401 31.4149M19 34.125C11.1299 34.125 4.75 27.5772 4.75 19.5C4.75 11.4228 11.1299 4.875 19 4.875C26.8701 4.875 33.25 11.4228 33.25 19.5C33.25 27.5772 26.8701 34.125 19 34.125ZM19 22.75C16.3766 22.75 14.25 20.5674 14.25 17.875C14.25 15.1826 16.3766 13 19 13C21.6234 13 23.75 15.1826 23.75 17.875C23.75 20.5674 21.6234 22.75 19 22.75Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
