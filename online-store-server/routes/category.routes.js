const express = require("express");
const router = express.Router({ mergeParams: true });
const Category = require("../models/Category");

router.get("/", async (req, res) => {
    try {
        const list = await Category.find();
        res.status(200).send(list);
    } catch (e) {
        res.send(e);
    }
})

module.exports = router;
