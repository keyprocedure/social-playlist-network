// // app/signUp/page.js DEPRECATED

// "use client";
// import React, { useState } from "react";
// import Head from "next/head";
// import Navbar from "../components/navbar";

// export default function SignUp() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [bio, setBio] = useState("");
//   const [status, setStatus] = useState("");
//   const [userImage, setUserImage] = useState("");

//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username || !email || !password || !birthday) {
//       alert("All fields are necessary.");
//       return;
//     }

//     try {
//       const response = await signUpApi(email, username, password, birthday);

//       if (response.success) {
//         alert("User created successfully. Please log in.");

//         // Redirect to the login page
//         router.push("/login");
//       } else {
//         // Handle registration errors (e.g., user already exists)
//         alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.log("An unexpected error happened", error);
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Sign-Up</title>
//       </Head>
//       <Navbar />
//       <div
//         style={{
//           margin: "20px",
//           backgroundColor: "rgba(255, 255, 255, .75)",
//           padding: "20px",
//           textAlign: "center",
//         }}
//       >
//         <h2>Need an account? Sign up below!</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email">Email: </label> {/* New email input field */}
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <br></br>
//           <div>
//             <label htmlFor="userImage">User Image: </label>
//             <input
//               type="file"
//               id="userimage"
//               value={userImage}
//               onChange={(e) => setUserImage(e.target.value)}
//             />
//           </div>
//           <br></br>
//           <div>
//             <label htmlFor="username">Username: </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <br />
//           <div>
//             <label htmlFor="password">Password: </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <br />
//           <div>
//             <label htmlFor="birthday">Birthday: </label>
//             <input
//               type="date"
//               id="birthday"
//               value={birthday}
//               onChange={(e) => setBirthday(e.target.value)}
//             />
//           </div>
//           <br />
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </>
//   );
// }
