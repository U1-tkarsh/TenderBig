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

const IndividualList = () => {
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
    fetch(`${BASE_URL}/services/icert/certification`, { headers })
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.log(error));
  }, []);

  function deleteFormDetails(id) {
    fetch(
      `${BASE_URL}/services/icert/certification/${id}`,
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
    navigate(`/dashboard/individualrequests/${id}`);
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
    const selectedData = forms
      .slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage)
      .map((form) => ({
        Name: form.name,
        Address: form.address,
        "Contact Number": form.mobileNumber,
        "Working Field": form.workingField,
        "Received At": formatReceivedAt(form.createdAt),
      }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Forms");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const filename = "forms.xlsx";
    saveAs(data, filename);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    const tableData = forms
      .slice((currentPage - 1) * formsPerPage, currentPage * formsPerPage)
      .map((form) => [
        form.name,
        form.address,
        form.mobileNumber,
        form.workingField,
        formatReceivedAt(form.createdAt),
      ]);

    doc.autoTable({
      head: [
        ["Name", "Address", "Contact Number", "Working Field", "Received At"],
      ],
      body: tableData,
    });

    doc.save("forms.pdf");
  };

  return (
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <h1 className="mb-4 text-xl font-bold">Individual Requests</h1>
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
                      Name
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
                    <th className="w-1/5 px-6 py-3 font-bold tracking-wider text-left text-gray-900 uppercase border-b text-md">
                      Action
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
                          {form.name}
                        </td>
                        <td className="w-1/5 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.mobileNumber}
                        </td>
                        <td className="w-1/5 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {form.workingField}
                        </td>
                        <td className="w-1/5 px-4 py-2 font-medium border-b whitespace-nowrap">
                          {formatReceivedAt(form.createdAt)}
                        </td>
                        <td className="px-4 py-2 font-medium border-b whitespace-nowrap w-1/10">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteFormDetails(form._id)}
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

export default IndividualList;
