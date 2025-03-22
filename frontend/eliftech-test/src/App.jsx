import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import styles from './App.module.css';
import CreateQuiz from './pages/CreateQuiz/CreateQuiz';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>

      <div className={styles.app}>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link to="/">Quiz App</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;