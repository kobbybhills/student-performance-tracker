import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import './App.css';

/**
 * Interface representing a Course entity
 */
interface Course {
  id: number;
  name: string;
  code: string;
  grade: string;
  credits: number;
  status: string;
}

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [grade, setGrade] = useState('A');
  const [credits, setCredits] = useState(3);
  const [status, setStatus] = useState('Enrolled');

  const API_URL = 'http://localhost:5000/api/courses';

  /**
   * Fetch all course entries from Express API
   */
  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_URL);
      setCourses(response.data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /**
   * Submit new course details to SQLite backend
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    try {
      await axios.post(API_URL, { name, code, grade, credits, status });
      setName('');
      setCode('');
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  /**
   * Delete selected course from backend by ID
   */
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      <header className="header">
        <span style={{ fontSize: '3rem' }}>🎓</span>
        <h1>Student Performance &<br />Curriculum Tracker</h1>
      </header>

      <div className="card">
        <h3>Add New Course</h3>
        <form onSubmit={handleSubmit} className="form-group">
          <input
            className="input-field"
            type="text"
            placeholder="Course Name (e.g., Web Development)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="text"
            placeholder="Course Code (e.g., CSE 310)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <div className="row">
            <select className="input-field" style={{ flex: 1 }} value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option value="A">Grade: A</option>
              <option value="B">Grade: B</option>
              <option value="C">Grade: C</option>
              <option value="D">Grade: D</option>
              <option value="F">Grade: F</option>
            </select>
            <input
              className="input-field"
              style={{ flex: 1 }}
              type="number"
              min="1"
              value={credits}
              onChange={(e) => setCredits(Number(e.target.value))}
              placeholder="Credits"
            />
            <select className="input-field" style={{ flex: 1 }} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Enrolled">Enrolled</option>
              <option value="Completed">Completed</option>
              <option value="Planned">Planned</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Add Course
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Your Enrolled & Planned Courses</h3>
        {courses.length === 0 ? (
          <p style={{ color: '#6c757d' }}>No courses added yet. Fill out the form above to get started!</p>
        ) : (
          <div>
            {courses.map((course) => (
              <div key={course.id} className="course-item">
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>{course.code}: {course.name}</strong>
                  <div style={{ fontSize: '0.9rem', color: '#6c757d', marginTop: '4px' }}>
                    {course.credits} Credits • Status: <strong>{course.status}</strong> • Grade: <strong>{course.grade}</strong>
                  </div>
                </div>
                <button onClick={() => handleDelete(course.id)} className="btn-danger">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}