import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MovieDetail from './components/MovieDetail';
import MovieGrid from './components/MovieGrid';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Router>
      <div>
        {/* Header will not have the search handler anymore */}
        <Header />

        <div className="app-layout">
          <Sidebar />
          <div className="content-area">
            <Routes>
              {/* Home Page with movie grid */}
              <Route path="/" element={<MovieGrid />} />
              {/* Route for search results */}
            

              {/* Route for movie detail page */}
              <Route path="/movie/:movieId" element={<MovieDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
