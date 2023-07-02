import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FileUpload from "../file-uploading/FileUpload";
import JointVenture3 from "./JointVenture3";


const JointVenture2 = () => {
    const [formData, setFormData] = useState({
        summary: "",
        sector: "",
        PANnumber: "",
        pnumber: "",
        name: "",
        aadhar: "",
        companyaddress1: "",
        companyaddress2: "",
        companycity: "",
        zipcode: "",
        tendername: "",
        CIN: "",
        webAddress: "",
        GSTnumber: "",
        workratio: "",
        userCategory: "",
        TotalValuation: "",
        CRegnumber: "",
        country: "",
        state: "",
        city: "",
        procurementSummarySummary: "",
        procurementSummaryDeadline: "",
        noticeType: "",
        totNo: "",
        documentNo: "",
        competition: "",
        financier: "",
        ownership: "",
        tenderValue: "",
        purchaser: "",
        paddress: "",
        pcity: "",
        pdistrict: "",
        pstate: "",
        ppin: "",
        ptelfax: "",
        email: "",
        url: "",
        description: "",
        organization: "",
        tenderDetailNoticeType: "",
    });

    const clearInputs = () => {
        setFormData({
            summary: "",
            sector: "",
            PANnumber: "",
            pnumber: "",
            name: "",
            CIN: "",
            companyaddress1: "",
            companyaddress2: "",
            companycity: "",
            zipcode: "",
            tendername: "",
            CRegnumber: "",
            webAddress: "",
            aadhar: "",
            GSTnumber: "",
            workratio: "",
            userCategory: "",
            TotalValuation: "",
            country: "",
            state: "",
            city: "",
            procurementSummarySummary: "",
            procurementSummaryDeadline: "",
            noticeType: "",
            totNo: "",
            documentNo: "",
            competition: "",
            financier: "",
            ownership: "",
            tenderValue: "",
            purchaser: "",
            paddress: "",
            pcity: "",
            pdistrict: "",
            pstate: "",
            ppin: "",
            ptelfax: "",
            email: "",
            url: "",
            description: "",
            organization: "",
            tenderDetailNoticeType: "",
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        const token = localStorage.getItem("token");

        const requestBody = JSON.stringify(formData);

        fetch("/apiTender/tenderdetails/add-tender", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: token,
            },
            body: requestBody,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                alert("Submitted")
                clearInputs();
                window.location.href = '/forms';
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Oops something went wrong!!!");
                clearInputs();
                window.location.href = '/forms';
            });
    };

    const [currentPage, setCurrentPage] = useState(2);

    const nextPage = () => {
        setCurrentPage(3);
    };
    const previousPage = () => {
        setCurrentPage(1);
    };

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto mt-6 px-4 py-8 mb-6 shadow-2xl rounded-lg">
                {currentPage === 2 && (
                    <form onSubmit={handleSubmit}>
                        {/* Global Section */}
                        <h2 className="text-2xl font-bold mb-4">Personal details</h2>
                        <label className="block mb-2 font-semibold relative">
                            Full Name
                            <span className="text-red-700 relative top-0 right-0">*</span>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                placeholder="Name"
                            />
                        </label>

                        <label className="block mb-2 font-semibold relative">
                            Father Name
                            <span className="text-red-700 relative top-0 right-0">*</span>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                        </label>

                        <label className="block mb-2 font-semibold relative">
                            Director / Company Post
                            <span className="text-red-700 relative top-0 right-0">*</span>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                        </label>

                        <label className="block mb-2 font-semibold relative">
                            Email
                            <span className="text-red-700 relative top-0 right-0">*</span>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                        </label>

                        <label className="block mb-2 font-semibold relative">
                            Contact Number
                            <span className="text-red-700 relative top-0 right-0">*</span>
                            <input
                                required
                                type="number"
                                name="pnumber"
                                value={formData.pnumber}
                                onChange={handleChange}
                                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                            />
                        </label>

                        <label className="block mb-2 font-semibold relative">
                            16-Digit Aadhar Number
                            <span className="text-red-700 relative top-0 right-0">*</span>
                            <input
                                required
                                type="text"
                                name="aadhar"
                                value={formData.aadhar}
                                onChange={handleChange}
                                className="border rounded-sm px-3 py-2 mt-1 w-full text-black bg-gray-100 focus:border-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none"
                                placeholder="Aadhar Number"
                            />
                        </label>

                        <div>
                            <p className="font-bold">Upload you passport size photo</p>
                        </div>
                        <FileUpload />
                        <button
                            type="button"
                            onClick={nextPage}
                            className="bg-red-700 text-white px-4 py-2 mt-8 rounded hover:bg-red-800"
                        >
                            Next
                        </button>
                    </form>
                )}

                {currentPage === 3 && (
                    <form onSubmit={handleSubmit}>
                        <JointVenture3
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            previousPage={previousPage}
                        />
                    </form>
                )}
            </div>
            <Footer />
        </>
    )
};

export default JointVenture2;



































