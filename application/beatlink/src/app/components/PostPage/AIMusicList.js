import React from "react";

export async function AIMusicList({ playlistObject }) {
  const musicResponse = await fetch("/api/songrecommendation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (
    <div>
      <h1>Music List</h1>
    </div>
  );
}
