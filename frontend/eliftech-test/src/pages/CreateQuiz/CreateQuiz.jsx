import styles from './CreateQuiz.module.css';
import { useState } from 'react';
import { quizModel } from '../../models/quizModel.js';
import { questionModel } from '../../models/questionModel.js';

function CreateQuiz() {
    const [quiz, setQuiz] = useState({ ...quizModel });
    const [questions, setQuestions] = useState([]);

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
            // Remove _id from quiz before sending
            const { _id, ...quizWithoutId } = quiz;

            // Remove _id from each question before sending
            // eslint-disable-next-line no-unused-vars
            const questionsWithoutId = questions.map(({ _id, ...rest }) => rest);
            quizWithoutId.question_count = questionsWithoutId.length;
            // Creating Quiz
            const quizResponse = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CREATE_QUIZ_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(quizWithoutId),
            });

            if (!quizResponse.ok) {
                throw new Error('Failed to create quiz');
            }

            // Getting created quiz
            const createdQuiz = await quizResponse.json(); 
            console.log('Quiz created:', createdQuiz);

            // Adding Quiz Id to questions
            const questionsWithQuizId = questionsWithoutId.map((q, index) => ({
                ...q,
                quiz_id: createdQuiz._id,
                position: index + 1,
            }));

            // Fetch questions
            const questionsResponse = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CREATE_QUESTION_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questions: questionsWithQuizId }),
            });

            if (!questionsResponse.ok) {
                throw new Error('Failed to create questions');
            }

            alert('Quiz and questions created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating quiz and questions');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Create Quiz</h1>

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
            <button onClick={handleSubmit} className={styles.createQuiz}>Create Quiz</button>
        </div>
    );
}

export default CreateQuiz;



