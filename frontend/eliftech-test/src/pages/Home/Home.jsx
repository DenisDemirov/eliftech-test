import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuizPreviewCard from '../../components/QuizPreviwCard/QuizPreviewCard';
import Paginator from '../../components/Paginator/Paginator';
import styles from './Home.module.css';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';


const Home = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const getQuizzesURL = import.meta.env.VITE_GET_ALL_QUIZZES_URL;
    const URL = `${baseURL}${getQuizzesURL}`;

    const [quizzes, setQuizzes] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchQuizzes = async () => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });

        try {
            const response = await fetch(`${URL}?${params}`);
            const data = await response.json();

            setQuizzes(data.quizzes);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [page]);

    if (loading) {
        return <LoadingIcon/>;
    }
    return (

        <div className={styles.home}>
            <div className={styles.title}><h1>Quiz Catalog</h1></div>
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