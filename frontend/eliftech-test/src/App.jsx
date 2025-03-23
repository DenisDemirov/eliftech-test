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
import QuizForm from './pages/QuizForm/QuizForm';
import EditQuiz from './pages/EditQuiz/EditQuiz';

function App() {
  return (
    <Router>

      <div className={styles.app}>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link to="/">Quiz App</Link>
            </li>
            <li className={styles.navList__create_quiz}>
              <Link to="/create-quiz">Create Quiz</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.content}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/quiz/:id' element={<QuizForm />} />
          <Route path='/edit-quiz/:quizId' element={<EditQuiz/>} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
        </Routes>
        </div>
        

      </div>
    </Router>
  );
}

export default App;