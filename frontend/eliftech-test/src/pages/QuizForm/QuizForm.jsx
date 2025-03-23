import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./QuizForm.module.css";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

export default function QuizForm() {
    const location = useLocation();
    const { quiz } = location.state || {};

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const choicesURL = import.meta.env.VITE_GET_CHOICES_BY_QUIZ_ID_URL;
    const answerURL = import.meta.env.VITE_POST_ANSWER_URL;

    const fetchQuiz = async () => {
        setQuestions([]);// Clear questions before fetching new ones
        
        try {
            if (quiz && quiz._id) {
                const response = await fetch(`${baseURL}${choicesURL}${quiz._id}`);
                const data = await response.json();
                setQuestions(data);
            }
        } catch (error) {
            console.error("Error fetching quiz:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(quiz);
        if (quiz) {
            fetchQuiz();
        } else {
            setLoading(false);
        }
    }, [quiz]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const labelText = e.target.nextSibling ? e.target.nextSibling.textContent : '';
    
        // Обрабатываем checkbox
        if (type === "checkbox") {
            setFormData((prevData) => {
                const updatedData = { ...prevData };
                if (!updatedData[name]) {
                    updatedData[name] = [];
                }
    
                // Добавляем или убираем ответ в зависимости от состояния checkbox
                if (checked) {
                    updatedData[name].push({ value, text: labelText });
                } else {
                    updatedData[name] = updatedData[name].filter((item) => item.value !== value);
                }
    
                return updatedData;
            });
        } else if (type === "radio") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: { value, text: labelText },
            }));
        } else if (type === "text") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: { value, text: value },
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const answerModel = {
            quiz_id: quiz._id, 
            answers: Object.keys(formData).map((questionId) => {
                const answerData = formData[questionId];
                return {
                    question_id: questionId,
                    answer: Array.isArray(answerData) 
                        ? answerData.map((item) => item.text).join(", ")
                        : answerData.text,
                };
            }),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        console.log(answerModel);

        try {
            const response = await fetch(`${baseURL}${answerURL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answerModel),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Your answers have been submitted!');
                console.log('Server response:', result);
            } else {
                alert('Error submitting answers!');
                console.error('Error sending data:', response.status);
            }
        } catch (error) {
            console.error('Request failed', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <LoadingIcon />;
    }

    return (
        <div className={styles.quiz}>

            <h1 className={styles.quiz__title}>{quiz.title}</h1>

            <form className={styles.quiz__form} onSubmit={handleSubmit}>

                {questions.map((question) => (

                    <div key={question._id} className={styles.question_block}>

                        <h3>{question.question_text}</h3>
                        
                        {question.options.length > 0 ? (
                            <div>
                                {question.options.map((option, index) => (
                                    <div className={styles.quiz__form__radiobutton_block} key={`${option._id}_${index}`}>
                                        {question.is_single_answer ? (
                                            <>
                                                <input
                                                    type="radio"
                                                    name={question._id}
                                                    value={option._id}
                                                    onChange={handleChange}
                                                />
                                                <label>{option}</label>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="checkbox"
                                                    name={`${question._id}`}
                                                    value={option._id}
                                                    onChange={handleChange}
                                                />
                                                <label>{option}</label>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <input type="text" name={question._id} onChange={handleChange} />
                        )}
                    </div>
                ))}
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </form>
        </div>
    );
}
