import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreativesList from "./components/creatives-list.component"
import CreateCreative from "./components/create-creative.component"
import EditCreative from "./components/edit-creative.component"


function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            ACN Direactory
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Creatives</Link>
              </li>
              <li className="nav-item">
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
