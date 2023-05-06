import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Gallery from 'components/Gallery/Gallery';
import IconMovieSearchOutline from './SearchIcon';

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
      <SearchForm onSubmit={hangleSubmit}>
        <SearchFormWrapper>
          <SearchInput
            name="searchQuery"
            type="text"
            placeholder="enter movie title"
          />
          <SubmitBtn type="submit"> {<IconMovieSearchOutline />}</SubmitBtn>
        </SearchFormWrapper>
      </SearchForm>
      <Gallery movies={movies} query={searchParams.get('query')} />
    </>
  );
}

const SearchInput = styled.input`
  background-color: #8db48e;
  width: 320px;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  padding-left: 10px;
`;

const SubmitBtn = styled.button`
  height: 40px;
  width: 40px;
  margin-left: 10px;
  background-color: #4d724d;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #8db48e;
    scale: 1.02;
    cursor: pointer;
  }
`;

const SearchFormWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

const SearchForm = styled.form`
  margin-bottom: 20px;
`;
export default Movies;
