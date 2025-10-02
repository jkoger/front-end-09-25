import { useEffect, useRef, useState } from "react";

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
    <div>
      <label>Kinnisvara ostuhind</label>
      <input
        defaultValue={75000}
        onChange={() => calculatePayment()}
        ref={priceRef}
        type="number"
      />
      <br />
      <label>Sissemakse</label>
      <input
        defaultValue={0}
        onChange={() => calculatePayment()}
        ref={downPaymentRef}
        type="number"
      />
      <br />
      <label>Laenusumma</label>
      <input disabled value={loanAmount.toFixed(2)} type="number" /> <br />
      <label>Periood</label>
      <select
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
      </select>
      <br />
      <label>Marginaal</label>
      <input
        defaultValue={1.7}
        onChange={() => calculatePayment()}
        ref={marginaalRef}
        type="number"
      />
      <br />
      <label>Euribor</label>
      <input
        defaultValue={2.15}
        onChange={() => calculatePayment()}
        ref={euriborRef}
        type="number"
      />{" "}
      <br />
      <label>Intress kokku</label>
      <input disabled value={totalInterest.toFixed(2)} type="number" /> <br />
      <div>Kuumakse {payment.toFixed(2)} €</div>
    </div>
  );
}

export default LoanCalculator;
