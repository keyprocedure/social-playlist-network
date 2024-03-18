import React from "react";
import Image from "next/image";
import Navbar from "../components/navbar";


export default function Login() {
  return (
    <>
      <Navbar />
      <div style={{ margin: "20px", backgroundColor: "rgba(255, 255, 255, 0.75)", padding: "20px", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="images/alligator.jpg" alt="" style={{width: "250px", height: "250px", marginRight: "100px", borderRadius: "50%"  }} />
            <div>
              <h1>Alli Gator</h1>
              <h4>San Francisco, CA</h4>
              <p>Just an alligator who likes listening to all kinds of music.</p>
              <button style={{padding: "7px", margin: "5px", width: "75px", background: "rgba(255, 255, 255, 0.75) ", border: "2px solid rgb(90, 40, 150)", color: "rgb(90, 40, 150)"}}>Hip-Hop</button>
              <button style={{padding: "7px", margin: "5px", width: "75px", background: "rgba(255, 255, 255, 0.75) ", border: "2px solid rgb(90, 40, 150)", color: "rgb(90, 40, 150)"}}>Techno</button>
              <button style={{padding: "7px", margin: "5px", width: "75px", background: "rgba(255, 255, 255, 0.75) ", border: "2px solid rgb(90, 40, 150)", color: "rgb(90, 40, 150)"}}>Country</button>
            </div>
          </div>
          <br></br>
          <hr style={{ width: "80%", border: "none", borderBottom: "5px solid rgba(0, 0, 0, 0.3)" }}></hr>
          <br></br>
          <button>Add +</button>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.75)", boxShadow: "1px 10px 30px", display: "flex", width: "70vw", border: "5px solid rgba(0, 0, 0, 0.5)", padding: "100px", margin: "auto", marginTop: "20px", borderRadius: "15px"}}>
            <p>No songs here yet, click '+' to import.</p>
          </div>
        </div>
      </div>
    </>
  );
}
