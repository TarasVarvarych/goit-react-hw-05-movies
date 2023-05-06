import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '90c7ff0c6a89140d8ec65b5296dfcca2';
function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios(`${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}`).then(
      responce => setReviews(responce.data.results)
    );
  }, [movieId]);

  return (
    <ReviewsList>
      {reviews.length === 0
        ? "Sorry, we don't have reviews for this movie"
        : reviews.map(({ author, content, id }) => (
            <li key={id}>
              <p>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))}
    </ReviewsList>
  );
}

const ReviewsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;
export default Reviews;
