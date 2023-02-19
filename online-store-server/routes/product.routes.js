const express = require("express");
const router = express.Router({mergeParams: true});
const Product = require("../models/Product");

router.get("/",async (req, res) => {
    try {
        const list = await Product.find();
        res.status(200).send(list);
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;