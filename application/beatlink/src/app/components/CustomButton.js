import React from "react";
// import { Button } from "@/components/ui/Button";
import "./css/CustomButton.css";

export function CustomButton({ text }) {
    return <button type="button" className="btn btn-dark">{text}</button>
}