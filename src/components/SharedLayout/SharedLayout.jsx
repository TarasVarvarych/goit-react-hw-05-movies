import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

function SharedLayout() {
  return (
    <Container>
      <header>
        <Navigation>
          <li>
            <NavigationLink to="/">Home</NavigationLink>
          </li>
          <li>
            <NavigationLink to="movies">Movies</NavigationLink>
          </li>
        </Navigation>
      </header>
      <main>
        <Outlet />
      </main>
    </Container>
  );
}
const Container = styled.div`
  padding: 10px 20px;
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
`;
export default SharedLayout;
