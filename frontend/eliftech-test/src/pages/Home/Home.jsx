import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        
        <div>
            <Link to="/create-quiz">Create Quiz</Link>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of our application.</p>
        </div>
    );
};

export default Home;