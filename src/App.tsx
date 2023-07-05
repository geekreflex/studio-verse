import { styled } from 'styled-components';
import Providers from './context';
import GlobalCSS from './styles/global';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { fetchFonts } from './features/fontsSlice';
import { SkeletonTheme } from 'react-loading-skeleton';
import { router } from './routes/app';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFonts());
  }, []);

  return (
    <Wrap>
      <Providers>
        <GlobalCSS />
        <SkeletonTheme baseColor="#222" highlightColor="#444">
          <RouterProvider router={router} />
        </SkeletonTheme>
      </Providers>
    </Wrap>
  );
}

const Wrap = styled.div``;
