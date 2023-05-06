import { Link } from 'react-router-dom';
import IconError404 from './NotFoundIcon';
import styled from 'styled-components';
function PageNotFound() {
  return (
    <Container>
      {<IconError404 />}
      <ErrorText>Sorry, this page dont exists</ErrorText>
      <Link to="/">
        <BackToHomeBtn type="button">Back to homepage</BackToHomeBtn>
      </Link>
    </Container>
  );
}
const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 100px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 320px) {
    width: 320px;
  }
  @media screen and (min-width: 768px) {
    width: 768px;
    padding-left: 32px;
    padding-right: 32px;
  }
  @media screen and (min-width: 1280px) {
    width: 1280px;
  }
`;

const ErrorText = styled.p`
  font-size: 30px;
  margin-bottom: 40px;
`;

const BackToHomeBtn = styled.button`
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
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
export default PageNotFound;
