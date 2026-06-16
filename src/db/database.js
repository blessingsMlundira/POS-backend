const Database = require("better-sqlite3");

// create or open database file
const db = new Database("database.sqlite");

// ==========================
// CREATE TABLES
// ==========================

// PRODUCTS
db.prepare(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT,
  price REAL,
  stock INTEGER
)
`).run();

// SALES
db.prepare(`
CREATE TABLE IF NOT EXISTS sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice TEXT,
  total REAL,
  status TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
)
`).run();

// SALE ITEMS
db.prepare(`
CREATE TABLE IF NOT EXISTS sale_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  saleId INTEGER,
  name TEXT,
  qty INTEGER,
  price REAL,
  total REAL
)
`).run();

// CUSTOMERS
db.prepare(`
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  phone TEXT,
  totalSpent REAL DEFAULT 0
)
`).run();

module.exports = db;