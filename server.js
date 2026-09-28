import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "products_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }

    console.log("Connected to MySQL database");
});

// GET: Retrieve all products
app.get("/api/products", (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error",
            });
        }

        return res.json(results);
    });
});

// POST: Add a product
app.post("/api/products", (req, res) => {
    const { name, category, price, stock } = req.body;

    const sql = `
        INSERT INTO products (NAME, CATEGORY, PRICE, STOCK)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, category, price, stock],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error",
                });
            }

            return res.status(201).json({
                message: "Product Added Successfully",
                id: result.insertId
            });
        }
    );
});

// PUT: Update a product
app.put("/api/products/:id", (req, res) => {
    const id = req.params.id;

    const { name, category, price, stock } = req.body;

    const sql = `
        UPDATE products
        SET NAME = ?, CATEGORY = ?, PRICE = ?, STOCK = ?
        WHERE ID = ?
    `;

    db.query(
        sql,
        [name, category, price, stock, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error",
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }

            return res.json({
                message: "Product Updated Successfully",
            });
        }
    );
});

// DELETE: Delete a product
app.delete("/api/products/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM products WHERE ID = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error",
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.json({
            message: "Product Deleted Successfully",
        });
    });
});

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server listening at localhost:${PORT}`);
    });
};

startServer();