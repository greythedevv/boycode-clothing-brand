const mongoose = require("mongoose");
const Product = require("../models/Product");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.getAllClothing = async(req, res, next) => {
    try {
        const { category, inStock } = req.query;

        const filter = {};

        if (category) {
            filter.category = String(category).toLowerCase();
        }

        if (inStock !== undefined) {
            filter.inStock = String(inStock) === "true";
        }

        const items = await Product.find(filter).sort("-createdAt");

        res.status(200).json({ count: items.length, data: items });
    } catch (err) {
        next(err);
    }
};

exports.getClothingById = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid clothing item id" });
        }

        const item = await Product.findById(id);

        if (!item) {
            return res.status(404).json({ message: "Clothing item not found" });
        }

        res.status(200).json(item);
    } catch (err) {
        next(err);
    }
};

exports.createClothingItem = async(req, res, next) => {
    try {
        const { name, category, size, price, inStock } = req.body;

        if (!name || !category || price === undefined || !size) {
            return res.status(400).json({
                message: "name, category, size, and price are required",
            });
        }

        const created = await Product.create({
            name,
            category: String(category).toLowerCase(),
            size: String(size).toUpperCase(),
            price,
            inStock: inStock !== undefined ? inStock : true,
        });

        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

exports.updateClothingItem = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid clothing item id" });
        }

        const { name, category, size, price, inStock } = req.body;

        if (!name || !category || price === undefined || !size) {
            return res.status(400).json({
                message: "name, category, size, and price are required",
            });
        }

        const updated = await Product.findByIdAndUpdate(
            id, {
                name,
                category: String(category).toLowerCase(),
                size: String(size).toUpperCase(),
                price,
                inStock: inStock !== undefined ? inStock : true,
            }, { new: true, runValidators: true },
        );

        if (!updated) {
            return res.status(404).json({ message: "Clothing item not found" });
        }

        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

exports.partialUpdateClothingItem = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid clothing item id" });
        }

        const update = {...req.body };

        if (update.category !== undefined) {
            update.category = String(update.category).toLowerCase();
        }

        if (update.size !== undefined) {
            update.size = String(update.size).toUpperCase();
        }

        const updated = await Product.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ message: "Clothing item not found" });
        }

        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

exports.deleteClothingItem = async(req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid clothing item id" });
        }

        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Clothing item not found" });
        }

        res.status(200).json({ message: "Clothing item deleted successfully" });
    } catch (err) {
        next(err);
    }
};