import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

function SharedLayout() {
  return (
    <Container>
      <Header>
        <Navigation>
          <li>
            <NavigationLink to="/">Home</NavigationLink>
          </li>
          <li>
            <NavigationLink to="movies">Movies</NavigationLink>
          </li>
        </Navigation>
      </Header>
      <main>
        <Outlet />
      </main>
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

const Navigation = styled.ul`
  list-style: none;
  display: flex;
  gap: 100px;
`;

const NavigationLink = styled(NavLink)`
  font-size: 24px;
  text-decoration: none;
  &.active {
    color: red;
  }
  &:hover {
    color: orange;
  }
`;

const Header = styled.header`
  padding: 20px 0;

  @media screen and (min-width: 768px) {
    padding-top: 32px;
  }
`;
export default SharedLayout;
