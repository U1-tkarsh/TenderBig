import React, { useEffect, useState } from "react";
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
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const CompanyList = () => {
  const [forms, setForms] = useState([]);
  const token = localStorage.getItem('token');

const headers = {
      'auth': token
    };

  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch(`${BASE_URL}/services/ccert/certification`, { headers })
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.log(error));
  }, []);

  function deleteCompanyDetails(id) {
    fetch(
      `${BASE_URL}/services/ccert/certification/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth:token
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
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
      "Contract Person Name": form.contractPName,
      Email: form.email,
      GST: form.gst,
      PAN: form.pan,
      "Request License": form.requestLicense,
      "Working Field": form.workingField,
      "Selected Positions": form.selectedPositions,
      Website: form.website,
      "Document URL": form.docUrl,
      "PAN URL": form.panUrl,
      "GST URL": form.gstUrl,
      Others: form.others,
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
      form.contractPName,
      form.email,
      form.gst,
      form.pan,
      form.requestLicense,
      form.workingField,
      form.selectedPositions,
      form.website,
      form.docUrl,
      form.panUrl,
      form.gstUrl,
      form.others,
      formatReceivedAt(form.createdAt),
    ]);
  
    doc.setFontSize(8);
  
    doc.autoTable({
      head: [
        [
          "Company Name",
          "Company Profile",
          "Contact Number",
          "Contract Person Name",
          "Email",
          "GST",
          "PAN",
          "Request License",
          "Working Field",
          "Selected Positions",
          "Website",
          "Document URL",
          "PAN URL",
          "GST URL",
          "Others",
          "Received At",
        ],
      ],
      body: tableData,
    });
  
    doc.save("company-requests.pdf");
  };
  
  return (
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <h1 className="mb-4 text-xl font-bold">Company Requests</h1>

            {/* Download buttons */}
            <div className="flex justify-end mb-4">
              <button
                className="px-4 py-2 mr-2 font-bold text-white bg-green-700 rounded focus:outline-none focus:ring-2"
                onClick={downloadAsExcel}
              >
                Download Excel
              </button>
              {/* <button
                className="px-4 py-2 font-bold text-white bg-red-700 rounded focus:outline-none focus:ring-2"
                onClick={downloadAsPDF}
              >
                Download PDF
              </button> */}
            </div>
            {/* Table */}
            <div className="overflow-hidden border rounded-lg shadow-2xl">
              <table className="min-w-full py-3 divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="w-1/5 px-6 py-4 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                      Company Name
                    </th>
                    <th className="w-1/5 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                      Company Profile
                    </th>
                    <th className="w-1/5 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                      Contact Number
                    </th>
                    <th className="w-1/5 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                      Working Field
                    </th>
                    <th className="w-1/5 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
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
                          className="w-1/5 px-4 py-2 font-medium border-b cursor-pointer whitespace-nowrap"
                          onClick={() => viewDetails(form._id)}
                        >
                          {form.companyName}
                        </td>
                        <td className="w-1/5 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.companyProfile}
                        </td>
                        <td className="w-1/5 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.contactNumber}
                        </td>
                        <td className="w-1/5 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.workingField}
                        </td>
                        <td className="w-1/5 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {formatReceivedAt(form.createdAt)}
                        </td>
                        <td className="px-4 py-2 font-medium border-b whitespace-nowrap w-1/10">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => viewDetails(form._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </td>
                        <td className="px-4 py-2 font-medium border-b whitespace-nowrap w-1/10">
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
  );
};

export default CompanyList;
