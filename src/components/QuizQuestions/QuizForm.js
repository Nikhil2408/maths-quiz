import React, {useEffect, useState} from "react";

function QuizForm(props){

    const [limit, setLimit] = useState("");
    const [totalQuestions, setTotalQuestions] = useState("");
    const [chosenOperator, setChosenOperator] = useState("noOperator");
    const [formValid, setFormValid] = useState(false);


    useEffect(() => {
        if(limit && totalQuestions)
            setFormValid(true)
        else
            setFormValid(false);
    }, [limit, totalQuestions]);

    function submitHandler(eventObj){
        eventObj.preventDefault();
        props.collectFormData(limit, totalQuestions, chosenOperator);
        setLimit("");
        setTotalQuestions("");
        setChosenOperator("noOperator")
    }

    function onLimitChangeHandler(eventObj){
        setLimit(parseInt(eventObj.target.value));
    }

    function onTotalQuestionsChangeHandler(eventObj){
        setTotalQuestions(parseInt(eventObj.target.value));
    }

    function onSelectChangeHandler(eventObj){
        setChosenOperator(eventObj.target.value);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="inputFields">
                <div>
                    <label htmlFor="limit">Limit Num : </label>
                    <input onChange={onLimitChangeHandler} type="number" name="limit" id="limit" value={limit}/>
                </div>
                <div>
                    <label htmlFor="totalQuestions">Total Questions : </label>
                    <input onChange={onTotalQuestionsChangeHandler} type="number" name="totalQuestions" id="totalQuestions" value={totalQuestions}/>
                </div>
                <div>
                    <label htmlFor="operator">Choose Operator (Optional) : </label>
                    <select name="operator" id="operator" onChange = {onSelectChangeHandler}>
                        <option value="noOperator">--SELECT--</option>
                        <option value="+">Add</option>
                        <option value="-">Subtract</option>
                        <option value="*">Multiply</option>
                        <option value="/">Divide</option>
                        <option value="%">Module</option>
                    </select>
                </div>  
            </div>
            <div>
                {
                    formValid
                    ?
                    <button>Proceed!</button>
                    :
                    <button disabled style={{cursor: "not-allowed"}}>Proceed!</button>
                }
            </div>
        </form>
    )
}

export default QuizForm;