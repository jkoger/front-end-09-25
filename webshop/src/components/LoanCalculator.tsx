import { useEffect, useRef, useState } from "react";

import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

function LoanCalculator() {
  const [payment, setPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const priceRef = useRef<HTMLInputElement>(null);
  const downPaymentRef = useRef<HTMLInputElement>(null);
  const marginaalRef = useRef<HTMLInputElement>(null);
  const euriborRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    calculatePayment();
  }, []);

  function calculatePayment() {
    setLoanAmount(
      Number(priceRef.current?.value) - Number(downPaymentRef.current?.value),
    );

    setTotalInterest(
      Number(marginaalRef.current?.value) + Number(euriborRef.current?.value),
    );

    setPayment(
      (((Number(priceRef.current?.value) -
        Number(downPaymentRef.current?.value)) /
        Number(periodRef.current?.value) /
        12) *
        (Number(marginaalRef.current?.value) +
          Number(euriborRef.current?.value))) /
        2.3,
    );
  }

  return (
    <Container className="rb-mortgage-calc py-4">
      <div className="d-inline p-2 bg-dark rounded text-white">
        Näidis kuumakse
      </div>
      <br />
      <br />
      <Row>
        <Col md={7}>
          <Form>
            <Form.Group as={Row} className="align-items-center mb-2">
              <Form.Label column sm={5} className="mb-0 text-muted">
                Kinnisvara ostuhind
              </Form.Label>
              <Col sm={7}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    defaultValue={75000}
                    onChange={() => calculatePayment()}
                    ref={priceRef}
                  />
                  <InputGroup.Text>€</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="align-items-center mb-2">
              <Form.Label column sm={5} className="mb-0 text-muted">
                Sissemakse
              </Form.Label>
              <Col sm={7}>
                <InputGroup>
                  <Form.Control
                    type="number"
                    defaultValue={0}
                    onChange={() => calculatePayment()}
                    ref={downPaymentRef}
                  />
                  <InputGroup.Text>€</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="align-items-center mb-2">
              <Form.Label column sm={5} className="mb-0 text-muted">
                Laenusumma
              </Form.Label>
              <Col sm={7}>
                <InputGroup>
                  <Form.Control
                    disabled
                    value={loanAmount.toFixed(2)}
                    type="number"
                  />
                  <InputGroup.Text>€</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="align-items-center mb-2">
              <Form.Label column sm={5} className="mb-0 text-muted">
                Periood
              </Form.Label>
              <Col sm={7}>
                <Form.Select
                  defaultValue={30}
                  onChange={() => calculatePayment()}
                  ref={periodRef}
                >
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="align-items-center mb-2">
              <Form.Label column sm={5} className="mb-0 text-muted">
                Marginaal
              </Form.Label>
              <Col sm={7}>
                <InputGroup>
                  <Form.Control
                    type="number"
                    defaultValue={1.7}
                    onChange={() => calculatePayment()}
                    ref={marginaalRef}
                  />
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="align-items-center mb-2">
              <Form.Label column sm={5} className="mb-0 text-muted">
                Euribor
              </Form.Label>
              <Col sm={7}>
                <InputGroup>
                  <Form.Control
                    type="number"
                    defaultValue={2.15}
                    onChange={() => calculatePayment()}
                    ref={euriborRef}
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="align-items-center mb-2">
              <Form.Label column sm={5} className="mb-0 text-muted">
                Intress kokku
              </Form.Label>
              <Col sm={7}>
                <InputGroup>
                  <Form.Control
                    disabled
                    value={totalInterest.toFixed(2)}
                    type="number"
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>
          </Form>
        </Col>

        <Col md={1} className="d-none d-md-flex justify-content-center">
          <div className="rb-divider" />
        </Col>

        <Col md={4} className="mt-4 mt-md-0 ">
          <div className="text-muted small mb-2">Kuumakse</div>
          <input
            className="rb-limit-int"
            disabled
            value={payment.toFixed(2)}
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
        </Col>
      </Row>
    </Container>
  );
}

export default LoanCalculator;
