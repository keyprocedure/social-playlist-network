import React from "react";
// import { Button } from "@/components/ui/Button";
// import "./css/CustomButton.css";

export function CustomButton({ text, onClick, className }) {
    return <button type="button" className={className || "btn btn-dark"} onClick={onClick}>{text}</button>
}