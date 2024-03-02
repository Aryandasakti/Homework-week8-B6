const express = require('express');
const router = express.Router();
const categoryRouter = require("./category.route.js")


router.use("/api/categorys", categoryRouter);




module.exports = router;