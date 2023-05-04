import {} from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '90c7ff0c6a89140d8ec65b5296dfcca2';

function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchedMovies = axios(
      `${BASE_URL}trending/all/day?api_key=${API_KEY}`
    ).then(movies => setMovies(movies.data.results));
  }, []);
  return (
    <ul>
      {movies.map(({ title, id, webformatURL, tags }) => (
        <GalleryItem key={id}>
          <img src={webformatURL} alt={tags} width="400" height="300" />
        </GalleryItem>
      ))}
    </ul>
  );
}

const GalleryItem = styled.li`
  -webkit-box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
  -moz-box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
  box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
  &:hover {
    scale: 1.02;
    cursor: pointer;
  }
`;
export default Home;
