import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'prisma');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const DB_PATH = path.join(dataDir, 'studio.db');

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initializeDb(db);
  }
  return db;
}

function initializeDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Inquiry (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brideName TEXT NOT NULL,
      bridegroomName TEXT NOT NULL,
      phoneNumber TEXT NOT NULL,
      marriageDate TEXT NOT NULL,
      noteForGift TEXT,
      createdAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS Booking (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brideName TEXT NOT NULL,
      bridegroomName TEXT NOT NULL,
      phoneNumber TEXT NOT NULL,
      marriageDate TEXT NOT NULL,
      noteForGift TEXT,
      time TEXT,
      payment TEXT,
      requirements TEXT,
      createdAt TEXT DEFAULT (datetime('now'))
    );
  `);
}
