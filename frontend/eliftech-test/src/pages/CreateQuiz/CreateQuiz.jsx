import styles from './CreateQuiz.module.css';
import { useState } from 'react';

function CreateQuiz() {
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        setQuestions([...questions, { text: '' }]);
    };

    const removeQuestion = (question) => {
        
        setQuestions(questions.filter((q) => q !== question));
    };

    return (
        <div className={styles.container}>
            <div>Create Quiz</div>

            <ol className={styles.questions_list}>
                {questions.map((question, index) => (
                    <li key={index+1} className={styles.question}>
                        <div className={styles.count}> {`${index+1} .`}</div>

                        <div className={styles.question__data}>
                            <div>Question</div>
                            <input type="text" placeholder="Enter your question" />
                        </div>

                        <div className={styles.question__type}>
                            <div>Type</div>
                            <select>
                                <option value="text">Text</option>
                                <option value="radio">Single choice</option>
                                <option value="checkbox">Multiply choice</option>
                            </select>
                        </div>

                        <button
                            onClick={() => removeQuestion(question)}
                            className={styles.removeQuestion}>
                            Remove
                        </button>
                    </li>
                ))}
            </ol>

            <button onClick={addQuestion} className={styles.addQuestion}>Add question</button>
        </div>
    );
}

export default CreateQuiz;