import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuizPreviewCard from '../../components/QuizPreviwCard/QuizPreviewCard';
import Paginator from '../../components/Paginator/Paginator';
import styles from './Home.module.css';


const Home = () => {
    const URL = 'http://127.0.0.1:3000/api/quizzes/';

    const [quizzes, setQuizzes] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);

    const fetchQuizzes = async () => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });

        try {
            const response = await fetch(`${URL}?${params}`);
            const data = await response.json();

            setQuizzes(data.quizzes);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [page]);

    return (

        <div className={styles.home}>
            <div className={styles.title}><h1>Quizzes</h1></div>
            <div className={styles.quiz_list}>
                {quizzes.map((quiz) => (
                    <QuizPreviewCard quiz={quiz} key={quiz._id} />
                ))}
            </div>
            <Paginator page={page} totalPages={totalPages} setPage={setPage}/>
        </div>
    );
};

export default Home;