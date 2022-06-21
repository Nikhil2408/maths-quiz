import { useState } from "react";
import Quiz from "./QuizQuestions/Quiz";
import "./styles/App.css"
import TotalScores from "./TotalScores/TotalScores";

function App() {

    const [totalScores, setTotalScores] = useState(0);
    const [limit, setLimit] = useState("");
    const [totalQuestions, setTotalQuestions] = useState("");
    const [chosenOperator, setChosenOperator] = useState("noOperator");

    function calculateTotalScores(quizScores){
        setTotalScores(totalScores => totalScores + quizScores);
    }

    function limitChangeHandler(eventObj){
        setLimit(parseInt(eventObj.target.value));
    }

    function totalQuestionsChangeHandler(eventObj){
        setTotalQuestions(parseInt(eventObj.target.value));
    }

    function onSelectChangeHandler(eventObj){
        setChosenOperator(eventObj.target.value);
    }
    
    
  return (
    <div className="App">
        <h1>Maths Quiz</h1>
        <form>
            <label htmlFor="limit">Limit Num : </label>
            <input onChange = {limitChangeHandler} type="number" value = {limit} name="limit" id="limit"/>
            <label htmlFor="totalQuestions">Total Questions : </label>
            <input onChange = {totalQuestionsChangeHandler} type="number" value = {totalQuestions} name="totalQuestions" id="totalQuestions" />
            <label htmlFor="operator">Choose Operator : </label>
            <select name="operator" id="operator" onChange={onSelectChangeHandler}>
                <option value="noOperator">--SELECT--</option>
                <option value="+">Add</option>
                <option value="-">Subtract</option>
                <option value="*">Multiply</option>
                <option value="/">Divide</option>
                <option value="%">Module</option>
            </select>
        </form>
        <TotalScores totalScores = {totalScores}/>
        <div className = "Quizzes">
            <Quiz 
                title = "First Quiz" 
                calculateTotalScores = {calculateTotalScores} 
                limit = {limit}
                totalQuestions = {totalQuestions}
                chosenOperator = {chosenOperator}
            />
            <Quiz 
                title = "Second Quiz" 
                calculateTotalScores = {calculateTotalScores}
                limit = {limit}
                totalQuestions = {totalQuestions}
                chosenOperator = {chosenOperator}
            />
        </div>
    </div>
  );
}

export default App;
