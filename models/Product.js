const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, "name is required"], trim: true },
    category: {
        type: String,
        required: [true, "category is required"],
        enum: [
            "tops",
            "bottoms",
            "dresses",
            "housewear",
            "outerwear",
            "accessories",
            "underwear",
        ],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: [1, "price must be greater than 0"],
    },
    inStock: { type: Boolean, default: true },
    size: {
        type: String,
        required: [true, "size is required"],
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
}, { timestamps: true }, );

module.exports = mongoose.model("Product", productSchema);