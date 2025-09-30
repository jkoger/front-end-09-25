import { useEffect, useRef } from "react";


function MaxCalculator() {

    const dependRef = useRef();
    const incomeRef = useRef();
    const outcomeRef = useRef();
    const familyStatus = useRef();

    useEffect (() => {
        calculatePayment();
    }, []);
    
    function calculatePayment(){

        return console.log ("Test", 
            familyStatus.current.checked, 
            dependRef.current.value,
            incomeRef.current.value, 
            outcomeRef.current.value
        )
}
  return (
    <div>
        <label>Laenu soovin võtta :</label>
        <br /> <br />
        <label>
            <input type="radio" name="aplicType" value="single" /> üksi
        </label>
        <br />

        <label>
             <input type="radio" name="aplicType" value="multiple" /> koos kaastaotlejaga
        </label>
        <br />

        <label>Perekonnaseis :</label>
         <label>
            <input type="checkbox" onChange={() => calculatePayment()} defaultChecked ref = {familyStatus} /> abielus või vabaabielus
        </label>
        <br />
        <label>Ülepeetavate arv</label>
        <select defaultValue={1} onChange={() => calculatePayment()} ref= {dependRef}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6 või rohkem </option>
        </select>
        <br />
        <label>Nettosissetulek</label>
        <input defaultValue = {900}
        onChange ={() => calculatePayment()}
        ref = {incomeRef}
        type ="text"></input>
        <br />
        <label>Igakuised kohustused</label>
        <input defaultValue = {0}
        onChange ={() => calculatePayment()}
        ref = {outcomeRef}
        type ="text"></input>
        <br />
        <label>Maksimaalne pakutav limiit</label>
        <br />
    </div>
  )
}

export default MaxCalculator