import React from 'react';
import { useEffect, useState } from "react";
import SerieReduced from './SerieReduced';

const ModifySerie = () => {

    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [series, setSeries] = useState([]);

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

    return (
        <div>
            <div>
            {series
              .filter((serie) => serie.title.toLowerCase().includes(filter))
              .map((serie) => (
                <SerieReduced
                  key={serie.idSerie} 
                  serie={serie}
                />
              ))}
          </div>
        </div>
    );
};

export default ModifySerie;