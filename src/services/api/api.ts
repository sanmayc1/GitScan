import { fetchCommits, Repositories } from "@/utils/types";
const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const fetchRepositories = async (
  username: string
): Promise<Repositories[] | null> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/repos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const repoCommits = async (
  repoFullName: string
): Promise<fetchCommits[] | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoFullName}/commits`
    );
    if (response.status !== 200) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching commits:", error);
    return null;
  }
};
