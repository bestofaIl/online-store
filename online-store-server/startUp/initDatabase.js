const Category = require("../models/Category");
const categoryMock = require("../mock/categories.json");

const Product = require("../models/Product");
const productMock = require("../mock/products.json");

module.exports = async () => {
    const category = await Category.find();

    if (category.length !== categoryMock.length) {
        console.log("another");
        await createInitialEntity(Category, categoryMock);
    }

    const product = await Product.find();
    if (product.length !== productMock.length) {
        await createInitialEntity(Product, productMock);
    }
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async item => {
            try {
                const newItem = Model(item);
                await newItem.save();
                return newItem;
            } catch (e) {
                return e;
            }
        })
    )
}