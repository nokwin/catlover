import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BreedModal } from './components/breed-modal.component';
import { CatModal } from './components/cat-modal.component';
import { Header } from './components/header.component';
import { BreedPage } from './pages/breed.page';
import { FavoritePage } from './pages/favorite.page';
import { HomePage } from './pages/home.page';

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <BrowserRouter>
      <BreedModal />
      <CatModal />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/breed" element={<BreedPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  );
};
