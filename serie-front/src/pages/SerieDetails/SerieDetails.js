import React, { useEffect, useState } from "react";
import styles from "./SerieDetails.module.scss";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";


function SerieDetails() {
  const location = useLocation();
  const id = location.state.id;
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await fetch(
            `http://localhost:8000/getDetails/${id}`
        );
        if (response.ok) {
          const detailsFromBack = await response.json();
          setDetails(detailsFromBack)
          setIsLoading(false);
          console.log("Détails récupérés", detailsFromBack);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetails();
  }, [id]);

  return (
    <div>
        {isLoading ? (

          <Loading />

        ) : (
            <div className={styles.details}>
                <h2>Title : {details[0].title}</h2>

                <h3>Year : {details[0].year}</h3>

                <div className={`${styles.imgContainer}`}>
                <img src={`http://localhost:8000/${details[0].poster}`} alt={`Poster for ${details[0].title}`}></img>
                </div>
                
                <p>Number of seasons : {details[0].numberSeason}</p>

                <p>State : {details[0].still === 1 ? "Finished" : "Ongoing"}</p>

                <p>{details[0].resume}</p>

                <p> IMDB rating : {details[0].imdbNote}</p>

                <p> SensCritique rating : {details[0].sensCritiqueNote}</p>

                <p>Country of origine : {details[0].country}</p>

            </div>
        )
        }
      
    </div>
  );
}

export default SerieDetails;
