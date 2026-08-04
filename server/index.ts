import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup
const db = new sqlite3.Database('./tracker.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(
      `CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        grade TEXT,
        credits INTEGER NOT NULL,
        status TEXT NOT NULL
      )`
    );
  }
});

/**
 * Interface representing a Course entity
 */
interface Course {
  id?: number;
  name: string;
  code: string;
  grade?: string;
  credits: number;
  status: string;
}

/**
 * GET /api/courses
 * Fetch all courses from the database.
 */
app.get('/api/courses', (_req: Request, res: Response): void => {
  db.all('SELECT * FROM courses', [], (err: Error | null, rows: Course[]) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

/**
 * POST /api/courses
 * Create a new course record.
 */
app.post('/api/courses', (req: Request, res: Response): void => {
  const { name, code, grade, credits, status } = req.body;
  const sql = 'INSERT INTO courses (name, code, grade, credits, status) VALUES (?, ?, ?, ?, ?)';
  const params = [name, code, grade, credits, status];

  db.run(sql, params, function (this: sqlite3.RunResult, err: Error | null) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Course added successfully',
      id: this.lastID,
    });
  });
});

/**
 * DELETE /api/courses/:id
 * Delete a course by ID.
 */
app.delete('/api/courses/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  db.run('DELETE FROM courses WHERE id = ?', id, function (this: sqlite3.RunResult, err: Error | null) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Course deleted', changes: this.changes });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});