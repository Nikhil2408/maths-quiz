import React from "react";

import styles from "../styles/ReviewQuestions.module.css";

function ReviewQuestions(props){
    
    const isWrong = props.question.userAnswer !== props.question.correctAnswer;

    const reviewQuestionStyle = `${styles.ReviewQuestion} ${isWrong ? styles.wrong : styles.right}`;

    return (
        <div className={reviewQuestionStyle}>
            <p>Question {props.question.questionNo} : {props.question.question}</p>
            <p>You Answered: {props.question.userAnswer}</p>
            <p>
                {
                    isWrong
                    ?
                    `Correct Answer: ${props.question.correctAnswer}`
                    :
                    ""
                }
            </p>
        </div>

    )
}

export default ReviewQuestions;