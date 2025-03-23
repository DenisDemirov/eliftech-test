import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './QuizPreviewCard.module.css';

export default function QuizPreviewCard({ quiz }) {
    useEffect(() => {
        console.log(quiz);
    }, []);
    return (
        <Link to={`/quiz/${quiz._id}`} className={styles.quiz_card}>
                <div className={styles.quiz_card__title}>{quiz.title}</div>
                <div className={styles.quiz_card__description}>{quiz.description}</div>
                <br />
                <div className={styles.quiz_card__question_count}>Questions :{quiz.question_count}</div>
        </Link>

    );
}