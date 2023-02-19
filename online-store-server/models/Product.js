const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: { type: String, required: true },
    url: String,
    description: String,
    price: String,
    benefits: { type: [String]},
    category: { type: Schema.Types.ObjectId, ref: "Category"}
});

module.exports = model("Product", schema);