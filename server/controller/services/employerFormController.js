const EmployerForm = require('../../models/services/CareerManPower/employerModel');
const { getFileByFilename, uploadFileToS3, getLink} = require('../../config/s3function')

const submitForm = async (req, res) => {
    try {
        const {
            name,
            fathername,
            aadhar,
            tenMark,
            twelveMark,
            jobpost,
            jobexp,
            address,
            company,
            city,
            state,
            country,
            mobile,
            email,
            zip,
            pastSalary,
            expectedSalary,
            hobbies,
            gst,
            pan,
        } = req.body;

        const resumeFile = getFileByFilename(req.files, 'resume');
        const profileFile = getFileByFilename(req.files, 'profilePhoto');
        const aadharFile = getFileByFilename(req.files, 'aadhar');

        const cvUrl = (await uploadFileToS3(resumeFile));
        const profileUrl = (await uploadFileToS3(profileFile));
        const aadharUrl = (await uploadFileToS3(aadharFile));

        // Create a new instance of the EmployerForm model
        const employer = new EmployerForm({
            name,
            fathername,
            aadhar,
            tenMark,
            twelveMark,
            jobpost,
            jobexp,
            address,
            company,
            city,
            state,
            country,
            mobile,
            email,
            zip,
            pastSalary,
            expectedSalary,
            hobbies,
            gst,
            pan,
            cvUrl,
            profileUrl,
            aadharUrl,
        });

        const savedForm = await employer.save();

        res.status(200).json({
            success: true,
            message: "Form submitted successfully",
            data: savedForm,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while submitting the form",
            error: error.message,
        });
    }
};

// Controller for getting all forms
const getAllForms = async (req, res) => {
    try {
        const forms = await EmployerForm.find().select('name jobexp country expectedSalary createdAt');
        res.json(forms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Controller for getting a single form
const getSingleForm = async (req, res) => {
    try {
        const { id } = req.params;
        let form = await EmployerForm.findById(id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        form.cvUrl = await getLink(form.cvUrl)
        form.profileUrl = await getLink(form.profileUrl)
        form.aadharUrl = await getLink(form.aadharUrl)
        res.json(form);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {
    submitForm,
    getAllForms,
    getSingleForm,
};