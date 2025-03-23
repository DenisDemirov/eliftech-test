import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './QuizPreviewCard.module.css';

export default function QuizPreviewCard({ quiz }) {
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const deleteQuizUrl = import.meta.env.VITE_DELETE_QUIZ_URL;
    useEffect(() => {
        console.log(quiz);
    }, [quiz]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${baseUrl}${deleteQuizUrl}${quiz._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Quiz deleted');
                alert(`Quiz ${quiz.title} deleted`);
                window.location.reload();
            } else {
                console.error('Error during quiz deletion:', response);
            }
        } catch (error) {
            console.error('Error during quiz deletion:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-quiz/${quiz._id}`);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const hideMenu = () => {
        setMenuVisible(false);
    };

    return (
        <div className={styles.quiz_card} onMouseLeave={hideMenu}>
            <Link to={`/quiz/${quiz._id}`} state={{ quiz }} className={styles.quiz_card__link}>
                <div className={styles.quiz_card__title}>{quiz.title}</div>
                <div className={styles.quiz_card__description}>{quiz.description}</div>
                <br />
                <div className={styles.quiz_card__stats}>
                    <div className={styles.quiz_card__question_count}>Question: {quiz.question_count}</div>
                    <div className={styles.quiz_card__completion}>Completions: {quiz.completions}</div>
                </div>
            </Link>
            <div className={styles.quiz_card__menu_button} onClick={toggleMenu}>
                &#x22EE; 
            </div>
            {menuVisible && (
                <div className={styles.quiz_card__menu}>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}