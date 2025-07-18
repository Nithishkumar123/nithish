import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="movie-list">
      <h1>Movies</h1>
      <div className="movies-container">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              <h2>{movie.title}</h2>
              <p>{movie.tagline}</p>
              <p>Rating: {movie.vote_average}/10</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  const releaseDate = new Date(movie.release_date).toLocaleDateString();

  return (
    <div className="movie-detail">
      <Link to="/" className="back-link">← Back to Movies</Link>
      <h1>{movie.title}</h1>
      <p><strong>Tagline:</strong> {movie.tagline}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Release Date:</strong> {releaseDate}</p>
      <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
      <p><strong>Rating:</strong> {movie.vote_average}/10</p>
      <p><strong>Budget:</strong> ${movie.budget}</p>
      <p><strong>Revenue:</strong> ${movie.revenue}</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;