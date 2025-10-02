import { useState } from "react"

function Settings() {

    const [language, setLanguage] = useState(localStorage.getItem("language") || "et");

    function updateLanguage(newLanguage: string){
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    }

    return(
        <div>
            <button onClick ={() => updateLanguage("et")}>Eesti</button>
            <button onClick ={() => updateLanguage("en")}>English</button>
            <button onClick ={() => updateLanguage("es")}>Espanol</button>
            <button onClick ={() => updateLanguage("ru")}>Russkii</button>
            <br /> <br />

            {language === "et" && <div>Teavitused on eesti keeles</div>}
            {language === "en" && <div>Notifications are in English</div>}
            {language === "es" && <div>Las notificationes estan en espanol</div>}
            {language === "ru" && <div>Уведомления на русском языке</div>}
        
        </div>

    )
}

export default Settings