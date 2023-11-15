import styles from "../../../Homepage/components/Serie.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SerieReduced({ serie, deleteSeries }) {
  
  const { idSerie, title } = serie;
  const navigate = useNavigate();
  const [modify, setModify] = useState(0)



  async function handleDelete() {
    console.log("Serie handleDelete");
    console.log(idSerie);
    try {
      const response = await fetch(
        `http://localhost:8000/deleteSerie`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({"idSerie": idSerie}),
        }
      );
      if (response.ok) {
        deleteSeries(idSerie);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="d-flex">

          <h3>{title}</h3>
          <button onClick={() => navigate(`/modify/${serie.idSerie}`, {state:{id:serie.idSerie}})}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>

    </div>
  );
}
