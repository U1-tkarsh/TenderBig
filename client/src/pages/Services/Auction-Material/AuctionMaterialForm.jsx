import React, { useState } from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import Step1 from './Steps/TenderDetails';
import Step2 from './Steps/WorkExperience';
import Step3 from './Steps/DirectorDetails';
import Step4 from './Steps/CompanyInfo';
import Step5 from './Steps/AuctionMaterial';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const AuctionMaterialForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;
  const gaps = totalSteps - 1; // Number of gaps between steps
  const progress = Math.round((currentStep / gaps) * 100);
  const [formData, setFormData] = useState({
    // 1. Tender Details
    tenderNumber: '',
    tenderLink: '',
    companyName: '',
    cinReg: '',
    gst: '',
    pan: '',
    // 2. Work Experience
    workExperience: [],
    // 3. Director Details
    directors: [
      {
        directorName: '',
        directorAadhar: '',
        directorPan: '',
        directorDob: '',
        directorFatherName: '',
      },
    ],
    // Company Information
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    website: '',
    projectMailId: '',
    contactPersonName: '',
    contactPersonNumber: '',
    // Auction Material
    auctionMaterial: [],
    otherDescription: '',
  });

  const stepNames = [
    'Tender Details',
    'Work Experience',
    'Director Details',
    'Company Information',
    'Auction Material',
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const updatedFiles = Array.from(files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedFiles,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic
    // e.g., send form data to server
    console.log(formData);

    // Reset form data and current step
    setFormData({
      tenderNumber: '',
      tenderLink: '',
      companyName: '',
      cinReg: '',
      gst: '',
      pan: '',
      workExperience: [],
      directors: [
        {
          directorName: '',
          directorAadhar: '',
          directorPan: '',
          directorDob: '',
          directorFatherName: '',
        },
      ],
      address: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      website: '',
      projectMailId: '',
      contactPersonName: '',
      contactPersonNumber: '',
      auctionMaterial: [],
      otherDescription: '',
    });
    setCurrentStep(0);
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-3xl mx-auto mt-6 px-4 py-8 mb-6 shadow-2xl rounded-lg">
      <div className="m-10">
        <ProgressBar
          percent={progress}
          filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >
          {stepNames.map((_, index) => (
            <Step key={index}>
              {({ accomplished }) => (
                <div className={`step ${accomplished ? 'completed' : null}`} />
              )}
            </Step>
          ))}
        </ProgressBar>

        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <Step1
              formData={formData}
              handleChange={handleChange}
              handleNext={handleNext}
            />
          )}

          {currentStep === 1 && (
            <Step2
              formData={formData}
              handleChange={handleChange}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              handleFileChange={handleFileChange}
            />
          )}

          {currentStep === 2 && (
            <Step3
              formData={formData}
              handleChange={handleChange}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              setFormData={setFormData}
            />
          )}

          {currentStep === 3 && (
            <Step4
              formData={formData}
              handleChange={handleChange}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          )}

          {currentStep === 4 && (
            <Step5
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handlePrevious={handlePrevious}
            />
          )}

        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AuctionMaterialForm;

