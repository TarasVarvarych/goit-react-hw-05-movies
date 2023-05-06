import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// import styled from 'styled-components';
import Gallery from 'components/Gallery/Gallery';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '90c7ff0c6a89140d8ec65b5296dfcca2';
function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('query');
    if (query === null) {
      return;
    }
    axios(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
    ).then(movies => setMovies(movies.data.results));
  }, [searchParams]);

  const hangleSubmit = e => {
    const { searchQuery } = e.currentTarget;
    e.preventDefault();
    if (searchQuery.value.trim() === '') {
      return;
    }
    setSearchParams({ query: searchQuery.value });
    e.currentTarget.reset();
  };
  return (
    <>
      <form onSubmit={hangleSubmit}>
        <input name="searchQuery" type="text" />
        <button type="submit">Search</button>
      </form>
      <Gallery movies={movies} />
    </>
  );
}

export default Movies;
