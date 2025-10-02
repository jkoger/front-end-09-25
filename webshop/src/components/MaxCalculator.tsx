import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

function MaxCalculator() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const dependRef = useRef<HTMLSelectElement>(null);
  const incomeRef = useRef<HTMLInputElement>(null);
  const outcomeRef = useRef<HTMLInputElement>(null);
  const familyStatus = useRef<HTMLInputElement>(null);
  const aplicType = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    calculatePayment();
  }, []);

  function calculatePayment() {
    const income = Number(incomeRef.current?.value);
    const dependAmount = Number(dependRef.current?.value);
    const outcome = Number(outcomeRef.current?.value);
    const selectedAplic =
      aplicType.current?.querySelector<HTMLInputElement>(
        'input[name="aplicType"]:checked',
      )?.value ?? null;

    let score = 80;
    let minAmountPerPerson = 200;
    let currentAmountPerPeron = 0;
    let outcomeImpact = 0;
    let numberOfFamMembers = 0;
    let belowMin = false;

    if (income < 900) {
      belowMin = true;
    }

    if (outcome > 0 && income * 0.4 < outcome) {
      belowMin = true;
    }

    if (dependAmount > 0) {
      if (familyStatus.current?.checked) {
        numberOfFamMembers = 2 + dependAmount;
        score -= (dependAmount * 10) / 2;
        currentAmountPerPeron = (income - outcome) / numberOfFamMembers;
      } else {
        numberOfFamMembers = 1 + dependAmount;
        currentAmountPerPeron = (income - outcome) / (dependAmount + 1);

        if (currentAmountPerPeron > minAmountPerPerson) {
          score -= dependAmount * 10;
        } else {
          belowMin = true;
          score = 0;
        }
      }
    } else {
      currentAmountPerPeron = income - outcome;
      numberOfFamMembers = 1;
    }

    let currentAmountPerFamily = currentAmountPerPeron * numberOfFamMembers;
    let minAmountPerFamily = minAmountPerPerson * numberOfFamMembers;
    let persentage = currentAmountPerFamily / minAmountPerFamily;

    if (outcome) {
      outcomeImpact = (outcome * 100) / currentAmountPerFamily;
      score = (score + persentage) / outcomeImpact;
    } else {
      score += persentage;
    }

    console.log(
      "Current amount per person",
      currentAmountPerPeron,
      "familyMembers:",
      numberOfFamMembers,
      "MinAmountPerFamily:",
      minAmountPerFamily,
      "ActualAmountPerFamily:",
      currentAmountPerFamily,
      "persentage",
      persentage,
      "currentScore",
      score,
      "outcomeImpact",
      outcomeImpact,
      "loanAmount",
      currentAmountPerFamily * score,
    );

    if (score <= 0 || belowMin) {
      setErrorMessage(
        "Maksimaalse limiidi arvutamiseks on netosissetulek liiga väike\n või igakuised kohustused liiga suured",
      );
      setLoanAmount(0);
    } else {
      setErrorMessage("");
      setLoanAmount(currentAmountPerFamily * score);
    }

    return console.log(
      "Test",
      belowMin,
      familyStatus.current?.checked,
      dependRef.current?.value,
      incomeRef.current?.value,
      outcomeRef.current?.value,
      selectedAplic,
      "score:",
      score,
    );
  }

  return (
    <Container className="rb-mortgage-calc py-4">
      <div className="d-inline p-2 bg-dark rounded text-white">
        Maksimaalne limiit
      </div>
      <br />
      <br />
      <Row>
        <Col md={7}>
          <Form>
            <Form.Group as={Row} className="align-items-center mb-2">
              <Form.Label column sm={5} className="mb-0 text-muted">
                Laenu soovin võtta
              </Form.Label>
              <Col sm={7}>
                <Form.Check
                  onChange={() => calculatePayment()}
                  defaultChecked
                  inline
                  type="radio"
                  name="aplicType"
                  id="aplicType-single"
                  value="single"
                  label="üksi"
                />
                <Form.Check
                  onChange={() => calculatePayment()}
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
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
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
          {errorMessage ? (
            <span style={{ color: "red" }}>{errorMessage}</span>
          ) : (
            <>
              <div className="text-muted small mb-2">
                Maksimaalne pakutav limiit
              </div>
              <input
                className="rb-limit-int"
                disabled
                value={loanAmount.toFixed(2)}
                type="number"
              />
              <Button
                as="a"
                href="https://www.lhv.ee/et/kodulaen/taotlus"
                variant="dark"
                className="mt-3 px-3 py-2 rounded-3"
              >
                Taotle kodulaenu
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MaxCalculator;
