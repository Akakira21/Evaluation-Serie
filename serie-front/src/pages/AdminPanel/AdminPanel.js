import React, { useRef } from 'react';
import styles from './AdminPanel.module.scss'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addSerie } from '../../apis/series';

const AdminPanel = () => {

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const posterRef = useRef();
  

    const defaultValues = {
        title: "",
        poster: "",
        year: "",
        resume: "",
        numberSeason: "",
        still: "",
        imdbNote: "",
        sensCritiqueNote: "",
        country: "",
      };

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
      } = useForm({
        defaultValues,
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
          const response = await addSerie(formData);
            if (response.message) {
              setFeedback(response.message);
            } else {
              setFeedbackGood(response.messageGood);
              reset(defaultValues);
            }
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <div>
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit(submit)}>

                <div className="d-flex flex-column mb20">
                    <label htmlFor="title" className="mb10">
                        Title : 
                    </label>
                    <input {...register("title")} type="text" id="title" />
                    {errors?.title && (
                    <p className="text-error">{errors.username.message}</p>
                    )}
                </div>
                
                <div className="d-flex flex-column mb20">
                    <label htmlFor="poster" className="mb10">
                        Poster : 
                    </label>
                    <input ref={posterRef} type="file" id="poster" />
                    {errors?.poster && (
                    <p className="text-error">{errors.username.message}</p>
                    )}
                </div>
                
                <div className="d-flex flex-column mb20">
                    <label htmlFor="year" className="mb10">
                        Year :
                    </label>
                    <input {...register("year")} type="text" id="year" />
                    {errors?.year && (
                    <p className="text-error">{errors.username.message}</p>
                    )}
                </div>
                
                <div className="d-flex flex-column mb20">
                    <label htmlFor="resume" className="mb10">
                        Synopsis : 
                    </label>
                    <input {...register("resume")} type="text" id="resume" />
                    {errors?.resume && (
                    <p className="text-error">{errors.username.message}</p>
                    )}
                </div>
                
                <div className="d-flex flex-column mb20">
                    <label htmlFor="numberSeason" className="mb10">
                        Number of Seasons : 
                    </label>
                    <input {...register("numberSeason")} type="text" id="numberSeason" />
                    {errors?.numberSeason && (
                    <p className="text-error">{errors.username.message}</p>
                    )}
                </div>
                
                <div className="d-flex flex-column mb20">
                    <label htmlFor="still" className="mb10">
                        Still going ? : 
                    </label>
                    <input {...register("still")} type="text" id="still" />
                    {errors?.still && (
                    <p className="text-error">{errors.username.message}</p>
                    )}
                </div>
                
                <div className="d-flex flex-column mb20">
                    <label htmlFor="imdbNote" className="mb10">
                        IMDB rating :
                    </label>
                    <input {...register("imdbNote")} type="text" id="imdbNote" />
                    {errors?.imdbNote && (
                    <p className="text-error">{errors.username.message}</p>
                    )}
                </div>
                
                <div className="d-flex flex-column mb20">
                    <label htmlFor="sensCritiqueNote" className="mb10">
                        SensCritique rating : 
                    </label>
                    <input {...register("sensCritiqueNote")} type="text" id="sensCritiqueNote" />
                    {errors?.titsensCritiqueNotele && (
                    <p className="text-error">{errors.username.message}</p>
                    )}
                </div>
                
                <div className="d-flex flex-column mb20">
                    <label htmlFor="country" className="mb10">
                        Country : 
                    </label>
                    <input {...register("country")} type="text" id="country" />
                    {errors?.country && (
                    <p className="text-error">{errors.username.message}</p>
                    )}
                </div>

                <button className="btn btn-primary">Submit</button>
                {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                {feedbackGood && (
                <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>
                )}

            </form>
        </div>
    );
};

export default AdminPanel;