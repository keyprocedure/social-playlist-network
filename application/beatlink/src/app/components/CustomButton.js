import React from "react";
// import { Button } from "@/components/ui/Button";
// import "./css/CustomButton.css";

export function CustomButton({ text, onClick }) {
    return <button type="button" className="btn btn-dark" onClick={onClick}>{text}</button>
}