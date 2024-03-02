const express = require('express');
const router = express.Router();
const pool = require("../config/config.js")


router.get("/category", (req, res) => {

   
    const sql = `
        SELECT
            *
        FROM
            category
    `;
})

router.get("/category/:Id", (req, res) => {
    const categoryId = req.params.categoryId;

    const sql = `
        SELECT
            films.*
        FROM
            films
        INNER JOIN
            categories ON films.category_id = category.id
        WHERE
            category.id = $1
    `;

    pool.query(sql, [categoryId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

router.get("/categories", (req, res) => {
    const sql = `
        SELECT
            categories.id,
            categories.name,
            COUNT(films.id) AS film_count
        FROM
            categories
        LEFT JOIN
            films ON films.category_id = category.id
        GROUP BY
            category.id, category.name
    `;

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).json(result.rows);
        }
    });
});
  
module.exports = router;