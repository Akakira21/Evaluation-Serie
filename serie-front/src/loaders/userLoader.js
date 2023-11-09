import { getUser } from "../apis/users";

export async function userLoader() {
  return getUser();
}
