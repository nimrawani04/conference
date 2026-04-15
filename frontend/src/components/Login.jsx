// {/* this code can be used when backend , mysql and excel sheet is connected */ }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiUrl } from "../config/api";

// function Login({ setIsAdmin }) {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [msg, setMsg] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const res = await fetch(apiUrl("/api/login"), {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         });
//         const result = await res.json();
//         if (result.success) {
//             setIsAdmin(true);
//             navigate("/admin");
//         } else {
//             setMsg(result.msg || "Login failed");
//         }
//     };

//     return (
//         <div className="relative bg-gray-50 text-gray-500 flex flex-col min-h-screen md:py-2 mt-8"
//             style={{
//                 backgroundImage: "url('/Sammeer Wani 8768hu.jpg')",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//             }}>

//             {/* Conference Header */}
//             <div className="relative z-10 text-center sm:px-8 w-auto space-y-4 text-[#0a0908] bg-black/20 text-white rounded-xl p-6 mt-12 ">
//                 {/* Title */}
//                 <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg">
//                     2026 International Conference on Applied Artificial Intelligence (2AI)
//                 </h1>

//                 {/* Dates */}
//                 <p className="text-lg sm:text-xl lg:text-2xl font-regular drop-shadow-md">
//                     June 17 - 19, 2026
//                 </p>

//                 {/* Location */}
//                 <p className="text-sm sm:text-lg lg:text-xl leading-relaxed drop-shadow-md ">
//                     at {"  "}
//                     <a
//                         href="https://www.cukashmir.ac.in/"
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-300 underline hover:text-blue-400"
//                     >
//                         Central University of Kashmir, India
//                     </a>{" "}
//                     in collaboration with{"   "}
//                     <a
//                         href="https://www.ai-research-lab.org/"
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-300 underline hover:text-blue-400"
//                     >
//                         AI Research University of South Dakota (USA)
//                     </a>
//                 </p>
//             </div>

//             <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
//                 {/* Warning message */}
//                 <h1 className="mb-6 text-center text-red-600 font-bold text-xl sm:text-2xl">
//                     ⚠️ Only Admin can login as it is protected
//                 </h1>

//                 {/* Form */}
//                 <form
//                     onSubmit={handleSubmit}
//                     className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md"
//                 >
//                     <h2 className="text-xl sm:text-2xl font-medium mb-6 text-center text-blue-900">
//                         Admin Login
//                     </h2>

//                     {/* Username */}
//                     <div className="mb-4">
//                         <label className="block mb-1 font-regular text-gray-700">
//                             Username
//                         </label>
//                         <input
//                             type="text"
//                             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                             autoFocus
//                         />
//                     </div>

//                     {/* Password */}
//                     <div className="mb-6">
//                         <label className="block mb-1 font-regular text-gray-700">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     {/* Error message */}
//                     {msg && (
//                         <div className="mb-4 text-red-600 text-center text-sm">{msg}</div>
//                     )}

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-900 text-white py-2 rounded font-medium hover:bg-blue-800 transition text-sm sm:text-base"
//                     >
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;
