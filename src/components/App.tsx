import axios from "axios";
import { useState } from "react";
import SearchForm from "./SearchForm";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
}

interface MoviesResponse {
  Search: Movie[];
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.get<MoviesResponse>(
        `https://www.omdbapi.com/?apikey=thewdb&s=${topic}`
      );

      setMovies(response.data.Search || []); // якщо нема результатів
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching movies</p>}
      <ul>
        {movies.map(({ imdbID, Title, Year }) => (
          <li key={imdbID}>
            {Title} ({Year})
          </li>
        ))}
      </ul>
    </>
  );
}
