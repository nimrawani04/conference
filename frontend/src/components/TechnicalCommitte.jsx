// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";

// function TechnicalCommittee() {
//   const [committee, setCommittee] = useState({});

//   useEffect(() => {
//     fetch("/committee.json")
//       .then((res) => res.json())
//       .then((data) => {
//         // Filter members by committee_type
//         const filtered = data.filter(
//           (member) =>
//             member.committee_type &&
//             member.committee_type.trim().toLowerCase() === "technical committee"
//         );

//         // Group filtered members by sub_committe (section)
//         const grouped = {};
//         filtered.forEach((member) => {
//           if (!grouped[member.sub_committe]) grouped[member.sub_committe] = [];
//           grouped[member.sub_committe].push(member);
//         });

//         setCommittee(grouped);
//       })
//       .catch((err) => console.error("Error loading committee.json:", err));
//   }, []);

//   return (
//     <>
//       <Navbar />

//       {/* Conference Header */}
//       <div className="relative z-10 text-center sm:px-8 w-auto space-y-4 text-[#0a0908] bg-black/50 text-white rounded-xl p-6 mt-25 ">
//         {/* Title */}
//         <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg">
//           2026 International Conference on Applied Artificial Intelligence (2AI)
//         </h1>

//         {/* Dates */}
//         <p className="text-lg sm:text-xl lg:text-2xl font-regular drop-shadow-md">
//           June 17 - 19, 2026
//         </p>

//         {/* Location */}
//         <p className="text-sm sm:text-lg lg:text-xl leading-relaxed drop-shadow-md ">
//           at {"  "}
//           <a
//             href="https://www.cukashmir.ac.in/"
//             target="_blank"
//             rel="noreferrer"
//             className="text-blue-300 underline hover:text-blue-400"
//           >
//             Central University of Kashmir, India
//           </a>{" "}
//           in collaboration with{"   "}
//           <a
//             href="https://www.ai-research-lab.org/"
//             target="_blank"
//             rel="noreferrer"
//             className="text-blue-300 underline hover:text-blue-400"
//           >
//             AI Research University of South Dakota (USA)
//           </a>
//         </p>
//       </div>

//       {/* main section */}
//       <section className="mb-4 py-8 bg-gradient-to-b from-gray-50 to-white">
//         <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
//           Technical Committee
//         </h2>
//         <p className="font-medium text-red-600 flex justify-center text-xl">will be displayed soon</p>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
//           {Object.entries(committee).map(([section, members], idx) => (
//             <div key={idx}>
//               <h3 className="text-2xl md:text-3xl font-medium text-blue-800 mb-8 border-l-4 border-blue-600 pl-4">
//                 {section && section.trim() !== "" && section !== "null"
//                   ? section
//                   : "Members"}
//               </h3>

//               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                 {members.map((member, i) => (
//                   <div
//                     key={i}
//                     className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-start"
//                   >
//                     <h4 className="text-lg font-medium text-gray-900">
//                       {member.name}
//                     </h4>
//                     {member.role && member.role.trim() !== "" && (
//                       <p className="text-blue-700 font-regular text-sm mb-1">
//                         {member.role}
//                       </p>
//                     )}
//                     {member.organization && member.organization.trim() !== "" && (
//                       <p className="text-gray-600 text-sm">{member.organization}</p>
//                     )}
//                     {member.country && member.country.trim() !== "" && (
//                       <p className="text-gray-500 text-xs mt-1">{member.country}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

// export default TechnicalCommittee;




// {/* from here the code can be used when backend , mysql and excel sheet is connected */ }

// // import React, { useEffect, useState } from "react";
// // import Navbar from "./Navbar";
// // import { apiUrl } from "../config/api";

// // function TechnicalCommittee() {
// //   const [committee, setCommittee] = useState({});

// //   useEffect(() => {
// //     fetch(apiUrl("/api/technical-committee"))
// //       .then((res) => res.json())
// //       .then((data) => {
// //         // Group members by sub_committe (section)
// //         const grouped = {};
// //         data.forEach((member) => {
// //           if (!grouped[member.sub_committe]) grouped[member.sub_committe] = [];
// //           grouped[member.sub_committe].push(member);
// //         });
// //         setCommittee(grouped);
// //       });
// //   }, []);

// //   return (
// //     <>
// //       <Navbar />
// //       <section className="mt-10 py-16 bg-gradient-to-b from-gray-50 to-white mt-18">
// //         <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
// //           Technical Committee
// //         </h2>

// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
// //           {Object.entries(committee).map(([section, members], idx) => (
// //             <div key={idx}>
// //               <h3 className="text-2xl md:text-3xl font-medium text-blue-800 mb-8 border-l-4 border-blue-600 pl-4">
// //                 {section && section.trim() !== "" && section !== "null"
// //                   ? section
// //                   : "Members"}
// //               </h3>

// //               {/* Responsive grid */}
// //               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
// //                 {members.map((member, i) => (
// //                   <div
// //                     key={i}
// //                     className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-start"
// //                   >
// //                     {/* Name */}
// //                     <h4 className="text-lg font-medium text-gray-900">
// //                       {member.name}
// //                     </h4>

// //                     {/* Role (if not empty) */}
// //                     {member.role && member.role.trim() !== "" && (
// //                       <p className="text-blue-700 font-regular text-sm mb-1">
// //                         {member.role}
// //                       </p>
// //                     )}

// //                     {/* Organization (if not empty) */}
// //                     {member.organization &&
// //                       member.organization.trim() !== "" && (
// //                         <p className="text-gray-600 text-sm">
// //                           {member.organization}
// //                         </p>
// //                       )}

// //                     {/* Country (if not empty) */}
// //                     {member.country && member.country.trim() !== "" && (
// //                       <p className="text-gray-500 text-xs mt-1">
// //                         {member.country}
// //                       </p>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
// //     </>
// //   );
// // }

// // export default TechnicalCommittee;
