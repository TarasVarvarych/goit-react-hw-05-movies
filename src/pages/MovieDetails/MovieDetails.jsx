import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import IconArrowLeft from './ArrowIcon';
import axios from 'axios';
import { Loader } from 'components/Loader/Loader';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '90c7ff0c6a89140d8ec65b5296dfcca2';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POSTER_URL =
  'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';

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
    axios(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`)
      .then(movie => setMovie(movie.data))
      .catch(console.log);
  }, [movieId]);

  return (
    <MovieWrapper>
      <GoBackLink to={prevLocation ?? `/movies/${movieId}`}>
        <GoBackBtn type="button">{<IconArrowLeft />}Go back</GoBackBtn>
      </GoBackLink>
      <Poster
        src={poster_path ? IMG_URL + poster_path : DEFAULT_POSTER_URL}
        alt={tags}
        width="400"
        height="500"
      />
      <h2>
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
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
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

const Poster = styled.img`
  overflow: hidden;
  border-radius: 5px;
  height: 402px;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    height: 455px;
  }

  @media screen and (min-width: 1280px) {
    height: 574px;
  }
`;
const GoBackBtn = styled.button`
  width: 160px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  font-size: 18px;
  background-color: #8db48e;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #4d724d;
    scale: 1.02;
    cursor: pointer;
  }
`;

const GoBackLink = styled(Link)`
  margin-bottom: 20px;
`;
export default MovieDetails;
