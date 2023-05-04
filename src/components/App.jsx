import { Route, Routes } from 'react-router-dom';
import SharedLayout from './Header/Header';
import Home from './Home/Home';
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {' '}
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};
