import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '90c7ff0c6a89140d8ec65b5296dfcca2';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const prevLocation = location.state?.from;
  const {
    title,
    release_date,
    vote_average,
    overview,
    genres,
    poster_path,
    tags,
  } = movie;
  const dateToShow = release_date?.split('').splice(0, 4).join('');
  const userScore = Math.round(vote_average * 10);
  const genresToShow = genres => {
    const genresCount = genres?.length;
    if (genresCount === 1) {
      return genres[0].name;
    } else if (genresCount === 2) {
      return `${genres[0].name}, ${genres[1].name}`;
    } else if (genresCount > 2) {
      return `${genres[0].name}, ${genres[1].name}, Other`;
    }
    return null;
  };

  useEffect(() => {
    axios(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`).then(movie =>
      setMovie(movie.data)
    );
  }, [movieId]);

  return (
    <MovieWrapper>
      <Link to={location?.state?.from ?? `/movies/${movieId}`}>
        <button type="button">Go back</button>
      </Link>
      <img src="" alt="" />
      <h2>
        <img src={IMG_URL + poster_path} alt={tags} width="400" height="500" />
        {title} ({dateToShow})
      </h2>
      <p>User score: {userScore}%</p>
      <h3>Overview</h3>
      <p>{overview}</p>
      <h3>Genres</h3>
      <p>{genresToShow(genres)}</p>
      <AditionalOptionsTitle>Aditional information:</AditionalOptionsTitle>
      <AditionalOptionsList>
        <li>
          <AditionalLink to={`cast`} state={{ from: prevLocation }}>
            Cast
          </AditionalLink>
        </li>
        <li>
          <AditionalLink to={`reviews`} state={{ from: prevLocation }}>
            Reviews
          </AditionalLink>
        </li>
      </AditionalOptionsList>
      <Outlet />
    </MovieWrapper>
  );
}

const MovieWrapper = styled.div`
  width: 400px;
  text-align: center;
`;

const AditionalLink = styled(Link)`
  font-size: 20px;
  font-weight: 500;
  text-decoration: underline;
  &: hover {
    font-size: 22px;
  }
`;

const AditionalOptionsList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
`;

const AditionalOptionsTitle = styled.p`
  margin-top: 40px;
  font-size: 20px;
`;
export default MovieDetails;
