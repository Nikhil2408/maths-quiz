import React, { useState, useEffect } from "react";
import ReviewQuestions from "./ReviewQuestions";
import styles from "../styles/Quiz.module.css";

const operators = ["+", "-", "*", "/"];
const randomOperator = operators[Math.floor(Math.random() * operators.length)];

function Quiz(props){
    const [operand1, setOperand1] = useState(0);
    const [operand2, setOperand2] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [allQuestions, setAllQuestions] = useState([]);
    const [userAnswer, setUserAnswer] = useState("");
    const [timerCounter, setTimerCounter] = useState(20);

    useEffect(() => {
        let timer;
        if(showQuiz && timerCounter > 0){
            timer = setInterval(() => {
                setTimerCounter(timerCounter => timerCounter - 1)
            }, 1000);
        }
        if(timerCounter === 0){
            checkAndDisplayNextQues();
        }
        return () => clearInterval(timer);
    }, [timerCounter, showQuiz])

    let correctAnswer;
    const selectedOperator = props.chosenOperator !== "noOperator" ? props.chosenOperator : randomOperator;

    switch(selectedOperator){
        case "+":
            correctAnswer = operand1 + operand2;
            break;
        case "-":
            correctAnswer = operand1 - operand2;
            break;
        case "*":
            correctAnswer = operand1 * operand2;
            break;
        case "/":
            correctAnswer = operand1 / operand2;
            break;
        default:
    }

    function generateOperands(){
        if(props.limit === "" || props.limit === 0){
            setOperand1(Math.floor(Math.random() * 10) + 1);
            setOperand2(Math.floor(Math.random() * 10) + 1);
        }
        else{
            setOperand1(Math.floor(Math.random() * props.limit) + 1);
            setOperand2(Math.floor(Math.random() * props.limit) + 1);
        }
        
    }

    function clickHandler(){
        setShowQuiz(currentState => !currentState);
        generateOperands();
    }

    function checkAndDisplayNextQues(eventObj){
        if(eventObj)
            eventObj.preventDefault();
        if(correctAnswer === userAnswer)
            setScore(score => score + 1);
        setAllQuestions(currentState => {
            return [...currentState, {
                questionNo: questionNumber,
                question: `What is ${operand1} ${selectedOperator} ${operand2}`,
                userAnswer,
                correctAnswer
            }]
        });

        setUserAnswer("");
        generateOperands();
        setQuestionNumber(questionNumber => questionNumber + 1);
        setTimerCounter(20);
        if(questionNumber === props.totalQuestions){
            props.calculateTotalScores(score);
        }
    }

    function inputChangeHandler(eventObj){
        setUserAnswer(parseFloat(eventObj.target.value));
    }

    return (
        <div className={styles.Quiz}>
            <h1>{props.title}</h1>
            {
                questionNumber <= (props.totalQuestions)
                ?
                    (showQuiz 
                    ?
                    <div className={styles.question}>
                        <p className={styles.timer}><span>Time Left : </span> 00:00:{timerCounter}</p>
                        <h3>Question {questionNumber} : What is {operand1} {selectedOperator} {operand2}</h3>
                        <form>
                            <input onChange = {inputChangeHandler} type="number" value = {userAnswer}/>
                            <button className = {styles.next} onClick = {checkAndDisplayNextQues}>Next &gt;</button>
                        </form>
                        <p>Score: {score}/{props.totalQuestions}</p>
                    </div>
                    :
                    <button className = {styles.startQuiz} onClick={clickHandler}>Start Quiz</button>)
                :
                allQuestions.map(question => {
                    return <ReviewQuestions key = {question.questionNo} question = {question} />
                })
            }
        </div>
    )

}

export default Quiz;