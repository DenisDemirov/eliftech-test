import React from 'react';
import { useEffect } from 'react';
import styles from './QuizPreviewCard.module.css';

export default function QuizPreviewCard({ quiz }) {
    useEffect(() => {
        console.log(quiz);
    }, []);
    return (
        <div className={styles.quiz_card}>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <p>{quiz.question_count} questions</p>
        </div>
    );
}