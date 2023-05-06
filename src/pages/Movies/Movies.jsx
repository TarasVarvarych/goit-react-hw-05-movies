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
  // useEffect(() => {
  //   axios(
  //     `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchParams}`
  //   ).then(movies => setMovies(movies.data.results));
  //   setSearchParams({ query: searchParams });
  // }, [searchParams, setSearchParams]);

  const hangleSubmit = e => {
    const { searchQuery } = e.currentTarget;
    e.preventDefault();
    if (searchQuery.value.trim() === '') {
      return;
    }
    axios(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery.value}`
    ).then(movies => setMovies(movies.data.results));
    setSearchParams({ query: searchQuery.value });
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
