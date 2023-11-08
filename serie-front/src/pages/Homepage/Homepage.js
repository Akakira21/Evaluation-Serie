import Loading from "../../components/Loading/Loading";
import styles from "./Homepage.module.scss";
import Serie from "./components/Serie";
// import { series } from "../../data";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [filter, setFilter] = useState("");
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/series/getSeries"
        );
        if (response.ok) {
          const seriesFromBack = await response.json();
          const modifiedSeries = seriesFromBack.map((s) =>
            s.like === 1 ? { ...s, like: true } : { ...s, like: false }
          );
          setIsLoading(false);
          setSeries(modifiedSeries);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSeries();
  }, []);

  function updateSeries(newSerie) {
    setSeries(series.map((s) => (s.id === newSerie.id ? newSerie : s)));
  }

  function deleteSeries(id) {
    setSeries(series.filter((s) => s.id !== id));
  }

  const handleInput = (e) => {
    const search = e.target.value;
    setFilter(search.trim().toLowerCase());
  };
  return (
    <div className="d-flex flex-column flex-fill container">
      <h1 className="mb20">Découvrez nos dernières critiques</h1>
      <div
        className={`card p20 mb20 d-flex flex-column flex-fill ${styles.contentCard}`}
      >
        <div
          className={`d-flex justify-content-center align-items-center my30 ${styles.searchBar}`}
        >
          <i className="fas fa-magnifying-glass mr10"></i>
          <input
            onInput={handleInput}
            className="flex-fill"
            type="text"
            placeholder="Search..."
          />
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className={`${styles.grid}`}>
            {series
              .filter((serie) => serie.title.toLowerCase().includes(filter))
              .map((serie) => (
                <Serie
                  key={serie.id}
                  serie={serie}
                  updateSeries={updateSeries}
                  deleteSeries={deleteSeries}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
