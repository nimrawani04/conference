// {/* this code can be used when backend , mysql and excel sheet is connected */ }

// import React, { useState } from "react";
// import { apiUrl } from "../config/api";

// function AdminUpload() {
//     const [file, setFile] = useState(null);
//     const [msg, setMsg] = useState("");

//     const handleUpload = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             setMsg("⚠️ Please select a file before uploading.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const res = await fetch(apiUrl("/api/upload-committee"), {
//                 method: "POST",
//                 body: formData,
//             });
//             const result = await res.json();
//             setMsg(result.success ? "✅ Upload successful!" : "❌ Upload failed.");
//         } catch (error) {
//             setMsg("❌ Server error. Please try again.");
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
//             <div className="text-center text-white px-4 mt-20">
//                 <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg text-[#001d3d]">
//                     2026 International Conference on Applied <br />
//                     Artificial Intelligence (2AI)
//                 </h1>
//                 <p className="text-lg sm:text-xl lg:text-xl font-regular drop-shadow-md mt-2 text-[#001d3d] ">
//                     June 2 - 4, 2025
//                 </p>
//                 <p className="text-sm sm:text-lg lg:text-xl leading-relaxed drop-shadow-md mt-2 text-[#001d3d]">
//                     at{" "}
//                     <a
//                         href="https://www.cukashmir.ac.in/"
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-300 underline hover:text-blue-400"
//                     >
//                         Central University of Kashmir, India
//                     </a>{" "}
//                     <br />
//                     in collaboration with{" "}
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

//             <div className="min-h-screen flex items-center justify-center pt-24">
//                 {/* pt-24 pushes below Navbar */}
//                 <form
//                     onSubmit={handleUpload}
//                     className="p-8 bg-white rounded-xl shadow-md w-full max-w-md"
//                 >
//                     <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
//                         Upload Committee Excel
//                     </h2>

//                     {/* Styled File Input */}
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-regular mb-2">
//                             Select Excel File
//                         </label>
//                         <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
//                             <input
//                                 type="file"
//                                 accept=".xlsx,.xls"
//                                 onChange={(e) => setFile(e.target.files[0])}
//                                 className="w-full text-gray-600 text-sm 
//                          file:mr-4 file:py-2 file:px-4 
//                          file:rounded-lg file:border-0 
//                          file:text-sm file:font-regular
//                          file:bg-blue-50 file:text-blue-700 
//                          hover:file:bg-blue-100 cursor-pointer"
//                             />
//                         </div>
//                         {file && (
//                             <p className="mt-2 text-sm text-green-600 font-medium">
//                                 📂 Selected: {file.name}
//                             </p>
//                         )}
//                     </div>

//                     {/* Upload Button */}
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-900 text-white py-2 rounded font-regular hover:bg-blue-800 transition"
//                     >
//                         Upload Excel
//                     </button>

//                     {/* Upload Status Message */}
//                     {msg && (
//                         <div className="mt-4 text-center text-sm font-medium text-gray-700">
//                             {msg}
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div >
//     );
// }

// export default AdminUpload;
