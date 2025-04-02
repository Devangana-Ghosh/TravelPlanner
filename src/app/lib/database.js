import Database from "better-sqlite3";

const db = new Database("./mydata.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS user_detail (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone_numbers TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS trip (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS activities (
    activities_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    price REAL NOT NULL,
    date TEXT NOT NULL
  )
`);

export default db;
