import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "../Register/Register.module.scss";
import { signin } from "../../../apis/users";

export default function Login() {
  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const navigate = useNavigate();
  const [user, setUser, admin, setAdmin] = useOutletContext();

  const yupSchema = yup.object({
    email: yup
      .string()
      .email("Votre email n'est pas valide")
      .required("Le champ est obligatoire"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Le champ doit comporter 5 caractères"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    setFeedback("");
    console.log(values);
    try {
      const response = await signin(values);
        if (user.message) {
          setFeedback(user.message);
        } else {
          reset(defaultValues);
          setFeedbackGood("Connexion réussi. Vous allez être redirigé");
          setUser(user.id);
          setAdmin(user.admin)
          setTimeout(() => {
            navigate("/")
          }, 1000);
        }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center flex-fill`}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb20">
          <label htmlFor="email" className="mb10">
            Email
          </label>
          <input {...register("email")} type="text" id="email" />
          {errors?.email && (
            <p className="text-error">{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="password" className="mb10">
            Password
          </label>
          <input {...register("password")} type="password" id="password" />
          {errors?.password && (
            <p className="text-error">{errors.password.message}</p>
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
}