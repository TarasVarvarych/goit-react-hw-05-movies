import styled from 'styled-components';

function LoadMoreBtn({ onClick }) {
  return (
    <LoadMoreButton type="button" onClick={onClick}>
      Load more
    </LoadMoreButton>
  );
}
export default LoadMoreBtn;

const LoadMoreButton = styled.button`
  width: 200px;
  height: 40px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
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
