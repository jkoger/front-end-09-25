import LoanCalculator from "../components/LoanCalculator"
import MaxCalculator from "../components/MaxCalculator"
import RegularCalculator from "../components/RegularCalculator"


function Calculator() {
  return (
    <div>
        <RegularCalculator/>
        <br /> <br />
        <LoanCalculator />
        <br /> <br />
        <MaxCalculator />
    </div>
  )
}

export default Calculator