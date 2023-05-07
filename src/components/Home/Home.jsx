import { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from 'components/Gallery/Gallery';
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '90c7ff0c6a89140d8ec65b5296dfcca2';

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const ShouldLoadMoreBtnShow = Math.ceil(totalSearchResults / 20) > page;

  const handleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    axios(`${BASE_URL}trending/all/day?api_key=${API_KEY}`)
      .then(movies => {
        setMovies(movies.data.results);
        setTotalSearchResults(movies.data.total_results);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    axios(`${BASE_URL}trending/all/day?api_key=${API_KEY}&page=${page}`)
      .then(movies =>
        setMovies(prevMovies => [...prevMovies, ...movies.data.results])
      )
      .catch(console.log);
  }, [page]);

  return (
    <>
      <Gallery movies={movies} />
      {ShouldLoadMoreBtnShow && <LoadMoreBtn onClick={handleLoadMoreBtn} />}
    </>
  );
}

export default Home;
