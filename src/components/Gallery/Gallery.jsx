import { Link } from 'react-router-dom';
import styled from 'styled-components';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function Gallery({ movies }) {
  return (
    <GalleryList>
      {movies.map(({ id, poster_path, tags }) => (
        <GalleryItem key={id}>
          <Link to={`/movies/${id}`}>
            <img
              src={IMG_URL + poster_path}
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

const GalleryItem = styled.li`
  -webkit-box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
  -moz-box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
  box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
  &:hover {
    scale: 1.02;
    cursor: pointer;
  }
`;

const GalleryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  list-style: none;
`;
