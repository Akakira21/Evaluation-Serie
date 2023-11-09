import { userLoader } from "./userLoader";
import { serieLoader } from "./serieLoader";

export async function combinedLoader() {
    const [ userData, serieData ] = await Promise.all([userLoader(), serieLoader()])
  return { userData, serieData };
}