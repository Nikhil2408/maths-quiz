import {useState } from "react";
import Quiz from "./QuizQuestions/Quiz";
import QuizForm from "./QuizQuestions/QuizForm";
import "./styles/App.css"
import TotalScores from "./TotalScores/TotalScores";

function App() {

    const [totalScores, setTotalScores] = useState(0);
    const [formData, setFormData] = useState({});

    function calculateTotalScores(quizScores, isReset){
        if(isReset)
            setTotalScores(totalScores => totalScores - quizScores);
        else
            setTotalScores(totalScores => totalScores + quizScores);
    }

    function collectFormData(limit, totalQuestions, chosenOperator){
        setFormData({
            limit,
            totalQuestions,
            chosenOperator
        })
    }

 
  return (
    <div className="App">
        <h1>Maths Quiz</h1>
        <QuizForm collectFormData = {collectFormData}/>
        <TotalScores totalScores = {totalScores} />
        {
            formData.limit && formData.totalQuestions &&
            <div className = "Quizzes">
                <Quiz
                    title = "First Quiz" 
                    calculateTotalScores = {calculateTotalScores} 
                    limit = {formData.limit}
                    totalQuestions = {formData.totalQuestions}
                    chosenOperator = {formData.chosenOperator}
                />
                <Quiz
                    title = "Second Quiz" 
                    calculateTotalScores = {calculateTotalScores} 
                    limit = {formData.limit}
                    totalQuestions = {formData.totalQuestions}
                    chosenOperator = {formData.chosenOperator}
                />
            </div>
        }
    </div>
  );
}

export default App;
