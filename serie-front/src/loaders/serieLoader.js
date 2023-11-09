import { getSeries } from "../apis/series";

export async function serieLoader() {
  return getSeries();
}
