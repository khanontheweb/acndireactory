import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            ACN Direactory
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Creatives</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Submit Yourself</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={CreativesList}/>
        <Route path="/edit/:id" exact component={EditCreative}/>
        <Route path="/create" exact component={CreateCreative}/>
      </div>
    </Router>
  );
}

export default App;
