import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Gallery from 'components/Gallery/Gallery';
import IconMovieSearchOutline from './SearchIcon';
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '90c7ff0c6a89140d8ec65b5296dfcca2';
function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const ShouldLoadMoreBtnShow = movies.length > 0;

  const handleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const hangleSubmit = e => {
    const { searchQuery } = e.currentTarget;
    e.preventDefault();
    if (searchQuery.value.trim() === '') {
      return;
    }
    setSearchParams({ query: searchQuery.value });
    setPage(1);
    e.currentTarget.reset();
  };

  useEffect(() => {
    if (query === null) {
      return;
    }
    axios(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}&page=${page}`
    )
      .then(movies =>
        setMovies(prevMovies => [...prevMovies, ...movies.data.results])
      )
      .catch(console.log);
  }, [page, query]);

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
      {ShouldLoadMoreBtnShow && <LoadMoreBtn onClick={handleLoadMoreBtn} />}
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
