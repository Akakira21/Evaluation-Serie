import styles from "./Serie.module.scss";

export default function Serie({ serie, updateSeries, deleteSeries }) {
  const { idSerie, title, poster } = serie;
  console.log(serie);

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

  // async function handleDelete() {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8000/api/series/deleteSeries/${id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     if (response.ok) {
  //       deleteSeries(id);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div className={`${styles.serie}`}>
      <i 
      // onClick={handleDelete}
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
