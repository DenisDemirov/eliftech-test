import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState} from 'react';
import QuizPreviewCard from '../../components/QuizPreviwCard/QuizPreviewCard';



const Home = () => {
    const URL = 'http://127.0.0.1:3000/api/quizzes/';

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                setQuizzes(data);
                console.log(data);
            }
            );
    }, []);

    return (

        <div>
            <Link to="/create-quiz">Create Quiz</Link>
            <h1>Quizzes</h1>
            {quizzes.map((quiz) => (
                <QuizPreviewCard quiz={quiz} key={quiz._id} />
            ))}
        </div>
    );
};

export default Home;