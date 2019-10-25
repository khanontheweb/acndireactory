import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




function App() {
  return (
    <Router>
      <div className="container">
        <h1>ACN Direactory</h1>
      </div>

      <Route path="/" exact component={CreativesList}/>
      <Route path="/edit/:id" exact component={EditCreative}/>
      <Route path="/create" exact component={CreateCreative}/>
    </Router>
  );
}

export default App;
