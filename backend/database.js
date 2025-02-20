// database.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ma'lumotlar bazasining fayl manzili
const dbPath = path.resolve(__dirname, "mydatabase.db");

// Baza bilan ulanish yoki uni yaratish
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Ma'lumotlar bazasiga ulanib bo'lmadi:", err.message);
  } else {
    console.log("SQLite bazasiga ulandi.");
  }
});

module.exports = db;
