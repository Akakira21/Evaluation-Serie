import styles from "./Serie.module.scss";
import { useNavigate } from "react-router-dom";

export default function Serie({ serie, updateSeries, deleteSeries }) {
  
  const { idSerie, title, poster } = serie;
  const navigate = useNavigate();

  // const handleClick = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/api/series/likedThisOne",
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(serie),
  //       }
  //     );
  //     if (response.ok) {
  //       const updatedS = await response.json();
  //       updatedS.like = !updatedS.like;
  //       updateSeries(updatedS);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
    <div className={`${styles.serie}`} onClick={() => navigate(`/SerieDetails/${serie.idSerie}`, {state:{id:serie.idSerie}})}>
      <i 
      onClick={handleDelete}
      className="fas fa-xmark"></i>
      <div className={`${styles.imgContainer}`}>
        <img src={`http://localhost:8000/${poster}`} alt="oneSerie" />
      </div>
      <div
        // onClick={handleClick}
        className={`${styles.title} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb10">{title}</h3>
        {/* <i className={`fas fa-heart ${like ? "text-liked" : ""}`}></i> */}
      </div>
    </div>
  );
}
