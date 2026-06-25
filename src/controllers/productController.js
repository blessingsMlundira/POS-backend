// src/controllers/productController.js

const db = require("../db/database");

/* GET ALL PRODUCTS */
exports.getProducts = (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM products ORDER BY id DESC").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* CREATE PRODUCT */
exports.createProduct = (req, res) => {
  const { name, category, price, stock, barcode  } = req.body;

  if (!name || !category || typeof price !== "number" || typeof stock !== "number" || !barcode) {
    return res.status(400).json({ error: "Missing or invalid product fields" });
  }

  try {
    const result = db
      .prepare(
        `INSERT INTO products (name, category, price, stock, barcode) VALUES (?, ?, ?, ?, ?)`
      )
      .run(name, category, price, stock, barcode);

    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE PRODUCT */
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock, barcode } = req.body;

  if (!name || !category || typeof price !== "number" || typeof stock !== "number" || !barcode) {
    return res.status(400).json({ error: "Missing or invalid product fields" });
  }

  try {
    const result = db
      .prepare(
        `UPDATE products SET name = ?, category = ?, price = ?, stock = ?, barcode = ? WHERE id = ?`
      )
      .run(name, category, price, stock, barcode, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE PRODUCT */
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  try {
    const result = db.prepare("DELETE FROM products WHERE id = ?").run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};