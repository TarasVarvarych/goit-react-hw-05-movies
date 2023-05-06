import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '90c7ff0c6a89140d8ec65b5296dfcca2';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    axios(`${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`).then(
      responce => setCast(responce.data.cast)
    );
  }, [movieId]);
  return (
    <ul>
      {cast.map(({ name, profile_path, character, id }) => (
        <li key={id}>
          <img src={IMG_URL + profile_path} alt={name} width="100" />
          <p>{name}</p>
          <p>{character}</p>
        </li>
      ))}
    </ul>
  );
}

export default Cast;
