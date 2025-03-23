import styles from './EditQuiz.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { quizModel } from '../../models/quizModel.js';
import { questionModel } from '../../models/questionModel.js';

function EditQuiz() {
    const { quizId } = useParams();
    const navigate = useNavigate();
    
    const [quiz, setQuiz] = useState({ ...quizModel });
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quizResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_GET_QUIZ_URL}${quizId}`);
                if (!quizResponse.ok) {
                    throw new Error('Failed to fetch quiz data');
                }
                const quizData = await quizResponse.json();
                setQuiz(quizData);
                
                const questionsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GET_CHOICES_BY_QUIZ_ID_URL}${quizId}`);
                if (!questionsResponse.ok) {
                    throw new Error('Failed to fetch questions data');
                }
                const questionsData = await questionsResponse.json();
                setQuestions(questionsData);
            } catch (error) {
                console.error('Error:', error);
                alert('Error loading quiz data');
            }
        };

        fetchQuizData();
    }, [quizId]);

    const addQuestion = () => {
        setQuestions([...questions, { 
            ...questionModel, 
            _id: Date.now().toString(),
            type: "text", // Default type
        }]);
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter((q) => q._id !== id));
    };

    const handleQuestionChange = (id, field, value) => {
        setQuestions(questions.map((q) =>
            q._id === id ? { ...q, [field]: value } : q
        ));
    };

    const handleTypeChange = (id, value) => {
        setQuestions(questions.map((q) =>
            q._id === id
                ? { 
                    ...q, 
                    type: value,
                    is_single_answer: value === "radio",
                    options: value === "text" ? [] : q.options // Clear options if text
                }
                : q
        ));
    };

    const handleAddOption = (id) => {
        setQuestions(questions.map((q) =>
            q._id === id ? { ...q, options: [...q.options, ""] } : q
        ));
    };

    const handleOptionChange = (qId, index, value) => {
        setQuestions(questions.map((q) =>
            q._id === qId
                ? { ...q, options: q.options.map((opt, i) => (i === index ? value : opt)) }
                : q
        ));
    };

    const handleSubmit = async () => {
        try {
            const quizWithoutId = { ...quiz, question_count: questions.length };
            
            // Update Quiz
            const quizResponse = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_UPDATE_QUIZ_URL}${quizId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(quizWithoutId),
            });

            if (!quizResponse.ok) {
                throw new Error('Failed to update quiz');
            }

            // Getting updated quiz
            const updatedQuiz = await quizResponse.json();
            console.log('Quiz updated:', updatedQuiz);

            // Adding Quiz Id to questions
            const questionsWithQuizId = questions.map((q, index) => ({
                ...q,
                quiz_id: updatedQuiz._id,
                position: index + 1,
            }));
            console.log(questionsWithQuizId);
            // Update questions
            const questionsResponse = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_UPDATE_QUESTIONS_URL}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questions: questionsWithQuizId }),
            });

            if (!questionsResponse.ok) {
                throw new Error('Failed to update questions');
            }

            alert('Quiz and questions updated successfully!');
            navigate(`/`);
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating quiz and questions');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Edit Quiz</h1>

            <div className={styles.quiz_details}>
                <input type="text" placeholder="Title" value={quiz.title}
                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
                <textarea placeholder="Description" value={quiz.description}
                    onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />
            </div>

            <ol className={styles.questions_list}>
                {questions.map((question, index) => (
                    <li key={question._id} className={styles.question}>
                        <div className={styles.question__data}>
                            <div className={styles.count}>{index + 1}.</div>
                            <input type="text" placeholder="Enter your question"
                                value={question.question_text}
                                onChange={(e) => handleQuestionChange(question._id, "question_text", e.target.value)}
                            />
                        </div>

                        <div className={styles.question__type}>
                            Question type
                            <select
                                value={question.type}
                                onChange={(e) => handleTypeChange(question._id, e.target.value)}
                            >
                                <option value="text">Text</option>
                                <option value="radio">Single choice</option>
                                <option value="checkbox">Multiple choice</option>
                            </select>
                        </div>

                        {question.type !== "text" && (
                            <div className={styles.options}>
                                {question.options.map((option, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        placeholder="Option"
                                        value={option}
                                        onChange={(e) => handleOptionChange(question._id, idx, e.target.value)}
                                    />
                                ))}
                                <button onClick={() => handleAddOption(question._id)}>Add option</button>
                            </div>
                        )}

                        <button onClick={() => removeQuestion(question._id)}
                            className={styles.removeQuestion}>Remove</button>
                    </li>
                ))}
            </ol>

            <button onClick={addQuestion} className={styles.addQuestion}>Add question</button>
            <button onClick={handleSubmit} className={styles.createQuiz}>Update Quiz</button>
        </div>
    );
}

export default EditQuiz;

