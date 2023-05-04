import { Link, Outlet } from 'react-router-dom';

function SharedLayout() {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="movies">Movies</Link>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default SharedLayout;
