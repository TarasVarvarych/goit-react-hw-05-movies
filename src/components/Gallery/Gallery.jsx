import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const DEFAULT_POSTER_URL =
  'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg';

function Gallery({ movies }) {
  const location = useLocation();

  return (
    <GalleryList>
      {movies.map(({ id, poster_path, tags, title, name }) => (
        <GalleryItem key={nanoid()}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            <MovieTitle>{title || name}</MovieTitle>
            <Poster
              src={poster_path ? IMG_URL + poster_path : DEFAULT_POSTER_URL}
              alt={tags}
              width="400"
              height="500"
            />
          </Link>
        </GalleryItem>
      ))}
    </GalleryList>
  );
}
export default Gallery;

const Poster = styled.img`
  overflow: hidden;
  border-radius: 5px;
  height: 402px;
  @media screen and (min-width: 768px) {
    height: 455px;
  }

  @media screen and (min-width: 1280px) {
    height: 574px;
  }
`;
const MovieTitle = styled.p`
  margin-bottom: 10px;
  margin-left: 10px;
  font-size: 20px;
`;

const GalleryItem = styled.li`
  width: 100%;
  border-radius: 5px;
  background-color: #8db48e;
  padding: 5px;

  @media screen and (min-width: 768px) {
    flex-basis: calc((100% - 32px) / 2);
  }

  @media screen and (min-width: 1280px) {
    flex-basis: calc((100% - 32px) / 3);
  }

  &:hover {
    -webkit-box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
    -moz-box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
    box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
    background-color: #4d724d;
    scale: 1.02;
    cursor: pointer;
  }
`;

const GalleryList = styled.ul`
  list-style: none;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }

  @media screen and (min-width: 1280px) {
    column-gap: 16px;
  }
`;
