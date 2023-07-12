// import { useEffect, useState } from "react";
// import Sidebar from "../../../../../Sidebar";
// import Header from "../../../../../Header";
// import { useNavigate } from "react-router-dom";

// const CompanyList = () => {
//     const [forms, setForms] = useState([]);
//     const navigate = useNavigate();
//     useEffect(() => {
//         // Fetch data from the API
//         fetch("http://localhost:5000/apiTender/services/ccert/certification")
//             .then((response) => response.json())
//             .then((data) => setForms(data))
//             .catch((error) => console.log(error));
//     }, []);

//     import React, { useEffect, useState } from "react";
// import Sidebar from "../../../../../Sidebar";
// import Header from "../../../../../Header";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { faArrowRight, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// const CompanyList = () => {
//   const [forms, setForms] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [formsPerPage] = useState(10);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch data from the API
//     fetch("http://localhost:5000/apiTender/services/ccert/certification")
//       .then((response) => response.json())
//       .then((data) => setForms(data))
//       .catch((error) => console.log(error));
//   }, []);

//   function deleteCompanyDetails() {
//     fetch(`http://localhost:5000/apiTender/services/ccert/certification/${id}`, {
//       method: 'DELETE',
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data)
//         setForms(forms.filter((form) => form._id !== id));
//       })
//       .catch((error) => console.log(error));
//   }

//   const formatReceivedAt = (dateString) => {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//     return formattedDate;
//   };

//   const viewDetails = (id) => {
//     navigate(`/dashboard/companyrequests/${id}`)
//   };

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const previousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const nextPage = () => {
//     const totalPages = Math.ceil(forms.length / formsPerPage);
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       {/* Content area */}
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-auto">
//         <main>
//           {/* Site header */}
//           <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//           <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//             <h1 className="text-xl font-bold mb-4">Company Requests</h1>

//             {/* Table */}
//             <div className="overflow-hidden rounded-lg border shadow-2xl">
//               <table className="min-w-full divide-y py-3 divide-gray-200 table-fixed">
//                 <thead className="bg-gray-200">
//                   <tr>
//                     <th className="py-4 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
//                       Company Name
//                     </th>
//                     <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
//                       Company Profile
//                     </th>
//                     <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
//                       Contact Number
//                     </th>
//                     <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
//                       Working Field
//                     </th>
//                     <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
//                       Received At
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {forms
//                     .slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage)
//                     .map((form) => (
//                       <tr key={form._id}>
//                         <td
//                           className="py-2 px-4 font-medium whitespace-nowrap border-b cursor-pointer w-1/5"
//                           onClick={() => viewDetails(form._id)}
//                         >
//                           {form.companyName}
//                         </td>
//                         <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
//                           {form.companyProfile}
//                         </td>
//                         <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
//                           {form.contactNumber}
//                         </td>
//                         <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
//                           {form.workingField}
//                         </td>
//                         <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
//                           {formatReceivedAt(form.createdAt)}
//                         </td><td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/10">
//                           <button
//                             className="text-blue-500 hover:text-blue-700"
//                             onClick={() => viewDetails(form._id)}
//                           >
//                             <FontAwesomeIcon icon={faEdit} />
//                           </button>
//                         </td>
//                         <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/10">
//                           <button
//                             className="text-red-500 hover:text-red-700"
//                             onClick={() => deleteCompanyDetails(form._id)}
//                           >
//                             <FontAwesomeIcon icon={faTrash} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>

//               <div className="flex justify-between px-4 py-3 bg-gray-100 border-t border-gray-200 sm:px-6">
//                 <div className="flex items-center">
//                   <button
//                     className="px-3 py-1 rounded-full focus:outline-none focus:shadow-outline-purple"
//                     onClick={previousPage}
//                     disabled={currentPage === 1}
//                   >
//                     <FontAwesomeIcon icon={faArrowLeft} />
//                   </button>
//                   <span className="px-2 text-sm">{currentPage}</span>
//                   <button
//                     className="px-3 py-1 rounded-full focus:outline-none focus:shadow-outline-purple"
//                     onClick={nextPage}
//                     disabled={
//                       currentPage ===
//                       Math.ceil(forms.length / formsPerPage)
//                     }
//                   >
//                     <FontAwesomeIcon icon={faArrowRight} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CompanyList;

//     const formatReceivedAt = (dateString) => {
//         const date = new Date(dateString);
//         const formattedDate = date.toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//         });
//         return formattedDate;
//     };

//     const viewDetails = (id) => {
//         navigate(`/dashboard/companyrequests/${id}`)
//     }

//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     return (
//         <div className="flex h-screen overflow-hidden">
//             {/* Sidebar */}
//             <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//             {/* Content area */}
//             <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-auto">
//                 <main>
//                     {/* Site header */}
//                     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//                     <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//                         <h1 className="text-xl font-bold mb-4">Company Requests</h1>

//                         {/* Table */}
//                         <div className="shadow overflow-hidden rounded-lg border">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-50">
//                                     <tr>
//                                         <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
//                                             Company Name
//                                         </th>
//                                         <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
//                                             Company Profile
//                                         </th>
//                                         <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
//                                             Contact Number
//                                         </th>
//                                         <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
//                                             Working Field
//                                         </th>
//                                         <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer border-b">
//                                             Received At
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {forms.map((form) => (
//                                         <tr key={form._id}>
//                                             <td className="py-2 px-4 whitespace-nowrap border-b cursor-pointer" onClick={() => viewDetails(form._id)}>
//                                                 {form.companyName}
//                                             </td>
//                                             <td className="py-2 px-4 whitespace-nowrap border-b">
//                                                 {form.companyProfile}
//                                             </td>
//                                             <td className="py-2 px-4 whitespace-nowrap border-b">
//                                                 {form.contactNumber}
//                                             </td>
//                                             <td className="py-2 px-4 whitespace-nowrap border-b">
//                                                 {form.workingField}
//                                             </td>
//                                             <td className="py-2 px-4 whitespace-nowrap border-b">
//                                                 {formatReceivedAt(form.createdAt)}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>

//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default CompanyList;

import React, { useEffect, useState } from "react";
import Sidebar from "../../../../../Sidebar";
import Header from "../../../../../Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowRight,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const CompanyList = () => {
  const [forms, setForms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5000/apiTender/services/ccert/certification")
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.log(error));
  }, []);

  function deleteCompanyDetails(id) {
    fetch(
      `http://localhost:5000/apiTender/services/ccert/certification/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setForms(forms.filter((form) => form._id !== id));
      })
      .catch((error) => console.log(error));
  }

  const formatReceivedAt = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  const viewDetails = (id) => {
    navigate(`/dashboard/companyrequests/${id}`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(forms.length / formsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const downloadAsExcel = () => {
    const selectedData = forms.map((form) => ({
      "Company Name": form.companyName,
      "Company Profile": form.companyProfile,
      "Contact Number": form.contactNumber,
      "Working Field": form.workingField,
      "Received At": formatReceivedAt(form.createdAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Company Requests");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "company-requests.xlsx");
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    const tableData = forms.map((form) => [
      form.companyName,
      form.companyProfile,
      form.contactNumber,
      form.workingField,
      formatReceivedAt(form.createdAt),
    ]);

    doc.autoTable({
      head: [
        ["Company Name", "Company Profile", "Contact Number", "Working Field", "Received At"],
      ],
      body: tableData,
    });

    doc.save("company-requests.pdf");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-auto">
        <main>
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Company Requests</h1>

            {/* Download buttons */}
            <div className="flex justify-end mb-4">
              <button
                className="bg-green-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 mr-2"
                onClick={downloadAsExcel}
              >
                Download Excel
              </button>
              <button
                className="bg-red-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                onClick={downloadAsPDF}
              >
                Download PDF
              </button>
            </div>
            {/* Table */}
            <div className="overflow-hidden rounded-lg border shadow-2xl">
              <table className="min-w-full divide-y py-3 divide-gray-200 table-fixed">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-4 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
                      Company Name
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
                      Company Profile
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
                      Contact Number
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
                      Working Field
                    </th>
                    <th className="py-3 px-6 text-left text-md text-gray-900 font-bold uppercase tracking-wider border-b w-1/5">
                      Received At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {forms
                    .slice(
                      (currentPage - 1) * formsPerPage,
                      currentPage * formsPerPage
                    )
                    .map((form) => (
                      <tr key={form._id}>
                        <td
                          className="py-2 px-4 font-medium whitespace-nowrap border-b cursor-pointer w-1/5"
                          onClick={() => viewDetails(form._id)}
                        >
                          {form.companyName}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
                          {form.companyProfile}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
                          {form.contactNumber}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
                          {form.workingField}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/5">
                          {formatReceivedAt(form.createdAt)}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/10">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => viewDetails(form._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap font-medium border-b w-1/10">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteCompanyDetails(form._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="flex justify-between px-4 py-3 bg-gray-100 border-t border-gray-200 sm:px-6">
                <div className="flex items-center">
                  <button
                    className="px-3 py-1 rounded-full focus:outline-none focus:shadow-outline-purple"
                    onClick={previousPage}
                    disabled={currentPage === 1}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <span className="px-2 text-sm">{currentPage}</span>
                  <button
                    className="px-3 py-1 rounded-full focus:outline-none focus:shadow-outline-purple"
                    onClick={nextPage}
                    disabled={
                      currentPage === Math.ceil(forms.length / formsPerPage)
                    }
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyList;
