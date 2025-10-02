import { useEffect, useRef, useState} from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";


function MaxCalculator() {

    const [loanAmount, setLoanAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const dependRef = useRef<HTMLSelectElement>(null); // requires number
    const incomeRef = useRef<HTMLInputElement>(null); // requires number
    const outcomeRef = useRef<HTMLInputElement>(null);// requires number
    const familyStatus = useRef<HTMLInputElement>(null); // requires true or false
    const aplicType = useRef<HTMLLabelElement>(null);

    useEffect (() => {
        calculatePayment();
    }, []);
    
    function calculatePayment(){

        const income = Number(incomeRef.current?.value);
        const dependAmount = Number(dependRef.current?.value);
        const outcome = Number(outcomeRef.current?.value);
        let score = 78;

        const selectedAplic =
        aplicType.current?.querySelector<HTMLInputElement>('input[name="aplicType"]:checked')
        ?.value ?? null;


    if(dependAmount > 0 ){
        if (familyStatus.current?.checked){
            score -= (dependAmount * 10)/2
        } else {
            if ( income / 2 > (outcome + (dependAmount+1)*200)){
                score -= (dependAmount * 7 )
            } else {
                score -= dependAmount * 10
            }
            
        }
    }

    if ( outcome > 0 && income * 0.4 < outcome){
        score = 0;
    }
    

    if (income < 900 || score < 28) {
      setErrorMessage("Maksimaalse limiidi arvutamiseks on netosissetulek liiga väike\n või igakuised kohustused liiga suured");
      setLoanAmount(0); 
    } else {
      setErrorMessage("");
      setLoanAmount(income* score);
    }


        return console.log ("Test", 
            familyStatus.current?.checked, 
            dependRef.current?.value,
            incomeRef.current?.value, 
            outcomeRef.current?.value,
            selectedAplic, "score:", score

        )
}


return (
    
    <div>
        <label>Maksimaalne limiit:</label>

        <br /> <br />
        <label>Laenu soovin võtta :</label>
        <br />
        <label ref={aplicType}>
            <input type="radio" onChange={() => calculatePayment()} name="aplicType" value="single" defaultChecked/> üksi  

            <input type="radio"  onChange={() => calculatePayment()} name="aplicType" value="multiple" /> koos kaastaotlejaga
        </label>
        <br />

        <br />

        <label>Perekonnaseis :</label>
         <label>
            <input type="checkbox" onChange={() => calculatePayment()} defaultChecked ref = {familyStatus} /> abielus või vabaabielus
        </label>
        <br />
        <label>Ülepeetavate arv   </label>
        <select defaultValue={1} onChange={() => calculatePayment()} ref= {dependRef}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
        </select>
        <br />
        <label>Nettosissetulek   </label>
        <input defaultValue = {900}
        onChange ={() => calculatePayment()}
        ref = {incomeRef}
        type ="text"></input>
        <br />
        <label>Igakuised kohustused   </label>
        <input defaultValue = {0}
        onChange ={() => calculatePayment()}
        ref = {outcomeRef}
        type ="text"></input>
        <br />
        <label>Maksimaalne pakutav limiit</label>
        {errorMessage ? (
         <span style={{ color: "red" }}>{errorMessage}</span>
        ) : (
      <input disabled value={loanAmount.toFixed(2)} type="number" />
        )}
        <br />
        <br />
    </div>
  )

/*
return (
  <Container className="rb-mortgage-calc py-4">
    <div className="d-inline p-2 bg-dark rounded text-white">Maksimaalne limiit</div>
    <Row>
      <Col md={7}>
        <Form>

          <Form.Group as={Row} className="align-items-center mb-2">
            <Form.Label column sm={5} className="mb-0 text-muted">
              Laenu soovin võtta
            </Form.Label>
            <Col sm={7}>
              <Form.Check
              onChange={(e) => setAplicType(e.target.value)} 
              checked={aplicType === "single"}
                inline
                type="radio"
                name="aplicType"
                id="aplicType-single"
                value="single"
                label="üksi"
                
                
              />
              <Form.Check
              onChange={(e) => setAplicType(e.target.value)} 
              checked={aplicType === "multiple"}
                inline
                type="radio"
                name="aplicType"
                id="aplicType-multiple"
                value="multiple"
                label="koos kaastaotlejaga"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="align-items-center mb-2">
            <Form.Label column sm={5} className="mb-0 text-muted">
              Perekonnaseis
            </Form.Label>
            <Col sm={7}>
              <Form.Check
                type="checkbox"
                id="familyStatus"
                label="abielus või vabaabielus"
                defaultChecked
                onChange={() => calculatePayment()}
                ref={familyStatus}
                
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="align-items-center mb-2">
            <Form.Label column sm={5} className="mb-0 text-muted">
              Ülalpeetavate arv
            </Form.Label>
            <Col sm={7}>
              <Form.Select
                defaultValue={1}
                onChange={() => calculatePayment()}
                ref={dependRef}
              >
                <option>0</option><option>1</option><option>2</option>
                <option>3</option><option>4</option><option>5</option>
                <option>6 või rohkem</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="align-items-center mb-2">
            <Form.Label column sm={5} className="mb-0 text-muted">
              Netosissetulek
            </Form.Label>
            <Col sm={7}>
              <InputGroup>
                <Form.Control
                  type="text"
                  defaultValue={900}
                  onChange={() => calculatePayment()}
                  ref={incomeRef}
                />
                <InputGroup.Text>€</InputGroup.Text>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="align-items-center">
            <Form.Label column sm={5} className="mb-0 text-muted">
              Igakuised kohustused
            </Form.Label>
            <Col sm={7}>
              <InputGroup>
                <Form.Control
                  type="text"
                  defaultValue={0}
                  onChange={() => calculatePayment()}
                  ref={outcomeRef}
                />
                <InputGroup.Text>€</InputGroup.Text>
              </InputGroup>
            </Col>
          </Form.Group>

        </Form>
      </Col>

      <Col md={1} className="d-none d-md-flex justify-content-center">
        <div className="rb-divider" />
      </Col>

      <Col md={4} className="mt-4 mt-md-0">
        <div className="text-muted small mb-2">Maksimaalne pakutav limiit</div>

        <div className="rb-limit">
          <span className="rb-limit-int">55&nbsp;790</span>
          <span className="rb-limit-dec">.16</span>
        </div>

        <Button variant="dark" className="mt-3 px-3 py-2 rounded-3">
          Taotle kodulaenu
        </Button>
      </Col>
    </Row>
  </Container>

  
);
*/

}

export default MaxCalculator