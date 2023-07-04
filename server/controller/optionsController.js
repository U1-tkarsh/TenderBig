const optionsModel = require('../models/optionsModel');
const { toTitleCase } = require("../config/functions");

const optionsController = {
    insertSectors: async (req, res) => {
        try {
            const { sectors } = req.body;
            const sectorsTitleCase = sectors.map(toTitleCase);

            const updatedModel = await optionsModel.findOneAndUpdate({}, { $push: { sectors: { $each: sectorsTitleCase } } }, { new: true, upsert: true });

            res.json(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    insertProducts: async (req, res) => {
        try {
            const { products } = req.body;
            const productsTitleCase = products.map(toTitleCase);

            const updatedModel = await optionsModel.findOneAndUpdate({}, { $push: { products: { $each: productsTitleCase } } }, { new: true, upsert: true });

            res.json(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    insertDepartments: async (req, res) => {
        try {
            const { departments } = req.body;
            const departmentsTitleCase = departments.map(toTitleCase);

            const updatedModel = await optionsModel.findOneAndUpdate({}, { $push: { departments: { $each: departmentsTitleCase } } }, { new: true, upsert: true });

            res.json(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    insertCategories: async (req, res) => {
        try {
            const { categories } = req.body;
            const categoriesTitleCase = categories.map(toTitleCase);

            const updatedModel = await optionsModel.findOneAndUpdate({}, { $push: { categories: { $each: categoriesTitleCase } } }, { new: true, upsert: true });

            res.json(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    removeSector: async (req, res) => {
        try {
            const { value } = req.params;

            const updatedModel = await optionsModel.findOneAndUpdate({}, { $pull: { sectors: value } }, { new: true });

            res.json(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    removeProduct: async (req, res) => {
        try {
            const { value } = req.params;

            const updatedModel = await optionsModel.findOneAndUpdate({}, { $pull: { products: value } }, { new: true });

            res.json(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    removeDepartment: async (req, res) => {
        try {
            const { value } = req.params;

            const updatedModel = await optionsModel.findOneAndUpdate({}, { $pull: { departments: value } }, { new: true });

            res.json(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    removeCategory: async (req, res) => {
        try {
            const { value } = req.params;

            const updatedModel = await optionsModel.findOneAndUpdate({}, { $pull: { categories: value } }, { new: true });

            res.json(updatedModel);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getAllOptions: async (req, res) => {
        try {
            const { array } = req.query;

            let result;

            switch (array) {
                case 'sectors':
                    result = await optionsModel.find({}, 'sectors');
                    break;
                case 'products':
                    result = await optionsModel.find({}, 'products');
                    break;
                case 'departments':
                    result = await optionsModel.find({}, 'departments');
                    break;
                case 'categories':
                    result = await optionsModel.find({}, 'categories');
                    break;
                default:
                    result = await optionsModel.find({});
            }

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = optionsController;