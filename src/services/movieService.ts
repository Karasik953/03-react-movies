import axios from "axios";
import { Movie } from "../types/Movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const API_BASE_URL = "https://api.themoviedb.org/3";


interface TMDBResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  try {
    const response = await axios.get<TMDBResponse>(`${API_BASE_URL}/search/movie`, config);
    return response.data.results;
  } catch (error) {
    console.error("❌ Error fetching movies:", error);
    throw error;
  }
}

export const buildPosterUrl = (path: string | null | undefined): string =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "";


export const buildBackdropUrl = (path: string | null | undefined): string =>
  path ? `https://image.tmdb.org/t/p/original${path}` : "";
