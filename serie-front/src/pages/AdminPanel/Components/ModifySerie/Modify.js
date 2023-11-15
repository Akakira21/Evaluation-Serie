import React, { useEffect, useState, useRef} from "react";
import styles from "../../../SerieDetails/SerieDetails.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";
import { addSerie, deleteSeries } from "../../../../apis/series";
import { useForm } from "react-hook-form";

function Modify() {
  const location = useLocation();
  const id = location.state?.id;
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState();
  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const navigate = useNavigate();
  const posterRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  async function submit() {
    setFeedback("");
    console.log("Submit", posterRef.current.files[0]);
    const values = getValues();
    const formData = new FormData();
    formData.append("title", values.title);
    if (posterRef.current && posterRef.current.files[0]) {
        formData.append("poster", posterRef.current.files[0]);
      }
    formData.append("year", values.year);
    formData.append("resume", values.resume);
    formData.append("numberSeason", values.numberSeason);
    formData.append("still", values.still);
    formData.append("imdbNote", values.imdbNote	);
    formData.append("sensCritiqueNote", values.sensCritiqueNote);
    formData.append("country", values.country);

    console.log(formData);
    try {
      const response = await fetch(`http://localhost:8000/updateSerie/${id}`, {
        method : 'PUT',
        body: formData,
      });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.message) {
            setFeedback(responseData.message)
            setTimeout(() => {
              navigate("/adminpanel")
            }, "1500");
          } else {
            setFeedbackGood(responseData.messageGood)
          }
        } else {
          console.error("Erreur mise à jour : ", response.statusText);
        }
    } catch (error) {
      console.error(error);
    }
  }

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
    <div className="d-flex flex-fill flex-column">
        {isLoading ? (

          <Loading />

        ) : (
            <div className={styles.details}>
                <form onSubmit={handleSubmit(submit)}>

                    <h2>Title : <input {...register("title")} type="text" defaultValue={details[0].title}></input></h2>

                    <h3>Year : <input {...register("year")} type='text'defaultValue={details[0].year}></input></h3>

                    <div className={`${styles.imgContainer}`}>
                    <img src={`http://localhost:8000/${details[0].poster}`} alt={`Poster for ${details[0].title}`}></img>
                    <input ref={posterRef} type="file"></input>
                    </div>
                    
                    <p>Number of seasons : <input {...register("numberSeason")} type="text" defaultValue={details[0].numberSeason}></input></p>

                    <p>State : {details[0].still === 1 ? "Finished" : "Ongoing"}</p>
                    <label htmlFor="state">1 = finished / 0 = ongoing </label>
                    <input {...register("still")} type="text" id="state" defaultValue={details[0].still}></input>

                    <textarea className={styles.resumeBox} {...register("resume")} type="text" defaultValue={details[0].resume}></textarea>

                    <p> IMDB rating : <input {...register("imdbNote")} type="text" defaultValue={details[0].imdbNote}></input></p>

                    <p> SensCritique rating : <input {...register("sensCritiqueNote")} type="text" defaultValue={details[0].sensCritiqueNote}></input></p>

                    <p>Country of origine : <input {...register("country")} type="text" defaultValue={details[0].country}></input></p>

                    <button className="btn btn-primary">Update</button>
                    {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                    {feedbackGood && (
                    <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>
                    )}

                </form>
            </div>
        )
        }
      
    </div>
  );
}

export default Modify;
