import React from "react";
import { ProfilePicture } from "../ProfilePicture";
import "../css/ProfileCard.css";

export function ProfileCard({
  imageSrc,
  primaryText,
  secondaryText,
  primaryTextColor,
  secondaryTextColor,
  className,
}) {
  return (
    <div className="grid-container">
      <div className="profile-picture">
        <ProfilePicture className={className} width={50} height={50} src={imageSrc} />
      </div>
    
      <div
        className="primary-text small-text"
        style={{ color: primaryTextColor }}
      >
        {primaryText}
      </div>
      <div
        className="secondary-text small-text"
        style={{ color: secondaryTextColor }}
      >
        {secondaryText}
      </div>
    </div>
  );
}
