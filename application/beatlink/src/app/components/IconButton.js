import React from "react";
import "./css/IconButton.css";
import { IconContext } from "react-icons";


export function IconButton({ icon, onClick, contextValues }) {
    return (
        <IconContext.Provider value={contextValues}>
            <button onClick={onClick} className="icon-button" >
                {icon}
            </button>
        </IconContext.Provider>
    );
}