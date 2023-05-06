import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '90c7ff0c6a89140d8ec65b5296dfcca2';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_PIC = 'https://img.freepik.com/free-icon/user_318-804790.jpg';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    axios(`${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`).then(
      responce => setCast(responce.data.cast)
    );
  }, [movieId]);
  return (
    <CastList>
      {cast.length === 0
        ? "Sorry, we don't have information about cast"
        : cast.map(({ name, profile_path, character, id }) => (
            <CastCard key={id}>
              <img
                src={profile_path ? IMG_URL + profile_path : DEFAULT_PIC}
                alt={name}
                width="100"
              />
              <p>{name}</p>
              <p>{character}</p>
            </CastCard>
          ))}
    </CastList>
  );
}

const CastList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 15px;
  text-align: left;
`;

const CastCard = styled.li`
  width: 110px;
  padding: 5px;

  border-radius: 5px;
  background-color: #f3f3f3;
  &:hover {
    scale: 1.01;
  }
`;
export default Cast;
