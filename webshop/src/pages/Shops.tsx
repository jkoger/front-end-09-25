import { useState } from "react";

function Shops() {
  const [city, setCity] = useState("Tallinn");
  return (
    <div>
      <button onClick={() => setCity("Tallinn")}>Tallinn(6)</button>
      <button onClick={() => setCity("Tartu")}>Tartu(2)</button>
      <button onClick={() => setCity("Narva")}>Narva(1)</button>
      <button onClick={() => setCity("Pärnu")}>Pärnu(1)</button>

      <br />
      <br />
      {city === "Tallinn" && (
        <>
          <div>Ülemiste</div>
          <div>Magistralli</div>
          <div>Roka</div>
          <div>Vesse</div>
          <div>Kristiine</div>
          <div>Jarvveotsa</div>
        </>
      )}

      {city === "Tartu" && (
        <>
          <div>Lüunakeskus</div>
          <div>Raatuse</div>
        </>
      )}

      {city === "Narva" && (
        <>
          <div>Fama</div>
        </>
      )}

      {city === "Pärnu" && (
        <>
          <div>Port Artur 2</div>
        </>
      )}
    </div>
  );
}

export default Shops;
