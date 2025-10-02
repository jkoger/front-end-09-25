import { useEffect, useState } from "react"
import Dropdown from "./ui/Dropdown";

function ParcelMachines() {

    const [parcelMachines, setParcelMachines] = useState<any[]>([]);
    const [dbparcelMachines, setDbParcelMachines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [country, setCountry] = useState("Koik");
    const [selectedPM, setSelectedPM] = useState("");

    useEffect(() => {
        fetch("https://www.omniva.ee/locations.json")
        .then(res => res.json())
        .then(json => {
            setLoading(false);
            setDbParcelMachines(json);
            setParcelMachines(json);
        })
    }, []);

    function updateParcelMachines(newCountry: string){
        let result =[];

        if (newCountry === ""){
            result = dbparcelMachines.slice();
        } else {
            dbparcelMachines.filter(pm => pm. A0_NAME === newCountry);
        }

        switch (newCountry){
            case "":{
                setCountry ("Koik");
                break;
            }
            case "EE":{
                setCountry ("Eesti");
                break;
            }
            case "LV":{
                setCountry ("Lati");
                break;
            }
            case "LT":{
                setCountry ("Leedu");
                break;
            }
        }
        setParcelMachines(result);
    }

    if (loading){
        return <div>Loading...</div>
    }

  return (
    <div>

        <button onClick={()=> updateParcelMachines("")}>Koik</button>
        <button onClick={()=> updateParcelMachines("EE")}>Eesti</button>
        <button onClick={()=> updateParcelMachines("LV")}>Lati</button>
        <button onClick={()=> updateParcelMachines("LT")}>Leedu</button>
        <div>Valitud riik {country}</div>
        <br /> <br />
        <div>Vali pakiautommat</div>

        <Dropdown handleSelect={setSelectedPM}
        options = {parcelMachines.map(pm => pm.Name)}
        header = "Parcelmachines"  />

        {/* <select>
            {parcelMachines.map(pm => 
             <option key = {pm.NAME}>
                {pm.NAME}</option>
              )}
        </select> */}
        <div>Valitud pakiatomaat: {selectedPM} </div>
        
    </div>
  )
}

export default ParcelMachines