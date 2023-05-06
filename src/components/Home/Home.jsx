import { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from 'components/Gallery/Gallery';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '90c7ff0c6a89140d8ec65b5296dfcca2';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios(`${BASE_URL}trending/all/day?api_key=${API_KEY}`).then(movies =>
      setMovies(movies.data.results)
    );
  }, []);
  return <Gallery movies={movies} />;
}

export default Home;
